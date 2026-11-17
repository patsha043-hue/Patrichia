import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Eraser,
  Eye,
  GraduationCap,
  HelpCircle,
  Maximize2,
  Printer,
  Send,
  Sparkles,
  Trash2,
  UserCheck,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  ADJECTIVE_TYPES_DETAILED,
  PASSAGE_IMAGE_PATH,
  TEACHER_GUIDANCE_CLUES,
  WORKSHEET_FIELDS,
} from '../data/kenaliKataAdjektifContent';
import { AdjectiveTypeDetail, PageRoute, WorksheetSubmission } from '../types';
import {
  AdjectiveTypeCartoonIcon,
  HappyStudentCelebrationSvg,
  TeacherAndStudentsRoadSvg,
} from './CartoonIllustrations';
import { CartoonImage } from './CartoonImage';

interface KenaliKataAdjektifPageProps {
  onNavigate: (route: PageRoute) => void;
}

type WorksheetAnswers = Record<'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu', string>;

const EMPTY_ANSWERS: WorksheetAnswers = {
  sifat: '',
  warna: '',
  ukuran: '',
  bentuk: '',
  waktu: '',
};

const WORKSHEET_STORAGE_KEY = 'opd_bm_tahun2_lembaran_kerja_1_v1';

export function KenaliKataAdjektifPage({ onNavigate }: KenaliKataAdjektifPageProps) {
  const [selectedAdjective, setSelectedAdjective] = useState<AdjectiveTypeDetail>(
    ADJECTIVE_TYPES_DETAILED[0]
  );

  // Zoom modal state for the original passage image
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Worksheet state
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Tahun 2');
  const [answers, setAnswers] = useState<WorksheetAnswers>(EMPTY_ANSWERS);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Teacher review & answer guide state (never shown automatically before submission)
  const [submissions, setSubmissions] = useState<WorksheetSubmission[]>([]);
  const [showTeacherPanel, setShowTeacherPanel] = useState(false);
  const [teacherConfirmed, setTeacherConfirmed] = useState(false);

  useEffect(() => {
    let active = true;
    const loadSubmissions = async () => {
      try {
        const raw = localStorage.getItem(WORKSHEET_STORAGE_KEY);
        const localData: WorksheetSubmission[] = raw ? JSON.parse(raw) : [];
        if (active && localData.length > 0) {
          setSubmissions(localData);
        }

        const res = await fetch('/api/kenali-kata-adjektif/worksheets');
        if (res.ok) {
          const data = (await res.json()) as { worksheets?: WorksheetSubmission[] };
          if (active && Array.isArray(data.worksheets) && data.worksheets.length > 0) {
            setSubmissions(data.worksheets);
            localStorage.setItem(WORKSHEET_STORAGE_KEY, JSON.stringify(data.worksheets));
          }
        }
      } catch {
        // Offline localStorage fallback already loaded
      }
    };

    void loadSubmissions();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  const syncSubmissions = (next: WorksheetSubmission[]) => {
    setSubmissions(next);
    try {
      localStorage.setItem(WORKSHEET_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleFieldChange = (
    fieldId: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu',
    value: string
  ) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    if (formError) setFormError(null);
  };

  const handleSubmitWorksheet = async (e: FormEvent) => {
    e.preventDefault();

    const missing = WORKSHEET_FIELDS.filter((f) => !answers[f.id].trim());
    if (missing.length > 0) {
      setFormError('Sila lengkapkan kesemua lima ruangan kata adjektif sebelum menghantar.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const payload = {
      studentName: studentName.trim() || 'Murid Tahun 2',
      studentClass: studentClass.trim() || 'Tahun 2',
      answers: {
        sifat: answers.sifat.trim(),
        warna: answers.warna.trim(),
        ukuran: answers.ukuran.trim(),
        bentuk: answers.bentuk.trim(),
        waktu: answers.waktu.trim(),
      },
    };

    let created: WorksheetSubmission = {
      id: `ws_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      ...payload,
      submittedAt: new Date().toISOString(),
      reviewed: false,
    };

    try {
      const res = await fetch('/api/kenali-kata-adjektif/worksheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = (await res.json()) as { worksheet?: WorksheetSubmission };
        if (data.worksheet) {
          created = data.worksheet;
        }
      }
    } catch {
      // Keep local fallback
    } finally {
      setIsSubmitting(false);
    }

    syncSubmissions([created, ...submissions]);
    setIsSubmitted(true);
  };

  const handleClearWorksheet = () => {
    setAnswers(EMPTY_ANSWERS);
    setIsSubmitted(false);
    setFormError(null);
  };

  const handlePrintWorksheet = () => {
    window.print();
  };

  const handleToggleReviewed = async (item: WorksheetSubmission) => {
    const nextReviewed = !item.reviewed;
    const updated = submissions.map((ws) =>
      ws.id === item.id ? { ...ws, reviewed: nextReviewed } : ws
    );
    syncSubmissions(updated);

    try {
      await fetch(`/api/kenali-kata-adjektif/worksheets/${encodeURIComponent(item.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewed: nextReviewed }),
      });
    } catch {
      // Already updated locally
    }
  };

  const handleClearAllSubmissions = async () => {
    syncSubmissions([]);
    try {
      await fetch('/api/kenali-kata-adjektif/worksheets', { method: 'DELETE' });
    } catch {
      // Already cleared locally
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Pengenalan */}
      <section className="no-print relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 3 · Pembelajaran Bahasa Melayu Tahun 2
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Jom Kenali Kata Adjektif!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Kata adjektif ialah perkataan yang menerangkan sifat atau keadaan sesuatu benda, orang,
              tempat dan perkara. Kata adjektif membantu kita memberikan gambaran yang lebih jelas
              tentang sesuatu perkara.
            </p>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-3">
              <TeacherAndStudentsRoadSvg />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bahagian Pengenalan Lima Jenis Kata Adjektif */}
      <section className="no-print mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Nota Interaktif Murid
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Kenali Lima Jenis Kata Adjektif
          </h2>
          <p className="max-w-2xl text-base font-semibold text-[#29466B]/85">
            Tekan mana-mana kad di bawah untuk melihat penerangan lanjut dan contoh ayat bertema
            keselamatan di jalan raya.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ADJECTIVE_TYPES_DETAILED.map((item) => {
            const isSelected = selectedAdjective.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedAdjective(item)}
                aria-pressed={isSelected}
                className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${item.cardBg} p-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29466B] ${
                  isSelected ? 'ring-3 ring-[#29466B]' : ''
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-display text-lg font-black text-[#29466B]/60 tabular-nums">
                      0{item.number}
                    </span>
                    <span className="font-display text-xs font-extrabold text-[#29466B]/75">
                      {isSelected ? 'Dipilih' : 'Tekan kad'}
                    </span>
                  </div>

                  <div className="mb-4 flex justify-center">
                    <AdjectiveTypeCartoonIcon type={item.id} />
                  </div>

                  <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-[#29466B]/85">{item.shortDesc}</p>
                </div>

                <div className="mt-4 border-t border-[#29466B]/10 pt-3">
                  <p className="font-display text-xs font-extrabold text-[#29466B]/70">Contoh:</p>
                  <p className="mt-0.5 font-display text-sm font-black text-[#29466B]">
                    {item.examples.join(', ')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel Maklumat Lanjut Kad Dipilih */}
        <div
          aria-live="polite"
          className={`cartoon-card mt-6 rounded-3xl ${selectedAdjective.cardBg} p-6 sm:p-8`}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <AdjectiveTypeCartoonIcon type={selectedAdjective.id} />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold text-[#29466B]/70">
                  Maklumat Lanjut · Jenis 0{selectedAdjective.number}
                </p>
                <h3 className="font-display text-2xl font-black text-[#29466B]">
                  {selectedAdjective.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base font-semibold leading-relaxed text-[#29466B]/90">
                  {selectedAdjective.detailedDesc}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#29466B]/14 p-4 lg:max-w-md w-full">
              <p className="font-display text-xs font-extrabold text-[#29466B]/70">
                Contoh Ayat Keselamatan Jalan Raya
              </p>
              <p className="mt-1.5 font-display text-base font-bold text-[#29466B]">
                “{selectedAdjective.roadSafetySentence}”
              </p>
              <p className="mt-2.5 text-xs font-bold text-[#29466B]/75">
                Kata adjektif: <span className="underline decoration-2">{selectedAdjective.highlightedWord}</span> · Contoh lain:{' '}
                {selectedAdjective.moreExamples.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bahagian Pembelajaran Murid Asas: Jom Baca Petikan! */}
      <section className="no-print mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti Pembelajaran Murid Asas
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Aktiviti 1: Mari Membaca Petikan!
              </h2>
              <p className="mt-2 max-w-3xl text-base font-semibold leading-relaxed text-[#29466B]/90">
                Baca petikan di bawah dengan teliti. Kemudian, kenal pasti lima kata adjektif yang
                terdapat dalam petikan tersebut.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setZoomScale(1.25);
                setIsZoomOpen(true);
              }}
              className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl bg-[#FFD966] px-4 py-2 font-display text-sm font-black text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <Maximize2 className="h-4 w-4" />
              <span>Besarkan Gambar (Zum)</span>
            </button>
          </div>

          {/* Gambar Petikan Asal (Tanpa Diubah atau Dipotong) */}
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#29466B]/18 bg-[#FFF8E8] p-2 sm:p-4">
            <button
              type="button"
              onClick={() => {
                setZoomScale(1.25);
                setIsZoomOpen(true);
              }}
              className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[#29466B] rounded-2xl overflow-hidden"
              aria-label="Klik untuk besarkan gambar petikan Keselamatan di Jalan Raya"
            >
              <CartoonImage
                src={PASSAGE_IMAGE_PATH}
                alt="Petikan bacaan bertajuk Keselamatan di Jalan Raya"
                fallbackTitle="Petikan: Keselamatan di Jalan Raya"
                className="h-auto w-full object-contain rounded-2xl"
              />
            </button>
          </div>

          {/* Ayat Sokongan Melengkapkan Kata Adjektif Waktu */}
          <div className="mx-auto mt-6 max-w-3xl rounded-3xl border-2 border-[#83C9F4] bg-[#EAF6FD] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#83C9F4] border-2 border-[#29466B]/20">
                <BookOpenCheck className="h-5 w-5 text-[#29466B]" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold text-[#29466B]/75">
                  Ayat Sambungan Bahan Bacaan
                </p>
                <p className="mt-1 font-display text-lg sm:text-xl font-black text-[#29466B]">
                  “Aina tiba awal di sekolah pada keesokan harinya.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Zum Gambar Petikan */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Paparan besar petikan Keselamatan di Jalan Raya"
          className="no-print fixed inset-0 z-50 flex flex-col bg-[#29466B]/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div className="mx-auto mb-3 flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-2.5 border-2 border-[#29466B]">
            <p className="font-display text-sm sm:text-base font-black text-[#29466B]">
              Petikan: Keselamatan di Jalan Raya ({Math.round(zoomScale * 100)}%)
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(0.75, Number((s - 0.25).toFixed(2))))}
                aria-label="Kecilkan gambar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#29466B]/25 bg-[#FFF8E8] text-[#29466B] cursor-pointer hover:bg-[#FFD966]/40"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(2.25, Number((s + 0.25).toFixed(2))))}
                aria-label="Besarkan gambar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#29466B]/25 bg-[#FFF8E8] text-[#29466B] cursor-pointer hover:bg-[#FFD966]/40"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border-2 border-[#29466B] bg-[#FF8585] px-3.5 py-1.5 font-display text-sm font-black text-[#29466B] cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span>Tutup</span>
              </button>
            </div>
          </div>

          <div className="mx-auto flex-1 w-full max-w-5xl overflow-auto rounded-2xl bg-[#FFF8E8] p-4">
            <div className="flex min-h-full items-start justify-center">
              <img
                src={PASSAGE_IMAGE_PATH}
                alt="Petikan bacaan bertajuk Keselamatan di Jalan Raya dalam paparan besar"
                referrerPolicy="no-referrer"
                style={{ width: `${zoomScale * 100}%`, maxWidth: 'none' }}
                className="h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Bahagian Lembaran Kerja Murid Asas */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card print-only-worksheet rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti Bertulis Digital
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Lembaran Kerja 1: Kenal Pasti Kata Adjektif
              </h2>
              <p className="mt-2 max-w-3xl text-base font-semibold text-[#29466B]/90">
                Berdasarkan petikan ‘Keselamatan di Jalan Raya’, senaraikan lima kata adjektif yang
                kamu temui. Tuliskan jawapan pada ruangan yang disediakan.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrintWorksheet}
              className="no-print cartoon-btn inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl bg-[#83C9F4] px-4 py-2 font-display text-sm font-black text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak Lembaran Kerja</span>
            </button>
          </div>

          <form onSubmit={(e) => void handleSubmitWorksheet(e)}>
            {/* Maklumat Murid */}
            <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/12 p-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ws-nama-murid"
                  className="block font-display text-sm font-extrabold text-[#29466B]"
                >
                  Nama Murid
                </label>
                <input
                  id="ws-nama-murid"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Taip nama kamu..."
                  className="mt-1.5 w-full rounded-xl border-2 border-[#29466B]/20 bg-white px-3.5 py-2 text-base font-semibold text-[#29466B] placeholder:text-[#29466B]/45 focus:border-[#29466B] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="ws-kelas-murid"
                  className="block font-display text-sm font-extrabold text-[#29466B]"
                >
                  Kelas
                </label>
                <input
                  id="ws-kelas-murid"
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: 2 Bestari"
                  className="mt-1.5 w-full rounded-xl border-2 border-[#29466B]/20 bg-white px-3.5 py-2 text-base font-semibold text-[#29466B] placeholder:text-[#29466B]/45 focus:border-[#29466B] focus:outline-none"
                />
              </div>
            </div>

            {/* Jadual Lembaran Kerja 5 Baris */}
            <div className="overflow-x-auto rounded-2xl border-2 border-[#29466B]/20">
              <table className="w-full min-w-[540px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#FFD966]/65 border-b-2 border-[#29466B]/20">
                    <th className="w-16 px-4 py-3.5 font-display text-sm sm:text-base font-black text-[#29466B]">
                      Bil.
                    </th>
                    <th className="w-64 px-4 py-3.5 font-display text-sm sm:text-base font-black text-[#29466B]">
                      Jenis Kata Adjektif
                    </th>
                    <th className="px-4 py-3.5 font-display text-sm sm:text-base font-black text-[#29466B]">
                      Jawapan Murid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#29466B]/10 bg-white">
                  {WORKSHEET_FIELDS.map((field) => (
                    <tr key={field.id} className="hover:bg-[#FFF8E8]/60">
                      <td className="px-4 py-3.5 font-display text-base font-black text-[#29466B] tabular-nums">
                        {field.number}.
                      </td>
                      <td className="px-4 py-3.5 font-display text-base font-extrabold text-[#29466B]">
                        {field.label}
                      </td>
                      <td className="px-4 py-3">
                        <label htmlFor={`ws-field-${field.id}`} className="sr-only">
                          Jawapan untuk {field.label}
                        </label>
                        <input
                          id={`ws-field-${field.id}`}
                          type="text"
                          value={answers[field.id]}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border-2 border-[#29466B]/20 bg-[#FFF8E8] px-4 py-2.5 text-base font-bold text-[#29466B] placeholder:text-[#29466B]/45 focus:border-[#29466B] focus:bg-white focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {formError && (
              <p role="alert" className="mt-4 text-sm sm:text-base font-bold text-[#9E1C1C]">
                {formError}
              </p>
            )}

            {isSubmitted && (
              <div
                role="status"
                className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-[#A8DDB5] bg-[#ECF9F0] p-4"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#2E7D4F]" />
                <p className="font-display text-base sm:text-lg font-black text-[#29466B]">
                  Syabas! Kamu telah melengkapkan lembaran kerja!
                </p>
              </div>
            )}

            <div className="no-print mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer disabled:opacity-70 whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Menghantar...' : 'Hantar Jawapan'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearWorksheet}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FF8585]/80 px-5 py-3 font-display text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <Eraser className="h-4 w-4" />
                <span>Padam Jawapan</span>
              </button>

              <button
                type="button"
                onClick={() => setShowTeacherPanel((prev) => !prev)}
                className="ml-auto cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap hover:bg-[#EAF6FD]"
              >
                <ClipboardList className="h-4 w-4" />
                <span>Ruangan Semakan Guru ({submissions.length})</span>
              </button>
            </div>
          </form>

          {/* Panel Semakan & Panduan Guru (Hanya dibuka atas tindakan guru) */}
          {showTeacherPanel && (
            <div className="no-print mt-8 rounded-3xl border-2 border-[#29466B]/18 bg-[#FFF8E8] p-6">
              {!teacherConfirmed ? (
                <div className="flex flex-col items-center gap-3 text-center py-3">
                  <GraduationCap className="h-10 w-10 text-[#29466B]" />
                  <h3 className="font-display text-lg font-black text-[#29466B]">
                    Ruangan Khusus untuk Guru
                  </h3>
                  <p className="max-w-lg text-sm font-semibold text-[#29466B]/85">
                    Bahagian ini memaparkan panduan jawapan serta senarai lembaran kerja murid untuk
                    tujuan semakan guru.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTeacherConfirmed(true)}
                    className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-5 py-2 font-display text-sm font-black text-[#29466B] cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Saya Guru – Papar Semakan & Panduan</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-black text-[#29466B]">
                        Panduan Jawapan & Semakan Guru
                      </h3>
                      <p className="text-sm font-semibold text-[#29466B]/75">
                        Rujukan jawapan daripada petikan dan ayat sokongan serta hasil kerja murid.
                      </p>
                    </div>
                    {submissions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => void handleClearAllSubmissions()}
                        className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border-2 border-[#FF8585] bg-[#FFECEC] px-3 py-1.5 font-display text-xs font-extrabold text-[#29466B] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Kosongkan Rekod</span>
                      </button>
                    )}
                  </div>

                  {/* Panduan Jawapan Guru */}
                  <div className="rounded-2xl bg-white border-2 border-[#29466B]/12 p-4">
                    <p className="font-display text-sm font-black text-[#29466B] mb-2">
                      Panduan Jawapan Guru:
                    </p>
                    <ol className="grid grid-cols-1 gap-2 sm:grid-cols-5 text-sm font-bold text-[#29466B]">
                      {WORKSHEET_FIELDS.map((f) => (
                        <li key={f.id} className="rounded-xl bg-[#ECF9F0] px-3 py-2">
                          {f.number}. {f.label.replace('Kata Adjektif ', '')} –{' '}
                          <span className="font-black">{f.teacherGuideAnswer}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Senarai Jawapan Murid */}
                  {submissions.length === 0 ? (
                    <p className="text-sm font-bold text-[#29466B]/75">
                      Belum ada lembaran kerja dihantar oleh murid setakat ini.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {submissions.map((ws) => (
                        <div
                          key={ws.id}
                          className={`rounded-2xl border-2 p-4 ${
                            ws.reviewed
                              ? 'border-[#A8DDB5] bg-[#ECF9F0]'
                              : 'border-[#29466B]/14 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-[#29466B]/75">
                            <span>
                              {ws.studentName} · {ws.studentClass}
                            </span>
                            <span>{ws.reviewed ? 'Sudah Disemak' : 'Menunggu Semakan'}</span>
                          </div>

                          <ul className="mt-3 space-y-1.5 text-sm font-semibold text-[#29466B]">
                            {WORKSHEET_FIELDS.map((f) => {
                              const pupilAns = ws.answers[f.id] || '';
                              const isMatch = f.acceptedAnswers.includes(pupilAns.toLowerCase());
                              return (
                                <li key={f.id} className="flex items-center justify-between gap-2">
                                  <span>
                                    {f.number}. {f.label.replace('Kata Adjektif ', '')}:{' '}
                                    <strong>{pupilAns}</strong>
                                  </span>
                                  <span className="text-xs font-extrabold">
                                    {isMatch ? 'Tepat' : 'Perlu Bimbingan'}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>

                          <button
                            type="button"
                            onClick={() => void handleToggleReviewed(ws)}
                            className={`mt-4 inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3 py-1.5 font-display text-xs font-black cursor-pointer border-2 border-[#29466B] ${
                              ws.reviewed ? 'bg-[#A8DDB5] text-[#29466B]' : 'bg-[#FFD966] text-[#29466B]'
                            }`}
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>{ws.reviewed ? 'Disemak' : 'Tandakan Disemak'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5. Bahagian Bimbingan Guru */}
      <section className="no-print mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-[#FFF6DA] p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]">
                <HelpCircle className="h-6 w-6 text-[#29466B]" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-[#29466B]">Bimbingan Guru</h2>
                <p className="text-sm sm:text-base font-semibold text-[#29466B]/90">
                  Jika kamu menghadapi kesukaran, minta bantuan guru untuk mengenal pasti kata
                  adjektif dalam petikan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {TEACHER_GUIDANCE_CLUES.map((item) => (
              <div
                key={item.type}
                className={`rounded-2xl ${item.bg} border-2 border-[#29466B]/14 p-4`}
              >
                <p className="font-display text-base font-black text-[#29466B]">{item.type}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-[#29466B]/85">
                  {item.clue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bahagian Penutup */}
      <section className="no-print mx-auto w-full max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-gradient-to-r from-[#A8DDB5]/55 via-[#ECF9F0] to-[#83C9F4]/50 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <HappyStudentCelebrationSvg />
              <div className="max-w-xl">
                <div className="mb-2 inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/75">
                  <Sparkles className="h-4 w-4" />
                  <span>Pencapaian Fasa 3</span>
                </div>
                <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                  Tahniah! Kamu Sudah Berjaya Membaca dan Mengenal Pasti Kata Adjektif!
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate(PageRoute.SET_INDUKSI)}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Set Induksi</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate(PageRoute.MISI_PEMBELAJARAN)}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Teruskan ke Misi Pembelajaran</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

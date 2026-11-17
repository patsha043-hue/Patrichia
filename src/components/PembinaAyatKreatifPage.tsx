import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  Lightbulb,
  Maximize2,
  Minimize2,
  PenTool,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  CREATIVE_WRITING_STEPS,
  PADLET_EMBED_URL,
  PADLET_URL,
  PEMBINA_AYAT_INTRO_IMAGE,
  PEMBINA_AYAT_SUCCESS_IMAGE,
  SENTENCE_WRITING_GUIDES,
} from '../data/pembinaAyatContent';
import { PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';

interface PembinaAyatKreatifPageProps {
  onNavigate: (route: PageRoute) => void;
}

function StepIcon({ name }: { name: 'external-link' | 'eye' | 'pen-tool' }) {
  if (name === 'external-link') return <ExternalLink className="h-6 w-6 text-[#29466B]" />;
  if (name === 'eye') return <Eye className="h-6 w-6 text-[#29466B]" />;
  return <PenTool className="h-6 w-6 text-[#29466B]" />;
}

export function PembinaAyatKreatifPage({ onNavigate }: PembinaAyatKreatifPageProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToPadlet = () => {
    const el = document.getElementById('aktiviti-padlet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 5 · Kumpulan Sasaran: Murid Baik
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Misi 3: Pembina Ayat Kreatif!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Tahniah, murid hebat! Kini tiba masanya untuk menunjukkan kreativiti kamu. Perhatikan
              gambar keselamatan jalan raya dan kata adjektif yang diberikan. Kemudian, bina ayat
              gramatis menggunakan kata adjektif tersebut berdasarkan gambar secara kendiri.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={scrollToPadlet}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Jom Bina Ayat</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={PEMBINA_AYAT_INTRO_IMAGE}
                alt="Ilustrasi kartun murid Tahun 2 memegang pensel dan buku nota di kawasan jalan raya"
                fallbackTitle="Pembina Ayat Kreatif"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bahagian Langkah Aktiviti */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Panduan Aktiviti Murid Baik
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Baca dan Fahami Langkah Aktiviti!
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CREATIVE_WRITING_STEPS.map((step) => (
            <article
              key={step.stepNumber}
              className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${step.cardBg} p-6`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.iconBg} border-2 border-[#29466B]/20`}
                  >
                    <StepIcon name={step.iconName} />
                  </div>
                  <span className="font-display text-2xl font-black text-[#29466B]/55 tabular-nums">
                    0{step.stepNumber}
                  </span>
                </div>

                <h3 className="font-display text-xl font-black text-[#29466B]">{step.title}</h3>
                <p className="mt-2.5 text-base font-semibold leading-relaxed text-[#29466B]/90">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Bahagian Aktiviti Padlet & 4. Bahagian Panduan Membina Ayat */}
      <section id="aktiviti-padlet" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti Interaktif Padlet · Murid Baik
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Jom Bina Ayat Gramatis!
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90">
                Klik pautan Padlet di bawah. Perhatikan gambar dan kata adjektif yang disediakan.
                Kemudian, bina ayat yang lengkap dan gramatis berdasarkan gambar tersebut. Pastikan
                ayat kamu menggunakan kata adjektif yang diberikan dengan betul.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIframeKey((k) => k + 1)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFF8E8] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="h-4 w-4" />
                <span>Muat Semula</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>Paparan Biasa</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Luaskan Paparan</span>
                  </>
                )}
              </button>

              <a
                href={PADLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <span>BUKA PADLET SEKARANG</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] ${
              isExpanded ? 'h-[82vh] min-h-[680px]' : 'h-[620px] sm:h-[700px] lg:h-[760px]'
            }`}
          >
            <iframe
              key={iframeKey}
              src={PADLET_EMBED_URL}
              title="Papan Padlet Bina Ayat Gramatis"
              allow="camera; microphone; geolocation; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Jika papan Padlet tidak dipaparkan atau anda ingin paparan skrin penuh yang lebih
              selesa untuk menaip ayat, tekan butang di sebelah untuk membukanya dalam tab baharu.
            </p>
            <a
              href={PADLET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <span>BUKA PADLET SEKARANG</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bahagian Panduan Membina Ayat */}
        <div className="cartoon-card mt-8 rounded-3xl bg-[#FFF6DA] p-6 sm:p-8">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]/20">
                  <Lightbulb className="h-5 w-5 text-[#29466B]" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#29466B]">
                  Ingat! Bina Ayat dengan Betul
                </h3>
              </div>

              <ol className="space-y-2.5">
                {SENTENCE_WRITING_GUIDES.map((guide, index) => (
                  <li
                    key={guide}
                    className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-2.5 border border-[#29466B]/10"
                  >
                    <span className="font-display text-sm font-black text-[#29466B] tabular-nums mt-0.5">
                      {index + 1}.
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#29466B]">{guide}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 flex h-full items-center">
              <div className="w-full rounded-3xl bg-white border-2 border-[#29466B]/15 p-5 sm:p-6">
                <div className="mb-2 flex items-center gap-2 text-[#29466B]/75">
                  <CheckCircle2 className="h-4 w-4" />
                  <p className="font-display text-xs font-extrabold">
                    Contoh Ayat Panduan Sahaja
                  </p>
                </div>
                <p className="font-display text-lg sm:text-xl font-black leading-snug text-[#29466B]">
                  “Pejalan kaki perlu berhati-hati ketika melintas jalan raya.”
                </p>
                <p className="mt-3 text-xs font-bold text-[#29466B]/70">
                  Nota: Ini ialah contoh binaan ayat sebagai panduan sahaja. Bina ayat kamu sendiri
                  mengikut gambar dan kata adjektif dalam Padlet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bahagian Galakan */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card overflow-hidden rounded-3xl bg-gradient-to-r from-[#A8DDB5]/55 via-[#ECF9F0] to-[#83C9F4]/45 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                <CartoonImage
                  src={PEMBINA_AYAT_SUCCESS_IMAGE}
                  alt="Ilustrasi kartun murid tersenyum bangga memegang buku nota yang telah lengkap dengan bintang"
                  fallbackTitle="Syabas, Pembina Ayat Kreatif!"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/75">
                <Sparkles className="h-4 w-4" />
                <span>Pencapaian Pembina Ayat Kreatif</span>
              </div>

              <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
                Syabas! Kamu Mampu Membina Ayat Sendiri!
              </h2>

              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Teruskan usaha kamu untuk menghasilkan ayat yang gramatis, kreatif dan bermakna.
                Ingat, penggunaan kata adjektif yang betul dapat menjadikan ayat lebih jelas dan
                menarik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Butang Navigasi */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.MISI_PEMBELAJARAN)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Misi Pembelajaran</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.PENUTUP)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <span>Teruskan ke Penutup</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckSquare,
  ExternalLink,
  Gamepad2,
  Maximize2,
  Minimize2,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  EJEN_GAME_URL,
  MISI_INSTRUCTION_STEPS,
  MISI_INTRO_IMAGE,
  MISI_SUCCESS_IMAGE,
} from '../data/misiPembelajaranContent';
import { PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';

interface MisiPembelajaranPageProps {
  onNavigate: (route: PageRoute) => void;
}

function StepIcon({ name }: { name: 'gamepad' | 'book-open' | 'check-square' }) {
  if (name === 'gamepad') return <Gamepad2 className="h-6 w-6 text-[#29466B]" />;
  if (name === 'book-open') return <BookOpen className="h-6 w-6 text-[#29466B]" />;
  return <CheckSquare className="h-6 w-6 text-[#29466B]" />;
}

export function MisiPembelajaranPage({ onNavigate }: MisiPembelajaranPageProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToGame = () => {
    const el = document.getElementById('permainan-ejen');
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
              Fasa 4 · Kumpulan Sasaran: Murid Sederhana
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Misi 2: Ejen Kata Adjektif!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Selamat datang, Ejen Kata Adjektif! Dalam misi kali ini, kamu perlu melengkapkan ayat
              dengan memilih kata adjektif yang paling sesuai. Baca setiap ayat dengan teliti dan
              pilih jawapan yang betul. Bersedia untuk memulakan misi?
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={scrollToGame}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Mulakan Misi</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={MISI_INTRO_IMAGE}
                alt="Ilustrasi kartun ejen muda memegang papan klip dan memerhatikan perkataan di kawasan keselamatan jalan raya"
                fallbackTitle="Ejen Kata Adjektif"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bahagian Arahan Aktiviti */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Panduan Aktiviti Murid Sederhana
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Baca Arahan Sebelum Bermain!
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MISI_INSTRUCTION_STEPS.map((step) => (
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

      {/* 3. Bahagian Permainan Digital */}
      <section id="permainan-ejen" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti Interaktif · Murid Sederhana
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Jom Mulakan Misi Ejen Kata Adjektif!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
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
                href={EJEN_GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <span>BUKA PERMAINAN DIGITAL</span>
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
              src={EJEN_GAME_URL}
              title="Permainan Digital Ejen Kata Adjektif"
              allow="fullscreen; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Jika paparan permainan di atas tidak dimuatkan oleh pelayar anda, tekan butang besar
              di sebelah untuk membuka permainan asal dalam tab baharu.
            </p>
            <a
              href={EJEN_GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <span>BUKA PERMAINAN DIGITAL</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Bahagian Galakan */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card overflow-hidden rounded-3xl bg-gradient-to-r from-[#A8DDB5]/50 via-[#ECF9F0] to-[#FFF6DA] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                <CartoonImage
                  src={MISI_SUCCESS_IMAGE}
                  alt="Ilustrasi kartun murid tersenyum bangga selepas berjaya menyelesaikan misi kata adjektif"
                  fallbackTitle="Misi Selesai!"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/75">
                <Sparkles className="h-4 w-4" />
                <span>Pencapaian Ejen Kata Adjektif</span>
              </div>

              <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
                Hebat, Ejen Kata Adjektif!
              </h2>

              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Kamu telah menyelesaikan satu misi pembelajaran. Teruskan berusaha untuk menggunakan
                kata adjektif dengan betul dalam ayat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Butang Navigasi */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.KENALI_KATA_ADJEKTIF)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Kenali Kata Adjektif</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.KUIZ_PENTAKSIRAN)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <span>Teruskan ke Kuiz dan Pentaksiran</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

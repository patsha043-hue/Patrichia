export const PEMBINA_AYAT_INTRO_IMAGE = '/src/assets/images/pembina_ayat_intro_1794925789985.jpg';
export const PEMBINA_AYAT_SUCCESS_IMAGE = '/src/assets/images/pembina_ayat_berjaya_1794925788740.jpg';

export const PADLET_URL = 'https://padlet.com/gipgp24311962/bina-ayat-s024ekm3pxmgtgi32ph3';
export const PADLET_EMBED_URL = 'https://padlet.com/embed/s024ekm3pxmgtgi32ph3';

export interface CreativeStepItem {
  stepNumber: number;
  title: string;
  description: string;
  cardBg: string;
  iconBg: string;
  iconName: 'external-link' | 'eye' | 'pen-tool';
}

export const CREATIVE_WRITING_STEPS: CreativeStepItem[] = [
  {
    stepNumber: 1,
    title: 'Langkah 1: Buka Pautan Padlet',
    description: 'Murid membuka pautan Padlet yang telah disediakan oleh guru.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'external-link',
  },
  {
    stepNumber: 2,
    title: 'Langkah 2: Perhatikan Gambar dan Kata Adjektif',
    description:
      'Murid melihat gambar berkaitan keselamatan jalan raya serta satu kata adjektif yang telah disediakan.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'eye',
  },
  {
    stepNumber: 3,
    title: 'Langkah 3: Bina Ayat Gramatis',
    description:
      'Murid membina ayat gramatis menggunakan kata adjektif berdasarkan gambar yang diberikan secara kendiri.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'pen-tool',
  },
];

export const SENTENCE_WRITING_GUIDES = [
  'Baca kata adjektif yang diberikan.',
  'Perhatikan gambar dengan teliti.',
  'Bina ayat yang lengkap dan mempunyai maksud.',
  'Gunakan kata adjektif yang diberikan dalam ayat.',
  'Semak semula ayat sebelum menghantarnya.',
];

export const MISI_INTRO_IMAGE = '/src/assets/images/misi_ejen_intro_1794924617043.jpg';
export const MISI_SUCCESS_IMAGE = '/src/assets/images/misi_ejen_berjaya_1794924616764.jpg';
export const EJEN_GAME_URL = 'https://misi-ejen-kata-adjektif-2.ai.studio';

export interface MisiInstructionStep {
  stepNumber: number;
  title: string;
  description: string;
  cardBg: string;
  iconBg: string;
  iconName: 'gamepad' | 'book-open' | 'check-square';
}

export const MISI_INSTRUCTION_STEPS: MisiInstructionStep[] = [
  {
    stepNumber: 1,
    title: 'Langkah 1: Buka Permainan Digital',
    description:
      'Murid membuka permainan digital Ejen Kata Adjektif melalui pautan yang disediakan.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'gamepad',
  },
  {
    stepNumber: 2,
    title: 'Langkah 2: Baca Arahan Permainan',
    description:
      'Murid membaca dan memahami arahan permainan terlebih dahulu sebelum memulakan aktiviti.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'book-open',
  },
  {
    stepNumber: 3,
    title: 'Langkah 3: Lengkapkan Ayat',
    description:
      'Murid melengkapkan ayat pada ruangan kosong dengan memilih jawapan yang paling sesuai daripada pilihan jawapan yang disediakan.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'check-square',
  },
];

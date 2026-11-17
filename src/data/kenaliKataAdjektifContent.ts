import { AdjectiveTypeDetail, WorksheetFieldConfig } from '../types';

export const PASSAGE_IMAGE_PATH = '/assets/aistudio/gambar_3e48cd3d.png';

export const ADJECTIVE_TYPES_DETAILED: AdjectiveTypeDetail[] = [
  {
    id: 'sifat',
    number: 1,
    title: 'Kata Adjektif Sifat',
    shortDesc: 'Menerangkan sifat atau keadaan.',
    examples: ['cermat', 'selamat', 'berani'],
    detailedDesc:
      'Kata adjektif sifat menerangkan perangai, kelakuan, atau keadaan sesuatu benda, orang, atau suasana di jalan raya.',
    roadSafetySentence: 'Aina dan abangnya berjalan dengan cermat di tepi jalan raya.',
    highlightedWord: 'cermat',
    moreExamples: ['patuh', 'sibuk', 'gembira', 'baik'],
    cardBg: 'bg-[#ECF9F0]',
    accentBg: 'bg-[#A8DDB5]',
  },
  {
    id: 'warna',
    number: 2,
    title: 'Kata Adjektif Warna',
    shortDesc: 'Menerangkan warna sesuatu benda.',
    examples: ['merah', 'biru', 'hijau'],
    detailedDesc:
      'Kata adjektif warna digunakan untuk menyatakan warna lampu isyarat, kenderaan, papan tanda, atau pakaian murid.',
    roadSafetySentence: 'Sebuah kereta merah berhenti apabila lampu isyarat menyala.',
    highlightedWord: 'merah',
    moreExamples: ['kuning', 'hitam', 'putih', 'kelabu'],
    cardBg: 'bg-[#FFECEC]',
    accentBg: 'bg-[#FF8585]',
  },
  {
    id: 'ukuran',
    number: 3,
    title: 'Kata Adjektif Ukuran',
    shortDesc: 'Menerangkan saiz atau ukuran.',
    examples: ['besar', 'kecil', 'panjang'],
    detailedDesc:
      'Kata adjektif ukuran menerangkan panjang, lebar, tinggi, atau saiz sesuatu objek seperti lintasan belang dan kenderaan.',
    roadSafetySentence: 'Murid-murid melintas di lintasan belang yang panjang itu.',
    highlightedWord: 'panjang',
    moreExamples: ['pendek', 'lebar', 'tinggi', 'sempit'],
    cardBg: 'bg-[#FFF6DA]',
    accentBg: 'bg-[#FFD966]',
  },
  {
    id: 'bentuk',
    number: 4,
    title: 'Kata Adjektif Bentuk',
    shortDesc: 'Menerangkan rupa atau bentuk.',
    examples: ['bulat', 'bujur', 'lurus'],
    detailedDesc:
      'Kata adjektif bentuk menerangkan rupa permukaan atau bentuk papan tanda jalan raya dan laluan pejalan kaki.',
    roadSafetySentence: 'Di tepi jalan terdapat papan tanda berbentuk bulat.',
    highlightedWord: 'bulat',
    moreExamples: ['segi tiga', 'segi empat', 'bengkok', 'rata'],
    cardBg: 'bg-[#EAF6FD]',
    accentBg: 'bg-[#83C9F4]',
  },
  {
    id: 'waktu',
    number: 5,
    title: 'Kata Adjektif Waktu',
    shortDesc: 'Menerangkan masa atau waktu.',
    examples: ['awal', 'lewat', 'segera'],
    detailedDesc:
      'Kata adjektif waktu menerangkan tempoh masa atau ketika berlakunya sesuatu peristiwa, seperti waktu tiba di sekolah.',
    roadSafetySentence: 'Aina tiba awal di sekolah pada keesokan harinya.',
    highlightedWord: 'awal',
    moreExamples: ['pagi', 'lama', 'baharu', 'cepat'],
    cardBg: 'bg-[#ECF9F0]',
    accentBg: 'bg-[#A8DDB5]',
  },
];

export const WORKSHEET_FIELDS: WorksheetFieldConfig[] = [
  {
    id: 'sifat',
    number: 1,
    label: 'Kata Adjektif Sifat',
    placeholder: 'Taip kata adjektif sifat daripada petikan...',
    teacherGuideAnswer: 'cermat',
    acceptedAnswers: ['cermat', 'sibuk', 'selamat', 'gembira', 'penting', 'patuh'],
  },
  {
    id: 'warna',
    number: 2,
    label: 'Kata Adjektif Warna',
    placeholder: 'Taip kata adjektif warna daripada petikan...',
    teacherGuideAnswer: 'merah',
    acceptedAnswers: ['merah', 'biru', 'hitam', 'hijau'],
  },
  {
    id: 'ukuran',
    number: 3,
    label: 'Kata Adjektif Ukuran',
    placeholder: 'Taip kata adjektif ukuran daripada petikan...',
    teacherGuideAnswer: 'panjang',
    acceptedAnswers: ['panjang'],
  },
  {
    id: 'bentuk',
    number: 4,
    label: 'Kata Adjektif Bentuk',
    placeholder: 'Taip kata adjektif bentuk daripada petikan...',
    teacherGuideAnswer: 'bulat',
    acceptedAnswers: ['bulat'],
  },
  {
    id: 'waktu',
    number: 5,
    label: 'Kata Adjektif Waktu',
    placeholder: 'Taip kata adjektif waktu daripada ayat sokongan...',
    teacherGuideAnswer: 'awal',
    acceptedAnswers: ['awal', 'pagi'],
  },
];

export const TEACHER_GUIDANCE_CLUES = [
  {
    type: 'Sifat',
    clue: 'Bagaimanakah keadaan seseorang?',
    bg: 'bg-[#ECF9F0]',
  },
  {
    type: 'Warna',
    clue: 'Apakah warna sesuatu benda?',
    bg: 'bg-[#FFECEC]',
  },
  {
    type: 'Ukuran',
    clue: 'Bagaimanakah saiz sesuatu benda?',
    bg: 'bg-[#FFF6DA]',
  },
  {
    type: 'Bentuk',
    clue: 'Apakah rupa sesuatu benda?',
    bg: 'bg-[#EAF6FD]',
  },
  {
    type: 'Waktu',
    clue: 'Bilakah sesuatu perkara berlaku?',
    bg: 'bg-[#ECF9F0]',
  },
];

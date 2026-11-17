import { AssessmentChecklistRow } from '../types';

export const RUANG_GURU_HERO_IMAGE = '/src/assets/images/ruang_guru_classroom_1794928705070.jpg';

export const RUANG_GURU_QUICK_CARDS = [
  {
    id: 'maklumat-rph',
    title: 'Maklumat RPH',
    subtitle: 'Butiran kurikulum, SK & SP',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'clipboard' as const,
  },
  {
    id: 'objektif-pembelajaran',
    title: 'Objektif Pembelajaran',
    subtitle: 'Tiga hasil pembelajaran utama',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'target' as const,
  },
  {
    id: 'bahan-bantu-mengajar',
    title: 'Bahan Bantu Mengajar',
    subtitle: 'Video, permainan, Padlet & kuiz',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'monitor' as const,
  },
  {
    id: 'pentaksiran-pembelajaran',
    title: 'Pentaksiran Pembelajaran',
    subtitle: 'Instrumen & senarai semak murid',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
    iconName: 'check' as const,
  },
];

export const RPH_BASIC_INFO = [
  { label: 'Mata Pelajaran', value: 'Bahasa Melayu', bg: 'bg-[#EAF6FD]' },
  { label: 'Tahun', value: 'Tahun 2', bg: 'bg-[#FFF6DA]' },
  { label: 'Bilangan Murid', value: '25 orang', bg: 'bg-[#ECF9F0]' },
  { label: 'Tema', value: 'Keselamatan', bg: 'bg-[#FFECEC]' },
  { label: 'Tajuk', value: 'Keselamatan di Jalan Raya', bg: 'bg-[#EAF6FD]' },
  { label: 'Fokus Pembelajaran', value: 'Kata Adjektif', bg: 'bg-[#FFF6DA]' },
];

export const RPH_OBJECTIVES = [
  {
    number: 1,
    text: 'Mengenal pasti sekurang-kurangnya 4 daripada 5 jenis kata adjektif berdasarkan poster dan petikan bertema keselamatan di jalan raya dengan betul.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'search' as const,
  },
  {
    number: 2,
    text: 'Mengelaskan sekurang-kurangnya 8 daripada 10 kata adjektif mengikut jenis yang betul.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'layers' as const,
  },
  {
    number: 3,
    text: 'Membina sekurang-kurangnya 3 ayat gramatis menggunakan kata adjektif yang sesuai mengikut konteks melalui aktiviti pengukuhan.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'pen' as const,
  },
];

export const PDP_EXECUTION_STEPS = [
  {
    code: 'A',
    title: 'A. Set Induksi – Keselamatan di Jalan Raya',
    cardBg: 'bg-[#EAF6FD]',
    badgeBg: 'bg-[#83C9F4]',
    points: [
      'Murid menonton video lagu “Keselamatan Jalan Raya”.',
      'Murid menyanyikan lagu sambil melakukan pergerakan mudah seperti berhenti dan melihat ke kiri serta ke kanan.',
      'Guru mengaitkan aktiviti nyanyian dengan amalan keselamatan jalan raya.',
      'Guru memperkenalkan konsep kata adjektif dan lima jenisnya.',
    ],
  },
  {
    code: 'B',
    title: 'B. Langkah 1 – Mengenali Kata Adjektif (Murid Asas)',
    cardBg: 'bg-[#ECF9F0]',
    badgeBg: 'bg-[#A8DDB5]',
    points: [
      'Guru memaparkan petikan “Keselamatan di Jalan Raya” yang mengandungi kata adjektif.',
      'Murid membaca petikan dan mengenal pasti kata adjektif.',
      'Murid menyenaraikan kata adjektif pada lembaran kerja.',
      'Guru memberikan bimbingan sekiranya diperlukan.',
    ],
  },
  {
    code: 'C',
    title: 'C. Langkah 2 – Misi Ejen Kata Adjektif (Murid Sederhana)',
    cardBg: 'bg-[#FFF6DA]',
    badgeBg: 'bg-[#FFD966]',
    points: [
      'Murid membuka permainan digital yang disediakan.',
      'Murid membaca arahan permainan terlebih dahulu.',
      'Murid melengkapkan ayat pada ruangan kosong berdasarkan pilihan jawapan yang disediakan.',
      'Guru memberikan maklum balas terhadap jawapan murid.',
    ],
  },
  {
    code: 'D',
    title: 'D. Langkah 3 – Bina Ayat (Murid Baik)',
    cardBg: 'bg-[#FFECEC]',
    badgeBg: 'bg-[#FF8585]',
    points: [
      'Murid membuka pautan Padlet yang disediakan.',
      'Murid melihat gambar dan kata adjektif yang diberikan.',
      'Murid membina ayat gramatis berdasarkan gambar keselamatan jalan raya secara kendiri.',
      'Guru menyemak jawapan dan memberikan maklum balas.',
    ],
  },
  {
    code: 'E',
    title: 'E. Penutup – Kuiz Interaktif',
    cardBg: 'bg-[#EAF6FD]',
    badgeBg: 'bg-[#83C9F4]',
    points: [
      'Murid menjawab lima soalan kuiz berkaitan kata adjektif melalui Wayground.',
      'Guru membimbing murid membuat rumusan tentang lima jenis kata adjektif.',
      'Guru memberikan penghargaan dan pujian atas penglibatan murid.',
    ],
  },
];

export const TEACHING_RESOURCES = [
  {
    number: 1,
    title: 'Video Set Induksi – Keselamatan Jalan Raya',
    url: 'https://youtu.be/AJzYocbgSg8?si=dpOaaRXAiZ6Xv8RW',
    buttonLabel: 'Tonton Video',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
    iconName: 'video' as const,
  },
  {
    number: 2,
    title: 'Permainan Digital – Misi Ejen Kata Adjektif',
    url: 'https://misi-ejen-kata-adjektif-2.ai.studio',
    buttonLabel: 'Buka Permainan',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'gamepad' as const,
  },
  {
    number: 3,
    title: 'Aktiviti Padlet – Bina Ayat',
    url: 'https://padlet.com/gipgp24311962/bina-ayat-s024ekm3pxmgtgi32ph3',
    buttonLabel: 'Buka Padlet',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'layout' as const,
  },
  {
    number: 4,
    title: 'Kuiz Interaktif – Wayground',
    url: 'https://wayground.com/join?gc=18208563',
    buttonLabel: 'Buka Kuiz',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'trophy' as const,
  },
];

export const ASSESSMENT_METHODS = [
  {
    title: 'Pemerhatian',
    description: 'Guru memerhatikan penglibatan dan respons murid sepanjang aktiviti PdP.',
    cardBg: 'bg-[#EAF6FD]',
  },
  {
    title: 'Soal jawab',
    description: 'Guru mengemukakan soalan berkaitan jenis dan penggunaan kata adjektif.',
    cardBg: 'bg-[#ECF9F0]',
  },
  {
    title: 'Lembaran kerja',
    description: 'Guru menyemak keupayaan murid mengenal pasti dan menyenaraikan kata adjektif.',
    cardBg: 'bg-[#FFF6DA]',
  },
  {
    title: 'Permainan digital',
    description: 'Guru menilai keupayaan murid melengkapkan ayat menggunakan kata adjektif yang sesuai.',
    cardBg: 'bg-[#FFECEC]',
  },
  {
    title: 'Pembinaan ayat',
    description: 'Guru menilai kebolehan murid membina ayat gramatis menggunakan kata adjektif.',
    cardBg: 'bg-[#EAF6FD]',
  },
  {
    title: 'Kuiz interaktif',
    description: 'Guru menilai tahap kefahaman murid melalui lima soalan Wayground.',
    cardBg: 'bg-[#ECF9F0]',
  },
];

export const DEFAULT_ASSESSMENT_ROWS: AssessmentChecklistRow[] = [
  {
    id: 'm1',
    pupilNumber: 1,
    pupilName: 'Murid 1',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm2',
    pupilNumber: 2,
    pupilName: 'Murid 2',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm3',
    pupilNumber: 3,
    pupilName: 'Murid 3',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm4',
    pupilNumber: 4,
    pupilName: 'Murid 4',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm5',
    pupilNumber: 5,
    pupilName: 'Murid 5',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
];

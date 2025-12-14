import { Component, SafetyLevel } from '@/types/valora';

export const VALORA_COMPONENTS: Component[] = [
  // SAFE components
  {
    id: 'smartphone',
    name: 'Smartphone',
    label: 'smartphone',
    category: 'Perangkat Utama',
    safety: 'safe',
    safetyNote: 'Cek apakah baterai menggembung. Jika iya, jangan dibongkar.',
    recoverySteps: [
      'Matikan perangkat sepenuhnya',
      'Keluarkan SIM dan kartu memori',
      'Buka casing belakang dengan hati-hati',
      'Lepas baterai jika bisa dilepas',
      'Pisahkan komponen: layar, PCB, speaker'
    ],
    tools: ['Obeng kecil', 'Spudger plastik', 'Pinset'],
    dropoffRequired: false,
  },
  {
    id: 'laptop',
    name: 'Laptop',
    label: 'laptop',
    category: 'Perangkat Utama',
    safety: 'safe',
    safetyNote: 'Cabut charger dan matikan daya sebelum bongkar.',
    recoverySteps: [
      'Shutdown dan cabut semua kabel',
      'Lepas baterai terlebih dulu',
      'Buka panel bawah',
      'Lepas RAM, SSD/HDD',
      'Lepas keyboard dan touchpad jika perlu'
    ],
    tools: ['Obeng Phillips', 'Obeng Torx', 'Spudger'],
    dropoffRequired: false,
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    label: 'keyboard',
    category: 'Peripheral',
    safety: 'safe',
    safetyNote: 'Aman untuk bongkar ringan, simpan sekrup.',
    recoverySteps: [
      'Cabut kabel/dongle',
      'Buka sekrup di bagian bawah',
      'Pisahkan casing atas dan bawah',
      'Lepas PCB dan keycaps',
      'Bersihkan komponen'
    ],
    tools: ['Obeng kecil', 'Keycap puller'],
    dropoffRequired: false,
  },
  {
    id: 'mouse',
    name: 'Mouse',
    label: 'mouse',
    category: 'Peripheral',
    safety: 'safe',
    safetyNote: 'Komponen kecil, simpan rapi.',
    recoverySteps: [
      'Lepas baterai jika wireless',
      'Cari sekrup tersembunyi di bawah feet',
      'Buka casing',
      'Pisahkan scroll wheel, switch, PCB'
    ],
    tools: ['Obeng kecil', 'Pinset'],
    dropoffRequired: false,
  },
  {
    id: 'speaker',
    name: 'Speaker',
    label: 'speaker',
    category: 'Audio',
    safety: 'safe',
    safetyNote: 'Aman, hindari merobek cone.',
    recoverySteps: [
      'Cabut dari sumber listrik',
      'Buka casing speaker',
      'Lepas driver speaker dengan hati-hati',
      'Pisahkan amplifier jika ada'
    ],
    tools: ['Obeng', 'Tang'],
    dropoffRequired: false,
  },
  {
    id: 'remote_control',
    name: 'Remote Control',
    label: 'remote_control',
    category: 'Aksesori',
    safety: 'safe',
    safetyNote: 'Pisahkan baterai dulu.',
    recoverySteps: [
      'Keluarkan baterai',
      'Buka sekrup casing',
      'Pisahkan PCB dan rubber pad',
      'Bersihkan kontak'
    ],
    tools: ['Obeng kecil'],
    dropoffRequired: false,
  },
  {
    id: 'fan',
    name: 'Kipas/Fan',
    label: 'fan',
    category: 'Komponen Internal',
    safety: 'safe',
    safetyNote: 'Bersihkan debu kering, jangan cuci air langsung.',
    recoverySteps: [
      'Lepas dari casing',
      'Bersihkan bilah dengan kuas',
      'Cek kabel konektor',
      'Tes putaran jika perlu'
    ],
    tools: ['Kuas', 'Compressed air'],
    dropoffRequired: false,
  },
  {
    id: 'cable',
    name: 'Kabel',
    label: 'cable',
    category: 'Aksesori',
    safety: 'safe',
    safetyNote: 'Kumpulkan untuk disetor. Jangan dibakar.',
    recoverySteps: [
      'Sortir berdasarkan jenis (USB, HDMI, power)',
      'Gulung rapi',
      'Simpan terpisah untuk donasi/recycle'
    ],
    tools: ['Tidak perlu alat khusus'],
    dropoffRequired: false,
  },
  {
    id: 'monitor',
    name: 'Monitor/TV',
    label: 'monitor',
    category: 'Display',
    safety: 'safe',
    safetyNote: 'Cabut daya sebelum membongkar. Layar LCD aman, CRT butuh profesional.',
    recoverySteps: [
      'Cabut semua kabel daya',
      'Lepas stand atau mounting bracket',
      'Buka casing belakang dengan hati-hati',
      'Pisahkan power board dan panel LCD',
      'PERHATIAN: CRT lama berbahaya, serahkan ke ahli'
    ],
    tools: ['Obeng', 'Spudger'],
    dropoffRequired: false,
  },
  {
    id: 'microwave',
    name: 'Microwave',
    label: 'microwave',
    category: 'Perangkat Utama',
    safety: 'safe',
    safetyNote: 'Hati-hati dengan kapasitor tegangan tinggi.',
    recoverySteps: [
      'Cabut dari listrik',
      'Buka casing dengan obeng',
      'Lepas turntable dan komponen mekanis',
      'Pisahkan control board',
      'JANGAN sentuh magnetron atau kapasitor'
    ],
    tools: ['Obeng', 'Sarung tangan'],
    dropoffRequired: false,
  },
  {
    id: 'small_appliance',
    name: 'Alat Elektronik Kecil',
    label: 'small_appliance',
    category: 'Perangkat Utama',
    safety: 'safe',
    safetyNote: 'Aman untuk dibongkar setelah dicabut dari listrik.',
    recoverySteps: [
      'Cabut dari sumber listrik',
      'Buka casing dengan obeng',
      'Lepas motor atau heating element',
      'Pisahkan kabel dan switch',
      'Simpan komponen untuk reuse'
    ],
    tools: ['Obeng', 'Tang'],
    dropoffRequired: false,
  },

  // CAUTION components
  {
    id: 'screen',
    name: 'Layar/Screen',
    label: 'screen',
    category: 'Display',
    safety: 'caution',
    safetyNote: 'Panel rapuh. Jangan ditekan.',
    recoverySteps: [
      'Letakkan di permukaan datar empuk',
      'Lepas bezel dengan spudger plastik',
      'Jangan tekan bagian tengah panel',
      'Simpan dalam posisi tegak'
    ],
    tools: ['Spudger plastik', 'Suction cup'],
    dropoffRequired: false,
  },
  {
    id: 'pcb',
    name: 'PCB/Motherboard',
    label: 'pcb',
    category: 'Komponen Internal',
    safety: 'caution',
    safetyNote: 'Simpan kering. Jangan coba ekstraksi kimia.',
    recoverySteps: [
      'Lepas semua konektor dengan hati-hati',
      'Buka sekrup mounting',
      'Angkat PCB tanpa membengkokkan',
      'Simpan di kantong anti-statik'
    ],
    tools: ['Obeng', 'Anti-static wrist strap'],
    dropoffRequired: false,
  },
  {
    id: 'ram',
    name: 'RAM',
    label: 'ram',
    category: 'Komponen Internal',
    safety: 'caution',
    safetyNote: 'Hindari sentuh pin. Simpan anti statik.',
    recoverySteps: [
      'Buka pengunci di kedua sisi slot',
      'Tarik RAM lurus ke atas',
      'Pegang di bagian tepi saja',
      'Masukkan ke kantong anti-statik'
    ],
    tools: ['Anti-static wrist strap'],
    dropoffRequired: false,
  },
  {
    id: 'hard_drive',
    name: 'Hard Drive',
    label: 'hard_drive',
    category: 'Storage',
    safety: 'caution',
    safetyNote: 'Hati-hati magnet kuat. Jauhkan dari kartu.',
    recoverySteps: [
      'Lepas kabel data dan power',
      'Buka sekrup mounting',
      'Jangan guncang atau jatuhkan',
      'Simpan terpisah dari kartu magnetik'
    ],
    tools: ['Obeng', 'Anti-static bag'],
    dropoffRequired: false,
  },
  {
    id: 'printer',
    name: 'Printer',
    label: 'printer',
    category: 'Perangkat Utama',
    safety: 'caution',
    safetyNote: 'Komponen motor/rail bisa direuse. Hati-hati gear.',
    recoverySteps: [
      'Cabut power dan kabel',
      'Keluarkan cartridge/toner',
      'Buka casing',
      'Lepas motor stepper dan rail',
      'Simpan gear dan belt'
    ],
    tools: ['Obeng', 'Tang', 'Sarung tangan'],
    dropoffRequired: false,
  },
  {
    id: 'router',
    name: 'Router',
    label: 'router',
    category: 'Jaringan',
    safety: 'caution',
    safetyNote: 'Komponen kecil mudah hilang. Simpan sekrup rapi.',
    recoverySteps: [
      'Cabut semua kabel',
      'Lepas antena jika bisa',
      'Buka casing',
      'Identifikasi chip dan heatsink'
    ],
    tools: ['Obeng', 'Pinset'],
    dropoffRequired: false,
  },
  {
    id: 'heat_sink',
    name: 'Heat Sink',
    label: 'heat_sink',
    category: 'Komponen Internal',
    safety: 'caution',
    safetyNote: 'Bersihkan thermal paste, jangan gores permukaan kontak.',
    recoverySteps: [
      'Lepas dari mounting',
      'Bersihkan thermal paste lama dengan isopropyl',
      'Jangan gores permukaan kontak',
      'Simpan dengan pelindung'
    ],
    tools: ['Isopropyl alcohol', 'Kain microfiber'],
    dropoffRequired: false,
  },
  {
    id: 'motor',
    name: 'Motor',
    label: 'motor',
    category: 'Komponen Internal',
    safety: 'caution',
    safetyNote: 'Lepas kabel rapi, jangan potong sembarang.',
    recoverySteps: [
      'Identifikasi jenis motor (DC/stepper)',
      'Lepas konektor, jangan potong kabel',
      'Tes dengan multimeter jika perlu',
      'Simpan dengan label'
    ],
    tools: ['Obeng', 'Multimeter'],
    dropoffRequired: false,
  },
  {
    id: 'camera_module',
    name: 'Modul Kamera',
    label: 'camera_module',
    category: 'Komponen Internal',
    safety: 'caution',
    safetyNote: 'Hindari sentuh lensa.',
    recoverySteps: [
      'Lepas konektor ribbon cable',
      'Jangan sentuh lensa',
      'Simpan di tempat bebas debu',
      'Lindungi lensa dengan cover'
    ],
    tools: ['Pinset', 'Spudger'],
    dropoffRequired: false,
  },

  // RESTRICTED components
  {
    id: 'battery',
    name: 'Baterai',
    label: 'battery',
    category: 'Daya',
    safety: 'restricted',
    safetyNote: 'Restricted. Jangan tusuk/tekuk, drop-off resmi.',
    recoverySteps: [
      'JANGAN bongkar sendiri',
      'Cek tanda-tanda kerusakan (menggembung, bocor)',
      'Bawa ke drop-off center resmi',
      'Simpan terpisah dari benda logam'
    ],
    tools: ['Tidak ada - serahkan ke ahli'],
    dropoffRequired: true,
  },
  {
    id: 'charger',
    name: 'Charger',
    label: 'charger',
    category: 'Daya',
    safety: 'restricted',
    safetyNote: 'Risiko listrik. Jangan bongkar sendiri, drop-off resmi.',
    recoverySteps: [
      'JANGAN buka casing charger',
      'Cek kondisi kabel (tidak terkelupas)',
      'Bawa ke drop-off center untuk recycle'
    ],
    tools: ['Tidak ada - serahkan ke ahli'],
    dropoffRequired: true,
  },
  {
    id: 'power_supply',
    name: 'Power Supply',
    label: 'power_supply',
    category: 'Daya',
    safety: 'restricted',
    safetyNote: 'Restricted. Kapasitor berisiko, serahkan teknisi.',
    recoverySteps: [
      'JANGAN buka PSU',
      'Kapasitor bisa menyimpan listrik berbahaya',
      'Bawa ke teknisi atau drop-off center'
    ],
    tools: ['Tidak ada - serahkan ke ahli'],
    dropoffRequired: true,
  },
];

export const SAFETY_NOTES: Record<string, string> = {
  smartphone: 'Cek apakah baterai menggembung. Jika iya, jangan dibongkar.',
  laptop: 'Cabut charger dan matikan daya sebelum bongkar.',
  charger: 'Risiko listrik. Jangan bongkar sendiri, drop-off resmi.',
  battery: 'Restricted. Jangan tusuk/tekuk, drop-off resmi.',
  pcb: 'Simpan kering. Jangan coba ekstraksi kimia.',
  cable: 'Kumpulkan untuk disetor. Jangan dibakar.',
  printer: 'Komponen motor/rail bisa direuse. Hati-hati gear.',
  router: 'Komponen kecil mudah hilang. Simpan sekrup rapi.',
  hard_drive: 'Hati-hati magnet kuat. Jauhkan dari kartu.',
  ram: 'Hindari sentuh pin. Simpan anti statik.',
  screen: 'Panel rapuh. Jangan ditekan.',
  keyboard: 'Aman untuk bongkar ringan, simpan sekrup.',
  mouse: 'Komponen kecil, simpan rapi.',
  power_supply: 'Restricted. Kapasitor berisiko, serahkan teknisi.',
  fan: 'Bersihkan debu kering, jangan cuci air langsung.',
  speaker: 'Aman, hindari merobek cone.',
  camera_module: 'Hindari sentuh lensa.',
  heat_sink: 'Bersihkan thermal paste, jangan gores permukaan kontak.',
  motor: 'Lepas kabel rapi, jangan potong sembarang.',
  remote_control: 'Pisahkan baterai dulu.',
  monitor: 'Cabut daya sebelum membongkar. Layar LCD aman, CRT butuh profesional.',
  microwave: 'Hati-hati dengan kapasitor tegangan tinggi.',
  small_appliance: 'Aman untuk dibongkar setelah dicabut dari listrik.',
};

export const getComponentByLabel = (label: string): Component | undefined => {
  return VALORA_COMPONENTS.find(c => c.label === label);
};

export const getSafetyLevel = (label: string): SafetyLevel => {
  const component = getComponentByLabel(label);
  return component?.safety || 'caution';
};

export const COMPONENT_CATEGORIES = [
  'Semua',
  'Perangkat Utama',
  'Komponen Internal',
  'Peripheral',
  'Display',
  'Storage',
  'Daya',
  'Audio',
  'Jaringan',
  'Aksesori',
];

export const getSafetyNote = (label: string): string => {
  return SAFETY_NOTES[label] || 'Tangani dengan hati-hati.';
};

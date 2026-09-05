/* ============================================================
   Urienix — data
   Career timeline & project cards (bilingual)
   ============================================================ */

window.URIENIX_DATA = {
  jobs: [
    {
      id: 'higher',
      role: {
        en: 'Full-Stack Software Engineer',
        es: 'Ingeniero de Software Full-Stack',
      },
      company: 'Higher Honduras',
      product: {
        en: 'Whole Bible Community — social platform',
        es: 'Whole Bible Community — plataforma social',
      },
      location: { en: 'Tegucigalpa, HN', es: 'Tegucigalpa, HN' },
      dates:    { en: 'Jul 2025 — Present', es: 'Jul 2025 — Actualidad' },
      current:  true,
      tags: ['NestJS', 'MongoDB', 'Flutter', 'FFmpeg', 'RabbitMQ', 'AWS'],
      highlights: {
        en: [
          'Designed and built core backend services for a web + mobile social platform.',
          'Real-time messaging, push notifications, video streaming and media processing.',
          'Shipped Flutter apps to Apple App Store and Google Play.',
          'Introduced AI-assisted workflows to accelerate delivery.',
        ],
        es: [
          'Diseñé y construí los servicios backend principales de una plataforma social web + móvil.',
          'Mensajería en tiempo real, notificaciones push, streaming de video y procesamiento multimedia.',
          'Publicación de apps Flutter en Apple App Store y Google Play.',
          'Introduje flujos asistidos por IA para acelerar la entrega.',
        ],
      },
    },
    {
      id: 'sullivan',
      role: {
        en: 'Full-Stack Developer',
        es: 'Desarrollador Full-Stack',
      },
      company: 'Sullivan Capital',
      product: {
        en: 'Reservation management platform',
        es: 'Plataforma de gestión de reservas',
      },
      location: { en: 'USA · Remote', es: 'EE. UU. · Remoto' },
      dates:    { en: 'Feb 2024 — Jan 2026', es: 'Feb 2024 — Ene 2026' },
      remote:   true,
      tags: ['Node.js', 'React', 'MySQL', 'AWS S3'],
      highlights: {
        en: [
          'Integrated AWS S3 for uploads & storage; cut cloud costs 30% via compression.',
          'Built a PDF generator with data, images and signatures.',
          'Automated push notifications and transactional emails.',
        ],
        es: [
          'Integré AWS S3 para carga y almacenamiento; reduje 30% de costos con compresión.',
          'Construí un generador de PDF con datos, imágenes y firmas.',
          'Automatización de notificaciones push y correos transaccionales.',
        ],
      },
    },
    {
      id: 'incova',
      role: {
        en: 'Full-Stack Developer',
        es: 'Desarrollador Full-Stack',
      },
      company: 'Grupo Incova / Mantun.dev',
      product: {
        en: 'Logistics & vehicle-tracking platforms (Mantun GPS, Smart Driver)',
        es: 'Plataformas de logística y rastreo vehicular (Mantun GPS, Smart Driver)',
      },
      location: { en: 'Tegucigalpa, HN', es: 'Tegucigalpa, HN' },
      dates:    { en: 'Oct 2020 — Mar 2024', es: 'Oct 2020 — Mar 2024' },
      tags: ['Node.js', 'Express', 'MySQL', 'Google Maps', 'TCP Sockets'],
      highlights: {
        en: [
          'Launched Mantun GPS: fleet management + REST API for mobile apps.',
          'Launched Smart Driver: trip control with coordination, client and driver modules.',
          'Cut operational load 50% in coordination and 70% in reports via automation.',
          'Built a custom library to talk to GPS tracking devices over TCP.',
        ],
        es: [
          'Lancé Mantun GPS: gestión de flotas + REST API para apps móviles.',
          'Lancé Smart Driver: control de viajes con módulos de coordinación, cliente y conductor.',
          'Reduje 50% la carga operativa en coordinación y 70% en generación de reportes.',
          'Construí una librería para hablar con dispositivos GPS por TCP.',
        ],
      },
    },
    {
      id: 'moore',
      role: {
        en: 'External Consultant',
        es: 'Consultor externo',
      },
      company: 'Moore Honduras',
      product: {
        en: 'VirtualMooreHN — evaluation platform',
        es: 'VirtualMooreHN — plataforma de evaluaciones',
      },
      location: { en: 'Tegucigalpa, HN', es: 'Tegucigalpa, HN' },
      dates:    { en: 'Jun 2021 — Feb 2024', es: 'Jun 2021 — Feb 2024' },
      tags: ['Moodle', 'PHP', 'Linux', 'Nginx'],
      highlights: {
        en: [
          'Launched an online evaluation platform with semi-automated grading and reports.',
          'Reduced evaluation effort by 85% (20h → 3h per week).',
          'Full server, domain and SSL administration.',
        ],
        es: [
          'Lancé una plataforma de evaluaciones en línea con calificación semi-automática y reportes.',
          'Reduje el esfuerzo de evaluación en 85% (de 20h a 3h semanales).',
          'Administración total de servidor, dominio y SSL.',
        ],
      },
    },
    {
      id: 'innova',
      role: {
        en: 'External Consultant',
        es: 'Consultor externo',
      },
      company: 'Seguros Innova HN',
      product: {
        en: 'Email & cloud storage services',
        es: 'Servicios de correo y almacenamiento en la nube',
      },
      location: { en: 'San Pedro Sula, HN', es: 'San Pedro Sula, HN' },
      dates:    { en: 'Jun 2021 — Present', es: 'Jun 2021 — Actualidad' },
      current:  true,
      tags: ['Google Workspace', 'DNS', 'SSL'],
      highlights: {
        en: [
          'Deployed and administers Google Workspace for the whole company.',
          'Domain, DNS and cloud storage backups.',
          'User, permission and access-policy management.',
        ],
        es: [
          'Implementé y administro Google Workspace para toda la empresa.',
          'Dominio, DNS y respaldos en almacenamiento en la nube.',
          'Gestión de usuarios, permisos y políticas de acceso.',
        ],
      },
    },
  ],

  projects: [
    {
      id: 'mantungps',
      name: 'Mantun GPS',
      img: 'assets/img/mantungps.png',
      desc: {
        en: 'Fleet management & vehicle-tracking web platform with a REST API for mobile integration.',
        es: 'Plataforma web de gestión de flotas y rastreo vehicular con REST API para integración móvil.',
      },
      tags: ['Node.js', 'Express', 'MySQL', 'Google Maps'],
      href: 'https://mantungps.com',
      cta: { en: 'Visit site', es: 'Visitar sitio' },
    },
    {
      id: 'coinroom',
      name: 'The Coin Room',
      img: 'assets/img/coinroom.png',
      desc: {
        en: 'Real-time chat playground built on socket.io — small, fast, and unashamedly fun.',
        es: 'Chat en tiempo real hecho sobre socket.io — pequeño, rápido y divertido sin pena.',
      },
      tags: ['Node.js', 'Socket.io'],
      href: 'https://coinroom.urienix.moe',
      cta: { en: 'Open chat', es: 'Abrir chat' },
    },
    {
      id: 'db2storeprocedure',
      name: 'db2storeprocedure',
      img: 'assets/img/db2storeprocedure.png',
      desc: {
        en: 'Promise-based helper to call IBM DB2 stored procedures from Node.js. Published on npm.',
        es: 'Helper basado en promesas para llamar procedimientos almacenados de IBM DB2 desde Node.js. Publicado en npm.',
      },
      tags: ['Node.js', 'IBM DB2', 'npm'],
      href: 'https://www.npmjs.com/package/db2storeprocedure',
      cta: { en: 'View on npm', es: 'Ver en npm' },
    },
    {
      id: 'crypter-text',
      name: 'crypter-text',
      img: 'assets/img/crypter-text.png',
      desc: {
        en: 'Small keyword-based text encryption utility — perfect for password notes.',
        es: 'Utilidad pequeña de cifrado de texto por palabra clave — ideal para notas de contraseñas.',
      },
      tags: ['Node.js', 'CLI', 'npm'],
      href: 'https://www.npmjs.com/package/crypter-text',
      cta: { en: 'View on npm', es: 'Ver en npm' },
    },
    {
      id: 'vemterimnaria',
      name: 'Vemterimnaria',
      img: 'assets/img/vemterimnaria.png',
      desc: {
        en: 'A tiny veterinary project made for learning. Oracle 11g backend, Node.js server side.',
        es: 'Proyecto veterinario pequeño hecho para aprender. Backend Oracle 11g, servidor con Node.js.',
      },
      tags: ['Node.js', 'Oracle 11g'],
      href: 'https://github.com/urienix/vemterimnaria',
      cta: { en: 'Source', es: 'Ver código' },
    },
  ],
};

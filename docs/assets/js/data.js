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
        en: 'Whole Bible Community · social platform',
        es: 'Whole Bible Community · plataforma social',
      },
      location: { en: 'Tegucigalpa, HN', es: 'Tegucigalpa, HN' },
      dates:    { en: 'Jul 2025 - Present', es: 'Jul 2025 - Actualidad' },
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
      dates:    { en: 'Feb 2024 - Jan 2026', es: 'Feb 2024 - Ene 2026' },
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
      dates:    { en: 'Oct 2020 - Mar 2024', es: 'Oct 2020 - Mar 2024' },
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
        en: 'VirtualMooreHN · evaluation platform',
        es: 'VirtualMooreHN · plataforma de evaluaciones',
      },
      location: { en: 'Tegucigalpa, HN', es: 'Tegucigalpa, HN' },
      dates:    { en: 'Jun 2021 - Feb 2024', es: 'Jun 2021 - Feb 2024' },
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
      dates:    { en: 'Jun 2021 - Present', es: 'Jun 2021 - Actualidad' },
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

  /* ---------- Projects ----------
     Two groups: `work` (client / employer projects, ordered by employer, most
     recent first) and `personal` (side quests). Every project can carry:

       img      logo path. Leave it out and the card shows a pixel monogram
                built from `mono` (initials) in the `accent` color. Drop the
                real logo in assets/img and add `img:` to swap it in.
       plate    true puts a white rounded plate behind the logo, for artwork
                that is dark on transparent or comes with its own white
                background.
       status   'live' (default) · 'internal' · 'offline' · 'advisory'.
                Anything but live prints a small note instead of a link.
       href     public link, when there is one. `cta` labels the button.
       tags     short list for the card. `stack` is the full list for the modal
                (falls back to `tags`).
       details  what the Details modal shows: `about` (paragraphs),
                `responsibilities` and `achievements` (bullet lists), all
                bilingual. */

  projects: {
    work: [

      /* ===== Higher Honduras ===== */

      {
        id: 'wbc',
        name: 'Whole Bible Community',
        client: 'Higher Honduras',
        role: { en: 'Tech Lead', es: 'Tech Lead' },
        img: 'assets/img/wbc-logo.svg',
        mono: 'WB',
        accent: 'purple',
        href: 'https://wholebiblecommunity.com',
        cta: { en: 'Visit site', es: 'Visitar sitio' },
        desc: {
          en: 'Social network for Torah followers: web, mobile and admin panel, with video streaming and real-time chat.',
          es: 'Red social para seguidores de la Torá: web, móvil y panel admin, con streaming de video y chat en tiempo real.',
        },
        tags: ['NestJS', 'React', 'Next.js', 'Flutter', 'MongoDB', 'RabbitMQ'],
        stack: [
          'NestJS', 'React SPA', 'Next.js', 'Flutter', 'MongoDB · Mongoose',
          'RabbitMQ', 'FFmpeg · HLS', 'Socket.IO', 'JWT', 'OAuth (Google, Facebook, Apple)',
          'Swagger', 'Firebase Push', 'DigitalOcean Spaces (AWS SDK)', 'Mapbox',
          'i18n · translation', 'Tailwind CSS',
        ],
        details: {
          about: {
            en: [
              'Whole Bible Community is a social platform for people who follow the Torah: profiles, posts, real-time messaging, video content and maps, available on the web and as a native app on Google Play and the Apple App Store.',
              'The product is made of a React SPA, a NestJS backend, a Next.js public website, a Flutter mobile app and an admin panel, all talking to the same API.',
            ],
            es: [
              'Whole Bible Community es una plataforma social para seguidores de la Torá: perfiles, publicaciones, mensajería en tiempo real, contenido en video y mapas, disponible en la web y como app nativa en Google Play y Apple App Store.',
              'El producto se compone de una SPA en React, un backend en NestJS, un sitio público en Next.js, una app móvil en Flutter y un panel administrativo, todos sobre la misma API.',
            ],
          },
          responsibilities: {
            en: [
              'Tech lead of a small team: architecture decisions, task planning, code review and coordination across backend, web and mobile.',
              'Hands-on development of the NestJS backend: REST API, JWT, OAuth with Google, Facebook and Apple Sign In (iOS only), Swagger docs and Socket.IO.',
              'Direct work on the Flutter app and its releases to Google Play and the App Store.',
              'Video pipeline: a RabbitMQ queue that converts uploads to HLS for streaming.',
              'Media storage on DigitalOcean Spaces through the AWS SDK, push notifications with Firebase, maps with Mapbox, translation and i18n.',
            ],
            es: [
              'Tech lead de un equipo pequeño: decisiones de arquitectura, planificación de tareas, revisión de código y coordinación entre backend, web y móvil.',
              'Desarrollo directo del backend en NestJS: REST API, JWT, OAuth con Google, Facebook y Apple Sign In (solo iOS), documentación Swagger y Socket.IO.',
              'Trabajo directo en la app Flutter y en sus publicaciones en Google Play y App Store.',
              'Pipeline de video: una cola en RabbitMQ que convierte las subidas a HLS para streaming.',
              'Almacenamiento multimedia en DigitalOcean Spaces vía AWS SDK, notificaciones push con Firebase, mapas con Mapbox, traducción e i18n.',
            ],
          },
          achievements: {
            en: [
              'Shipped the platform end to end: web, backend, public site, admin panel and mobile apps in both stores.',
              'Designed a queue-based video processing system that keeps heavy conversions off the request path.',
              'Introduced AI-assisted workflows to the team to speed up delivery.',
            ],
            es: [
              'Lancé la plataforma de punta a punta: web, backend, sitio público, panel admin y apps móviles en ambas tiendas.',
              'Diseñé un sistema de procesamiento de video basado en colas que saca las conversiones pesadas del camino de la petición.',
              'Introduje flujos asistidos por IA en el equipo para acelerar la entrega.',
            ],
          },
        },
      },

      {
        id: 'dalamarhomes',
        name: 'Dalamar Homes',
        client: 'Higher Honduras',
        role: { en: 'Project coordinator', es: 'Coordinador de proyecto' },
        img: 'assets/img/dalamarhomes.webp',
        mono: 'DH',
        accent: 'cyan',
        href: 'https://dalamarhomes.com',
        cta: { en: 'Visit site', es: 'Visitar sitio' },
        desc: {
          en: 'Website migrated from WordPress to Next.js, with a NestJS backend and a React admin panel.',
          es: 'Sitio web migrado de WordPress a Next.js, con backend en NestJS y panel administrativo en React.',
        },
        tags: ['Next.js', 'NestJS', 'React', 'DNS'],
        stack: ['Next.js', 'NestJS', 'React SPA (admin)', 'DNS · domain'],
        details: {
          about: {
            en: [
              'Dalamar Homes needed to leave WordPress behind. The site was rebuilt as a Next.js frontend backed by a NestJS API, with a React SPA admin panel so the client can manage content without touching code.',
            ],
            es: [
              'Dalamar Homes necesitaba dejar atrás WordPress. El sitio se reconstruyó como un frontend en Next.js sobre una API en NestJS, con un panel administrativo en React para que el cliente gestione el contenido sin tocar código.',
            ],
          },
          responsibilities: {
            en: [
              'Project coordination: split the work into tasks, assigned them to the team and followed up on delivery.',
              'Domain and DNS configuration for the migration and go-live.',
              'No hands-on coding on this one: my job was to keep the team moving and the launch on track.',
            ],
            es: [
              'Coordinación del proyecto: dividí el trabajo en tareas, las asigné al equipo y di seguimiento a la entrega.',
              'Configuración de dominio y DNS para la migración y la salida a producción.',
              'Aquí no toqué código: mi trabajo fue mantener al equipo avanzando y el lanzamiento en fecha.',
            ],
          },
          achievements: {
            en: [
              'Completed the migration from WordPress to a modern Next.js + NestJS stack.',
              'Delivered an admin panel so the client can update the site on their own.',
            ],
            es: [
              'Completé la migración de WordPress a un stack moderno con Next.js + NestJS.',
              'Entregué un panel administrativo para que el cliente actualice el sitio por su cuenta.',
            ],
          },
        },
      },

      {
        id: 'homev',
        name: 'HomeV',
        client: 'Higher Honduras',
        role: { en: 'Project coordinator', es: 'Coordinador de proyecto' },
        img: 'assets/img/homev.webp',
        plate: true,                  // black logo, needs a light backdrop
        mono: 'HV',
        accent: 'green',
        href: 'https://homev.biz',
        cta: { en: 'Visit site', es: 'Visitar sitio' },
        desc: {
          en: 'Static website built with Next.js. I coordinated the build and handled the domain.',
          es: 'Sitio web estático hecho con Next.js. Coordiné el desarrollo y me encargué del dominio.',
        },
        tags: ['Next.js', 'Static site', 'DNS'],
        stack: ['Next.js', 'Static export', 'DNS · domain'],
        details: {
          about: {
            en: [
              'HomeV is a static website: Next.js on the frontend, no backend, built to load fast and be cheap to host.',
            ],
            es: [
              'HomeV es un sitio web estático: Next.js en el frontend, sin backend, pensado para cargar rápido y ser barato de alojar.',
            ],
          },
          responsibilities: {
            en: [
              'Coordinated the development with the team and reviewed progress until launch.',
              'Domain configuration and DNS.',
            ],
            es: [
              'Coordiné el desarrollo con el equipo y revisé el avance hasta el lanzamiento.',
              'Configuración de dominio y DNS.',
            ],
          },
          achievements: {
            en: [
              'Launched with a zero-maintenance static setup.',
            ],
            es: [
              'Lanzado con una configuración estática sin mantenimiento.',
            ],
          },
        },
      },

      {
        id: 'elglobalnews',
        name: 'El Global News',
        client: 'Higher Honduras',
        role: { en: 'Coordination & infra', es: 'Coordinación e infra' },
        img: 'assets/img/elglobalnews.png',
        plate: true,                  // navy on transparent
        mono: 'EG',
        accent: 'pink',
        href: 'https://elglobal.news',
        cta: { en: 'Visit site', es: 'Visitar sitio' },
        desc: {
          en: 'WordPress news site: migration to a fresh DigitalOcean VPS, malware cleanup and ongoing support.',
          es: 'Sitio de noticias en WordPress: migración a un VPS nuevo en DigitalOcean, limpieza de malware y soporte continuo.',
        },
        tags: ['WordPress', 'DigitalOcean', 'VPS', 'Security'],
        stack: ['WordPress', 'DigitalOcean VPS', 'Linux', 'DNS · domain', 'Security cleanup'],
        details: {
          about: {
            en: [
              'El Global News is a news outlet running on WordPress. The site arrived from its previous host with injected malicious code, so the migration doubled as a security cleanup.',
            ],
            es: [
              'El Global News es un medio de noticias sobre WordPress. El sitio llegó de su hosting anterior con código malicioso inyectado, así que la migración fue también una limpieza de seguridad.',
            ],
          },
          responsibilities: {
            en: [
              'Coordinated the development, migration and support work done by the team.',
              'Provisioned and configured the VPS on DigitalOcean and set up the domain.',
              'Cleaned the infected installation, updated WordPress to a current version and brought the site back online on the clean server.',
            ],
            es: [
              'Coordiné el desarrollo, la migración y el soporte realizados por el equipo.',
              'Aprovisioné y configuré el VPS en DigitalOcean y monté el dominio.',
              'Limpié la instalación infectada, actualicé WordPress a una versión vigente y volví a poner el sitio en línea en el servidor limpio.',
            ],
          },
          achievements: {
            en: [
              'Removed the malware inherited from the previous host and relaunched the site on a clean, up-to-date server.',
            ],
            es: [
              'Eliminé el malware heredado del hosting anterior y relancé el sitio en un servidor limpio y actualizado.',
            ],
          },
        },
      },

      /* ===== Sullivan Capital ===== */

      {
        id: 'lodging',
        name: 'Lodging App',
        client: 'Sullivan Capital',
        role: { en: 'Full-stack developer', es: 'Desarrollador full-stack' },
        img: 'assets/img/lodging-app.svg',
        mono: 'LA',
        accent: 'yellow',
        status: 'internal',
        desc: {
          en: 'Reservation and guest-management platform: React frontend, Koa + TypeScript backend and a lot of AWS.',
          es: 'Plataforma de reservas y gestión de huéspedes: frontend en React, backend en Koa + TypeScript y mucho AWS.',
        },
        tags: ['React', 'Koa', 'TypeScript', 'AWS', 'MySQL', 'Stripe'],
        stack: [
          'React', 'Node.js · TypeScript', 'Koa', 'MikroORM', 'AWS RDS (MySQL)',
          'AWS Cognito', 'AWS S3', 'AWS Lambda', 'DynamoDB', 'CloudWatch',
          'Mews API', 'Pusher', 'Postmark', 'Twilio', 'Vonage', 'SaltoKS', 'Stripe',
        ],
        details: {
          about: {
            en: [
              'A lodging platform that handles reservations, guest messaging and door access, integrated with the Mews property-management API and with SaltoKS electronic locks.',
              'The stack was a bit unusual: Koa instead of Express, MikroORM on AWS RDS (MySQL), Cognito for auth, Pusher for sockets, Lambda functions for scheduled messages and DynamoDB to store the messaging.',
            ],
            es: [
              'Una plataforma de alojamiento que gestiona reservas, mensajería con huéspedes y acceso a puertas, integrada con la API de gestión hotelera de Mews y con cerraduras electrónicas SaltoKS.',
              'El stack era poco común: Koa en lugar de Express, MikroORM sobre AWS RDS (MySQL), Cognito para autenticación, Pusher para sockets, funciones Lambda para mensajes programados y DynamoDB para guardar la mensajería.',
            ],
          },
          responsibilities: {
            en: [
              'Full-stack development: React on the frontend, Node.js + TypeScript with Koa on the backend.',
              'Integrations: Mews REST API, Twilio and Vonage for messaging, Pusher for real-time events, Postmark for transactional email, SaltoKS for smart locks.',
              'Observability with CloudWatch for error logging and traceability.',
            ],
            es: [
              'Desarrollo full-stack: React en el frontend, Node.js + TypeScript con Koa en el backend.',
              'Integraciones: REST API de Mews, Twilio y Vonage para mensajería, Pusher para eventos en tiempo real, Postmark para correo transaccional, SaltoKS para cerraduras inteligentes.',
              'Observabilidad con CloudWatch para registro de errores y trazabilidad.',
            ],
          },
          achievements: {
            en: [
              'Built the S3 upload flow with image compression so the admin panel could review uploaded files; cut cloud storage costs by around 30%.',
              'Implemented Stripe payments, reservation webhooks and PDF export of agreements with data, images and signatures.',
              'Set up transactional email with Postmark and scheduled messaging with Lambda + DynamoDB.',
            ],
            es: [
              'Construí el flujo de subida a S3 con compresión de imágenes para que el panel admin revisara los archivos subidos; reduje cerca de 30% el costo de almacenamiento en la nube.',
              'Implementé pagos con Stripe, webhooks de reservación y exportación de agreements en PDF con datos, imágenes y firmas.',
              'Monté el correo transaccional con Postmark y la mensajería programada con Lambda + DynamoDB.',
            ],
          },
        },
      },

      {
        id: 'clvhh',
        name: 'CLVHH Home Health Care',
        client: 'Sullivan Capital',
        role: { en: 'Full-stack developer', es: 'Desarrollador full-stack' },
        img: 'assets/img/clvhh-app.svg',
        mono: 'CL',
        accent: 'purple',
        status: 'internal',
        desc: {
          en: 'Home health care management platform on Supabase + PostgreSQL, built with an AI-first workflow.',
          es: 'Plataforma de gestión de cuidados de salud a domicilio sobre Supabase + PostgreSQL, construida con un flujo AI-first.',
        },
        tags: ['Supabase', 'PostgreSQL', 'OAuth', 'AI-assisted'],
        stack: ['Supabase', 'PostgreSQL', 'OAuth (Google, Microsoft)', 'Email + password auth', 'AI-assisted development'],
        details: {
          about: {
            en: [
              'A management platform for a home health care provider: services, plans and client accounts, backed by PostgreSQL on Supabase. Development leaned heavily on AI tooling to move fast.',
            ],
            es: [
              'Plataforma de gestión para un proveedor de cuidados de salud a domicilio: servicios, planes y cuentas de clientes, sobre PostgreSQL en Supabase. El desarrollo se apoyó fuertemente en herramientas de IA para avanzar rápido.',
            ],
          },
          responsibilities: {
            en: [
              'Frontend and backend development on Supabase and PostgreSQL.',
              'Authentication: OAuth with Google and Microsoft plus classic email and password.',
              'Business modules such as service discounts and plans.',
            ],
            es: [
              'Desarrollo frontend y backend sobre Supabase y PostgreSQL.',
              'Autenticación: OAuth con Google y Microsoft más usuario y contraseña clásicos.',
              'Módulos de negocio como descuentos por servicios y planes.',
            ],
          },
          achievements: {
            en: [
              'Delivered the full authentication layer: Google, Microsoft and email + password.',
              'Shipped several business modules in a short timeframe using an AI-assisted workflow.',
            ],
            es: [
              'Entregué la capa completa de autenticación: Google, Microsoft y usuario + contraseña.',
              'Lancé varios módulos de negocio en poco tiempo usando un flujo asistido por IA.',
            ],
          },
        },
      },

      /* ===== Grupo Incova / Mantun ===== */

      {
        id: 'smartdriver',
        name: 'Smart Driver',
        client: 'Grupo Incova / Mantun',
        role: { en: 'Full-stack developer', es: 'Desarrollador full-stack' },
        img: 'assets/img/smartdriver-logo.png',
        mono: 'SD',
        accent: 'cyan',
        status: 'internal',
        desc: {
          en: 'Logistics platform for trip management, coordination and reporting, with admin, agent and driver portals.',
          es: 'Plataforma de logística para gestión y coordinación de viajes y reportes, con portales de admin, agentes y motoristas.',
        },
        tags: ['Node.js', 'Express', 'SQL Server', 'Handlebars', 'Google Maps'],
        stack: ['Node.js', 'Express', 'JavaScript', 'SQL Server 2019', 'Handlebars (SSR)', 'Firebase Push', 'Google Maps'],
        details: {
          about: {
            en: [
              'Smart Driver is a logistics platform for managing and coordinating trips and generating reports. It has three faces: an administrative module, a platform for agents (travelers) and a platform for drivers, all rendered server-side with Handlebars and Google Maps on top.',
              'The admin panel is an internal system, so there is no public link to share.',
            ],
            es: [
              'Smart Driver es una plataforma de logística para gestionar y coordinar viajes y generar reportes. Tiene tres caras: un módulo administrativo, una plataforma para agentes (viajeros) y una plataforma para motoristas, todas renderizadas en el servidor con Handlebars y Google Maps encima.',
              'El panel administrativo es un sistema interno, así que no hay enlace público para compartir.',
            ],
          },
          responsibilities: {
            en: [
              'Built the backend from scratch with Node.js and Express in plain JavaScript on SQL Server 2019.',
              'Server-side rendered frontend with Handlebars for the admin, agent and driver modules.',
              'Push notifications with Firebase and map features with Google Maps.',
            ],
            es: [
              'Construí el backend desde cero con Node.js y Express en JavaScript puro sobre SQL Server 2019.',
              'Frontend renderizado en el servidor con Handlebars para los módulos de admin, agentes y motoristas.',
              'Notificaciones push con Firebase y funciones de mapa con Google Maps.',
            ],
          },
          achievements: {
            en: [
              'Cut the operational load of trip coordination by about 50% and of report generation by about 70% through automation.',
              'Launched the admin, agent and driver portals.',
            ],
            es: [
              'Reduje cerca de 50% la carga operativa de coordinación de viajes y cerca de 70% la de generación de reportes mediante automatización.',
              'Lancé los portales de administración, agentes y motoristas.',
            ],
          },
        },
      },

      {
        id: 'mantungps',
        name: 'Mantun GPS',
        client: 'Grupo Incova / Mantun',
        role: { en: 'Full-stack developer', es: 'Desarrollador full-stack' },
        img: 'assets/img/mantungps.png',
        mono: 'MG',
        accent: 'green',
        href: 'https://mantungps.com',
        cta: { en: 'Visit site', es: 'Visitar sitio' },
        desc: {
          en: 'Fleet-control platform with a live map of every unit, reporting and a REST API for the mobile apps.',
          es: 'Plataforma de control de flotas con mapa en vivo de cada unidad, reportería y REST API para las apps móviles.',
        },
        tags: ['Node.js', 'MongoDB', 'Socket.IO', 'TCP', 'Handlebars'],
        stack: ['Node.js', 'MongoDB Atlas · Mongoose', 'Handlebars (SSR)', 'Socket.IO', 'REST API', 'TCP sockets (Node net)', 'Google Maps'],
        details: {
          about: {
            en: [
              'Mantun GPS is a vehicle fleet-control platform: a real-time map of every unit powered by Socket.IO, a reporting system, and REST APIs that the mobile apps consume.',
              "Under the hood, a TCP module built on Node's net library talks directly to the GPS trackers using their own communication protocol.",
            ],
            es: [
              'Mantun GPS es una plataforma de control de flotas vehiculares: un mapa en tiempo real de cada unidad sobre Socket.IO, un sistema de reportería y REST APIs que consumen las apps móviles.',
              'Por debajo, un módulo TCP construido sobre la librería net de Node habla directamente con los rastreadores GPS usando su propio protocolo de comunicación.',
            ],
          },
          responsibilities: {
            en: [
              'Backend and server-side rendered frontend: Node.js, MongoDB on Atlas with Mongoose, Handlebars.',
              'Real-time unit map with Socket.IO and the reporting module.',
              'REST APIs for the mobile apps (the apps themselves were built by teammates).',
              "Wrote the tracker connection library from the device protocol spec, on top of Node's net module.",
            ],
            es: [
              'Backend y frontend renderizado en el servidor: Node.js, MongoDB en Atlas con Mongoose, Handlebars.',
              'Mapa de unidades en tiempo real con Socket.IO y el módulo de reportería.',
              'REST APIs para las apps móviles (las apps las desarrollaron compañeros del equipo).',
              'Escribí la librería de conexión con los rastreadores a partir del protocolo del dispositivo, sobre el módulo net de Node.',
            ],
          },
          achievements: {
            en: [
              'Launched the platform, still live at mantungps.com.',
              'Direct tracker-to-server communication over raw TCP with a custom protocol library.',
            ],
            es: [
              'Lancé la plataforma, que sigue en línea en mantungps.com.',
              'Comunicación directa rastreador-servidor por TCP puro con una librería de protocolo propia.',
            ],
          },
        },
      },

      /* ===== Moore Honduras ===== */

      {
        id: 'virtualmoore',
        name: 'VirtualMoore HN',
        client: 'Moore Honduras',
        role: { en: 'Consultant & platform admin', es: 'Consultor y administrador' },
        img: 'assets/img/virtualmoore.jpg',
        plate: true,                  // opaque white jpg, the plate hides the edges
        mono: 'VM',
        accent: 'yellow',
        status: 'offline',
        desc: {
          en: 'Moodle-based training and evaluation platform, branded for Moore Honduras, to measure employee knowledge.',
          es: 'Plataforma de capacitación y evaluación sobre Moodle, con la marca de Moore Honduras, para medir el conocimiento de los empleados.',
        },
        tags: ['Moodle', 'PHP', 'Linux', 'Nginx'],
        stack: ['Moodle', 'PHP', 'Linux', 'Nginx', 'DNS · SSL'],
        details: {
          about: {
            en: [
              "Moore Honduras needed a place to run internal courses and evaluations. I set up Moodle, adapted it to the company's branding and turned it into their training platform.",
              'The platform was later retired when Moore International standardized evaluations worldwide with a new platform built by a team in the USA.',
            ],
            es: [
              'Moore Honduras necesitaba un lugar donde impartir cursos y evaluaciones internas. Monté Moodle, lo adapté a la imagen de la empresa y lo convertí en su plataforma de capacitación.',
              'La plataforma se dio de baja más adelante, cuando Moore International estandarizó sus evaluaciones a nivel global con una nueva plataforma desarrollada por un equipo en EE. UU.',
            ],
          },
          responsibilities: {
            en: [
              'Installed and configured Moodle on a Linux server; bought and configured the domain and SSL.',
              'Adapted the theme with Moore Honduras colors and logos.',
              'Support for enrolled staff and platform administration for the duration of the engagement.',
            ],
            es: [
              'Instalé y configuré Moodle en un servidor Linux; compré y configuré el dominio y el SSL.',
              'Adapté el tema con los colores y logos de Moore Honduras.',
              'Soporte a los matriculados y administración de la plataforma durante toda la consultoría.',
            ],
          },
          achievements: {
            en: [
              'Semi-automated grading and reports cut evaluation effort by about 85% (from 20 to 3 hours a week).',
            ],
            es: [
              'La calificación semi-automática y los reportes redujeron el esfuerzo de evaluación cerca de 85% (de 20 a 3 horas semanales).',
            ],
          },
        },
      },

      /* ===== Seguros Innova ===== */

      {
        id: 'innova',
        name: 'Seguros Innova',
        client: 'Seguros Innova HN',
        role: { en: 'External consultant', es: 'Consultor externo' },
        img: 'assets/img/seguros-innova.jpg',
        plate: true,                  // opaque white jpg
        mono: 'SI',
        accent: 'pink',
        status: 'advisory',
        desc: {
          en: 'Domain management and Google Workspace email for an insurance brokerage, plus basic security advisory.',
          es: 'Gestión de dominio y correo en Google Workspace para una correduría de seguros, más asesoría básica de seguridad.',
        },
        tags: ['Google Workspace', 'DNS', 'Security'],
        stack: ['Google Workspace', 'DNS · domain', 'Account security'],
        details: {
          about: {
            en: [
              'Not a website but an ongoing service: Seguros Innova keeps their domain and corporate email under my care. The advisory is still active for the occasional special case.',
            ],
            es: [
              'No es un sitio web sino un servicio continuo: Seguros Innova mantiene su dominio y su correo corporativo bajo mi cuidado. La asesoría sigue vigente para casos especiales ocasionales.',
            ],
          },
          responsibilities: {
            en: [
              'Domain and DNS management (no website).',
              'Google Workspace setup; creating and offboarding mailboxes.',
              'Basic security guidance and support.',
            ],
            es: [
              'Gestión de dominio y DNS (sin sitio web).',
              'Implementación de Google Workspace; alta y baja de cuentas de correo.',
              'Asesoría y soporte básico de seguridad.',
            ],
          },
          achievements: {
            en: [
              'Company-wide Google Workspace deployment, running since 2021.',
            ],
            es: [
              'Implementación de Google Workspace para toda la empresa, en marcha desde 2021.',
            ],
          },
        },
      },
    ],

    personal: [
      {
        id: 'coinroom',
        name: 'The Coin Room',
        img: 'assets/img/coinroom.png',
        mono: 'CR',
        accent: 'yellow',
        href: 'https://coinroom.urienix.moe',
        cta: { en: 'Open chat', es: 'Abrir chat' },
        desc: {
          en: 'Real-time chat playground built on socket.io. Small, fast, and unashamedly fun.',
          es: 'Chat en tiempo real hecho sobre socket.io. Pequeño, rápido y divertido sin pena.',
        },
        tags: ['Node.js', 'Socket.io'],
        details: {
          about: {
            en: [
              'A tiny real-time chat built on Socket.IO to play with rooms and live message broadcasting. It runs on a subdomain of this site.',
            ],
            es: [
              'Un chat en tiempo real pequeñito hecho sobre Socket.IO para jugar con salas y difusión de mensajes en vivo. Corre en un subdominio de este sitio.',
            ],
          },
          responsibilities: {
            en: [
              'Everything: the Socket.IO server, the client and the deployment.',
            ],
            es: [
              'Todo: el servidor Socket.IO, el cliente y el despliegue.',
            ],
          },
          achievements: {
            en: [
              'Still running as a public playground.',
            ],
            es: [
              'Sigue en línea como patio de juegos público.',
            ],
          },
        },
      },
      {
        id: 'db2storeprocedure',
        name: 'db2storeprocedure',
        img: 'assets/img/db2storeprocedure.png',
        mono: 'DB',
        accent: 'cyan',
        href: 'https://www.npmjs.com/package/db2storeprocedure',
        cta: { en: 'View on npm', es: 'Ver en npm' },
        desc: {
          en: 'Promise-based helper to call IBM DB2 stored procedures from Node.js. Published on npm.',
          es: 'Helper basado en promesas para llamar procedimientos almacenados de IBM DB2 desde Node.js. Publicado en npm.',
        },
        tags: ['Node.js', 'IBM DB2', 'npm'],
        details: {
          about: {
            en: [
              'A promise-based helper to call IBM DB2 stored procedures from Node.js, so the call site reads like any other async function. Published on npm.',
            ],
            es: [
              'Un helper basado en promesas para llamar procedimientos almacenados de IBM DB2 desde Node.js, para que la llamada se lea como cualquier otra función async. Publicado en npm.',
            ],
          },
          responsibilities: {
            en: [
              'Designed the API, wrote the package and published it to npm.',
            ],
            es: [
              'Diseñé la API, escribí el paquete y lo publiqué en npm.',
            ],
          },
          achievements: {
            en: [
              'Available on npm for anyone who needs to talk to DB2 from Node.',
            ],
            es: [
              'Disponible en npm para quien necesite hablar con DB2 desde Node.',
            ],
          },
        },
      },
      {
        id: 'crypter-text',
        name: 'crypter-text',
        img: 'assets/img/crypter-text.png',
        mono: 'CT',
        accent: 'pink',
        href: 'https://www.npmjs.com/package/crypter-text',
        cta: { en: 'View on npm', es: 'Ver en npm' },
        desc: {
          en: 'Small keyword-based text encryption utility, perfect for password notes.',
          es: 'Utilidad pequeña de cifrado de texto por palabra clave, ideal para notas de contraseñas.',
        },
        tags: ['Node.js', 'CLI', 'npm'],
        details: {
          about: {
            en: [
              'A small keyword-based text encryption utility, handy for password notes and other bits you would rather not keep in plain text. Published on npm.',
            ],
            es: [
              'Una utilidad pequeña de cifrado de texto por palabra clave, útil para notas de contraseñas y otras cosas que prefieres no guardar en texto plano. Publicada en npm.',
            ],
          },
          responsibilities: {
            en: [
              'Wrote the encryption / decryption utility and published it as an npm package with a CLI.',
            ],
            es: [
              'Escribí la utilidad de cifrado / descifrado y la publiqué como paquete npm con CLI.',
            ],
          },
          achievements: {
            en: [
              'Tiny and available on npm.',
            ],
            es: [
              'Pequeña y disponible en npm.',
            ],
          },
        },
      },
      {
        id: 'vemterimnaria',
        name: 'Vemterimnaria',
        img: 'assets/img/vemterimnaria.png',
        mono: 'VT',
        accent: 'green',
        href: 'https://github.com/urienix/vemterimnaria',
        cta: { en: 'Source', es: 'Ver código' },
        desc: {
          en: 'A tiny veterinary project made for learning. Oracle 11g backend, Node.js server side.',
          es: 'Proyecto veterinario pequeño hecho para aprender. Backend Oracle 11g, servidor con Node.js.',
        },
        tags: ['Node.js', 'Oracle 11g'],
        details: {
          about: {
            en: [
              'A small veterinary management project built to learn: Oracle 11g on the database side, Node.js on the server. The code is on GitHub.',
            ],
            es: [
              'Un proyecto pequeño de gestión veterinaria hecho para aprender: Oracle 11g del lado de la base de datos, Node.js en el servidor. El código está en GitHub.',
            ],
          },
          responsibilities: {
            en: [
              'Data model in Oracle 11g and the Node.js server on top.',
            ],
            es: [
              'Modelo de datos en Oracle 11g y el servidor Node.js encima.',
            ],
          },
          achievements: {
            en: [
              'Learning project, source available on GitHub.',
            ],
            es: [
              'Proyecto de aprendizaje, código disponible en GitHub.',
            ],
          },
        },
      },
    ],
  },
};

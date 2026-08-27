import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SKILLS = [
  'C#',
  '.NET Core',
  'ASP.NET Core',
  'Blazor',
  'MAUI',
  'WPF',
  'Go',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Lua',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'MS SQL',
  'SQLite',
  'Redis',
  'RabbitMQ',
  'Apache Kafka',
  'Entity Framework',
  'gRPC',
  'GraphQL',
  'Swagger',
  'xUnit',
  'k6',
  'Prometheus',
  'Grafana',
  'Jaeger',
  'Docker',
  'Git',
];

async function main() {
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: 'Alexandr Kofanov',
      description:
        'C#/.NET и Go разработчик с опытом полного цикла разработки: от проектирования архитектуры и работы с БД до безопасности, наблюдаемости и нагрузочного тестирования production-систем.',
    },
    create: {
      id: 1,
      name: 'Alexandr Kofanov',
      description:
        'C#/.NET и Go разработчик с опытом полного цикла разработки: от проектирования архитектуры и работы с БД до безопасности, наблюдаемости и нагрузочного тестирования production-систем.',
    },
  });

  await prisma.profileLink.deleteMany({ where: { profileId: profile.id } });
  await prisma.skill.deleteMany({ where: { profileId: profile.id } });
  await prisma.experience.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany({ where: { profileId: profile.id } });

  await prisma.profileLink.createMany({
    data: [
      {
        label: 'GitHub',
        url: 'https://github.com/Juimun',
        profileId: profile.id,
      },
      {
        label: 'Email',
        url: 'mailto:2002kofanov@gmail.com',
        profileId: profile.id,
      },
    ],
  });

  await prisma.skill.createMany({
    data: SKILLS.map((name) => ({ name, profileId: profile.id })),
  });

  await prisma.experience.createMany({
    data: [
      {
        company: 'Finance Manager',
        position: 'Fullstack-разработчик',
        periodStart: new Date('2023-10-01'),
        periodEnd: null,
        achievements: [
          'Единственный разработчик проекта: полная ответственность за весь стек на MAUI, Blazor Server и Go-сервисах, от базы данных и бизнес-логики до UI/UX; архитектура эволюционировала от монолита к отдельным сервисам по мере роста нагрузки',
          'Спроектировал и реализовал систему точных мультивалютных вычислений для фиатных и криптовалютных операций, исключив накопление ошибок округления двоичной плавающей точки (IEEE 754)',
          'Покрыл денежные вычисления юнит-тестами (xUnit), устранив неточности округления на границах чисел с большим количеством знаков после запятой',
          'Спроектировал REST API для MAUI-клиентов и Blazor Server, включая гибридную схему авторизации через cookie и токены для разных типов клиентов',
          'Реализовал комплекс мер безопасности по стандартам OWASP: многопроходное хеширование паролей, шифрование и подпись чувствительных данных, защита от тайминг-атак и перебора, CSRF/XSS/SQL-инъекций, двухфакторная аутентификация (TOTP)',
          'Разработал на Go сервис парсинга банковских выписок, SMS и push-уведомлений со встроенным Lua-движком для подключения новых парсеров без остановки сервиса',
          'Реализовал двухуровневое логирование через Kafka с локальным фолбэком и автоматической досылкой данных после восстановления соединения',
          'Настроил межсервисное взаимодействие через gRPC с TLS-шифрованием для высоконагруженных сервисов',
          'Нагрузочным тестированием (k6) подтвердил отказоустойчивость системы: авторизация p95 ~300 мс, сервис парсинга выписок p95 ~600 мкс после смены стека',
          'Настроил мониторинг и трассировку через Prometheus, Grafana и Jaeger для быстрой локализации проблем производительности',
        ],
        profileId: profile.id,
      },
      {
        company: 'Адвокатская палата Донецкой Народной Республики',
        position: 'Fullstack-разработчик',
        periodStart: new Date('2022-02-01'),
        periodEnd: new Date('2023-08-31'),
        achievements: [
          'Единственный разработчик проекта: полная ответственность за сайт от серверной логики и работы с базой данных до интерфейса страниц',
          'Самостоятельно проектировал и внедрял новый функционал, адаптируя интерфейс под меняющиеся требования руководства',
          'Следил за стабильностью и производительностью системы, находил и устранял ошибки, оставшиеся от предыдущих версий проекта',
          'Переработал систему управления контентом, упростив публикацию материалов для сотрудников без технической подготовки',
        ],
        profileId: profile.id,
      },
    ],
  });

  await prisma.project.create({
    data: {
      name: 'Finance Manager',
      description:
        'Приложение для учёта личных финансов с мультивалютными вычислениями, микросервисной архитектурой и продвинутым мониторингом.',
      url: 'https://github.com/Juimun/finance-manager-docs',
      profileId: profile.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

import vkBrowserWorks from "./vkBrowserWorks.json";

export const siteContent = {
  company: {
    name: "TDH Studio",
    logoTop: "TDH",
    logoBottom: "DETAILING STUDIO",
    slogan: "Профессиональный детейлинг для вашего автомобиля",
    offer: "Мы заботимся о каждой детали вашего автомобиля, чтобы он выглядел безупречно.",
    city: "Горловка",
    address: "г. Горловка, ул. Остапенко 45А",
    shortAddress: "ул. Остапенко 45А",
    landmark: "Ориентир: территория бывшей заправки Extra",
    phone: "+7 (949) 335-95-42",
    phoneHref: "tel:+79493359542",
    person: "Yaroslav Dragunov",
    whatsappHref: "https://wa.me/79493359542",
    telegramHref: "https://t.me/yaroslav_dragunov",
    mapsHref:
      "https://yandex.ru/maps/?text=%D0%93%D0%BE%D1%80%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9E%D1%81%D1%82%D0%B0%D0%BF%D0%B5%D0%BD%D0%BA%D0%BE%2045%D0%90"
  },
  seo: {
    title: "TDH Studio | Детейлинг и автоуход в Горловке",
    description:
      "TDH Studio в Горловке: полировка кузова, перетяжка потолка, установка линз, защита фар, химчистка салона и сухой туман.",
    ogTitle: "TDH Studio — профессиональный детейлинг в Горловке",
    ogDescription:
      "Премиальный уход за автомобилем: кузов, салон, фары и интерьер."
  },
  navigation: [
    { label: "Услуги", href: "#services" },
    { label: "Преимущества", href: "#benefits" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contacts" }
  ],
  hero: {
    eyebrow: "Профессиональный",
    titleAccent: "детейлинг",
    titleRest: "для вашего автомобиля",
    subtitle:
      "Мы заботимся о каждой детали вашего автомобиля, чтобы он выглядел безупречно.",
    image: {
      src: "/images/heto.png",
      alt: "Автомобиль TDH Studio в шапке сайта"
    },
    stats: [
      { title: "Профессионалы", text: "Опытные мастера", icon: "user" },
      { title: "Качество", text: "Премиальные материалы", icon: "seal" },
      { title: "Гарантия", text: "На все виды работ", icon: "check" }
    ]
  },
  services: [
    {
      title: "Полировка кузова",
      description: "Обновляем блеск и удаляем мелкие царапины",
      price: "15 000–30 000 ₽",
      image: "/images/uslugi/1.png",
      alt: "Полировка кузова автомобиля"
    },
    {
      title: "Перетяжка потолков",
      description: "Перетяжка потолков автомобиля высококачественными материалами",
      price: "24 000–36 000 ₽",
      image: "/images/uslugi/2.png",
      alt: "Перетяжка потолка автомобиля"
    },
    {
      title: "Установка Bi-led линз",
      description: "Установка линз и bi-led линз для улучшения освещения",
      price: "25 000–45 000 ₽",
      image: "/images/uslugi/3.png",
      alt: "Установка Bi-led линз"
    },
    {
      title: "Полировка фар",
      description: "Крупная полировка фар и восстановление прозрачности",
      price: "2 500–5 000 ₽",
      image: "/images/uslugi/4.png",
      alt: "Полировка фар автомобиля"
    },
    {
      title: "Химчистка салона",
      description: "Профессиональная химчистка для чистоты и свежести вашего автомобиля",
      price: "По договорённости",
      image: "/images/uslugi/5.png",
      alt: "Химчистка салона автомобиля"
    },
    {
      title: "Сухой туман",
      description: "Устраним любые въевшиеся запахи: табак, животные, сырость и т.д.",
      price: "1 000–1 500 ₽",
      image: "/images/uslugi/6.png",
      alt: "Удаление запахов сухим туманом"
    }
  ],
  benefits: [
    {
      title: "Внимание к деталям",
      text: "Подходим к каждому автомобилю как к своему",
      icon: "search"
    },
    {
      title: "Современное оборудование",
      text: "Используем только профессиональное оборудование и качественную химию",
      icon: "lock"
    },
    {
      title: "Индивидуальный подход",
      text: "Учитываем все пожелания и особенности вашего авто",
      icon: "user"
    },
    {
      title: "Честные цены",
      text: "Доступные цены и прозрачная стоимость услуг",
      icon: "tag"
    }
  ],
  works: vkBrowserWorks
};







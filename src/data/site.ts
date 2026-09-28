export const site = {
  name: 'Uniacque per le scuole',
  shortName: 'Uniacque Edu',
  description:
    'Il portale educational di Uniacque: laboratori, visite guidate, formazione scuola-lavoro e area didattica per le scuole di Bergamo.',
  url: 'https://scuole.uniacque.bg.it',
  contactEmail: 'educational@uniacque.bg.it',
  privacyUrl: 'https://www.uniacque.bg.it/privacy-policy',
  cookieUrl: 'https://www.uniacque.bg.it/cookie-policy',
  partner: {
    name: 'Skillherz',
    url: 'https://skillherz.com',
    logo: '/logos/skillherz.svg',
  },
};

export const nav = [
  { label: 'Educational', href: '/educational' },
  { label: 'Water School', href: '/water-school' },
  { label: 'Area didattica', href: '/area-didattica' },
  { label: 'News', href: '/news' },
  { label: 'Contattaci', href: '#contatti' },
];

export const auth = {
  login: import.meta.env.PUBLIC_AUTH_LOGIN_URL || '#',
  register: import.meta.env.PUBLIC_AUTH_REGISTER_URL || '#',
};

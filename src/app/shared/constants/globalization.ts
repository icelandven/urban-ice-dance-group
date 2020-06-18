export interface Locale {
  Name: string;
  cod: string;
  default?: boolean;
}

export const DictionaryFormat = {
  en: {},
  es: {}
};

export const locales: Locale[] = [{
  Name: 'English',
  cod: 'en'
}, {
  Name: 'Español',
  cod: 'es',
  default: true,
}
];

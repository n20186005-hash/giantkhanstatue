export const siteConfig = {
  name: 'Chinggis Khaan Statue Complex',
  baseUrl: 'https://giantkhanstatue.com',
  slug: 'chinggis-khaan-statue-complex',
  locales: ['zh', 'en', 'ja', 'ko', 'mn', 'ru'] as const,
};

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
  mn: 'mn_MN',
  ru: 'ru_RU',
};

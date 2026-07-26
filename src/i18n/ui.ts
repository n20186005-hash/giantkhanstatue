import zh from './zh.json';
import en from './en.json';
import ja from './ja.json';
import ko from './ko.json';
import mn from './mn.json';
import ru from './ru.json';

export const defaultLang = 'mn';
export const languagesList = ['zh', 'en', 'ja', 'ko', 'mn', 'ru'] as const;

export const languages: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  mn: 'Монгол',
  ru: 'Русский',
};

const ui: Record<string, any> = { zh, en, ja, ko, mn, ru };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

export function buildAlternates(path = ''): Record<string, string> {
  const base = 'https://giantkhanstatue.com';
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const mk = (l: string) => `${base}/${l}${clean ? '/' + clean : ''}`;
  return {
    zh: mk('zh'),
    en: mk('en'),
    ja: mk('ja'),
    ko: mk('ko'),
    mn: mk('mn'),
    ru: mk('ru'),
    xDefault: mk('mn'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  return lang;
}

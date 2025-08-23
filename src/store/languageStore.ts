import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'zh-CN',
      setLanguage: (lang: string) => {
        set({ language: lang });
        i18n.changeLanguage(lang);
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// 监听 i18next 语言变化，同步到 Zustand store
i18n.on('languageChanged', (lng) => {
  const currentLang = useLanguageStore.getState().language;
  if (currentLang !== lng) {
    useLanguageStore.setState({ language: lng });
  }
});

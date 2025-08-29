import React from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";
import { useTranslation } from 'react-i18next';
import { LocalizedLink } from './LocalizedRoute';
import LanguageSwitcher from './LanguageSwitcher';

const NavigationDesktop: React.FC = () => {
  const { t } = useTranslation('common');
  
  // 在服务器端渲染时安全处理 location
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // 在服务器端创建一个默认的 location 对象
    location = { pathname: "/" };
  }

  // 获取去掉语言前缀的路径用于比较
  const getPathWithoutLang = (path: string) => {
    return path.replace(/^\/[a-z]{2}-[A-Z]{2}/, '') || '/';
  };

  const currentPath = getPathWithoutLang(location.pathname);

  return (
    <nav className="px-8 py-4 bg-gray-50 border-b border-gray-200 mb-8">
      <ul className="flex list-none m-0 p-0 gap-8 items-center">
        <li>
          <LocalizedLink
            to="/"
            className="text-xl font-bold text-blue-600 no-underline mr-auto"
          >
            {t('navigation.brand')}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              currentPath === "/"
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {t('navigation.home')}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/about"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              currentPath === "/about"
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {t('navigation.about')}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/contact"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              currentPath === "/contact"
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {t('navigation.contact')}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/unocss"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              currentPath === "/unocss"
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {t('navigation.unocss')}
          </LocalizedLink>
        </li>
        <li className="ml-auto">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

const NavigationMobile: React.FC = () => {
  return <div>NavigationMobile</div>;
};

export default function () {
  const { isSmOrMd } = useResponsive();
  return isSmOrMd ? <NavigationMobile /> : <NavigationDesktop />;
}

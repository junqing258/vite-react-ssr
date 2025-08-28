import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '../components/LocalizedRoute';
import UserStatus from "../components/UserStatus";

const About: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Helmet>
        <title>{t('about.title')}</title>
      </Helmet>
      <div className="container mx-auto px-4 md:px-0">
        <h1>{t('about.heading')}</h1>
        <p>
          {t('about.description')}
        </p>

        <h2>{t('about.techStack')}</h2>
        <ul>
          <li>
            <strong>Vite</strong> - {t('about.vite')}
          </li>
          <li>
            <strong>React 18</strong> - {t('about.react')}
          </li>
          <li>
            <strong>React Router</strong> - {t('about.router')}
          </li>
          <li>
            <strong>TypeScript</strong> - {t('about.typescript')}
          </li>
          <li>
            <strong>Express</strong> - {t('about.express')}
          </li>
        </ul>

        <h2>{t('about.features')}</h2>
        <ul>
          <li>{t('about.ssr')}</li>
          <li>{t('about.hydration')}</li>
          <li>{t('about.routing')}</li>
          <li>{t('about.hmr')}</li>
          <li>{t('about.tsSupport')}</li>
        </ul>

        <UserStatus />

        <div style={{ marginTop: "2rem" }}>
          <LocalizedLink to="/" style={{ color: "#646cff", textDecoration: "none" }}>
            {t('about.backToHome')}
          </LocalizedLink>
        </div>
      </div>
    </>
  );
};

export default About;

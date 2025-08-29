import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { LocalizedLink } from '../components/LocalizedRoute';

const Contact: React.FC = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.thankYouMessage'));
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')}</title>
        <meta
          name="description"
          content={t('contact.metaDescription')}
        />
        <meta name="keywords" content={t('contact.keywords')} />
        <meta property="og:title" content={t('contact.title')} />
        <meta
          property="og:description"
          content={t('contact.metaDescription')}
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <div className="container mx-auto px-4 md:px-0">
        <h1>{t('contact.heading')}</h1>
        <p>{t('contact.description')}</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              {t('contact.nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.namePlaceholder')}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              {t('contact.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.emailPlaceholder')}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="message"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              {t('contact.messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.messagePlaceholder')}
              required
              rows={5}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              backgroundColor: "#646cff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t('contact.submitButton')}
          </button>
        </form>

        <div style={{ marginTop: "2rem" }}>
          <LocalizedLink to="/" style={{ color: "#646cff", textDecoration: "none" }}>
            {t('contact.backToHome')}
          </LocalizedLink>
        </div>
      </div>
    </>
  );
};

export default Contact;

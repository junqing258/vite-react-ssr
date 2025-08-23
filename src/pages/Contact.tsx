import React from "react";
import { Link } from "react-router-dom";
import { usePageI18n } from "../hooks/useI18n";
import SEOHead from "../components/SEOHead";
import { getAlternateUrls } from "../utils/i18nRouting";

const Contact: React.FC = () => {
  const { t, tCommon, currentLanguage } = usePageI18n('contact');
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  // 生成多语言 URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/contact';
  const alternateUrls = getAlternateUrls(currentPath, typeof window !== 'undefined' ? window.location.origin : '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // 这里是演示，实际项目中会调用API
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={t('title')}
        description={t('description')}
        locale={currentLanguage}
        alternateLanguages={alternateUrls}
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <div className="container mx-auto px-4 md:px-0 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{t('heading')}</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              发送消息
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                {t('form.success')}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                {t('form.error')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('form.namePlaceholder')}
                  className="
                    w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder-gray-400 dark:placeholder-gray-500
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('form.emailPlaceholder')}
                  className="
                    w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder-gray-400 dark:placeholder-gray-500
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  className="
                    w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    resize-vertical placeholder-gray-400 dark:placeholder-gray-500
                  "
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                  text-white font-medium rounded-md transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-gray-800
                "
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              {t('info.title')}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{t('info.address')}</h3>
                <p>123 示例街道<br />示例城市，示例省 12345</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{t('info.phone')}</h3>
                <p>+86 123 4567 8900</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{t('info.email')}</h3>
                <p>contact@example.com</p>
              </div>
              
              <div>
                <p className="text-sm">{t('info.workingHours')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            ← {tCommon('common.back')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contact;

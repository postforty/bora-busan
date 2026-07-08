import { getTranslations, getLocale } from 'next-intl/server';

export default async function TermsOfServicePage() {
  const t = await getTranslations('Terms');
  const locale = await getLocale();

  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">{t('title')}</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>{t('last_updated')} {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>{t('description')}</p>
      </div>
    </div>
  );
}

import { getTranslations } from 'next-intl/server';

export default async function ContactUsPage() {
  const t = await getTranslations('Contact');

  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">{t('title')}</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>{t('subtitle')}</p>
        <p>{t('description')}</p>
        <div className="mt-8 p-6 bg-surface-variant/30 rounded-2xl border border-surface-variant">
          <h2 className="font-label-bold text-label-bold text-on-surface mb-2">{t('general')}</h2>
          <p className="text-primary hover:underline cursor-pointer">hello@borabusan.example.com</p>
        </div>
      </div>
    </div>
  );
}

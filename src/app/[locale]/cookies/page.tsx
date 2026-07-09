import { getTranslations, getLocale } from 'next-intl/server';
import PolicyPageTemplate from '@/components/layout/PolicyPageTemplate';

export default async function CookieSettingsPage() {
  const t = await getTranslations('Cookies');
  const locale = await getLocale();

  return (
    <PolicyPageTemplate 
      slug="cookies" 
      locale={locale} 
      fallbackTitle={t('title')} 
      fallbackDescription={t('description')}
      lastUpdatedLabel={t('last_updated')}
    />
  );
}

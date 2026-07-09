import { getTranslations, getLocale } from 'next-intl/server';
import PolicyPageTemplate from '@/components/layout/PolicyPageTemplate';

export default async function TermsOfServicePage() {
  const t = await getTranslations('Terms');
  const locale = await getLocale();

  return (
    <PolicyPageTemplate 
      slug="terms" 
      locale={locale} 
      fallbackTitle={t('title')} 
      fallbackDescription={t('description')}
      lastUpdatedLabel={t('last_updated')}
    />
  );
}

import { getTranslations, getLocale } from 'next-intl/server';
import PolicyPageTemplate from '@/components/layout/PolicyPageTemplate';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('Privacy');
  const locale = await getLocale();
  
  return (
    <PolicyPageTemplate 
      slug="privacy" 
      locale={locale} 
      fallbackTitle={t('title')} 
      fallbackDescription={t('description')} 
    />
  );
}

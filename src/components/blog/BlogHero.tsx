import { getTranslations } from "next-intl/server";

export default async function BlogHero() {
  const t = await getTranslations('BlogHero');

  return (
    <section className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mb-16 text-center">
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">{t('title')}</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
        {t('description')}
      </p>
    </section>
  );
}

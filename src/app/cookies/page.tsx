export default function CookieSettingsPage() {
  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">Cookie Settings</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>Our cookie policy and preferences center are currently under development. Bora Busan uses cookies to improve your experience on our site.</p>
      </div>
    </div>
  );
}

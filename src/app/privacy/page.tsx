export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">Privacy Policy</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>The privacy policy content is currently being drafted and will be updated soon. Bora Busan is committed to protecting your personal information and your right to privacy.</p>
      </div>
    </div>
  );
}

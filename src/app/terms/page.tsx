export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">Terms of Service</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>The terms of service are currently being drafted and will be updated soon. By using Bora Busan, you agree to comply with our community guidelines and rules.</p>
      </div>
    </div>
  );
}

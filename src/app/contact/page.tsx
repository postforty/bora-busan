export default function ContactUsPage() {
  return (
    <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <h1 className="font-display-md text-display-md text-on-surface mb-8">Contact Us</h1>
      <div className="text-on-surface-variant font-body-lg space-y-4">
        <p>We would love to hear from you!</p>
        <p>Our official contact channels are currently being set up. In the meantime, please reach out to our administration team for any inquiries.</p>
        <div className="mt-8 p-6 bg-surface-variant/30 rounded-2xl border border-surface-variant">
          <h2 className="font-label-bold text-label-bold text-on-surface mb-2">General Inquiries</h2>
          <p className="text-primary hover:underline cursor-pointer">hello@borabusan.example.com</p>
        </div>
      </div>
    </div>
  );
}

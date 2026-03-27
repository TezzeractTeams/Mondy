export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3F0] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl w-full flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-black/5 pb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-xs font-semibold tracking-wider uppercase w-max mb-2">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1A17]">Privacy Policy</h1>
          <p className="text-black/60 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Content Section */}
        <div className="w-full text-[#1C1A17] flex flex-col gap-10 leading-relaxed text-lg">
          
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Introduction</h2>
            <p className="opacity-80">
              Welcome to Mondy.ai ("The Curated Sanctuary"). We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
              and use our services.
            </p>
            <p className="opacity-80">
              Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Information We Collect</h2>
            <p className="opacity-80">
              We collect personal information that you voluntarily provide to us when you register on the website, 
              express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
            </p>
            <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
              <li><strong>Personal Info Provided by You:</strong> Names, phone numbers, email addresses, mailing addresses, and similar content.</li>
              <li><strong>Payment Data:</strong> All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">3. How We Use Your Information</h2>
            <p className="opacity-80">
              We use personal information collected via our website for a variety of business purposes described below. 
              We process your personal information for these purposes in reliance on our legitimate business interests, 
              in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Contact Us</h2>
            <p className="opacity-80">
              If you have questions or comments about this notice, you may email us at{" "}
              <a href="mailto:hello@mondy.ai" className="text-blue-600 hover:underline">hello@mondy.ai</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

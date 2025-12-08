// app/privacy/page.tsx
import React from "react";

export const metadata = {
  title: "Privacy Policy - PreeRoute",
  description: "Privacy policy for PreeRoute — how we collect, use and protect your data.",
};

export default function page(): JSX.Element {
  return (
    <main className="min-h-screen px-4 py-12 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-600">
            Last updated: <strong>{new Date().toLocaleDateString()}</strong>
          </p>
        </header>

        <section className="mb-8 p-6 border rounded-lg bg-slate-50">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p className="leading-relaxed text-slate-700">
            Welcome to <strong>PreeRoute</strong>. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our website and services.
            Please read it carefully. By using our services you agree to the collection and use
            of information in accordance with this policy.
          </p>
        </section>

        <nav className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Contents</h3>
          <ul className="space-y-1 text-slate-600">
            <li><a href="#data-we-collect" className="underline">Data we collect</a></li>
            <li><a href="#how-we-use-data" className="underline">How we use data</a></li>
            <li><a href="#cookies" className="underline">Cookies & similar technologies</a></li>
            <li><a href="#third-parties" className="underline">Third-party services</a></li>
            <li><a href="#security" className="underline">Security</a></li>
            <li><a href="#children" className="underline">Children's privacy</a></li>
            <li><a href="#changes" className="underline">Changes to this policy</a></li>
            <li><a href="#contact" className="underline">Contact us</a></li>
          </ul>
        </nav>

        <section id="data-we-collect" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Data we collect</h3>
          <p className="leading-relaxed text-slate-700 mb-2">
            We may collect the following categories of information:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-1">
            <li><strong>Personal Information:</strong> name, email, phone number, billing details (when you purchase a plan).</li>
            <li><strong>Account Data:</strong> username, profile preferences, subscription status, exam results.</li>
            <li><strong>Usage Data:</strong> pages visited, actions taken, time spent, device and browser information, IP address.</li>
            <li><strong>Payment Data:</strong> order IDs and minimal payment metadata (we do not store full card details — payments are processed by payment providers).</li>
          </ul>
        </section>

        <section id="how-we-use-data" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">How we use data</h3>
          <ul className="list-disc pl-6 text-slate-700 space-y-1">
            <li>To provide and maintain the service, including account management and content delivery.</li>
            <li>To process payments and manage subscriptions.</li>
            <li>To communicate with you (notifications, support, marketing where you consent).</li>
            <li>To analyze usage and improve our product and features.</li>
            <li>To detect, prevent and address technical or security issues.</li>
          </ul>
        </section>

        <section id="cookies" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Cookies & similar technologies</h3>
          <p className="leading-relaxed text-slate-700">
            We use cookies, local storage and similar technologies to personalize your experience,
            remember preferences, and for analytics. You can control cookies via your browser
            settings — note this may impact site functionality.
          </p>
        </section>

        <section id="third-parties" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Third-party services</h3>
          <p className="leading-relaxed text-slate-700 mb-2">
            We may share information with third-party providers who perform services on our behalf,
            such as payment processors (e.g., Razorpay), analytics, email delivery, and hosting.
            These providers have their own privacy practices — please review them before using the services.
          </p>
        </section>

        <section id="security" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Security</h3>
          <p className="leading-relaxed text-slate-700">
            We take reasonable measures to protect your information. However, no method of transmission
            or storage is 100% secure. If you suspect a security breach, contact us immediately.
          </p>
        </section>

        <section id="children" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Children's privacy</h3>
          <p className="leading-relaxed text-slate-700">
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children. If you believe we have collected such data, please contact us
            so we can delete it.
          </p>
        </section>

        <section id="changes" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Changes to this policy</h3>
          <p className="leading-relaxed text-slate-700">
            We may update this policy from time to time. When changes are significant, we will provide
            a prominent notice. Continued use after changes means you accept the updated policy.
          </p>
        </section>

        <section id="contact" className="mb-12">
          <h3 className="text-xl font-semibold mb-2">Contact us</h3>
          <p className="leading-relaxed text-slate-700 mb-3">
            If you have any questions about this Privacy Policy, contact us at:
          </p>
          <p className="text-slate-800 font-medium">support@yourdomain.com</p>
          <p className="text-sm text-slate-600 mt-2">
            Replace the email above with your support/contact email.
          </p>
        </section>

        <footer className="py-6 text-center text-sm text-slate-500 border-t">
          © {new Date().getFullYear()} PreeRoute. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

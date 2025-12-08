import React from "react";

export const metadata = {
  title: "Terms & Conditions - YourAppName",
  description: "Terms and conditions for using YourAppName services.",
};

export default function Page() {
  return (
    <main className="min-h-screen px-5 py-12 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-sm text-slate-600 mb-8">
          Last updated: <strong>{new Date().toLocaleDateString()}</strong>
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to <strong>YourAppName</strong>. By accessing or using our
            website, mobile app or services, you agree to these Terms &
            Conditions. Please read them carefully. If you do not agree, you
            must stop using our services immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. Use of Our Services</h2>
          <p>By using our platform, you agree that:</p>
          <ul className="list-disc pl-6">
            <li>You are at least 13 years old.</li>
            <li>You will not misuse or exploit the platform.</li>
            <li>You will not attempt to harm, hack, or disrupt the service.</li>
            <li>You will provide correct and valid information during signup.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">3. Accounts & Security</h2>
          <ul className="list-disc pl-6">
            <li>You are responsible for maintaining your account confidentiality.</li>
            <li>
              You agree to notify us immediately if you suspect unauthorized
              access to your account.
            </li>
            <li>We reserve the right to suspend or terminate accounts.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">4. Payments & Refunds</h2>
          <p>
            If you purchase any subscription or premium content, you agree to pay
            the applicable charges. Refunds are provided only where required by
            law or explicitly mentioned in our refund policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6">5. Content Ownership</h2>
          <p>
            All content, logos, UI/UX, images, and text are owned by{" "}
            <strong>YourAppName</strong>. Copying, redistributing, or selling any
            content is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold mt-6">6. Prohibited Activities</h2>
          <ul className="list-disc pl-6">
            <li>Reverse engineering or cloning the platform.</li>
            <li>Uploading harmful code, viruses, or unauthorized scripts.</li>
            <li>Using automated scripts or bots.</li>
            <li>Harassing or abusing other users.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">7. Limitation of Liability</h2>
          <p>
            We are not responsible for any damages, data loss, or harm caused by:
          </p>
          <ul className="list-disc pl-6">
            <li>Service interruptions</li>
            <li>User mistakes</li>
            <li>Third-party services or integrations</li>
            <li>Unauthorized account access</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">8. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of
            our services means you accept the updated terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, contact us at:
            <br />
            <strong>support@yourdomain.com</strong>
          </p>
        </section>

        <footer className="text-center text-sm text-slate-500 mt-12 border-t pt-6">
          © {new Date().getFullYear()} YourAppName. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

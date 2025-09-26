// src/pages/TermsOfServicePage.jsx

function TermsOfServicePage() {
  return (
    <div className="bg-bg text-text py-12 sm:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* --- Wrapper for Background and Shadow --- */}
        <div className="bg-white dark:bg-card-bg shadow-xl dark:shadow-2xl rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400">Last Updated: September 24, 2025</p>
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none space-y-8">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the https://curiouslabacademy.com website (the "Service") operated by CuriousLab Academy ("us", "we", or "our"). Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
              <p>
                By enrolling a student or using our Service, you, as the parent or legal guardian, agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">2. Enrollment and Accounts</h2>
              <p>
                When you enroll a child in a course, you guarantee that you are over the age of 18 and that the information you provide is accurate, complete, and current. You are responsible for safeguarding any password you may use to access the Service and for any activities or actions under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">3. Payments and Refunds</h2>
              <p>
               All fees for courses are due at the time of enrollment. Subsequent fees will be billed at monthly intervals, with payment due at the end of each one-month period. Payment details are processed securely through our trusted payment processor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">4. Code of Conduct</h2>
              <p>
                We expect all students and parents to maintain a respectful and positive learning environment. The following conduct is prohibited:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Disruptive or disrespectful behavior towards instructors or other students.</li>
                <li>Sharing or distributing course materials without our explicit permission.</li>
                <li>Using any language that is abusive, harassing, or discriminatory.</li>
              </ul>
               <p>Violation of this code of conduct may result in termination of your access to our services without a refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
              <p>
                The Service and its original content, including all course materials, videos, text, graphics, and logos, are and will remain the exclusive property of CuriousLab Academy. Our materials are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
              <p>
                In no event shall CuriousLab Academy, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">8. Changes to These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p><strong>Email:</strong> <a href="mailto:support@curiouslabacademy.com" className="text-primary hover:underline">support@curiouslabacademy.com</a></p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
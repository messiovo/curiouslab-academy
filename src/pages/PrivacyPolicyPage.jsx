// src/pages/PrivacyPolicyPage.jsx

function PrivacyPolicyPage() {
  return (
     <div className="bg-bg text-text py-12 sm:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* --- New Wrapper for Background and Shadow --- */}
        <div className="bg-white dark:bg-card-bg shadow-xl dark:shadow-2xl rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400">Last Updated: September 24, 2025</p>
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none space-y-8">
            <p>
              Welcome to CuriousLab Academy ("we," "our," "us"). We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This Privacy Policy explains how we collect, use, share, and protect your information when you visit our website, enroll in our courses, or otherwise interact with us.
            </p>

            <section>
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              <p>We collect information to provide and improve our services. The types of information we collect are:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Parent/Guardian Information:</strong> When you enroll a child, we collect your full name, email address, phone number, country of residence, and relationship to the student.
                </li>
                <li>
                  <strong>Student Information:</strong> We collect the student's full name, age, current grade level, and optional interests to tailor their learning experience. We only collect this information with your explicit parental consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Process and manage your child's enrollment in our courses.</li>
                <li>Communicate with you about class schedules, progress, and other administrative matters.</li>
                <li>Send you newsletters, updates, and promotional materials, if you opt-in to receive them.</li>
              </ul>
            </section>

          <section>
            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Process and manage your child's enrollment in our courses.</li>
              <li>Communicate with you about class schedules, progress, and other administrative matters.</li>
              <li>Send you newsletters, updates, and promotional materials, if you opt-in to receive them.</li>
              <li>Personalize and improve our course offerings and website experience.</li>
              <li>Respond to your comments, questions, and requests for support.</li>
              <li>Ensure the security of our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">3. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                    <strong>With Instructors:</strong> We share necessary student information with our instructors to enable them to conduct classes effectively.
                </li>
                <li>
                    <strong>With Service Providers:</strong> We may share information with third-party vendors and services that help us operate our business (e.g., email delivery services). These providers are contractually obligated to protect your data.
                </li>
                <li>
                    <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">4. Data Security</h2>
            <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee its absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold">5. Your Data Protection Rights</h2>
            <p>
                In accordance with the Nigeria Data Protection Act (NDPA) and other applicable regulations, you have certain rights regarding your personal data. These rights include:
            </p>
             <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right to object to our processing of your personal data.</li>
                <li>The right to withdraw your consent at any time where we relied on your consent to process your information.</li>
             </ul>
             <p>To exercise any of these rights, please contact us using the details below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">6. Children's Privacy</h2>
            <p>
                We are committed to protecting the privacy of children. We only collect personal information about children through the direct consent of a parent or guardian during the enrollment process. We do not knowingly collect information from children under the age of 13 without parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date at the top.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">8. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p><strong>Email:</strong> <a href="mailto:info@curiouslabacademy.com" className="text-primary hover:underline">info@curiouslabacademy.com</a></p>
          </section>

        </div>
      </div>
    </div>
     </div>
  );
}

export default PrivacyPolicyPage;
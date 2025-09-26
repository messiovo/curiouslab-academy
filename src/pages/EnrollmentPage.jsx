// src/pages/EnrollmentPage.jsx

import EnrollmentForm from '../components/EnrollmentForm'; 
import CtaSection from '../components/CtaSection';

function EnrollmentPage() {
  return (
    <div>
     
      <EnrollmentForm />
      <CtaSection
              title="Have questions about enrollment? Our team is happy to help!"
              primaryBtnText="Contact Us"
              primaryBtnLink="/contact"
              secondaryBtnText="View Courses"
              secondaryBtnLink="/courses"
            />
    </div>
  );
}

export default EnrollmentPage;
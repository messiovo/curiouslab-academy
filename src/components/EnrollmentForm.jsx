import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { coursesData } from '../data/courses'; // Adjust path if needed

// A reusable component for each step in the form
const FormStep = ({ number, title, children }) => (
  <div className="flex flex-col sm:flex-row gap-6 mb-10">
    <div className="flex items-center sm:items-start">
      <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      <div className="sm:hidden ml-4">
        <h3 className="text-xl font-bold text-text">{title}</h3>
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-text hidden sm:block mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

// The main form component
const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    parentName: '',
    parentEmail: '',
    termsAgree: false,
  });

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCourses((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedCourses.length === 0) newErrors.courses = 'Please select at least one course.';
    if (!formData.studentName) newErrors.studentName = 'Student name is required.';
    if (!formData.parentName) newErrors.parentName = 'Parent name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) newErrors.parentEmail = 'A valid email is required.';
    if (!formData.termsAgree) newErrors.termsAgree = 'You must agree to the terms.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmissionStatus('sending');
      // --- EmailJS logic would go here ---
      console.log("Submitting form...");
      // Simulate network request for demonstration
      setTimeout(() => {
        setSubmissionStatus('success');
      }, 2000);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-3xl font-bold text-primary mb-4">Enrollment Submitted! ✅</h2>
        <p className="text-lg text-text">
          Thank you, {formData.parentName}. A confirmation for {formData.studentName} has been sent to <strong>{formData.parentEmail}</strong>.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-bg py-12 sm:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* --- New Wrapper for Background and Shadow --- */}
        <div className="bg-white dark:bg-card-bg shadow-xl dark:shadow-2xl rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text">Enroll Your Child</h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Complete the form below to secure a spot in our exciting programs.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Course Selection */}
            <FormStep number="1" title="Choose Your Course(s)">
              <div className="space-y-4">
                {coursesData.map((course) => (
                  <label key={course.id} htmlFor={course.id} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      id={course.id}
                      value={course.id}
                      onChange={handleCourseChange}
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    {/* --- Price removed from here --- */}
                    <span className="ml-4 flex-grow text-md font-medium text-text">{course.title}</span>
                  </label>
                ))}
              </div>
              {errors.courses && <p className="text-red-500 text-sm mt-1">{errors.courses}</p>}
    
            </FormStep>

            {/* Step 2: Student & Guardian Details */}
            <FormStep number="2" title="Student & Guardian Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="studentName" className="font-semibold text-text">Student's Full Name</label>
                  <input type="text" id="studentName" name="studentName" onChange={handleChange} className="mt-2 w-full p-3 bg-white dark:bg-gray-800 text-text border border-gray-300 dark:border-gray-600 rounded-md transition-shadow focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none" />
                  {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
                </div>
                <div>
                  <label htmlFor="parentName" className="font-semibold text-text">Parent's Full Name</label>
                  <input type="text" id="parentName" name="parentName" onChange={handleChange} className="mt-2 w-full p-3 bg-white dark:bg-gray-800 text-text border border-gray-300 dark:border-gray-600 rounded-md transition-shadow focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none" />
                  {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
                </div>
                <div>
                  <label htmlFor="parentEmail" className="font-semibold text-text">Parent's Email Address</label>
                  <input type="email" id="parentEmail" name="parentEmail" onChange={handleChange} className="mt-2 w-full p-3 bg-white dark:bg-gray-800 text-text border border-gray-300 dark:border-gray-600 rounded-md transition-shadow focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none" />
                  {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
                </div>
              </div>
            </FormStep>

            {/* Step 3: Submission */}
            <FormStep number="3" title="Review & Submit">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start">
                  <input type="checkbox" id="termsAgree" name="termsAgree" onChange={handleChange} className="h-5 w-5 mt-1 rounded text-primary focus:ring-primary" />
                  <label htmlFor="termsAgree" className="ml-3 text-text">
                    I agree to the <a href="/terms-of-service" className="font-semibold text-primary hover:underline">Terms of Service</a> and Privacy Policy.
                  </label>
                </div>
                {errors.termsAgree && <p className="text-red-500 text-sm mt-1 ml-8">{errors.termsAgree}</p>}
              </div>

              {submissionStatus === 'error' && (
                <p className="text-center text-red-500 mt-6">
                  Submission failed. Please check your details and try again.
                </p>
              )}

              <button type="submit" disabled={submissionStatus === 'sending'} className="w-full mt-8 bg-primary text-white font-bold py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                {submissionStatus === 'sending' ? 'Submitting...' : 'Complete Enrollment'}
              </button>
            </FormStep>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
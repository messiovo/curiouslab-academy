import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { submitApplication } from '../firebase/application';

const CareersPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    coverLetter: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (validTypes.includes(fileType)) {
        if (selectedFile.size > 10 * 1024 * 1024) {
          setError('File size must be less than 10MB');
          setFile(null);
          return;
        }
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or DOCX file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.experience) {
      setError('Please fill in all required fields');
      return;
    }

    if (!file) {
      setError('Please upload your resume');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress('Creating your application...');

    try {
      setUploadProgress('Uploading your resume...');
      const result = await submitApplication(formData, file);
      
      setUploadProgress('Processing with AI...');
      console.log('Application submitted successfully:', result.applicantId);
      
      setTimeout(() => {
        setSuccess(true);
        setUploading(false);
        setUploadProgress('');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          linkedIn: '',
          portfolio: '',
          experience: '',
          coverLetter: ''
        });
        setFile(null);
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
      console.error('Application submission error:', err);
      setUploading(false);
      setUploadProgress('');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--color-card-bg)] rounded-lg shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            Application Submitted!
          </h2>
          <p className="text-[var(--color-text)] opacity-80 mb-6">
            Thank you for applying. Your resume is being analyzed by our AI screening system. 
            This typically takes 1-2 minutes. We'll notify you via email once the review is complete.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
            Social Media Manager
          </h1>
          <div className="inline-block bg-[var(--color-secondary)] text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Intern/ Part-time (4 days/week) • ₦50,000/month • Remote/Hybrid
          </div>
          <p className="text-[var(--color-text)] opacity-80 max-w-2xl mx-auto">
            We're looking for a creative and data-driven Social Media Manager to grow our brand's online presence across YouTube, TikTok, Twitter (X), Facebook, Instagram, and LinkedIn.
          </p>
        </div>

        <div className="bg-[var(--color-card-bg)] rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">About the Role</h2>
          <div className="space-y-6 text-[var(--color-text)] opacity-90">
            <div>
              <h3 className="font-semibold mb-2">Key Responsibilities:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create, schedule, and publish engaging posts across multiple platforms</li>
                <li>Manage short-form video content for TikTok, Instagram Reels, and YouTube Shorts</li>
                <li>Record or edit voice-overs for explainer videos, tutorials, or campaign content</li>
                <li>Monitor comments, DMs, and community engagement</li>
                <li>Track performance analytics and prepare weekly reports</li>
                <li>Collaborate with the team to align posts with brand campaigns, events, and product launches</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Required Skills & Tools:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Canva / Adobe Express</strong> → Graphics, posters, thumbnails</li>
                <li><strong>CapCut / Adobe Premiere Rush</strong> → Short-form video editing (TikTok, Reels, Shorts)</li>
                <li><strong>Audio editing & Voice-over tools</strong> (e.g., Audacity, Descript, or built-in tools)</li>
                <li><strong>Hootsuite / Buffer / Later / Notion Calendar</strong> → Social media scheduling</li>
                <li><strong>Google Analytics / Meta Business Suite / LinkedIn Analytics</strong> → Tracking engagement</li>
                <li><strong>Copywriting</strong> → Writing catchy captions and hashtags</li>
                <li><strong>Basic SEO / Hashtag Research Tools</strong> (TubeBuddy, Hashtagify)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Preferred Qualifications:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>1–3 years of experience managing multi-channel social accounts</li>
                <li>Strong portfolio of past campaigns/posts</li>
                <li>Ability to do voice-overs for videos</li>
                <li>Knowledge of current social media trends</li>
                <li>Ability to create and manage content calendars in Notion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-card-bg)] rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Apply Now</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {uploading && uploadProgress && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6 flex items-center gap-3">
              <Loader className="w-5 h-5 animate-spin" />
              <span>{uploadProgress}</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[var(--color-text)] font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text)] font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[var(--color-text)] font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                  placeholder="070 30-00-0000"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text)] font-medium mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--color-text)] font-medium mb-2">
                Portfolio/Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                disabled={uploading}
                className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div>
              <label className="block text-[var(--color-text)] font-medium mb-2">
                Years of Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                disabled={uploading}
                className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                required
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--color-text)] font-medium mb-2">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                disabled={uploading}
                rows="4"
                className="w-full px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none disabled:opacity-50"
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>

            <div>
              <label className="block text-[var(--color-text)] font-medium mb-2">
                Resume (PDF or DOCX) *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label
                  htmlFor="resume-upload"
                  className={`flex items-center justify-center w-full px-4 py-8 bg-[var(--color-bg)] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2" />
                    <p className="text-[var(--color-text)] font-medium">
                      {file ? file.name : 'Click to upload resume'}
                    </p>
                    <p className="text-[var(--color-text)] opacity-60 text-sm mt-1">
                      PDF or DOCX (max 10MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading && <Loader className="w-5 h-5 animate-spin" />}
              {uploading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-[var(--color-card-bg)] shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            How Our AI Screening Works
          </h3>
          <p className="text-[var(--color-text)] opacity-80 text-sm mb-3">
            After you submit your application, our AI-powered system will:
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-text)] opacity-80">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] font-bold">1.</span>
              <span>Extract and analyze your resume content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] font-bold">2.</span>
              <span>Evaluate your qualifications against the job requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] font-bold">3.</span>
              <span>Generate a detailed evaluation with strengths, areas for improvement, and a fit score</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] font-bold">4.</span>
              <span>Provide recommendations for next steps in the hiring process</span>
            </li>
          </ul>
          <p className="text-[var(--color-text)] opacity-60 text-xs mt-4">
            Note: This is an automated initial screening. Promising candidates will be contacted for further review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
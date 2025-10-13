import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Calendar,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { subscribeToApplicants } from '../firebase/application';

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference or saved preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToApplicants((data) => {
      setApplicants(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'screened':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'STRONG_FIT':
        return 'bg-green-500 text-white dark:bg-green-600';
      case 'GOOD_FIT':
        return 'bg-blue-500 text-white dark:bg-blue-600';
      case 'MAYBE':
        return 'bg-yellow-500 text-white dark:bg-yellow-600';
      case 'NOT_FIT':
        return 'bg-red-500 text-white dark:bg-red-600';
      default:
        return 'bg-gray-500 text-white dark:bg-gray-600';
    }
  };

  const getRecommendationLabel = (recommendation) => {
    return recommendation?.replace('_', ' ') || 'N/A';
  };

  const filteredApplicants = applicants.filter(applicant => {
    if (filterStatus === 'all') return true;
    return applicant.status === filterStatus;
  });

  const stats = {
    total: applicants.length,
    screened: applicants.filter(a => a.status === 'screened').length,
    pending: applicants.filter(a => a.status === 'pending').length,
    errors: applicants.filter(a => a.status === 'error').length,
    strongFit: applicants.filter(a => a.evaluation?.recommendation === 'STRONG_FIT').length
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">AI-powered resume screening results</p>
          </div>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Screened</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.screened}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Errors</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.errors}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Strong Fit</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.strongFit}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4 transition-colors duration-200">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('screened')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'screened' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Screened ({stats.screened})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilterStatus('error')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'error' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Errors ({stats.errors})
            </button>
          </div>
        </div>

        {/* Applicants List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fit Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Recommendation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-300 font-semibold">
                              {applicant.fullName?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {applicant.fullName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{applicant.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(applicant.appliedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(applicant.status)}`}>
                          {applicant.status?.toUpperCase()}
                        </span>
                        {applicant.emailSent && (
                          <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
                            ✉ EMAIL SENT
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {applicant.evaluation?.fit_score !== undefined ? (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                                style={{ width: `${applicant.evaluation.fit_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {applicant.evaluation.fit_score}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {applicant.evaluation?.recommendation ? (
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getRecommendationColor(applicant.evaluation.recommendation)}`}>
                            {getRecommendationLabel(applicant.evaluation.recommendation)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedApplicant.fullName}
                  </h2>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(selectedApplicant.status)}`}>
                      {selectedApplicant.status?.toUpperCase()}
                    </span>
                    {selectedApplicant.evaluation?.recommendation && (
                      <span className={`px-3 py-1 text-sm font-semibold rounded ${getRecommendationColor(selectedApplicant.evaluation.recommendation)}`}>
                        {getRecommendationLabel(selectedApplicant.evaluation.recommendation)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedApplicant.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {selectedApplicant.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedApplicant.phone}</span>
                  </div>
                  {selectedApplicant.linkedIn && (
                    <div className="flex items-center gap-2 text-sm">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                      <a href={selectedApplicant.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {selectedApplicant.portfolio && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={selectedApplicant.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Portfolio
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Experience: {selectedApplicant.experience}</span>
                  </div>
                  {selectedApplicant.resumeURL && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <a href={selectedApplicant.resumeURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        Download Resume <Download className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Evaluation */}
              {selectedApplicant.evaluation && (
                <div className="space-y-6">
                  {/* Fit Score */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fit Score</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all"
                          style={{ width: `${selectedApplicant.evaluation.fit_score}%` }}
                        />
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedApplicant.evaluation.fit_score}/100
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  {selectedApplicant.evaluation.summary && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h3>
                      <p className="text-gray-700 dark:text-gray-300">{selectedApplicant.evaluation.summary}</p>
                    </div>
                  )}

                  {/* Strengths */}
                  {selectedApplicant.evaluation.strengths && selectedApplicant.evaluation.strengths.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Strengths</h3>
                      <ul className="space-y-2">
                        {selectedApplicant.evaluation.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {selectedApplicant.evaluation.weaknesses && selectedApplicant.evaluation.weaknesses.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Areas for Improvement</h3>
                      <ul className="space-y-2">
                        {selectedApplicant.evaluation.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Experience */}
                  {selectedApplicant.evaluation.key_experience && selectedApplicant.evaluation.key_experience.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Experience</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {selectedApplicant.evaluation.key_experience.map((exp, idx) => (
                          <li key={idx}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Red Flags */}
                  {selectedApplicant.evaluation.red_flags && selectedApplicant.evaluation.red_flags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Red Flags</h3>
                      <ul className="space-y-2">
                        {selectedApplicant.evaluation.red_flags.map((flag, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-red-700 dark:text-red-400">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interview Focus */}
                  {selectedApplicant.evaluation.interview_focus && selectedApplicant.evaluation.interview_focus.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interview Focus Areas</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {selectedApplicant.evaluation.interview_focus.map((focus, idx) => (
                          <li key={idx}>{focus}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplicant.coverLetter && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cover Letter</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-700 p-4 rounded">
                    {selectedApplicant.coverLetter}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
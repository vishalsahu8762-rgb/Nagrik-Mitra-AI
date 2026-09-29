import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Mic,
  GraduationCap,
  FileCheck2,
  Briefcase,
  BookOpen,
  HeartHandshake,
  FileText,
  ArrowRight,
  Bot,
  AlertCircle,
  FolderLock,
  Sparkles,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { mockUser, mockApplications, mockGrievances, mockDocuments } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/assistant?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const handleSpeakClick = () => {
    setIsListening(true);
    toast.info('Voice Input Activated', 'Bolo, main sun raha hoon... Example: "Mujhe scholarship ke liye apply karna hai"');
    setTimeout(() => {
      setQuery('Mujhe scholarship ke liye apply karna hai');
      setIsListening(false);
      toast.success('Voice Recognized', 'Query filled: "Mujhe scholarship ke liye apply karna hai"');
    }, 1500);
  };

  const popularServices = [
    {
      id: 'scholarships',
      name: 'Scholarships',
      desc: 'Post-matric, merit & minority student financial aid',
      icon: GraduationCap,
      action: () => navigate('/services?query=Scholarship'),
    },
    {
      id: 'certificates',
      name: 'Certificates',
      desc: 'Income, caste, domicile & DigiLocker records',
      icon: FileCheck2,
      action: () => navigate('/documents'),
    },
    {
      id: 'employment',
      name: 'Employment',
      desc: 'Skill training, rural livelihoods & job registrations',
      icon: Briefcase,
      action: () => navigate('/services?query=Skill'),
    },
    {
      id: 'education',
      name: 'Education',
      desc: 'School welfare, textbooks & admission assistance',
      icon: BookOpen,
      action: () => navigate('/services?query=Education'),
    },
    {
      id: 'welfare',
      name: 'Welfare Schemes',
      desc: 'PM Kisan, Ayushman Bharat, PMAY Housing & APY',
      icon: HeartHandshake,
      action: () => navigate('/services'),
    },
    {
      id: 'track',
      name: 'Track Application',
      desc: 'Check live status of your submitted requests',
      icon: FileText,
      action: () => navigate('/applications'),
    },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-2">
      {/* 1. Welcoming Citizen Greeting */}
      <section className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Good morning, Rajesh</span>
          <span className="text-2xl">👋</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Welcome to Nagrik Mitra. What do you need help with today?
        </p>
      </section>

      {/* 2. ONE Primary Service-Search Area (Main Visual Focus) */}
      <section>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <label htmlFor="service-search-input" className="block text-lg font-semibold text-slate-900 mb-3">
            How can we help you?
          </label>

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="service-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Example: Mujhe scholarship ke liye apply karna hai"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  icon={Mic}
                  onClick={handleSpeakClick}
                  className={isListening ? 'border-teal-600 text-teal-800' : ''}
                >
                  {isListening ? 'Listening...' : 'Speak'}
                </Button>
                <Button type="submit" variant="primary" size="lg" icon={Search}>
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Suggestions below the input */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Suggestions:</span>
              {[
                'PM Kisan installment',
                'Ayushman Golden Card',
                'Post-Matric Scholarship',
                'Ration Card status',
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    navigate(`/assistant?query=${encodeURIComponent(term)}`);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* 3. Popular Services Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Popular Services</h2>
          <Link to="/services" className="text-xs sm:text-sm text-teal-700 hover:text-teal-800 font-semibold">
            All Services →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={svc.action}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-teal-700 group-hover:bg-teal-50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. My Applications Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">My Applications</h2>
          <Link to="/applications" className="text-xs sm:text-sm text-teal-700 hover:text-teal-800 font-semibold">
            View All ({mockApplications.length}) →
          </Link>
        </div>

        <div className="space-y-3">
          {mockApplications.map((app) => {
            const progressPercent = Math.round(((app.stepIndex + 1) / app.steps.length) * 100);

            return (
              <div
                key={app.id}
                onClick={() => navigate(`/applications/${app.id}`)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <h3 className="text-base font-bold text-slate-900">
                      {app.serviceName}
                    </h3>
                    <StatusBadge status={app.status} size="sm" />
                  </div>

                  {/* Clean, Simple Progress Indicator */}
                  <div className="max-w-xs space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span className="font-semibold text-slate-800">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-700 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:justify-end shrink-0">
                  <span className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1">
                    <span>View Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Helpful Service Guide Box (AI Assistant) */}
      <section>
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Need help finding the right service?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Nagrik Mitra can guide you step by step in simple everyday words.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Bot}
            onClick={() => navigate('/assistant')}
            className="shrink-0 w-full sm:w-auto"
          >
            Ask Nagrik Mitra
          </Button>
        </div>
      </section>

      {/* 6. Secondary Summary Information (Quiet, Subtle at the bottom) */}
      <section className="pt-2">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Your Records:</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/applications')}
              className="hover:text-slate-900 transition-colors"
            >
              {mockApplications.length} Applications
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/documents')}
              className="hover:text-slate-900 transition-colors"
            >
              {mockDocuments.length} DigiLocker Documents
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/grievances')}
              className="hover:text-slate-900 transition-colors"
            >
              {mockGrievances.length} Grievances
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

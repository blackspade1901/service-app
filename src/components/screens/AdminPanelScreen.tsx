import { 
  Shield, CheckCircle, XCircle, Clock, Search, 
  FileText, Eye, Users, TrendingUp, AlertTriangle, Sparkles,
  Image as ImageIcon, User, MapPin, Phone, Mail, Briefcase
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const mockProviders = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@plumbing.com', 
    service: 'Plumber', 
    status: 'pending',
    submittedDate: '2026-02-03',
    docsCount: 4
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@electric.com', 
    service: 'Electrician', 
    status: 'approved',
    submittedDate: '2026-02-01',
    docsCount: 4
  },
  { 
    id: 3, 
    name: 'Mike Williams', 
    email: 'mike@cleaning.com', 
    service: 'Cleaner', 
    status: 'rejected',
    submittedDate: '2026-01-30',
    docsCount: 3
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@carpentry.com', 
    service: 'Carpenter', 
    status: 'pending',
    submittedDate: '2026-02-04',
    docsCount: 4
  },
];

const documents = [
  { id: 'license', name: 'Business License', uploaded: true },
  { id: 'insurance', name: 'Insurance Certificate', uploaded: true },
  { id: 'id', name: 'Government ID', uploaded: true },
  { id: 'cert', name: 'Trade Certifications', uploaded: false },
];

export function AdminPanelScreen() {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const filteredProviders = filterStatus === 'all' 
    ? mockProviders 
    : mockProviders.filter(p => p.status === filterStatus);

  const pendingCount = mockProviders.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))] bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 py-6 md:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-[2rem] p-6 md:p-8 text-white mb-6 md:mb-8 shadow-2xl shadow-purple-500/30 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-pink-200" />
                <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-purple-100 text-lg">Platform management and provider verification</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
            {[
              { icon: Clock, color: 'text-yellow-300', label: 'Pending Review', value: pendingCount },
              { icon: CheckCircle, color: 'text-emerald-300', label: 'Approved', value: mockProviders.filter(p => p.status === 'approved').length },
              { icon: Users, color: 'text-cyan-300', label: 'Total Providers', value: mockProviders.length },
              { icon: TrendingUp, color: 'text-pink-300', label: 'This Week', value: 8 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/30 hover:bg-white/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <p className="text-sm font-medium text-purple-100">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Verification Table */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border-2 border-purple-200 overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-purple-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Provider Verification Queue
                  </h2>
                  
                  {/* Search */}
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="text"
                        placeholder="Search providers..."
                        className="w-full pl-11 pr-4 py-2.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    { id: 'all', label: `All (${mockProviders.length})`, active: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' },
                    { id: 'pending', label: `Pending (${pendingCount})`, active: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30' },
                    { id: 'approved', label: 'Approved', active: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30' },
                    { id: 'rejected', label: 'Rejected', active: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30' }
                  ].map(tab => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterStatus(tab.id)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        filterStatus === tab.id
                          ? tab.active
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100'
                      }`}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50/50 border-b border-purple-100">
                    <tr>
                      {['Provider', 'Service', 'Submitted', 'Status', 'Actions'].map(heading => (
                        <th key={heading} className="px-6 md:px-8 py-4 text-left text-xs font-bold text-purple-800 uppercase tracking-widest">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-purple-50">
                    <AnimatePresence>
                      {filteredProviders.map((provider, index) => (
                        <motion.tr 
                          key={provider.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(250, 245, 255, 0.6)' }}
                          className="transition-colors group"
                        >
                          <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center gap-3">
                              <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex-shrink-0 shadow-md flex items-center justify-center text-white font-bold text-lg"
                              >
                                {provider.name.charAt(0)}
                              </motion.div>
                            <div>
                                <p className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{provider.name}</p>
                              <p className="text-sm text-slate-500">{provider.email}</p>
                            </div>
                          </div>
                        </td>
                          <td className="px-6 md:px-8 py-5">
                            <span className="text-sm font-medium text-slate-700">{provider.service}</span>
                        </td>
                          <td className="px-6 md:px-8 py-5">
                            <span className="text-sm font-medium text-slate-700">{provider.submittedDate}</span>
                        </td>
                          <td className="px-6 md:px-8 py-5">
                          <span className={`
                              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                            ${provider.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                              : provider.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }
                          `}>
                              {provider.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                              {provider.status === 'approved' && <CheckCircle className="w-3.5 h-3.5" />}
                              {provider.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                            {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                          </span>
                        </td>
                          <td className="px-6 md:px-8 py-5">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedProvider(provider.id);
                              setShowDocModal(true);
                            }}
                              className="text-purple-600 hover:text-pink-600 text-sm font-bold flex items-center gap-2 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all"
                          >
                            <Eye className="w-4 h-4" />
                            Review
                            </motion.button>
                        </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border-2 border-purple-200 p-6 md:p-8"
            >
              <h3 className="font-bold text-purple-900 mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 rounded-2xl hover:shadow-md transition-all border border-yellow-200">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-bold">Review Pending ({pendingCount})</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-2xl hover:shadow-md transition-all border border-purple-200">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-bold">Manage Providers</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 rounded-2xl hover:shadow-md transition-all border border-cyan-200">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold">View Reports</span>
                </motion.button>
              </div>
            </motion.section>

            {/* Recent Activity */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border-2 border-purple-200 p-6 md:p-8"
            >
              <h3 className="font-bold text-purple-900 mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm p-3 bg-purple-50/50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium">Approved <strong className="text-purple-700">Sarah Johnson</strong></p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm p-3 bg-purple-50/50 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium">Rejected <strong className="text-purple-700">Mike Williams</strong></p>
                    <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm p-3 bg-purple-50/50 rounded-xl">
                  <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium">New submission from <strong className="text-purple-700">Emily Davis</strong></p>
                    <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Platform Stats */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-purple-100 via-pink-100 to-cyan-100 rounded-[2rem] border-2 border-purple-300 p-6 md:p-8 shadow-xl"
            >
              <h3 className="font-bold text-purple-900 mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Platform Overview
              </h3>
              <div className="space-y-4 text-sm">
                {[
                  { label: 'Active Providers', value: '45', color: 'text-purple-900' },
                  { label: 'Total Bookings', value: '1,247', color: 'text-purple-900' },
                  { label: 'Avg. Response Time', value: '2.5 hrs', color: 'text-purple-900' },
                  { label: 'Customer Satisfaction', value: '96%', color: 'text-emerald-600' }
                ].map((stat, i) => (
                  <motion.div key={stat.label} whileHover={{ x: 4 }} className="flex justify-between items-center p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                    <span className="text-slate-700 font-medium">{stat.label}</span>
                    <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Document Review Modal */}
      <AnimatePresence>
        {showDocModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-purple-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-purple-200 flex flex-col"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-purple-100 p-6 md:p-8 z-10 flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Review Application
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setShowDocModal(false); setPreviewDoc(null); }}
                  className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-slate-600" />
                </motion.button>
            </div>

              <div className="p-6 md:p-8 space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Left Column: Form Details & Docs List */}
                  <div className="space-y-6">
                    {/* Provider Info */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-inner">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-500" />
                        Provider Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Full Name</p>
                          <p className="font-bold text-slate-900">John Smith</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Business Name</p>
                          <p className="font-bold text-slate-900 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Smith Plumbing LLC</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Email</p>
                          <p className="font-bold text-slate-900 flex items-center gap-1"><Mail className="w-3 h-3" /> john@plumbing.com</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Phone</p>
                          <p className="font-bold text-slate-900 flex items-center gap-1"><Phone className="w-3 h-3" /> +1 (555) 123-4567</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-1">Address</p>
                          <p className="font-bold text-slate-900 flex items-center gap-1"><MapPin className="w-3 h-3" /> 123 Main St, New York, NY 10001</p>
                        </div>
                        <div className="col-span-2 mt-2 pt-4 border-t border-purple-200/50">
                          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mb-2">Services</p>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white text-purple-700 rounded-lg text-xs font-bold border border-purple-200 shadow-sm">Plumber</span>
                            <span className="px-3 py-1 bg-white text-purple-700 rounded-lg text-xs font-bold border border-purple-200 shadow-sm">HVAC</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents List */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        Submitted Documents
                      </h4>
                      <div className="space-y-3">
                        {documents.map((doc, i) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`
                              flex items-center justify-between p-4 rounded-2xl border-2 transition-colors
                              ${previewDoc === doc.id ? 'border-purple-500 bg-purple-50/50 shadow-md shadow-purple-500/10' : 
                                doc.uploaded ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${doc.uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{doc.name}</p>
                                <p className={`text-xs font-medium mt-0.5 ${doc.uploaded ? 'text-emerald-600' : 'text-slate-500'}`}>
                                  {doc.uploaded ? 'Uploaded • Ready for review' : 'Not uploaded'}
                                </p>
                              </div>
                            </div>
                            {doc.uploaded && (
                              <motion.button 
                                onClick={() => setPreviewDoc(doc.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                  previewDoc === doc.id 
                                    ? 'bg-purple-600 text-white border-2 border-purple-600' 
                                    : 'bg-white border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                                }`}
                              >
                                <Eye className="w-4 h-4" />
                                {previewDoc === doc.id ? 'Viewing' : 'View'}
                              </motion.button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Preview & Actions */}
                  <div className="flex flex-col gap-6">
                    {/* Document Preview Area */}
                    <div className="flex-1 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 min-h-[350px] relative overflow-hidden group">
                      <AnimatePresence mode="wait">
                        {previewDoc ? (
                          <motion.div
                            key={previewDoc}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 p-4 flex flex-col items-center justify-center bg-white"
                          >
                            <div className="w-full h-full border-2 border-purple-100 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center relative overflow-hidden shadow-inner">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                              <div className="relative z-10 text-center p-6">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                                  <FileText className="w-10 h-10 text-purple-500" />
                                </div>
                                <p className="font-black text-slate-800 text-xl tracking-tight mb-2">
                                  {documents.find(d => d.id === previewDoc)?.name}
                                </p>
                                <p className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm inline-block">
                                  High-resolution preview loaded
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                          >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                              <ImageIcon className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-bold text-lg">No Document Selected</p>
                            <p className="text-sm text-slate-400 mt-1">Click 'View' on a document to preview it here</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Reason & Actions Box */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-purple-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <label className="text-sm font-bold text-slate-700 mb-3 block">
                        Reason for Decision (Optional)
                      </label>
                      <textarea
                        placeholder="Provide feedback or reason for your decision..."
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 resize-none text-sm bg-purple-50/30 mb-5 transition-all"
                      />
                      <div className="flex gap-4">
                        <motion.button 
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setShowDocModal(false); setPreviewDoc(null); }}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setShowDocModal(false); setPreviewDoc(null); }}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

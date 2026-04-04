import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { 
  Heart, Package, Clock, ShieldCheck, Mail, Phone, 
  MapPin, ArrowLeft, Loader2, CheckCircle2, AlertTriangle, Activity, Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/requests/${id}`);
        setRequest(data);
      } catch (err) {
        toast.error('Failed to load match details.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!request) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card shadow-2xl overflow-hidden"
      >
        <div className={`p-10 text-white transition-colors duration-500 ${request.status === 'matched' ? 'bg-emerald-600' : 'bg-primary-600'}`}>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/30">
                Case ID: #{request.id.toString().padStart(5, '0')}
              </span>
              <h1 className="text-4xl font-black italic">Match Details</h1>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase text-white border-2 border-white/50 ${request.status === 'matched' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`}>
                    {request.status} {request.status === 'matched' && '✓'}
                </span>
                <p className="opacity-70 text-xs font-bold font-mono">Synced @ {new Date(request.created_at).toLocaleTimeString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-t border-white/10">
            <div>
              <p className="text-xs uppercase font-black opacity-50 mb-1">Resource</p>
              <p className="text-xl font-bold flex items-center gap-2">
                {request.resource_type === 'organ' ? <Heart className="w-5 h-5 text-red-300" /> : 
                 (request.resource_type === 'blood' ? <Droplets className="w-5 h-5 text-red-300" /> : <Package className="w-5 h-5 text-blue-200" />)}
                {request.resource_type === 'blood' ? 'Blood Units' : request.resource_type}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-black opacity-50 mb-1">Urgency</p>
              <p className={`text-xl font-bold flex items-center gap-2 ${request.urgency === 'critical' ? 'text-red-300' : 'text-white'}`}>
                {request.urgency === 'critical' && <AlertTriangle className="w-5 h-5 animate-pulse" />}
                {request.urgency}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-black opacity-50 mb-1">Blood Match</p>
              <p className="text-xl font-bold">Compatible</p>
            </div>
            <div>
              <p className="text-xs uppercase font-black opacity-50 mb-1">Match Score</p>
              <p className="text-xl font-bold">98% Optimal</p>
            </div>
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12 bg-white min-h-[500px]">
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Case Narrative
              </h3>
              <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-primary-500 italic text-slate-700">
                "{request.notes || 'No extra notes provided by the medical staff.'}"
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tracking Timeline</h3>
              <div className="space-y-4">
                {[
                  { label: 'Request Initialized', time: '10:05 AM', status: 'done' },
                  { label: 'Security Verification', time: '10:07 AM', status: 'done' },
                  { label: 'Notification Routed', time: '10:08 AM', status: 'done' },
                  { label: 'Hospital Accepted', time: '10:12 AM', status: request.status === 'matched' ? 'done' : 'pending' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${step.status === 'done' ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      {idx !== 3 && <div className={`w-0.5 flex-1 ${step.status === 'done' ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-bold ${step.status === 'done' ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                      <p className="text-xs text-slate-400">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!showVerification ? (
                <motion.div 
                  key="contact"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="space-y-8"
                >
                  <section className="space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Requester Hospital
                    </h3>
                    <div className="card p-6 bg-slate-50 space-y-4 border-2 border-slate-100">
                      <div>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">{request.requester_name}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1 font-medium"><MapPin className="w-3 h-3" /> {request.city}, {request.state}</p>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 group">
                          <div className="p-2 bg-white rounded-lg border border-slate-200 transition-colors group-hover:border-primary-500">
                              <Mail className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-slate-400">Official Email</p>
                            <p className="text-sm font-bold text-slate-700">{request.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="p-2 bg-white rounded-lg border border-slate-200 transition-colors group-hover:border-primary-500">
                              <Phone className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-slate-400">Emergency Hotline</p>
                            <p className="text-sm font-bold text-slate-700">{request.contact_number}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <button 
                    onClick={() => setShowVerification(true)}
                    className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <CheckCircle2 className="w-6 h-6" /> Contact Verification Board
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="verification"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Official Verification Board
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Dr. Alistair Vance', role: 'Board Chairman', contact: 'chairman@lifeshare.board' },
                      { name: 'Sarah Jenkins', role: 'Compliance Officer', contact: 'compliance@lifeshare.board' },
                      { name: 'National Health Hub', role: 'Emergency Routing', contact: '+1 800-VERIFY-LIFE' }
                    ].map((member, i) => (
                      <div key={i} className="p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center group">
                        <div>
                          <p className="font-bold">{member.name}</p>
                          <p className="text-[10px] text-primary-400 uppercase tracking-widest font-black">{member.role}</p>
                        </div>
                        <button 
                          onClick={() => toast.success(`Requesting encrypted line to ${member.name}...`)}
                          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-800 leading-tight">
                      All board communication is recorded for legal compliance. Ensure you have the 2FA token ready for verification.
                    </p>
                  </div>

                  <button 
                    onClick={() => setShowVerification(false)}
                    className="w-full py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchDetails;

import React, { useState, useEffect } from 'react';
import api from '../api';
import { 
  History, Clock, Send, CheckCircle2, Package, Heart, 
  ArrowRight, Loader2, Hospital, Activity, ArrowLeft, Filter, Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ActivityLog = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, requests, matches
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/requests/history/all');
        setActivities(data);
      } catch (err) {
        toast.error('Failed to load activity history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = activities.filter(act => {
    if (filter === 'requests') return act.activity_type === 'request_sent';
    if (filter === 'matches') return act.activity_type === 'match_finalized';
    return true;
  });

  const synergyMap = {};
  activities.forEach(act => {
      if (act.activity_type === 'match_finalized') {
          const partner = act.donor_name === user?.name ? act.recipient_name : act.donor_name;
          if (partner) {
              synergyMap[partner] = (synergyMap[partner] || 0) + 1;
          }
      }
  });
  const topPartners = Object.entries(synergyMap).sort((a,b) => b[1] - a[1]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
       <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="flex justify-between items-end">
        <div className="space-y-2">
            <h1 className="text-4xl font-black flex items-center gap-4">
                <History className="w-10 h-10 text-primary-600" />
                Network Activity Log
            </h1>
            <p className="text-slate-500 font-medium">Tracking sharing lifecycle across the medical grid</p>
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-5 py-3 mt-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl shadow-sm"
            >
                <Heart className="w-6 h-6 text-emerald-500 fill-current animate-pulse" />
                <div className="flex flex-col">
                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Global Synergy</span>
                    <span className="text-xl font-black text-emerald-600 leading-none">
                        {activities.filter(a => a.activity_type === 'match_finalized').length * 50} <span className="text-sm">Pts</span>
                    </span>
                </div>
                <div className="h-8 border-l-2 border-emerald-200/60 mx-2"></div>
                <div className="flex flex-col text-right">
                    <span className="text-[10px] font-black text-emerald-600/70 uppercase tracking-wider">Completed</span>
                    <span className="text-sm font-black text-emerald-800 leading-none">
                        {activities.filter(a => a.activity_type === 'match_finalized').length} Life Shares
                    </span>
                </div>
            </motion.div>

            {topPartners.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex gap-2 mt-4 flex-wrap"
                >
                    {topPartners.map(([partner, count]) => (
                        <div key={partner} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-lg text-xs cursor-default hover:border-emerald-200 group">
                            <Hospital className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                            <span className="font-bold text-slate-700 truncate max-w-[200px]" title={partner}>{partner}</span>
                            <span className="font-black text-emerald-600 px-1.5 bg-emerald-100 rounded-md">+{count * 50} Pts</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
            {['all', 'requests', 'matches'].map(t => (
                <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {t}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl"
            >
                <Clock className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">No activities recorded for this period.</p>
            </motion.div>
          ) : filtered.map((activity, idx) => (
            <motion.div
              layout
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={`${activity.activity_type}-${activity.id}`}
              className={`card p-6 border-l-8 flex items-center gap-8 hover:shadow-xl transition-all group ${activity.activity_type === 'request_sent' ? 'border-l-primary-500' : 'border-l-emerald-500'}`}
            >
                <div className="flex-shrink-0 w-16 text-center space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase">{new Date(activity.created_at || activity.timestamp).toLocaleString('en-US', { month: 'short' })}</p>
                    <p className="text-2xl font-black text-slate-900">{new Date(activity.created_at || activity.timestamp).getDate()}</p>
                    <p className="text-[10px] font-bold text-slate-400">{new Date(activity.created_at || activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                <div className={`p-4 rounded-2xl ${activity.activity_type === 'request_sent' ? 'bg-primary-50 text-primary-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {activity.activity_type === 'request_sent' ? 
                     (activity.resource_type === 'blood' ? <Droplets className="w-6 h-6 text-red-500" /> : <Send className="w-6 h-6" />) : 
                     (activity.resource_type === 'blood' ? <Droplets className="w-6 h-6 text-emerald-600" /> : <CheckCircle2 className="w-6 h-6" />)}
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${activity.activity_type === 'request_sent' ? 'bg-primary-100 text-primary-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {activity.activity_type.replace('_', ' ')}
                        </span>
                        {activity.urgency === 'critical' && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-black uppercase animate-pulse">Critical</span>}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        {activity.activity_type === 'request_sent' ? (
                            <>
                                Outgoing Request: {activity.resource_type === 'blood' ? `Blood Type ${activity.resource_name}` : activity.resource_name} 
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                            </>
                        ) : (
                            <>
                                Match Finalized: {activity.resource_type === 'blood' ? 'BLOOD UNIT' : activity.resource_type.toUpperCase()} 
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </>
                        )}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                        {activity.activity_type === 'request_sent' ? (
                             `Notes: "${activity.notes || 'Normal priority request'}"`
                        ) : (
                            `Donor: ${activity.donor_name} → Recipient: ${activity.recipient_name}`
                        )}
                    </p>
                </div>

                <div className="text-right">
                    <p className={`text-sm font-black uppercase tracking-widest ${activity.status === 'pending' ? 'text-amber-500' : (activity.status === 'matched' || activity.activity_type === 'match_finalized' ? 'text-emerald-500' : 'text-slate-400')}`}>
                        {activity.activity_type === 'match_finalized' ? 'Completed' : activity.status}
                    </p>
                    <button 
                        onClick={() => activity.activity_type === 'request_sent' ? navigate(`/match/${activity.id}`) : null}
                        className="text-xs text-slate-400 hover:text-primary-600 font-bold underline decoration-slate-200 hover:decoration-primary-300 underline-offset-4"
                    >
                        View Legal Details
                    </button>
                </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityLog;

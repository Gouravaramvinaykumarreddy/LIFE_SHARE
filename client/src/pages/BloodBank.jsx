import React, { useState, useEffect } from 'react';
import api from '../api';
import { 
  Droplets, Search, MapPin, Clock, ArrowRight, Activity, 
  Loader2, ArrowLeft, Filter, ShieldCheck, Mail, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const BloodBank = () => {
  const [blood, setBlood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlood = async () => {
      try {
        const { data } = await api.get('/resources/blood');
        setBlood(data);
      } catch (err) {
        toast.error('Failed to load blood bank data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlood();
  }, []);

  const filteredBlood = blood.filter(b => 
    b.blood_group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-10">
       <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <header className="flex flex-col md:flex-row justify-between items-end gap-6 bg-red-600 p-10 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
            <Droplets className="w-64 h-64 -translate-y-10 translate-x-10" />
        </div>
        <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">Verified Registries</span>
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-200">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div> Live Network
                </span>
            </div>
            <h1 className="text-5xl font-black">National Blood Bank</h1>
            <p className="text-red-100 font-medium max-w-md">Real-time inventory of all blood types across certified hospital hubs.</p>
        </div>

        <div className="relative w-full md:w-80 group z-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-300 group-focus-within:text-white transition-colors" />
            <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Group or City..."
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-red-200 outline-none focus:border-white transition-all font-bold"
            />
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
            {filteredBlood.length === 0 ? (
                <div className="col-span-3 py-20 text-center space-y-4 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <Activity className="w-12 h-12 text-slate-200 mx-auto" />
                    <p className="text-slate-400 font-bold">No blood units matching your query in the network.</p>
                </div>
            ) : filteredBlood.map((unit, idx) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={unit.id}
                    className="card p-0 overflow-hidden hover:shadow-2xl transition-all border-2 border-slate-50 group"
                >
                    <div className="p-8 bg-slate-50 flex justify-between items-center group-hover:bg-red-50 transition-colors">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blood Type</p>
                            <h2 className="text-5xl font-black text-red-600 group-hover:scale-110 transition-transform origin-left">{unit.blood_group}</h2>
                        </div>
                        <div className="text-right">
                             <p className="text-3xl font-black text-slate-900">{unit.units}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase">Total Units</p>
                        </div>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-red-500" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                     <p className="text-sm font-black text-slate-900 truncate">{unit.hospital_name}</p>
                                     <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                                        <MapPin className="w-3 h-3" /> {unit.city}, {unit.state}
                                     </p>
                                </div>
                            </div>
                            
                            <hr className="border-slate-100" />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                    <Clock className="w-3 h-3" /> {new Date(unit.created_at).toLocaleDateString()}
                                </div>
                                <div className="text-right text-[10px] font-black text-emerald-500 uppercase flex items-center justify-end gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Verified
                                </div>
                            </div>
                        </div>

                        <Link 
                            to="/request"
                            state={{ resource_type: 'blood', id: unit.id, urgency: 'high' }}
                            className="w-full btn-secondary flex items-center justify-center gap-2 py-4 group-hover:border-red-500 group-hover:text-red-600 transition-all font-black text-xs uppercase"
                        >
                            Request Life Units <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BloodBank;

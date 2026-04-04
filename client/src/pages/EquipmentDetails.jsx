import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { 
  Package, Clock, ShieldCheck, Mail, Phone, 
  MapPin, ArrowLeft, Loader2, CheckCircle2, Box, Cpu, Zap, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/resources/equipment/${id}`);
        setEquipment(data);
      } catch (err) {
        toast.error('Failed to load equipment specifications.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleRequestDeployment = async () => {
    setRequesting(true);
    try {
      await api.post('/requests', {
        resource_type: 'equipment',
        target_resource_id: id,
        urgency: 'high',
        notes: `Automated request for ${equipment.type} deployment via specifications board.`
      });
      toast.success('Deployment request broadcasted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to initiate deployment request.');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!equipment) return null;

  const specs = [
    { label: 'Technical Model', value: equipment.model || 'Standard Edition', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Battery/Power', value: 'Li-Ion UPS Integrated', icon: <Zap className="w-4 h-4" /> },
    { label: 'Condition', value: 'Certified Medical Grade', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Last Service', value: 'Ready for Deployment', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card shadow-2xl overflow-hidden"
      >
        <div className="p-10 bg-slate-900 text-white relative">
          <div className="absolute right-0 top-0 p-10 opacity-10">
            <Package className="w-32 h-32 rotate-12" />
          </div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/20 text-primary-400">
                Medical Device Registry
              </span>
              <h1 className="text-4xl font-black">{equipment.type}</h1>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
                <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase text-emerald-400 border-2 border-emerald-400/30">
                    {equipment.status} ✓
                </span>
                <p className="opacity-70 text-xs font-bold font-mono">ID: #{equipment.id.toString().padStart(6, '0')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-t border-white/10 relative z-10">
            {specs.map((spec, i) => (
                <div key={i}>
                <p className="text-xs uppercase font-black opacity-40 mb-1 flex items-center gap-1">{spec.icon} {spec.label}</p>
                <p className="text-sm font-bold text-slate-100">{spec.value}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12 bg-white">
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Box className="w-4 h-4" /> Operational Manual
              </h3>
              <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-500 text-slate-700 space-y-3">
                <p className="font-medium">Deployment Ready Profile:</p>
                <ul className="text-sm space-y-2 list-disc list-inside text-slate-500">
                    <li>Fully sanitized and decontaminated</li>
                    <li>Software updated to latest legal compliance</li>
                    <li>Shipping dimensions verified for air transit</li>
                    <li>Calibration certificates attached</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Network Verification</h3>
              <div className="card p-6 bg-emerald-50 border-emerald-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                   <p className="font-bold text-emerald-900">Certified Resource</p>
                   <p className="text-xs text-emerald-700">Verified by National Healthcare Grid</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" /> Current Logistics Hub
              </h3>
              <div className="card p-6 bg-slate-50 space-y-4 border-2 border-slate-100">
                <div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{equipment.hospital_name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1 font-medium"><MapPin className="w-3 h-3" /> {equipment.city}, {equipment.state}</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-3">
                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 transition-colors group-hover:border-primary-500">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400">Hub Email</p>
                      <p className="text-sm font-bold text-slate-700">{equipment.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 transition-colors group-hover:border-primary-500">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400">Emergency Desk</p>
                      <p className="text-sm font-bold text-slate-700">{equipment.contact_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button 
              disabled={requesting}
              onClick={handleRequestDeployment}
              className="w-full bg-slate-900 text-white py-5 text-xl font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-primary-500/20 active:scale-95 disabled:opacity-50"
            >
              {requesting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Package className="w-6 h-6" />}
              {requesting ? 'Broadcasting...' : 'Request Deployment'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EquipmentDetails;

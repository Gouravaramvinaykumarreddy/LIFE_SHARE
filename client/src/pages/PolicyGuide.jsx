import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, FileText, Scale, 
  HelpCircle, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const PolicyGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary-600" />,
      title: "Data Privacy (GDPR/HIPAA)",
      content: "All hospital and patient data transferred via LifeShare is encrypted at rest and in transit. We follow strict international medical data privacy standards to ensure hospital identifiers are only shared with verified matched partners."
    },
    {
      icon: <Scale className="w-8 h-8 text-emerald-600" />,
      title: "Fair Sharing Protocol",
      content: "Sharing is based on the priority matrix: Life-saving urgency > Time in queue > Geographical proximity. Hospitals are encouraged to list surplus resources to maintain a high network health score."
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Documentation Requirements",
      content: "Every transaction produces a digitally signed audit log. Donor hospitals must provide verification of resource viability (scans/tests) before a match is finalized."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">LifeShare Compliance & Ethics</h1>
        <p className="text-slate-600 text-lg">
          The following guidelines ensure the integrity and legal compliance of the organ & equipment sharing network.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="card p-8 bg-white space-y-4"
          >
            <div className="p-3 bg-slate-50 rounded-2xl w-fit">
              {section.icon}
            </div>
            <h3 className="font-bold text-xl text-slate-900">{section.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <HelpCircle className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
        <div className="relative space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/30 text-primary-300 rounded-full text-xs font-bold uppercase">
            Official Regulatory Notice
          </div>
          <h2 className="text-3xl font-bold">Verification Process</h2>
          <p className="text-slate-300 leading-relaxed">
            All registered hospitals must undergo a secondary manual verification by the LifeShare Regulatory Board within 48 hours of signup. 
            Unauthorized resource sharing is strictly prohibited and subject to legal action under the National Medical Sharing Act.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div className="text-sm">
                <p className="font-bold">Verified Hospitals</p>
                <p className="opacity-60 font-medium tracking-tight uppercase">852 ACTIVE</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div className="text-sm">
                <p className="font-bold">Unauthorized Uses</p>
                <p className="opacity-60 font-medium tracking-tight uppercase">ZERO TOLERANCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-400 text-sm pt-8 border-t border-slate-100">
        Last updated: April 2026 • Version 2.4.0 • LifeShare Consortium
      </footer>
    </div>
  );
};

export default PolicyGuide;

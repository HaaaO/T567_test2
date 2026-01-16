import React, { useState } from 'react';
import { MODULES } from '../constants';
import { Calendar, ChevronDown, ChevronUp, FileText, Link as LinkIcon, Video } from 'lucide-react';

const Modules: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);

  const toggleModule = (id: number) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={16} />;
      case 'video': return <Video size={16} />;
      default: return <LinkIcon size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Schedule & Modules</h2>
      
      <div className="space-y-4">
        {MODULES.map((module) => (
          <div key={module.week} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200">
            <button 
              onClick={() => toggleModule(module.week)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex flex-col items-center justify-center font-bold">
                  <span className="text-xs uppercase">Week</span>
                  <span className="text-lg">{module.week}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{module.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{module.description}</p>
                </div>
              </div>
              <div className="text-slate-400">
                {openModuleId === module.week ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>

            {openModuleId === module.week && (
              <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    Topics
                  </h4>
                  <ul className="list-disc list-inside ml-2 space-y-1 mb-6">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="text-slate-600 text-sm">{topic}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-slate-700 mb-2">Resources</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {module.resources.map((res, idx) => (
                      <a 
                        key={idx}
                        href="#" 
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm text-slate-700 group"
                      >
                        <span className="text-blue-500 group-hover:text-blue-600">
                          {getIcon(res.type)}
                        </span>
                        {res.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;
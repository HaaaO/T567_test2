import React from 'react';
import { COURSE_INFO } from '../constants';
import { Book, Scale, ClipboardCheck, AlertCircle } from 'lucide-react';

const Syllabus: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Course Syllabus</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Course Code</h3>
            <p className="text-lg font-medium text-slate-900">{COURSE_INFO.code}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Course Name</h3>
            <p className="text-lg font-medium text-slate-900">{COURSE_INFO.name}</p>
          </div>
          <div>
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Instructor</h3>
            <p className="text-lg font-medium text-slate-900">{COURSE_INFO.instructor}</p>
          </div>
           <div>
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Contact</h3>
            <p className="text-lg font-medium text-slate-900">{COURSE_INFO.email}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
            <Book className="text-blue-500" size={24} />
            Course Description
          </h3>
          <p className="text-slate-600 leading-relaxed mb-8">
            {COURSE_INFO.description}
          </p>

          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
            <ClipboardCheck className="text-blue-500" size={24} />
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8 ml-2">
            <li>Analyze the distinct capabilities and limitations of human and artificial intelligence.</li>
            <li>Design interfaces that facilitate effective human-AI collaboration.</li>
            <li>Evaluate AI systems using metrics of trust, fairness, and explainability.</li>
            <li>Implement prototype systems using modern LLM APIs and frameworks.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
            <Scale className="text-blue-500" size={24} />
            Grading Policy
          </h3>
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-medium">Assignments (3)</span>
              <span className="font-bold text-slate-700">30%</span>
            </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-medium">Midterm Project</span>
              <span className="font-bold text-slate-700">25%</span>
            </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-medium">Final Capstone</span>
              <span className="font-bold text-slate-700">35%</span>
            </div>
             <div className="flex justify-between items-center py-2">
              <span className="font-medium">Participation & Quizzes</span>
              <span className="font-bold text-slate-700">10%</span>
            </div>
          </div>
          
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
            <AlertCircle className="text-blue-500" size={24} />
            Academic Integrity
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Students are expected to adhere to the university's code of conduct. While the use of AI tools (like ChatGPT) is permitted for brainstorming and debugging, all final submissions must be your own work and AI usage must be cited appropriately.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Syllabus;
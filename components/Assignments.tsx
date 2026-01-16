import React from 'react';
import { ASSIGNMENTS } from '../constants';
import { Assignment } from '../types';
import { CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';

const Assignments: React.FC = () => {
  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'Graded': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Overdue': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'Graded': return <CheckCircle2 size={16} />;
      case 'Submitted': return <CheckCircle2 size={16} />;
      case 'Overdue': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Assignments</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Assignment Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Due Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Points</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ASSIGNMENTS.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <FileText size={18} />
                      </div>
                      <span className="font-medium text-slate-900">{assignment.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{assignment.dueDate}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{assignment.points}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                      {assignment.status === 'Pending' ? 'Submit' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
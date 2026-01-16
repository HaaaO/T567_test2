import React from 'react';
import { COURSE_INFO, ANNOUNCEMENTS, GRADE_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell, Clock, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Welcome back, Student</h2>
        <p className="text-slate-500 mt-2">Here is what is happening in <span className="font-semibold text-blue-600">{COURSE_INFO.code}</span> this week.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Announcements Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="text-blue-500" size={20} /> 
              Recent Announcements
            </h3>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-4">
            {ANNOUNCEMENTS.map((announcement) => (
              <div key={announcement.id} className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-800">{announcement.title}</h4>
                  <span className="text-xs text-slate-400">{announcement.date}</span>
                </div>
                <p className="text-sm text-slate-600">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats / Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Clock size={20} /> Next Deadline
            </h3>
            <p className="text-2xl font-bold">A3: Ethics Essay</p>
            <p className="text-blue-100 text-sm mt-1">Due: Nov 10, 2023</p>
            <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-1">Instructor</h3>
            <div className="flex items-center gap-3 mt-3">
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">DV</div>
               <div>
                 <p className="text-sm font-medium">{COURSE_INFO.instructor}</p>
                 <p className="text-xs text-slate-500">{COURSE_INFO.email}</p>
               </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-semibold uppercase">Office Hours</p>
              <p className="text-sm text-slate-700 mt-1">{COURSE_INFO.officeHours}</p>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Star className="text-amber-500" size={20} /> 
              Performance Overview
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={GRADE_DATA}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="assignment" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Legend />
                <Bar dataKey="yours" name="Your Score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="avg" name="Class Average" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
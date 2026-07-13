import { useState } from "react";
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Mail, 
  Globe, 
  Save, 
  Download, 
  Award, 
  Play, 
  Target, 
  Video, 
  Clock, 
  Check, 
  Settings 
} from "lucide-react";

export default function ProfilePage() {
  // Mock states for editable user profile details
  const [email, setEmail] = useState("alex.m@stanford.edu");
  const [joinDate, setJoinDate] = useState("September 12, 2023");
  const [website, setWebsite] = useState("alexmorgan.math");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* ── BANNER HERO PROFILE (PREMIUM REDESIGN) ── */}
        <div className="relative bg-[#0B1A30] rounded-3xl overflow-hidden shadow-xl border border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 min-h-[220px]">
          {/* Vertical decorative grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none opacity-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-slate-400 h-full"></div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#091526]/90 to-transparent pointer-events-none"></div>

          {/* Avatar Area */}
          <div className="relative z-10 shrink-0 flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" 
                alt="Alex Morgan" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Premium Gold Badge */}
            <div className="absolute -bottom-3 bg-gradient-to-r from-[#D97706] to-[#B45309] text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              👑 Premium
            </div>
          </div>

          {/* User Info Area */}
          <div className="relative z-10 text-center md:text-left space-y-3 flex-1 pb-2">
            <div className="space-y-1">
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                Alex Morgan
              </h2>
              <p className="text-slate-300 text-xs md:text-sm font-medium">
                Mathematics Enthusiast | Graduate Research Fellow at Stanford
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F08A4B]" />
                <span>Palo Alto, CA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F08A4B]" />
                <span>Member since Sept 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TWO COLUMN CONTENT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: MY COURSES (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#1A2B47]" />
                <h3 className="text-lg font-black text-[#1A2B47]">My Courses</h3>
              </div>
              <button 
                onClick={() => alert("Chuyển hướng đến lộ trình học tập...")}
                className="text-xs font-bold text-[#F08A4B] hover:underline"
              >
                View Learning Path &rarr;
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Course 1: Advanced Calculus */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  {/* Thumbnail area */}
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" 
                      alt="Advanced Calculus" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[9px] font-bold text-[#1A2B47] px-2 py-0.5 rounded-full uppercase">
                      Intermediate
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 space-y-4">
                    <h4 className="font-bold text-sm sm:text-base text-[#1A2B47] leading-snug">
                      Advanced Calculus
                    </h4>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-400">Course Progress</span>
                        <span className="text-[#F08A4B]">75%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#F08A4B] to-orange-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="px-5 pb-5 pt-1">
                  <button className="w-full bg-[#1A2B47] hover:bg-[#253D63] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Continue Learning</span>
                  </button>
                </div>
              </div>

              {/* Course 2: Linear Algebra I */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  {/* Thumbnail area */}
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80" 
                      alt="Linear Algebra I" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[9px] font-bold text-[#1A2B47] px-2 py-0.5 rounded-full uppercase">
                      Fundamental
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 space-y-4">
                    <h4 className="font-bold text-sm sm:text-base text-[#1A2B47] leading-snug">
                      Linear Algebra I
                    </h4>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-400">Course Progress</span>
                        <span className="text-emerald-500">100%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="px-5 pb-5 pt-1">
                  <button className="w-full border border-[#1A2B47] hover:bg-[#F8FAFC] text-[#1A2B47] text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* CỘT PHẢI: WIDGETS SIDEBAR (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Widget 1: Information */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-[#1A2B47] uppercase tracking-wide">
                  Information
                </h4>
                <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-bold text-slate-400">
                
                {/* Primary Email */}
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider">Primary Email</label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-3 text-slate-700 font-semibold focus-within:border-orange-200">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none w-full text-xs" 
                    />
                  </div>
                </div>

                {/* Join Date */}
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider">Join Date</label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-3 text-slate-500 font-semibold cursor-not-allowed">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                    <input 
                      type="text" 
                      value={joinDate}
                      readOnly
                      className="bg-transparent outline-none w-full text-xs cursor-not-allowed" 
                    />
                  </div>
                </div>

                {/* Personal Website */}
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider">Personal Website</label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-3 text-slate-700 font-semibold focus-within:border-orange-200">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                    <input 
                      type="text" 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="bg-transparent outline-none w-full text-xs" 
                    />
                  </div>
                </div>

                {/* Save Changes Button */}
                <button
                  type="submit"
                  className={`w-full text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isSaved 
                      ? "bg-emerald-600" 
                      : "bg-[#864A15] hover:bg-[#723E11]"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Changes Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Widget 2: Monthly Goals */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-[#1A2B47] uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#F08A4B]" />
                  <span>Monthly Goals</span>
                </h4>
              </div>

              <div className="space-y-4">
                {/* Goal 1 */}
                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex justify-between text-slate-400">
                    <span>Study Hours (40h)</span>
                    <span className="text-[#1A2B47]">22h</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>

                {/* Goal 2 */}
                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex justify-between text-slate-400">
                    <span>Theorems Solved (100)</span>
                    <span className="text-[#1A2B47]">45</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#864A15] rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 3: Live Sessions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-[#1A2B47] uppercase tracking-wide flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-[#F08A4B]" />
                  <span>Live Sessions</span>
                </h4>
              </div>

              <div className="space-y-3">
                {/* Session 1 */}
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  {/* Date Badge */}
                  <div className="bg-red-50 text-red-600 rounded-lg p-2 flex flex-col items-center shrink-0 w-11 h-11 justify-center border border-red-100/50">
                    <span className="text-[8px] font-black uppercase tracking-wider leading-none">Oct</span>
                    <span className="text-sm font-black leading-none">24</span>
                  </div>
                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-[#1A2B47] truncate leading-tight">
                      Complex Analysis Lab
                    </h5>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-[#F08A4B]" />
                      <span>10:00 AM - Online</span>
                    </div>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  {/* Date Badge */}
                  <div className="bg-red-50 text-red-600 rounded-lg p-2 flex flex-col items-center shrink-0 w-11 h-11 justify-center border border-red-100/50">
                    <span className="text-[8px] font-black uppercase tracking-wider leading-none">Oct</span>
                    <span className="text-sm font-black leading-none">26</span>
                  </div>
                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-[#1A2B47] truncate leading-tight">
                      Algebra Seminar
                    </h5>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-[#F08A4B]" />
                      <span>02:00 PM - Zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

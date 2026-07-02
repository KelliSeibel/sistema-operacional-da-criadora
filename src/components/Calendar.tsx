import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Script, WorkflowStage } from '../types';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Eye, Clock, FileText } from 'lucide-react';

export const Calendar: React.FC = () => {
  const { scripts, products, setActiveTab, setSelectedScriptId } = useAppState();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Fixed around July 2026 for our metadata

  const stages: { id: WorkflowStage; label: string; bg: string; text: string }[] = [
    { id: 'idea', label: 'Ideia 💡', bg: 'bg-stone-50 border-stone-200', text: 'text-stone-700' },
    { id: 'planning', label: 'Planejamento 📝', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
    { id: 'script', label: 'Roteiro ✍️', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700' },
    { id: 'recording', label: 'Gravação 🎥', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
    { id: 'editing', label: 'Edição 🎬', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700' },
    { id: 'review', label: 'Revisão 👀', bg: 'bg-teal-50 border-teal-200', text: 'text-teal-700' },
    { id: 'scheduled', label: 'Agendado 📅', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700' },
    { id: 'published', label: 'Publicado ✨', bg: 'bg-green-50 border-green-200', text: 'text-green-700' }
  ];

  // Helper: Get color by status
  const getStageColor = (status: WorkflowStage) => {
    const s = stages.find((st) => st.id === status);
    return s ? `${s.bg} ${s.text}` : 'bg-brand-offwhite text-brand-charcoal border-brand-pink-light';
  };

  // Switch weeks / months
  const adjustDate = (amount: number) => {
    const next = new Date(currentDate);
    if (viewMode === 'week') {
      next.setDate(next.getDate() + amount * 7);
    } else {
      next.setMonth(next.getMonth() + amount);
    }
    setCurrentDate(next);
  };

  const getWeekDays = (start: Date) => {
    const days = [];
    const firstDay = new Date(start);
    // Find previous Sunday
    const day = firstDay.getDay();
    firstDay.setDate(firstDay.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const d = new Date(firstDay);
      d.setDate(firstDay.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getMonthDays = (start: Date) => {
    const year = start.getFullYear();
    const month = start.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    // Pad previous month
    const startOffset = firstDay.getDay();
    for (let i = startOffset; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      days.push({ date: d, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({ date: d, isCurrentMonth: true });
    }

    // Pad next month
    const remaining = 42 - days.length; // 6 rows of 7
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, isCurrentMonth: false });
    }

    return days;
  };

  // Match scripts to YYYY-MM-DD
  const getScriptsForDate = (d: Date) => {
    const format = d.toISOString().split('T')[0];
    // Match simulated deadline in Planning table for this script
    // Or we match script-specific scheduling if mapped
    // Let's search hardcoded dates like '2026-07-04' (script-1), '2026-06-25' (script-2), '2026-07-02' (script-3)
    const map: Record<string, string> = {
      'script-1': '2026-07-04',
      'script-2': '2026-06-25',
      'script-3': '2026-07-02'
    };
    return scripts.filter((s) => {
      const deadline = map[s.id];
      return deadline === format;
    });
  };

  const handleScriptClick = (id: string) => {
    setActiveTab('scripts');
    setSelectedScriptId(id);
  };

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  const monthLabel = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Calendário de Conteúdo</h1>
          <p className="text-xs text-brand-gray mt-1">Sincronize prazos, gravações e datas de postagem com fluxo de cores automatizado.</p>
        </div>

        {/* View togglers */}
        <div className="flex bg-brand-offwhite border border-brand-pink-light/30 rounded-2xl p-1 shrink-0 text-xs">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              viewMode === 'week' ? 'bg-white text-brand-pink shadow-xs' : 'text-brand-gray'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              viewMode === 'month' ? 'bg-white text-brand-pink shadow-xs' : 'text-brand-gray'
            }`}
          >
            Mês
          </button>
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="flex items-center justify-between bg-white border border-brand-pink-light/35 rounded-3xl p-5 shadow-premium">
        <div className="flex items-center gap-3">
          <CalendarDays size={20} className="text-brand-pink" />
          <h2 className="text-lg font-serif font-bold text-brand-charcoal capitalize">{monthLabel}</h2>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => adjustDate(-1)}
            className="w-10 h-10 flex items-center justify-center border border-brand-pink-light/40 hover:bg-brand-pink-light/25 text-brand-charcoal rounded-xl transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(2026, 6, 1))}
            className="px-4 text-xs font-semibold border border-brand-pink-light/40 hover:bg-brand-pink-light/25 text-brand-charcoal rounded-xl transition-all"
          >
            Hoje (Jul/26)
          </button>
          <button
            onClick={() => adjustDate(1)}
            className="w-10 h-10 flex items-center justify-center border border-brand-pink-light/40 hover:bg-brand-pink-light/25 text-brand-charcoal rounded-xl transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* WEEK VIEW PANEL */}
      {viewMode === 'week' ? (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day, idx) => {
            const dayScripts = getScriptsForDate(day);
            const isToday = day.toDateString() === new Date(2026, 6, 1).toDateString(); // Simulated today

            return (
              <div
                key={idx}
                className={`bg-white border rounded-3xl p-4 min-h-[160px] flex flex-col justify-between shadow-premium transition-all ${
                  isToday ? 'border-brand-pink ring-2 ring-brand-pink-light/50' : 'border-brand-pink-light/35'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-brand-pink-light/10 pb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-brand-pink font-extrabold' : 'text-brand-gray'}`}>
                    {day.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                  </span>
                  <span className={`text-base font-serif font-bold ${isToday ? 'text-brand-pink' : 'text-brand-charcoal'}`}>
                    {day.getDate()}
                  </span>
                </div>

                {/* Day Contents */}
                <div className="space-y-2.5 my-3 flex-1 overflow-y-auto max-h-40">
                  {dayScripts.length === 0 ? (
                    <span className="text-[10px] text-brand-gray italic block text-center py-4">Sem gravações</span>
                  ) : (
                    dayScripts.map((s) => {
                      const prod = products.find((p) => p.id === s.productId);
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleScriptClick(s.id)}
                          className={`p-2 rounded-2xl border text-[10px] font-semibold cursor-pointer transition-all hover:scale-[1.02] shadow-xs hover:shadow-sm ${getStageColor(s.status)}`}
                        >
                          <p className="line-clamp-1">{s.title}</p>
                          <p className="opacity-85 text-[8px] mt-0.5 font-bold uppercase tracking-wider">
                            {prod ? prod.name : ''}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Add dynamic trigger */}
                <button
                  onClick={() => { setActiveTab('scripts'); setSelectedScriptId('new'); }}
                  className="w-full flex items-center justify-center gap-1.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-gray border border-dashed border-brand-nude-dark/60 rounded-xl hover:border-brand-pink hover:text-brand-pink transition-colors"
                >
                  <Plus size={10} /> Gravação
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* MONTH VIEW PANEL */
        <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-4 sm:p-6 shadow-premium">
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 mb-2">
            <div>Dom</div>
            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
          </div>

          {/* Month grid days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {monthDays.map((dayObj, idx) => {
              const dayScripts = getScriptsForDate(dayObj.date);
              const isToday = dayObj.date.toDateString() === new Date(2026, 6, 1).toDateString();

              return (
                <div
                  key={idx}
                  className={`min-h-[90px] p-2 rounded-2xl border flex flex-col justify-between text-xs transition-all ${
                    dayObj.isCurrentMonth
                      ? 'bg-white hover:bg-brand-pink-light/10'
                      : 'bg-brand-offwhite/50 text-brand-gray/50'
                  } ${isToday ? 'border-brand-pink ring-1 ring-brand-pink-light' : 'border-brand-pink-light/20'}`}
                >
                  {/* Number tag */}
                  <div className="flex justify-between items-center text-[10px] font-semibold">
                    <span className={isToday ? 'text-brand-pink font-bold' : 'text-brand-charcoal'}>
                      {dayObj.date.getDate()}
                    </span>
                    {dayScripts.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    )}
                  </div>

                  {/* Script links inside cell */}
                  <div className="space-y-1 my-1 overflow-y-auto max-h-16">
                    {dayScripts.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleScriptClick(s.id)}
                        className={`px-1 py-0.5 rounded-md text-[8px] font-bold truncate cursor-pointer border ${getStageColor(s.status)}`}
                        title={s.title}
                      >
                        {s.title}
                      </div>
                    ))}
                  </div>

                  {/* Empty state padding to keep spacing alignment */}
                  <div />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WORKFLOW COLOR GUIDE */}
      <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-5 shadow-premium space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray">Guia de Cores do Workflow UGC</h4>
        <div className="flex flex-wrap gap-2.5">
          {stages.map((st) => (
            <span
              key={st.id}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${st.bg} ${st.text}`}
            >
              {st.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

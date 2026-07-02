import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Planning, Script } from '../types';
import {
  ListTodo,
  Calendar,
  AlertCircle,
  MapPin,
  Sparkles,
  Zap,
  Hammer,
  Clock,
  Edit2,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export const PlanningView: React.FC = () => {
  const { plannings, scripts, products, updatePlanning } = useAppState();
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Form State for planning modal/fields
  const [formDeadline, setFormDeadline] = useState('');
  const [formWeekday, setFormWeekday] = useState('Sábado');
  const [formPriority, setFormPriority] = useState<'baixa' | 'media' | 'alta'>('media');
  const [formDuration, setFormDuration] = useState('2h');
  const [formDifficulty, setFormDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio');
  const [formEnergy, setFormEnergy] = useState<'baixa' | 'media' | 'alta'>('media');
  const [formLocation, setFormLocation] = useState('');
  const [formMaterials, setFormMaterials] = useState('');
  const [formBacklog, setFormBacklog] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const handleStartEdit = (plan: Planning) => {
    setEditingPlanId(plan.id);
    setFormDeadline(plan.deadline);
    setFormWeekday(plan.weekday);
    setFormPriority(plan.priority);
    setFormDuration(plan.estimatedDuration);
    setFormDifficulty(plan.difficulty);
    setFormEnergy(plan.energyNeeded);
    setFormLocation(plan.location);
    setFormMaterials(plan.materialsNeeded);
    setFormBacklog(plan.backlog);
    setFormNotes(plan.notes);
  };

  const handleSubmit = (e: React.FormEvent, planId: string) => {
    e.preventDefault();
    const orig = plannings.find((p) => p.id === planId);
    if (!orig) return;

    updatePlanning({
      ...orig,
      deadline: formDeadline,
      weekday: formWeekday,
      priority: formPriority,
      estimatedDuration: formDuration,
      difficulty: formDifficulty,
      energyNeeded: formEnergy,
      location: formLocation,
      materialsNeeded: formMaterials,
      backlog: formBacklog,
      notes: formNotes
    });

    setEditingPlanId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="border-b border-brand-pink-light pb-4">
        <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Planejamento e Logística</h1>
        <p className="text-xs text-brand-gray mt-1">Organize as condições de produção de cada vídeo, como energia necessária, materiais, locais e prazos.</p>
      </div>

      {/* CARD BENTO GRID (Visual logistics planning) */}
      <div className="space-y-6">
        {scripts.map((script) => {
          const product = products.find((p) => p.id === script.productId);
          // Find or fallback planning
          let plan = plannings.find((p) => p.scriptId === script.id);
          
          if (!plan) {
            // Fallback placeholder object if not fully generated
            plan = {
              id: `plan-mock-${script.id}`,
              scriptId: script.id,
              deadline: '2026-07-04',
              weekday: 'Sábado',
              priority: 'media',
              estimatedDuration: '1.5h',
              difficulty: 'medio',
              energyNeeded: 'media',
              location: 'Quarto em luz natural',
              materialsNeeded: 'Embalagem do produto, espelho',
              backlog: 'Nenhuma pendência crítica.',
              notes: 'Trilha lofi suave.'
            };
          }

          const isEditingThis = editingPlanId === plan.id;

          return (
            <div
              key={script.id}
              className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all"
            >
              {/* Header Title / Product */}
              <div className="flex flex-wrap items-center justify-between border-b border-brand-pink-light/10 pb-4 gap-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-charcoal">{script.title}</h3>
                  {product && (
                    <p className="text-xs text-brand-pink font-semibold mt-0.5">
                      📦 {product.name} ({product.brand})
                    </p>
                  )}
                </div>

                {!isEditingThis && (
                  <button
                    onClick={() => handleStartEdit(plan!)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-pink-light/60 hover:bg-brand-pink hover:text-white rounded-xl text-xs font-semibold text-brand-pink-dark transition-all"
                  >
                    <Edit2 size={12} /> Ajustar Logística
                  </button>
                )}
              </div>

              {/* RENDER EDITING MODE */}
              {isEditingThis ? (
                <form onSubmit={(e) => handleSubmit(e, plan!.id)} className="pt-4 space-y-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Prazo Final</label>
                      <input
                        type="date"
                        value={formDeadline}
                        onChange={(e) => setFormDeadline(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Dia da Semana</label>
                      <input
                        type="text"
                        value={formWeekday}
                        onChange={(e) => setFormWeekday(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Prioridade</label>
                      <select
                        value={formPriority}
                        onChange={(e) => setFormPriority(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      >
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Tempo Estimado</label>
                      <input
                        type="text"
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Dificuldade</label>
                      <select
                        value={formDifficulty}
                        onChange={(e) => setFormDifficulty(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      >
                        <option value="facil">Fácil</option>
                        <option value="medio">Médio</option>
                        <option value="dificil">Difícil</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Energia Necessária</label>
                      <select
                        value={formEnergy}
                        onChange={(e) => setFormEnergy(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                      >
                        <option value="baixa">Baixa (Sem narrar)</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta (Locução complexa)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Local de Gravação</label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                        placeholder="Ex: Bancada do banheiro na luz da manhã"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Materiais Necessários</label>
                      <input
                        type="text"
                        value={formMaterials}
                        onChange={(e) => setFormMaterials(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                        placeholder="Ex: Espelho de bancada, flores de cerejeira"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Pendências Ativas</label>
                      <input
                        type="text"
                        value={formBacklog}
                        onChange={(e) => setFormBacklog(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                        placeholder="Ex: Fazer b-roll de close-up"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-charcoal">Notas Extra / Trilha Sonora</label>
                      <input
                        type="text"
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                        placeholder="Ex: Trilha lo-fi lenta"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPlanId(null)}
                      className="px-4 py-2 border border-brand-pink-light text-brand-gray rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-pink text-white rounded-xl shadow-sm hover:bg-brand-pink-dark"
                    >
                      Gravar Logística
                    </button>
                  </div>
                </form>
              ) : (
                
                /* RENDER LOGISTICS METRICS DISPLAY */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-5 text-xs">
                  {/* Item 1 */}
                  <div className="p-4 rounded-2xl bg-brand-offwhite border border-brand-pink-light/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-gray font-semibold uppercase tracking-wider text-[10px]">
                      <Calendar size={12} className="text-brand-pink" /> Prazo Final
                    </div>
                    <p className="font-bold text-brand-charcoal mt-1">
                      {plan.deadline} <span className="text-brand-pink font-semibold">({plan.weekday})</span>
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-2xl bg-brand-offwhite border border-brand-pink-light/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-gray font-semibold uppercase tracking-wider text-[10px]">
                      <TrendingUp size={12} className="text-brand-pink" /> Dificuldade & Prioridade
                    </div>
                    <p className="font-bold text-brand-charcoal mt-1 capitalize">
                      {plan.difficulty} • {plan.priority}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-2xl bg-brand-offwhite border border-brand-pink-light/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-gray font-semibold uppercase tracking-wider text-[10px]">
                      <Zap size={12} className="text-brand-pink" /> Energia & Tempo
                    </div>
                    <p className="font-bold text-brand-charcoal mt-1 capitalize">
                      {plan.energyNeeded} • {plan.estimatedDuration}
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 rounded-2xl bg-brand-offwhite border border-brand-pink-light/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-gray font-semibold uppercase tracking-wider text-[10px]">
                      <MapPin size={12} className="text-brand-pink" /> Cenário / Local
                    </div>
                    <p className="font-bold text-brand-charcoal mt-1 truncate">
                      {plan.location}
                    </p>
                  </div>

                  {/* Bottom details list */}
                  <div className="col-span-2 sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-pink-light/10 pt-4 text-xs">
                    <div>
                      <span className="font-bold text-brand-gray block mb-1">🛠️ Materiais Necessários:</span>
                      <p className="text-brand-charcoal font-medium bg-brand-beige/55 p-3.5 rounded-2xl">
                        {plan.materialsNeeded}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-brand-gray block mb-1">⏳ Pendências / Notas:</span>
                      <p className="text-brand-charcoal font-medium bg-brand-pink-light/20 p-3.5 rounded-2xl border border-brand-pink-light/20">
                        {plan.backlog} • {plan.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

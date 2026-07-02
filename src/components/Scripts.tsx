import React, { useState, useEffect } from 'react';
import { useAppState } from './StateContext';
import { Script, WorkflowStage, Product, Hook, Scene, Reference } from '../types';
import {
  FileText,
  Plus,
  ArrowLeft,
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  Video,
  Bookmark,
  Magnet,
  CalendarDays,
  Sparkles,
  Layers,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  ChevronRight
} from 'lucide-react';

export const Scripts: React.FC = () => {
  const {
    scripts,
    addScript,
    updateScript,
    deleteScript,
    products,
    hooks,
    scenes,
    references,
    selectedScriptId,
    setSelectedScriptId,
    environments,
    equipments,
    lightings,
    backgrounds,
    props,
    videoStyles,
    checklists
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<WorkflowStage | 'Todos'>('Todos');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formProductId, setFormProductId] = useState('');
  const [formObjective, setFormObjective] = useState('');
  const [formHookId, setFormHookId] = useState('');
  const [formDevelopment, setFormDevelopment] = useState('');
  const [formCta, setFormCta] = useState('');
  const [formEstimatedTime, setFormEstimatedTime] = useState('45s');
  const [formChecklist, setFormChecklist] = useState<{ id: string; label: string; checked: boolean }[]>([]);
  const [formSceneIds, setFormSceneIds] = useState<string[]>([]);
  const [formRefIds, setFormRefIds] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<WorkflowStage>('idea');

  // Estúdio de Produção Form Fields
  const [formEnvironmentId, setFormEnvironmentId] = useState('');
  const [formEquipmentIds, setFormEquipmentIds] = useState<string[]>([]);
  const [formBackgroundId, setFormBackgroundId] = useState('');
  const [formPropIds, setFormPropIds] = useState<string[]>([]);
  const [formLightingId, setFormLightingId] = useState('');
  const [formVideoStyleId, setFormVideoStyleId] = useState('');

  // Temporary item to add to checklist
  const [newChecklistItemText, setNewChecklistItemText] = useState('');

  const stages: { id: WorkflowStage; label: string; color: string }[] = [
    { id: 'idea', label: 'Ideia 💡', color: 'bg-stone-100 text-stone-700 border-stone-200' },
    { id: 'planning', label: 'Planejamento 📝', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'script', label: 'Roteiro ✍️', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'recording', label: 'Gravação 🎥', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'editing', label: 'Edição 🎬', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'review', label: 'Revisão 👀', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { id: 'scheduled', label: 'Agendado 📅', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'published', label: 'Publicado ✨', color: 'bg-green-50 text-green-700 border-green-200' }
  ];

  // Apply checklist template helper
  const handleApplyChecklistTemplate = (templateId: string) => {
    const template = checklists.find(c => c.id === templateId);
    if (template) {
      const formatted = template.items.map((lbl, idx) => ({
        id: `chk-template-${idx}-${Date.now()}`,
        label: lbl,
        checked: false
      }));
      setFormChecklist(formatted);
    }
  };

  // Set form values on editing script or creating new one
  useEffect(() => {
    if (selectedScriptId) {
      if (selectedScriptId === 'new') {
        // Prepare blank form
        setFormTitle('');
        setFormProductId(products[0]?.id || '');
        setFormObjective('');
        setFormHookId(hooks[0]?.id || '');
        setFormDevelopment('');
        setFormCta('');
        setFormEstimatedTime('45s');
        setFormChecklist([
          { id: 'chk-1', label: 'Separar o produto limpo', checked: false },
          { id: 'chk-2', label: 'Preparar luz e ringlight', checked: false },
          { id: 'chk-3', label: 'Gravar gancho em 3 variações', checked: false },
          { id: 'chk-4', label: 'Gravar cenas B-roll', checked: false },
          { id: 'chk-5', label: 'Montar transição de impacto', checked: false },
          { id: 'chk-6', label: 'Fazer locução de áudio limpa', checked: false },
          { id: 'chk-7', label: 'Legendar e sincronizar no CapCut', checked: false }
        ]);
        setFormSceneIds([]);
        setFormRefIds([]);
        setFormStatus('idea');

        setFormEnvironmentId('');
        setFormEquipmentIds([]);
        setFormBackgroundId('');
        setFormPropIds([]);
        setFormLightingId('');
        setFormVideoStyleId('');
      } else {
        const script = scripts.find((s) => s.id === selectedScriptId);
        if (script) {
          setFormTitle(script.title);
          setFormProductId(script.productId);
          setFormObjective(script.objective);
          setFormHookId(script.hookId);
          setFormDevelopment(script.development);
          setFormCta(script.cta);
          setFormEstimatedTime(script.estimatedTime);
          setFormChecklist(script.checklist);
          setFormSceneIds(script.sceneIds);
          setFormRefIds(script.referenceIds);
          setFormStatus(script.status);

          setFormEnvironmentId(script.environmentId || '');
          setFormEquipmentIds(script.equipmentIds || []);
          setFormBackgroundId(script.backgroundId || '');
          setFormPropIds(script.propIds || []);
          setFormLightingId(script.lightingId || '');
          setFormVideoStyleId(script.videoStyleId || '');
        }
      }
    }
  }, [selectedScriptId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const scriptData: Script = {
      id: selectedScriptId === 'new' ? `script-${Date.now()}` : (selectedScriptId || ''),
      title: formTitle,
      productId: formProductId,
      objective: formObjective,
      hookId: formHookId,
      development: formDevelopment,
      cta: formCta,
      estimatedTime: formEstimatedTime,
      checklist: formChecklist,
      sceneIds: formSceneIds,
      referenceIds: formRefIds,
      status: formStatus,
      environmentId: formEnvironmentId,
      equipmentIds: formEquipmentIds,
      backgroundId: formBackgroundId,
      propIds: formPropIds,
      lightingId: formLightingId,
      videoStyleId: formVideoStyleId
    };

    if (selectedScriptId === 'new') {
      addScript(scriptData);
    } else {
      updateScript(scriptData);
    }

    setSelectedScriptId(null);
  };

  const handleDeleteScript = (id: string) => {
    if (confirm('Deseja excluir este roteiro de forma permanente?')) {
      deleteScript(id);
      setSelectedScriptId(null);
    }
  };

  // Toggle sub-checklist items inside editor
  const handleToggleChecklistItem = (chkId: string) => {
    const updated = formChecklist.map((item) =>
      item.id === chkId ? { ...item, checked: !item.checked } : item
    );
    setFormChecklist(updated);
  };

  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistItemText.trim()) return;
    const newItem = {
      id: `chk-${Date.now()}`,
      label: newChecklistItemText.trim(),
      checked: false
    };
    setFormChecklist([...formChecklist, newItem]);
    setNewChecklistItemText('');
  };

  const handleRemoveChecklistItem = (chkId: string) => {
    setFormChecklist(formChecklist.filter((item) => item.id !== chkId));
  };

  // Multi-select for scenes
  const handleToggleSceneConnection = (scId: string) => {
    if (formSceneIds.includes(scId)) {
      setFormSceneIds(formSceneIds.filter((id) => id !== scId));
    } else {
      setFormSceneIds([...formSceneIds, scId]);
    }
  };

  // Multi-select for references
  const handleToggleReferenceConnection = (refId: string) => {
    if (formRefIds.includes(refId)) {
      setFormRefIds(formRefIds.filter((id) => id !== refId));
    } else {
      setFormRefIds([...formRefIds, refId]);
    }
  };

  // Filters
  const filteredScripts = scripts.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.objective.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* 1. SCRIPT EDITOR SPLIT SCREEN OR LARGE COMPOSER */}
      {selectedScriptId ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Back Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedScriptId(null)}
              className="flex items-center gap-2 text-sm font-semibold text-brand-pink hover:text-brand-pink-dark transition-colors"
            >
              <ArrowLeft size={16} /> Voltar para os Roteiros
            </button>

            <div className="flex items-center gap-3">
              {selectedScriptId !== 'new' && (
                <button
                  type="button"
                  onClick={() => handleDeleteScript(selectedScriptId)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-red-100 bg-white text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all"
                >
                  <Trash2 size={13} /> Excluir Roteiro
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold rounded-xl shadow-premium transition-all"
              >
                Salvar Roteiro UGC
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COMPOSER COL: WRITING THE SCRIPT FIELDS (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-brand-pink-light/35 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              <div className="border-b border-brand-pink-light pb-4">
                <h2 className="text-xl font-serif text-brand-charcoal font-bold">Roteiro UGC Estético</h2>
                <p className="text-[10px] uppercase tracking-wider text-brand-pink font-semibold mt-1">Sinfonia de Textos e Ganchos</p>
              </div>

              {/* Title & Product */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Título do Roteiro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Rotina Clean Girl Manhã"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Produto Principal</label>
                  <select
                    value={formProductId}
                    onChange={(e) => setFormProductId(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-brand-charcoal">Objetivo Comercial do Vídeo</label>
                <input
                  type="text"
                  placeholder="Ex: Mostrar hidratação extrema de forma relaxante"
                  value={formObjective}
                  onChange={(e) => setFormObjective(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                />
              </div>

              {/* Hook Selection */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-brand-charcoal">Escolher Gancho (Primeiros 3 segundos) 🧲</label>
                <select
                  value={formHookId}
                  onChange={(e) => setFormHookId(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink capitalize"
                >
                  <option value="">Selecione um gancho do seu banco</option>
                  {hooks.map((h) => (
                    <option key={h.id} value={h.id}>[{h.category.toUpperCase()}] {h.title}</option>
                  ))}
                </select>
                {formHookId && (
                  <p className="text-[11px] text-brand-pink font-serif italic mt-1 bg-brand-pink-light/30 p-3 rounded-xl">
                    "{hooks.find(h => h.id === formHookId)?.content}"
                  </p>
                )}
              </div>

              {/* Body copywriting (Desenvolvimento) */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-brand-charcoal">Desenvolvimento do Roteiro (Voz de fundo / Locução ou Textos)</label>
                <textarea
                  rows={6}
                  placeholder="Escreva aqui o fluxo do seu vídeo, indicando o que falar em cada take..."
                  value={formDevelopment}
                  onChange={(e) => setFormDevelopment(e.target.value)}
                  className="w-full text-xs p-4 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink font-sans leading-relaxed"
                />
              </div>

              {/* CTA */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-brand-charcoal">Chamada para Ação (CTA) final</label>
                <input
                  type="text"
                  placeholder="Ex: Clique no link da bio para garantir o seu com frete grátis."
                  value={formCta}
                  onChange={(e) => setFormCta(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                />
              </div>

              {/* Stage and duration */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Tempo Estimado</label>
                  <input
                    type="text"
                    placeholder="Ex: 45s"
                    value={formEstimatedTime}
                    onChange={(e) => setFormEstimatedTime(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Etapa do Workflow</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as WorkflowStage)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                  >
                    {stages.map((st) => (
                      <option key={st.id} value={st.id}>{st.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estúdio de Produção Configs */}
              <div className="border-t border-brand-pink-light/35 pt-6 space-y-4">
                <h3 className="font-serif text-sm font-bold text-brand-charcoal flex items-center gap-1.5 text-brand-pink">
                  <Sparkles size={16} /> Planejamento de Gravação (Estúdio)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Ambiente Sugerido */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Ambiente de Gravação</label>
                    <select
                      value={formEnvironmentId}
                      onChange={(e) => setFormEnvironmentId(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    >
                      <option value="">Selecione o ambiente...</option>
                      {environments.map((env) => (
                        <option key={env.id} value={env.id}>🏡 {env.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Configuração de Iluminação */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Configuração de Iluminação</label>
                    <select
                      value={formLightingId}
                      onChange={(e) => setFormLightingId(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    >
                      <option value="">Selecione a iluminação...</option>
                      {lightings.map((l) => (
                        <option key={l.id} value={l.id}>💡 {l.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fundo Recomendado */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Fundo Recomendado</label>
                    <select
                      value={formBackgroundId}
                      onChange={(e) => setFormBackgroundId(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    >
                      <option value="">Selecione o fundo...</option>
                      {backgrounds.map((bg) => (
                        <option key={bg.id} value={bg.id}>🖼️ {bg.name} ({bg.style})</option>
                      ))}
                    </select>
                  </div>

                  {/* Estilo de Vídeo */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Estilo de Vídeo</label>
                    <select
                      value={formVideoStyleId}
                      onChange={(e) => setFormVideoStyleId(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    >
                      <option value="">Selecione o estilo...</option>
                      {videoStyles.map((vs) => (
                        <option key={vs.id} value={vs.id}>🎬 {vs.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Equipamentos */}
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-brand-charcoal">Equipamentos Necessários</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto bg-brand-offwhite p-3 rounded-xl border border-brand-pink-light/80">
                    {equipments.map((eq) => {
                      const isSelected = formEquipmentIds.includes(eq.id);
                      return (
                        <button
                          type="button"
                          key={eq.id}
                          onClick={() => {
                            if (isSelected) {
                              setFormEquipmentIds(formEquipmentIds.filter(id => id !== eq.id));
                            } else {
                              setFormEquipmentIds([...formEquipmentIds, eq.id]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-brand-pink text-white border-brand-pink shadow-xs'
                              : 'bg-white text-brand-charcoal border-brand-pink-light/40 hover:border-brand-pink'
                          }`}
                        >
                          🔌 {eq.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Props */}
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-brand-charcoal">Objetos de Cena (Props)</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto bg-brand-offwhite p-3 rounded-xl border border-brand-pink-light/80">
                    {props.map((pr) => {
                      const isSelected = formPropIds.includes(pr.id);
                      return (
                        <button
                          type="button"
                          key={pr.id}
                          onClick={() => {
                            if (isSelected) {
                              setFormPropIds(formPropIds.filter(id => id !== pr.id));
                            } else {
                              setFormPropIds([...formPropIds, pr.id]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-brand-pink text-white border-brand-pink shadow-xs'
                              : 'bg-white text-brand-charcoal border-brand-pink-light/40 hover:border-brand-pink'
                          }`}
                        >
                          🧸 {pr.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Template loader */}
                {checklists.length > 0 && (
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-brand-charcoal">Carregar Modelo de Checklist</label>
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleApplyChecklistTemplate(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    >
                      <option value="">Escolha um modelo para preencher o checklist de gravação...</option>
                      {checklists.map((c) => (
                        <option key={c.id} value={c.id}>📋 {c.name} ({c.items.length} itens)</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COMPOSER COL: CONNECTED CHECKLISTS & SCENES (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">

              {/* LIVE FICHA TÉCNICA DE PRODUÇÃO */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center gap-1.5 border-b border-brand-pink-light pb-3">
                  <Sparkles className="text-brand-pink animate-pulse" size={16} />
                  <h4 className="text-sm font-bold text-brand-charcoal font-serif">Ficha Técnica de Gravação</h4>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Ambiente */}
                  {formEnvironmentId ? (() => {
                    const env = environments.find(e => e.id === formEnvironmentId);
                    if (!env) return null;
                    return (
                      <div className="flex gap-3 items-center bg-brand-offwhite p-2.5 rounded-2xl border border-brand-pink-light/20">
                        <img src={env.photo} alt={env.name} className="w-12 h-12 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-brand-pink font-bold">🏡 Ambiente Sugerido</span>
                          <h5 className="font-bold text-brand-charcoal text-[11px] truncate">{env.name}</h5>
                          <p className="text-[10px] text-brand-gray truncate">🕒 {env.bestTime}</p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="text-stone-400 italic text-[10px] p-2 bg-brand-offwhite/50 rounded-xl border border-dashed border-stone-200">
                      🏡 Nenhum ambiente vinculado.
                    </div>
                  )}

                  {/* Iluminação */}
                  {formLightingId ? (() => {
                    const light = lightings.find(l => l.id === formLightingId);
                    if (!light) return null;
                    return (
                      <div className="flex gap-3 items-center bg-brand-offwhite p-2.5 rounded-2xl border border-brand-pink-light/20">
                        <img src={light.photo} alt={light.name} className="w-12 h-12 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-brand-pink font-bold">💡 Iluminação</span>
                          <h5 className="font-bold text-brand-charcoal text-[11px] truncate">{light.name}</h5>
                          <p className="text-[10px] text-brand-gray truncate">🔆 {light.intensity} - {light.temperature}</p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="text-stone-400 italic text-[10px] p-2 bg-brand-offwhite/50 rounded-xl border border-dashed border-stone-200">
                      💡 Nenhuma iluminação vinculada.
                    </div>
                  )}

                  {/* Fundo */}
                  {formBackgroundId ? (() => {
                    const bg = backgrounds.find(b => b.id === formBackgroundId);
                    if (!bg) return null;
                    return (
                      <div className="flex gap-3 items-center bg-brand-offwhite p-2.5 rounded-2xl border border-brand-pink-light/20">
                        <img src={bg.photo} alt={bg.name} className="w-12 h-12 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-brand-pink font-bold">🖼️ Fundo Recomendado</span>
                          <h5 className="font-bold text-brand-charcoal text-[11px] truncate">{bg.name}</h5>
                          <p className="text-[10px] text-brand-gray truncate">🎨 Estilo: {bg.style}</p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="text-stone-400 italic text-[10px] p-2 bg-brand-offwhite/50 rounded-xl border border-dashed border-stone-200">
                      🖼️ Nenhum fundo recomendado.
                    </div>
                  )}

                  {/* Estilo de Vídeo */}
                  {formVideoStyleId ? (() => {
                    const vs = videoStyles.find(v => v.id === formVideoStyleId);
                    if (!vs) return null;
                    return (
                      <div className="bg-brand-offwhite p-2.5 rounded-2xl border border-brand-pink-light/20">
                        <span className="text-[9px] uppercase tracking-wider text-brand-pink font-bold">🎬 Estilo de Vídeo</span>
                        <h5 className="font-bold text-brand-charcoal text-[11px] mt-0.5">{vs.name}</h5>
                        {vs.description && <p className="text-[10px] text-brand-gray mt-1 leading-relaxed line-clamp-2">{vs.description}</p>}
                      </div>
                    );
                  })() : null}

                  {/* Equipamentos */}
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-gray font-bold block mb-1.5">🔌 Equipamentos Necessários</span>
                    {formEquipmentIds.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {formEquipmentIds.map(eqId => {
                          const eq = equipments.find(e => e.id === eqId);
                          if (!eq) return null;
                          return (
                            <span key={eqId} className="bg-brand-pink-light/35 text-brand-pink font-semibold px-2 py-0.5 rounded-md text-[10px]">
                              🔌 {eq.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-400 italic text-[10px]">Nenhum equipamento selecionado.</p>
                    )}
                  </div>

                  {/* Objetos de cena */}
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-gray font-bold block mb-1.5">🧸 Objetos de Cena (Props)</span>
                    {formPropIds.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {formPropIds.map(pId => {
                          const pr = props.find(p => p.id === pId);
                          if (!pr) return null;
                          return (
                            <span key={pId} className="bg-amber-50 text-amber-800 border border-amber-200/40 font-semibold px-2 py-0.5 rounded-md text-[10px]">
                              🧸 {pr.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-400 italic text-[10px]">Nenhum prop selecionado.</p>
                    )}
                  </div>

                  {/* Cenas relacionadas */}
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-gray font-bold block mb-1.5">🎥 Cenas Relacionadas</span>
                    {formSceneIds.length > 0 ? (
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {formSceneIds.map(scId => {
                          const sc = scenes.find(s => s.id === scId);
                          if (!sc) return null;
                          return (
                            <div key={scId} className="flex items-center gap-1.5 text-[10px] text-brand-charcoal bg-brand-offwhite p-1 rounded-lg">
                              <span className="text-brand-pink shrink-0">🎥</span>
                              <span className="truncate font-medium">{sc.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-400 italic text-[10px]">Nenhuma cena vinculada.</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* CHECKLIST DE GRAVAÇÃO */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-pink-light pb-3">
                  <CheckSquare className="text-brand-pink" size={18} />
                  <h4 className="text-sm font-bold text-brand-charcoal">Checklist de Produção</h4>
                </div>

                {/* Sub list */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {formChecklist.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-brand-offwhite">
                      <button
                        type="button"
                        onClick={() => handleToggleChecklistItem(item.id)}
                        className="flex items-center gap-2.5 text-left"
                      >
                        {item.checked ? (
                          <CheckCircle className="text-brand-pink shrink-0" size={16} />
                        ) : (
                          <div className="w-4 h-4 rounded-md border-2 border-brand-nude-dark shrink-0" />
                        )}
                        <span className={`text-[11px] font-medium ${item.checked ? 'line-through text-brand-gray' : 'text-brand-charcoal'}`}>
                          {item.label}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        className="text-[10px] text-brand-gray hover:text-red-500 px-1"
                      >
                        Excluir
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add items to checklist */}
                <div className="flex gap-2 pt-2 border-t border-brand-pink-light/20">
                  <input
                    type="text"
                    placeholder="Adicionar check..."
                    value={newChecklistItemText}
                    onChange={(e) => setNewChecklistItemText(e.target.value)}
                    className="flex-1 text-[11px] px-3 py-2 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                  />
                  <button
                    type="button"
                    onClick={handleAddChecklistItem}
                    className="bg-brand-pink text-white text-[11px] font-semibold px-3 py-2 rounded-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* MULTI-SELECT CENAS VINCULADAS */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-pink-light pb-3">
                  <Video className="text-brand-pink" size={18} />
                  <h4 className="text-sm font-bold text-brand-charcoal">Vincular Cenas do Banco</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {scenes.map((scene) => {
                    const isSelected = formSceneIds.includes(scene.id);
                    return (
                      <button
                        type="button"
                        key={scene.id}
                        onClick={() => handleToggleSceneConnection(scene.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-brand-pink-light/45 border-brand-pink text-brand-pink-dark font-semibold'
                            : 'bg-brand-offwhite border-transparent text-brand-charcoal hover:border-brand-pink-light/40'
                        }`}
                      >
                        <span className="truncate">{scene.name}</span>
                        {isSelected && <CheckCircle size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MULTI-SELECT REFERÊNCIAS VINCULADAS */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-pink-light pb-3">
                  <Bookmark className="text-brand-pink" size={18} />
                  <h4 className="text-sm font-bold text-brand-charcoal">Vincular Referências Externas</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {references.map((ref) => {
                    const isSelected = formRefIds.includes(ref.id);
                    return (
                      <button
                        type="button"
                        key={ref.id}
                        onClick={() => handleToggleReferenceConnection(ref.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-brand-pink-light/45 border-brand-pink text-brand-pink-dark font-semibold'
                            : 'bg-brand-offwhite border-transparent text-brand-charcoal hover:border-brand-pink-light/40'
                        }`}
                      >
                        <span className="truncate">{ref.title} ({ref.platform})</span>
                        {isSelected && <CheckCircle size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </form>
      ) : (
        
        /* 2. SCRIPT LIST EXPLORER */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
            <div>
              <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Roteiros UGC</h1>
              <p className="text-xs text-brand-gray mt-1">Desenvolva narrativas que retêm, convertem e convencem.</p>
            </div>

            <button
              onClick={() => setSelectedScriptId('new')}
              className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
            >
              <Plus size={14} /> Novo Roteiro
            </button>
          </div>

          {/* FILTERS & SEARCH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
              <input
                type="text"
                placeholder="Pesquisar roteiro ou objetivo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 border border-brand-pink-light/60 bg-white rounded-2xl focus:outline-none focus:border-brand-pink"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full text-xs px-4 py-3 bg-white border border-brand-pink-light/60 rounded-2xl focus:outline-none focus:border-brand-pink text-brand-charcoal"
            >
              <option value="Todos">Todas as Etapas</option>
              {stages.map((st) => (
                <option key={st.id} value={st.id}>{st.label}</option>
              ))}
            </select>
          </div>

          {/* SCRIPT CARDS VIEW */}
          {filteredScripts.length === 0 ? (
            <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
              <FileText size={36} className="text-brand-pink mx-auto" />
              <div>
                <h4 className="font-serif font-bold text-brand-charcoal">Nenhum roteiro encontrado</h4>
                <p className="text-xs text-brand-gray mt-1">Sua busca não trouxe resultados. Crie um novo roteiro para começar.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredScripts.map((s) => {
                const product = products.find((p) => p.id === s.productId);
                const stageDetails = stages.find((st) => st.id === s.status);
                const progressCount = s.checklist.filter(item => item.checked).length;
                const progressPercent = Math.round((progressCount / s.checklist.length) * 100) || 0;

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedScriptId(s.id)}
                    className="group bg-white border border-brand-pink-light/40 rounded-3xl p-5 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${stageDetails?.color || ''}`}>
                          {stageDetails?.label}
                        </span>
                        <span className="text-[10px] text-brand-gray font-medium">{s.estimatedTime}</span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-brand-charcoal group-hover:text-brand-pink transition-colors">
                        {s.title}
                      </h3>

                      {product && (
                        <p className="text-xs text-brand-pink font-semibold">
                          📦 {product.name} ({product.brand})
                        </p>
                      )}

                      <p className="text-[11px] text-brand-gray leading-relaxed line-clamp-3">
                        {s.objective}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="border-t border-brand-pink-light/10 pt-3.5 space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-bold text-brand-gray uppercase tracking-wider">
                        <span>Progresso Gravação</span>
                        <span>{progressCount}/{s.checklist.length} ({progressPercent}%)</span>
                      </div>
                      <div className="w-full bg-brand-offwhite h-1.5 rounded-full overflow-hidden border border-brand-pink-light/5">
                        <div
                          className="bg-brand-pink h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-end text-[10px] text-brand-pink font-bold mt-1 group-hover:translate-x-1 transition-transform">
                        Abrir Roteiro <ChevronRight size={10} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Idea, Category } from '../types';
import { CATEGORIES } from '../data';
import {
  Lightbulb,
  Plus,
  Trash2,
  Package,
  Bookmark,
  Video,
  Magnet,
  Calendar,
  Layers,
  Sparkles,
  AlertCircle,
  Edit
} from 'lucide-react';

export const Ideas: React.FC = () => {
  const {
    ideas,
    addIdea,
    updateIdea,
    deleteIdea,
    products,
    references,
    scripts,
    hooks,
    scenes
  } = useAppState();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIdeaId, setEditingIdeaId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formProductId, setFormProductId] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Maquiagem');
  const [formRefId, setFormRefId] = useState('');
  const [formScriptId, setFormScriptId] = useState('');
  const [formHookId, setFormHookId] = useState('');
  const [formSceneId, setFormSceneId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    if (editingIdeaId) {
      const orig = ideas.find((i) => i.id === editingIdeaId);
      if (orig) {
        updateIdea({
          ...orig,
          title: formTitle,
          description: formDescription,
          productId: formProductId,
          category: formCategory,
          hookId: formHookId,
          referenceId: formRefId,
          scriptId: formScriptId,
          sceneId: formSceneId
        });
      }
    } else {
      const ideaData: Idea = {
        id: `idea-${Date.now()}`,
        title: formTitle,
        description: formDescription,
        productId: formProductId,
        category: formCategory,
        referenceId: formRefId,
        scriptId: formScriptId,
        hookId: formHookId,
        sceneId: formSceneId,
        createdAt: new Date().toISOString().split('T')[0]
      };

      addIdea(ideaData);
    }
    resetForm();
  };

  const handleStartEdit = (idea: Idea) => {
    setEditingIdeaId(idea.id);
    setFormTitle(idea.title);
    setFormDescription(idea.description || '');
    setFormProductId(idea.productId || '');
    setFormCategory(idea.category);
    setFormRefId(idea.referenceId || '');
    setFormScriptId(idea.scriptId || '');
    setFormHookId(idea.hookId || '');
    setFormSceneId(idea.sceneId || '');
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormProductId('');
    setFormCategory('Maquiagem');
    setFormRefId('');
    setFormScriptId('');
    setFormHookId('');
    setFormSceneId('');
    setIsFormOpen(false);
    setEditingIdeaId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta ideia?')) {
      deleteIdea(id);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Inbox de Ideias</h1>
          <p className="text-xs text-brand-gray mt-1">Capture ideias rápidas em segundos para que nada escape ao seu cérebro criativo.</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
        >
          <Plus size={14} /> Capturar Ideia
        </button>
      </div>

      {/* QUICK CAPTURE FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-brand-pink-light/40 rounded-3xl p-6 shadow-premium space-y-6">
          <h3 className="text-lg font-serif font-bold text-brand-charcoal flex items-center gap-2">
            <Sparkles size={18} className="text-brand-pink" /> O que você imaginou para um vídeo?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Título da Ideia *</label>
              <input
                type="text"
                required
                placeholder="Ex: Unboxing sensorial em cima de flores"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Produto Relacionado</label>
              <select
                value={formProductId}
                onChange={(e) => setFormProductId(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                <option value="">Nenhum</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Categoria</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as Category)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Gancho Relacionado (Opcional)</label>
              <select
                value={formHookId}
                onChange={(e) => setFormHookId(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                <option value="">Nenhum</option>
                {hooks.map((h) => (
                  <option key={h.id} value={h.id}>{h.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-brand-charcoal">Descrição / Rascunho Rápido</label>
            <textarea
              rows={3}
              placeholder="Ex: Fazer takes curtos retirando a embalagem lentamente. Escrever na legenda sobre a importância da hidratação..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full text-xs p-4 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-brand-pink-light/20">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl border border-brand-pink-light text-xs font-semibold text-brand-gray hover:bg-brand-offwhite"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-semibold hover:bg-brand-pink-dark transition-all shadow-premium"
            >
              Salvar Ideia
            </button>
          </div>
        </form>
      )}

      {/* LIST OF IDEAS (Elegant Cards) */}
      {ideas.length === 0 ? (
        <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
          <Lightbulb size={36} className="text-brand-pink mx-auto animate-pulse" />
          <div>
            <h4 className="font-serif font-bold text-brand-charcoal">Inbox de ideias vazio</h4>
            <p className="text-xs text-brand-gray mt-1">Nenhuma ideia anotada ainda. Comece clicando em "Capturar Ideia".</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ideas.map((idea) => {
            const product = products.find((p) => p.id === idea.productId);
            const hook = hooks.find((h) => h.id === idea.hookId);

            return (
              <div
                key={idea.id}
                className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-brand-pink-light text-brand-pink-dark px-2.5 py-1 rounded-full border border-brand-pink-light/10">
                      💡 {idea.category}
                    </span>
                    <span className="text-[10px] text-brand-gray font-medium">Anatoda em: {idea.createdAt}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-brand-charcoal cursor-pointer hover:text-brand-pink transition-colors" onClick={() => handleStartEdit(idea)}>{idea.title}</h3>
                  <p 
                    className="text-xs text-brand-gray leading-relaxed bg-brand-offwhite/50 p-3 rounded-2xl border border-brand-pink-light/10 cursor-pointer hover:bg-brand-pink-light/10 hover:border-brand-pink-light/30 transition-all"
                    onClick={() => handleStartEdit(idea)}
                    title="Clique para editar"
                  >
                    {idea.description || 'Nenhum detalhe adicional inserido.'}
                  </p>
                </div>

                {/* Connections section */}
                <div className="border-t border-brand-pink-light/10 pt-3 flex flex-col gap-2 text-[10px] font-semibold text-brand-gray">
                  {product && (
                    <div className="flex items-center gap-1.5">
                      <Package size={12} className="text-brand-pink" />
                      <span>Produto: <strong className="text-brand-pink-dark">{product.name} ({product.brand})</strong></span>
                    </div>
                  )}

                  {hook && (
                    <div className="flex items-center gap-1.5">
                      <Magnet size={12} className="text-brand-pink" />
                      <span>Gancho: <strong className="text-brand-pink-dark">{hook.title}</strong></span>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex items-center justify-end border-t border-brand-pink-light/5 pt-2 mt-1 gap-3">
                    <button
                      onClick={() => handleStartEdit(idea)}
                      className="text-brand-gray hover:text-brand-pink text-[10px] font-bold flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit size={12} /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="text-brand-gray hover:text-red-500 text-[10px] font-bold flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} /> Descartar Ideia
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Hook, HookCategory } from '../types';
import { Magnet, Plus, Search, HelpCircle, Tag, Trash2, Edit, AlertCircle } from 'lucide-react';

export const Hooks: React.FC = () => {
  const { hooks, addHook, updateHook, deleteHook, products } = useAppState();
  const [activeCategory, setActiveCategory] = useState<HookCategory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<HookCategory>('curiosidade');
  const [formContent, setFormContent] = useState('');
  const [formProductIds, setFormProductIds] = useState<string[]>([]);

  const hookCategories: { id: HookCategory; label: string }[] = [
    { id: 'curiosidade', label: 'Curiosidade' },
    { id: 'erro', label: 'Erro' },
    { id: 'pov', label: 'POV' },
    { id: 'storytelling', label: 'Storytelling' },
    { id: 'asmr', label: 'ASMR' },
    { id: 'rotina', label: 'Rotina' },
    { id: 'comparacao', label: 'Comparação' },
    { id: 'review', label: 'Review' },
    { id: 'unboxing', label: 'Unboxing' },
    { id: 'luxo', label: 'Luxo' },
    { id: 'elegancia', label: 'Elegância' },
    { id: 'economia', label: 'Economia' },
    { id: 'emocional', label: 'Emocional' },
    { id: 'autoridade', label: 'Autoridade' },
    { id: 'urgencia', label: 'Urgência' }
  ];

  const handleStartEdit = (h: Hook) => {
    setEditingId(h.id);
    setFormTitle(h.title);
    setFormCategory(h.category);
    setFormContent(h.content);
    setFormProductIds(h.productIds);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleToggleProduct = (pId: string) => {
    if (formProductIds.includes(pId)) {
      setFormProductIds(formProductIds.filter((id) => id !== pId));
    } else {
      setFormProductIds([...formProductIds, pId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) return;

    const hookData: Hook = {
      id: isEditing && editingId ? editingId : `hook-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      content: formContent,
      productIds: formProductIds
    };

    if (isEditing) {
      updateHook(hookData);
    } else {
      addHook(hookData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormTitle('');
    setFormCategory('curiosidade');
    setFormContent('');
    setFormProductIds([]);
    setIsEditing(false);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este gancho?')) {
      deleteHook(id);
    }
  };

  // Filter & Search
  const filteredHooks = hooks.filter((h) => {
    const matchesCategory = activeCategory === 'Todos' || h.category === activeCategory;
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Banco de Ganchos</h1>
          <p className="text-xs text-brand-gray mt-1">Sua coleção secreta de frases e estruturas altamente magnéticas para reter atenção nos primeiros 3 segundos.</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
        >
          <Plus size={14} /> Novo Gancho
        </button>
      </div>

      {/* FORM MODAL / COLLAPSE PANEL */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-brand-pink-light/40 rounded-3xl p-6 shadow-premium space-y-6">
          <h3 className="text-lg font-serif font-bold text-brand-charcoal">
            {isEditing ? 'Editar Gancho' : 'Adicionar Novo Gancho Magnético'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Título do Gancho</label>
              <input
                type="text"
                required
                placeholder="Ex: POV: O gloss de banheiro"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Categoria de Apelo</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as HookCategory)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink capitalize"
              >
                {hookCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-brand-charcoal">Script / Texto do Gancho *</label>
            <textarea
              rows={3}
              required
              placeholder="A frase exata do gancho. Use termos fortes como 'Segredo', 'Ninguém te conta', 'POV', etc."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full text-xs p-4 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
            />
          </div>

          {/* Connected products selector */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-brand-charcoal">Vincular a Produtos</label>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => {
                const isSelected = formProductIds.includes(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => handleToggleProduct(p.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                        : 'bg-brand-offwhite border-brand-pink-light/40 text-brand-charcoal'
                    }`}
                  >
                    {p.name} ({p.brand})
                  </button>
                );
              })}
            </div>
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
              Salvar Gancho
            </button>
          </div>
        </form>
      )}

      {/* FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input
            type="text"
            placeholder="Buscar ganchos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 border border-brand-pink-light/60 bg-white rounded-2xl focus:outline-none focus:border-brand-pink"
          />
        </div>

        {/* Horizontal Category Pill buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setActiveCategory('Todos')}
            className={`shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all ${
              activeCategory === 'Todos'
                ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                : 'bg-white border-brand-pink-light/40 text-brand-charcoal hover:bg-brand-pink-light/20'
            }`}
          >
            Todos
          </button>
          {hookCategories.map((cat) => {
            const count = hooks.filter((h) => h.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all capitalize ${
                  activeCategory === cat.id
                    ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                    : 'bg-white border-brand-pink-light/40 text-brand-charcoal hover:bg-brand-pink-light/20'
                }`}
              >
                {cat.label} {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* HOOK CARD GRID */}
      {filteredHooks.length === 0 ? (
        <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
          <Magnet size={36} className="text-brand-pink mx-auto animate-bounce" />
          <div>
            <h4 className="font-serif font-bold text-brand-charcoal">Nenhum gancho correspondente</h4>
            <p className="text-xs text-brand-gray mt-1">Tente ajustar seus termos de busca ou mude de categoria.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredHooks.map((h) => (
            <div
              key={h.id}
              className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between space-y-5 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-brand-pink-light text-brand-pink-dark px-3 py-1 rounded-full border border-brand-pink-light/20">
                    🧲 {h.category}
                  </span>
                  <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(h)}
                      className="text-brand-gray hover:text-brand-pink p-1 rounded-lg hover:bg-brand-pink-light"
                      title="Editar"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="text-brand-gray hover:text-red-500 p-1 rounded-lg hover:bg-red-50"
                      title="Excluir"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h4 
                  className="font-serif text-base font-semibold text-brand-charcoal cursor-pointer hover:text-brand-pink transition-colors"
                  onClick={() => handleStartEdit(h)}
                  title="Clique para editar"
                >
                  {h.title}
                </h4>
                <p 
                  className="text-xs text-brand-charcoal bg-brand-offwhite/50 p-4 rounded-2xl leading-relaxed italic border border-brand-pink-light/10 cursor-pointer hover:bg-brand-pink-light/10 hover:border-brand-pink-light/30 transition-all"
                  onClick={() => handleStartEdit(h)}
                  title="Clique para editar"
                >
                  "{h.content}"
                </p>
              </div>

              {/* Connected Products indicators */}
              <div className="border-t border-brand-pink-light/20 pt-3 flex flex-wrap gap-1.5">
                {h.productIds.length === 0 ? (
                  <span className="text-[10px] text-brand-gray italic flex items-center gap-1">
                    <AlertCircle size={10} /> Não vinculado a produtos
                  </span>
                ) : (
                  <>
                    <span className="text-[9px] uppercase tracking-widest text-brand-gray font-bold w-full mb-1">Produtos Aplicáveis:</span>
                    {h.productIds.map((pId) => {
                      const prod = products.find((p) => p.id === pId);
                      if (!prod) return null;
                      return (
                        <span key={pId} className="text-[10px] font-semibold text-brand-pink bg-brand-pink-light/40 px-2 py-0.5 rounded-lg border border-brand-pink-light/20">
                          {prod.name}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

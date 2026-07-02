import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Reference, ReferenceStatus, PlatformType, Category } from '../types';
import { CATEGORIES } from '../data';
import {
  Compass,
  Plus,
  ExternalLink,
  Search,
  Bookmark,
  Heart,
  Edit,
  Trash2,
  Video,
  Instagram,
  Tag,
  AlertCircle
} from 'lucide-react';

export const References: React.FC = () => {
  const {
    references,
    addReference,
    updateReference,
    deleteReference,
    products
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<PlatformType | 'Todos'>('Todos');
  const [filterStatus, setFilterStatus] = useState<ReferenceStatus | 'Todos'>('Todos');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formLink, setFormLink] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formProductId, setFormProductId] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Maquiagem');
  const [formPlatform, setFormPlatform] = useState<PlatformType>('tiktok');
  const [formStatus, setFormStatus] = useState<ReferenceStatus>('inspiration');

  const platforms: { id: PlatformType; label: string }[] = [
    { id: 'tiktok', label: 'TikTok' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'pinterest', label: 'Pinterest' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'ads', label: 'Publicidade' },
    { id: 'site', label: 'Site / Blog' }
  ];

  const statuses: { id: ReferenceStatus; label: string; color: string }[] = [
    { id: 'inspiration', label: 'Inspiração', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'recorded', label: 'Já gravei', color: 'bg-green-50 text-green-600 border-green-200' },
    { id: 'adapt', label: 'Quero adaptar', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { id: 'favorite', label: 'Favorito ❤️', color: 'bg-rose-50 text-rose-600 border-rose-200' }
  ];

  const handleStartEdit = (ref: Reference) => {
    setEditingId(ref.id);
    setFormTitle(ref.title);
    setFormImageUrl(ref.imageUrl);
    setFormLink(ref.link);
    setFormNotes(ref.notes);
    setFormTags(ref.tags.join(', '));
    setFormProductId(ref.productId);
    setFormCategory(ref.category);
    setFormPlatform(ref.platform);
    setFormStatus(ref.status);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLink) return;

    const parsedTags = formTags.split(',').map((t) => t.trim()).filter(Boolean);
    const fallbackImage = formImageUrl.trim() || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600';

    const refData: Reference = {
      id: isEditing && editingId ? editingId : `ref-${Date.now()}`,
      title: formTitle,
      imageUrl: fallbackImage,
      link: formLink,
      notes: formNotes,
      tags: parsedTags,
      productId: formProductId,
      category: formCategory,
      platform: formPlatform,
      status: formStatus
    };

    if (isEditing) {
      updateReference(refData);
    } else {
      addReference(refData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormTitle('');
    setFormImageUrl('');
    setFormLink('');
    setFormNotes('');
    setFormTags('');
    setFormProductId('');
    setFormCategory('Maquiagem');
    setFormPlatform('tiktok');
    setFormStatus('inspiration');
    setIsEditing(false);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta referência?')) {
      deleteReference(id);
    }
  };

  // Filter & Search
  const filteredReferences = references.filter((ref) => {
    const matchesSearch = ref.title.toLowerCase().includes(searchQuery.toLowerCase()) || ref.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'Todos' || ref.platform === filterPlatform;
    const matchesStatus = filterStatus === 'Todos' || ref.status === filterStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Banco de Referências</h1>
          <p className="text-xs text-brand-gray mt-1">Grave ideias estéticas externas das redes para reinterpretar na sua produção.</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
        >
          <Plus size={14} /> Salvar Referência
        </button>
      </div>

      {/* FORM MODAL */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-brand-pink-light/45 rounded-3xl p-6 shadow-premium space-y-6">
          <h3 className="text-lg font-serif font-bold text-brand-charcoal">
            {isEditing ? 'Editar Referência' : 'Salvar Nova Referência / Inspiração'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Título / Conceito *</label>
              <input
                type="text"
                required
                placeholder="Ex: Vídeo de transição labial com esmalte"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Link de Acesso *</label>
              <input
                type="url"
                required
                placeholder="Ex: https://tiktok.com/..."
                value={formLink}
                onChange={(e) => setFormLink(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Plataforma</label>
              <select
                value={formPlatform}
                onChange={(e) => setFormPlatform(e.target.value as PlatformType)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Status de Adaptação</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as ReferenceStatus)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
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
              <label className="font-bold text-brand-charcoal">Tags (Separadas por vírgula)</label>
              <input
                type="text"
                placeholder="Ex: transição, lo-fi, asmr"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Imagem de Capa (URL)</label>
              <input
                type="url"
                placeholder="Ex: https://images.unsplash.com/..."
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-brand-charcoal">Observações de Adaptação (O que mais gostou? Como adaptar?)</label>
            <textarea
              rows={3}
              placeholder="Ex: Gostei do ângulo inicial de baixo para cima. Vamos re-gravar usando o gloss com luz natural."
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
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
              Salvar Referência
            </button>
          </div>
        </form>
      )}

      {/* FILTROS & SEARCH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input
            type="text"
            placeholder="Pesquisar referências..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 border border-brand-pink-light/60 bg-white rounded-2xl focus:outline-none focus:border-brand-pink"
          />
        </div>

        {/* Filter platform */}
        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value as PlatformType | 'Todos')}
          className="w-full text-xs px-4 py-3 bg-white border border-brand-pink-light/60 rounded-2xl focus:outline-none focus:border-brand-pink"
        >
          <option value="Todos">Todas Plataformas</option>
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>

        {/* Filter status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ReferenceStatus | 'Todos')}
          className="w-full text-xs px-4 py-3 bg-white border border-brand-pink-light/60 rounded-2xl focus:outline-none focus:border-brand-pink"
        >
          <option value="Todos">Todos os Status</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* PINTEREST-LIKE MASONRY GRID */}
      {filteredReferences.length === 0 ? (
        <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
          <Compass size={36} className="text-brand-pink mx-auto animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <h4 className="font-serif font-bold text-brand-charcoal">Nenhuma referência encontrada</h4>
            <p className="text-xs text-brand-gray mt-1">Grave novos links inspiradores ou altere os filtros selecionados.</p>
          </div>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredReferences.map((ref) => {
            const product = products.find((p) => p.id === ref.productId);
            const refStatus = statuses.find((st) => st.id === ref.status);

            return (
              <div
                key={ref.id}
                className="break-inside-avoid bg-white border border-brand-pink-light/35 rounded-3xl overflow-hidden p-4 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-4 mb-6"
              >
                {/* Visual Cover */}
                <div className="relative rounded-2xl overflow-hidden group aspect-video">
                  <img src={ref.imageUrl} alt={ref.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Floating tags */}
                  <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-[9px] uppercase font-bold rounded-full border ${refStatus?.color || ''}`}>
                    {refStatus?.label}
                  </span>

                  <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-glass/90 border border-brand-pink-light/40 px-2 py-0.5 rounded-full text-brand-pink-dark uppercase">
                    {ref.platform}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 
                      className="font-serif text-sm font-semibold text-brand-charcoal line-clamp-2 cursor-pointer hover:text-brand-pink transition-colors"
                      onClick={() => handleStartEdit(ref)}
                      title="Clique para editar"
                    >
                      {ref.title}
                    </h4>
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-brand-pink-light/60 hover:bg-brand-pink hover:text-white rounded-full text-brand-pink transition-all shrink-0 ml-1"
                      title="Visitar referência"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <p 
                    className="text-[11px] text-brand-gray leading-relaxed italic bg-brand-offwhite p-3 rounded-xl border border-brand-pink-light/10 cursor-pointer hover:bg-brand-pink-light/10 hover:border-brand-pink-light/30 transition-all"
                    onClick={() => handleStartEdit(ref)}
                    title="Clique para editar"
                  >
                    "{ref.notes}"
                  </p>
                </div>

                {/* Tags and Connected product details */}
                <div className="border-t border-brand-pink-light/10 pt-3 flex flex-col gap-1.5 text-[10px]">
                  {product && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-brand-gray">Vínculo:</span>
                      <span className="font-bold text-brand-pink bg-brand-pink-light/20 px-1.5 py-0.5 rounded-md">
                        {product.name}
                      </span>
                    </div>
                  )}

                  {ref.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {ref.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] bg-brand-beige/60 text-brand-charcoal px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Options to Delete/Edit */}
                  <div className="flex items-center justify-end gap-1 mt-1 border-t border-brand-pink-light/5 pt-2">
                    <button
                      onClick={() => handleStartEdit(ref)}
                      className="text-brand-gray hover:text-brand-pink text-[10px] font-semibold flex items-center gap-0.5 p-1"
                    >
                      <Edit size={10} /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(ref.id)}
                      className="text-brand-gray hover:text-red-500 text-[10px] font-semibold flex items-center gap-0.5 p-1 ml-2"
                    >
                      <Trash2 size={10} /> Excluir
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

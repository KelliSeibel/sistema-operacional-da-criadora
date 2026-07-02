import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Scene, SceneType } from '../types';
import {
  Film,
  Plus,
  Video,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Tag,
  AlertCircle
} from 'lucide-react';

export const Scenes: React.FC = () => {
  const { scenes, addScene, updateScene, deleteScene, products } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<SceneType | 'Todos'>('Todos');
  const [filterStatus, setFilterStatus] = useState<'gravadas' | 'pendentes' | 'Todos'>('Todos');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formProductIds, setFormProductIds] = useState<string[]>([]);
  const [formType, setFormType] = useState<SceneType>('close');
  const [formIsRecorded, setFormIsRecorded] = useState(false);
  const [formImageUrl, setFormImageUrl] = useState('');

  const sceneTypes: { id: SceneType; label: string }[] = [
    { id: 'close', label: 'Close / Close-up' },
    { id: 'slowmotion', label: 'Câmera Lenta (Slow-Mo)' },
    { id: 'asmr', label: 'ASMR Som' },
    { id: 'detalhe', label: 'Detalhe do Frasco' },
    { id: 'aplicacao', label: 'Aplicação Real' },
    { id: 'lifestyle', label: 'Estilo de Vida (Lifestyle)' },
    { id: 'macro', label: 'Macro Textura' },
    { id: 'maos', label: 'Interação com Mãos' },
    { id: 'ambiente', label: 'Cenário / Ambiente' },
    { id: 'luz_natural', label: 'Luz Natural (Sol)' },
    { id: 'luz_artificial', label: 'Luz Estúdio (Artificial)' }
  ];

  const handleStartEdit = (s: Scene) => {
    setEditingId(s.id);
    setFormName(s.name);
    setFormDescription(s.description);
    setFormProductIds(s.productIds);
    setFormType(s.type);
    setFormIsRecorded(s.isRecorded);
    setFormImageUrl(s.imageUrl);
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
    if (!formName) return;

    const fallbackImage = formImageUrl.trim() || 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600';

    const sceneData: Scene = {
      id: isEditing && editingId ? editingId : `scene-${Date.now()}`,
      imageUrl: fallbackImage,
      name: formName,
      description: formDescription,
      productIds: formProductIds,
      type: formType,
      isRecorded: formIsRecorded
    };

    if (isEditing) {
      updateScene(sceneData);
    } else {
      addScene(sceneData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormName('');
    setFormDescription('');
    setFormProductIds([]);
    setFormType('close');
    setFormIsRecorded(false);
    setFormImageUrl('');
    setIsEditing(false);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta cena do seu banco visual?')) {
      deleteScene(id);
    }
  };

  const handleToggleRecordedStatus = (scene: Scene) => {
    updateScene({
      ...scene,
      isRecorded: !scene.isRecorded
    });
  };

  // Filter & Search
  const filteredScenes = scenes.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Todos' || s.type === filterType;
    const matchesStatus =
      filterStatus === 'Todos' ||
      (filterStatus === 'gravadas' && s.isRecorded) ||
      (filterStatus === 'pendentes' && !s.isRecorded);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Banco de Cenas UGC</h1>
          <p className="text-xs text-brand-gray mt-1">Sua galeria visual de tomadas, ângulos, texturas e transições de apoio recorrente (B-roll e principal).</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
        >
          <Plus size={14} /> Nova Tomada / Cena
        </button>
      </div>

      {/* FORM MODAL */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-brand-pink-light/45 rounded-3xl p-6 shadow-premium space-y-6">
          <h3 className="text-lg font-serif font-bold text-brand-charcoal">
            {isEditing ? 'Editar Tomada Visual' : 'Inserir Nova Cena no Banco Visual'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Nome do Take / Enquadramento *</label>
              <input
                type="text"
                required
                placeholder="Ex: Cena abrindo embalagem suavemente"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Tipo de Tomada / Iluminação</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as SceneType)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              >
                {sceneTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-brand-charcoal">Imagem de Referência (URL)</label>
              <input
                type="url"
                placeholder="Ex: https://images.unsplash.com/..."
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="space-y-1.5 flex items-center gap-2.5 h-full pt-6">
              <button
                type="button"
                onClick={() => setFormIsRecorded(!formIsRecorded)}
                className={`w-10 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  formIsRecorded ? 'bg-brand-pink' : 'bg-brand-nude-dark'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    formIsRecorded ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-bold text-brand-charcoal">Esta tomada já foi gravada?</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-brand-charcoal">Descrição da Cena / Direção do Take</label>
            <textarea
              rows={3}
              placeholder="Ex: Focar o produto sob luz do sol forte, gravar em 60fps para aplicar câmera lenta no corte."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full text-xs p-4 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
            />
          </div>

          {/* Connected products */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-brand-charcoal">Vincular a Produtos Relacionados</label>
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
                        ? 'bg-brand-pink border-brand-pink text-white'
                        : 'bg-brand-offwhite border-brand-pink-light/40 text-brand-charcoal'
                    }`}
                  >
                    {p.name}
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
              Salvar Cena
            </button>
          </div>
        </form>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input
            type="text"
            placeholder="Pesquisar tomada..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 border border-brand-pink-light/60 bg-white rounded-2xl focus:outline-none focus:border-brand-pink"
          />
        </div>

        {/* Filter type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as SceneType | 'Todos')}
          className="w-full text-xs px-4 py-3 bg-white border border-brand-pink-light/60 rounded-2xl focus:outline-none focus:border-brand-pink text-brand-charcoal"
        >
          <option value="Todos">Todos os Enquadramentos</option>
          {sceneTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>

        {/* Filter status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="w-full text-xs px-4 py-3 bg-white border border-brand-pink-light/60 rounded-2xl focus:outline-none focus:border-brand-pink text-brand-charcoal"
        >
          <option value="Todos">Status de Gravação (Todos)</option>
          <option value="gravadas">Já Gravadas</option>
          <option value="pendentes">Pendentes de Gravação</option>
        </select>
      </div>

      {/* VISUAL SCENE BANK GRID */}
      {filteredScenes.length === 0 ? (
        <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
          <Video size={36} className="text-brand-pink mx-auto animate-pulse" />
          <div>
            <h4 className="font-serif font-bold text-brand-charcoal">Nenhuma tomada correspondente</h4>
            <p className="text-xs text-brand-gray mt-1">Sua busca não retornou resultados. Cadastre ou altere os filtros.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenes.map((scene) => {
            const scType = sceneTypes.find((t) => t.id === scene.type);
            return (
              <div
                key={scene.id}
                className="group bg-white border border-brand-pink-light/35 rounded-3xl overflow-hidden p-4 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Image cover with state indicator */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-pink-light/10">
                    <img src={scene.imageUrl} alt={scene.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    
                    {/* Floating status */}
                    <button
                      onClick={() => handleToggleRecordedStatus(scene)}
                      className={`absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase border cursor-pointer select-none transition-all flex items-center gap-1 ${
                        scene.isRecorded
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-brand-pink-light text-brand-pink-dark border-brand-pink-light hover:bg-brand-pink-light/80'
                      }`}
                    >
                      {scene.isRecorded ? (
                        <>
                          <CheckCircle size={10} /> Gravada
                        </>
                      ) : (
                        <>
                          <Clock size={10} /> A gravar
                        </>
                      )}
                    </button>

                    <span className="absolute bottom-2.5 right-2.5 bg-glass/95 border border-brand-pink-light/30 px-2 py-0.5 rounded-md text-[9px] font-bold text-brand-pink uppercase">
                      {scType?.label.split(' ')[0] || scene.type}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <h4 
                      className="font-serif text-sm font-semibold text-brand-charcoal line-clamp-1 cursor-pointer hover:text-brand-pink transition-colors"
                      onClick={() => handleStartEdit(scene)}
                      title="Clique para editar"
                    >
                      {scene.name}
                    </h4>
                    <p 
                      className="text-xs text-brand-gray line-clamp-2 mt-1 leading-relaxed cursor-pointer hover:text-brand-pink transition-colors"
                      onClick={() => handleStartEdit(scene)}
                      title="Clique para editar"
                    >
                      {scene.description}
                    </p>
                  </div>
                </div>

                {/* Linked Products list */}
                <div className="border-t border-brand-pink-light/20 pt-3 mt-4 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {scene.productIds.length === 0 ? (
                      <span className="text-[10px] text-brand-gray italic flex items-center gap-1">
                        <AlertCircle size={10} /> Solitária / Geral
                      </span>
                    ) : (
                      scene.productIds.map((pId) => {
                        const prod = products.find((p) => p.id === pId);
                        if (!prod) return null;
                        return (
                          <span key={pId} className="text-[9px] font-bold text-brand-pink bg-brand-pink-light/30 px-2 py-0.5 rounded-md border border-brand-pink-light/20">
                            {prod.name}
                          </span>
                        );
                      })
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-end gap-1 mt-1 border-t border-brand-pink-light/5 pt-2">
                    <button
                      onClick={() => handleStartEdit(scene)}
                      className="text-brand-gray hover:text-brand-pink text-[10px] font-semibold flex items-center gap-0.5 p-1"
                    >
                      <Edit size={10} /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(scene.id)}
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

import React, { useState } from 'react';
import { useAppState } from './StateContext';
import {
  Plus,
  Trash2,
  Edit,
  X,
  Check,
  Search,
  Link,
  Sparkles,
  Info,
  Camera,
  Layers,
  Flame,
  Wallpaper,
  Box,
  Clapperboard,
  CheckSquare,
  HelpCircle,
  Eye,
  CalendarDays,
  FileText,
  Package,
  Film,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import {
  Environment,
  Equipment,
  LightingConfig,
  Background,
  Prop,
  VideoStyle,
  CustomChecklist,
  Product,
  Script,
  Scene,
  Idea
} from '../types';

export const Studio: React.FC = () => {
  const {
    environments,
    addEnvironment,
    updateEnvironment,
    deleteEnvironment,
    equipments,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    lightings,
    addLighting,
    updateLighting,
    deleteLighting,
    backgrounds,
    addBackground,
    updateBackground,
    deleteBackground,
    props,
    addProp,
    updateProp,
    deleteProp,
    videoStyles,
    addVideoStyle,
    updateVideoStyle,
    deleteVideoStyle,
    checklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    products,
    scripts,
    scenes,
    ideas
  } = useAppState();

  // Sub-tabs: 'environments' | 'equipments' | 'lighting' | 'backgrounds' | 'props' | 'styles' | 'checklists'
  const [subTab, setSubTab] = useState<'environments' | 'equipments' | 'lighting' | 'backgrounds' | 'props' | 'styles' | 'checklists'>('environments');
  const [searchQuery, setSearchQuery] = useState('');

  // Active item for Detail View or Editing
  const [selectedItem, setSelectedItem] = useState<{ type: string; data: any } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Forms state
  const [formName, setFormName] = useState('');
  const [formPhoto, setFormPhoto] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBestTime, setFormBestTime] = useState('');
  const [formLightingType, setFormLightingType] = useState<'natural' | 'artificial' | 'ambas'>('ambas');
  const [formNaturalLight, setFormNaturalLight] = useState('');
  const [formArtificialLight, setFormArtificialLight] = useState('');
  const [formNoiseLevel, setFormNoiseLevel] = useState<'baixo' | 'medio' | 'alto'>('baixo');
  const [formAvailableBackground, setFormAvailableBackground] = useState('');
  const [formPredominantColors, setFormPredominantColors] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Equipments specific form
  const [formCategory, setFormCategory] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formPurchaseDate, setFormPurchaseDate] = useState('');
  const [formCondition, setFormCondition] = useState<'excelente' | 'bom' | 'desgastado' | 'quebrado'>('excelente');

  // Lighting specific form
  const [formIntensity, setFormIntensity] = useState('');
  const [formTemperature, setFormTemperature] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formEnvironmentUsed, setFormEnvironmentUsed] = useState('');

  // Background specific form
  const [formStyle, setFormStyle] = useState('');

  // Checklist specific form
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState('');

  // Connections (selected IDs)
  const [connectedProducts, setConnectedProducts] = useState<string[]>([]);
  const [connectedScripts, setConnectedScripts] = useState<string[]>([]);
  const [connectedScenes, setConnectedScenes] = useState<string[]>([]);
  const [connectedIdeas, setConnectedIdeas] = useState<string[]>([]);

  // Sub tab configurations
  const subTabs = [
    { id: 'environments', label: 'Ambientes', count: environments.length, icon: Camera },
    { id: 'equipments', label: 'Equipamentos', count: equipments.length, icon: Layers },
    { id: 'lighting', label: 'Iluminação', count: lightings.length, icon: Flame },
    { id: 'backgrounds', label: 'Fundos', count: backgrounds.length, icon: Wallpaper },
    { id: 'props', label: 'Props (Cena)', count: props.length, icon: Box },
    { id: 'styles', label: 'Estilos de Vídeo', count: videoStyles.length, icon: Clapperboard },
    { id: 'checklists', label: 'Checklists', count: checklists.length, icon: CheckSquare }
  ];

  // Helper categories options
  const equipmentCategories = [
    'Celular', 'Tripé', 'Mini Tripé', 'Softbox', 'Ring Light',
    'Microfone', 'Power Bank', 'Suporte de celular', 'Controle Bluetooth',
    'Lentes', 'Cartões de memória', 'Cabos', 'Carregadores'
  ];

  const propCategories = [
    'Toalhas', 'Livros', 'Xícaras', 'Velas', 'Flores',
    'Espelhos', 'Bandejas', 'Pincéis', 'Caixas', 'Tecidos', 'Joias', 'Outros'
  ];

  const backgroundStyles = [
    'Minimalista', 'Luxo', 'Clean', 'Feminino', 'Neutro',
    'Madeira', 'Banheiro', 'Mármore', 'Mesa branca', 'Outro'
  ];

  const handleOpenDetail = (type: string, data: any) => {
    setSelectedItem({ type, data });
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const initForm = (item?: any) => {
    setFormName(item?.name || '');
    setFormPhoto(item?.photo || item?.imageUrl || '');
    setFormDescription(item?.description || '');
    setFormBestTime(item?.bestTime || '');
    setFormLightingType(item?.lightingType || 'ambas');
    setFormNaturalLight(item?.naturalLight || '');
    setFormArtificialLight(item?.artificialLight || '');
    setFormNoiseLevel(item?.noiseLevel || 'baixo');
    setFormAvailableBackground(item?.availableBackground || '');
    setFormPredominantColors(item?.predominantColors || item?.predominantColor || '');
    setFormNotes(item?.notes || '');

    setFormCategory(item?.category || '');
    setFormBrand(item?.brand || '');
    setFormPurchaseDate(item?.purchaseDate || '');
    setFormCondition(item?.condition || 'excelente');

    setFormIntensity(item?.intensity || '');
    setFormTemperature(item?.temperature || '');
    setFormResult(item?.result || '');
    setFormEnvironmentUsed(item?.environmentUsed || '');

    setFormStyle(item?.style || '');

    setChecklistItems(item?.items || []);
    setNewItemText('');

    setConnectedProducts(item?.productIds || []);
    setConnectedScripts(item?.scriptIds || []);
    setConnectedScenes(item?.sceneIds || []);
    setConnectedIdeas(item?.ideaIds || []);
  };

  const handleStartAdd = () => {
    initForm();
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleStartEdit = (type: string, data: any) => {
    initForm(data);
    setSelectedItem({ type, data });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleToggleConnection = (id: string, listType: 'products' | 'scripts' | 'scenes' | 'ideas') => {
    if (listType === 'products') {
      setConnectedProducts(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
    } else if (listType === 'scripts') {
      setConnectedScripts(prev => prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]);
    } else if (listType === 'scenes') {
      setConnectedScenes(prev => prev.includes(id) ? prev.filter(scId => scId !== id) : [...prev, id]);
    } else if (listType === 'ideas') {
      setConnectedIdeas(prev => prev.includes(id) ? prev.filter(iId => iId !== id) : [...prev, id]);
    }
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (confirm('Deseja realmente excluir este item permanentemente?')) {
      if (type === 'environments') deleteEnvironment(id);
      else if (type === 'equipments') deleteEquipment(id);
      else if (type === 'lighting') deleteLighting(id);
      else if (type === 'backgrounds') deleteBackground(id);
      else if (type === 'props') deleteProp(id);
      else if (type === 'styles') deleteVideoStyle(id);
      else if (type === 'checklists') deleteChecklist(id);
      
      handleCloseDetail();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = isEditing ? selectedItem?.data.id : `studio-${subTab}-${Date.now()}`;
    const photoUrl = formPhoto.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600';

    if (subTab === 'environments') {
      const data: Environment = {
        id,
        name: formName,
        photo: photoUrl,
        description: formDescription,
        bestTime: formBestTime,
        lightingType: formLightingType,
        naturalLight: formNaturalLight,
        artificialLight: formArtificialLight,
        noiseLevel: formNoiseLevel,
        availableBackground: formAvailableBackground,
        predominantColors: formPredominantColors,
        notes: formNotes,
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateEnvironment(data);
      else addEnvironment(data);

    } else if (subTab === 'equipments') {
      const data: Equipment = {
        id,
        name: formName,
        photo: photoUrl,
        category: formCategory || 'Outros',
        brand: formBrand,
        purchaseDate: formPurchaseDate,
        condition: formCondition,
        notes: formNotes,
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateEquipment(data);
      else addEquipment(data);

    } else if (subTab === 'lighting') {
      const data: LightingConfig = {
        id,
        name: formName,
        photo: photoUrl,
        bestTime: formBestTime,
        environmentUsed: formEnvironmentUsed,
        intensity: formIntensity,
        temperature: formTemperature,
        result: formResult,
        notes: formNotes,
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateLighting(data);
      else addLighting(data);

    } else if (subTab === 'backgrounds') {
      const data: Background = {
        id,
        name: formName,
        photo: photoUrl,
        predominantColor: formPredominantColors,
        style: formStyle || 'Minimalista',
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateBackground(data);
      else addBackground(data);

    } else if (subTab === 'props') {
      const data: Prop = {
        id,
        name: formName,
        photo: photoUrl,
        category: formCategory || 'Outros',
        color: formPredominantColors,
        notes: formNotes,
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateProp(data);
      else addProp(data);

    } else if (subTab === 'styles') {
      const data: VideoStyle = {
        id,
        name: formName,
        description: formDescription,
        exampleUrl: formNotes, // reuse notes as exampleUrl
        productIds: connectedProducts,
        scriptIds: connectedScripts,
        sceneIds: connectedScenes,
        ideaIds: connectedIdeas
      };
      if (isEditing) updateVideoStyle(data);
      else addVideoStyle(data);

    } else if (subTab === 'checklists') {
      const data: CustomChecklist = {
        id,
        name: formName,
        items: checklistItems
      };
      if (isEditing) updateChecklist(data);
      else addChecklist(data);
    }

    handleCloseDetail();
  };

  const handleAddChecklistTextItem = () => {
    if (!newItemText.trim()) return;
    setChecklistItems([...checklistItems, newItemText.trim()]);
    setNewItemText('');
  };

  const handleRemoveChecklistTextItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  // Filter items based on current sub-tab and search query
  const getFilteredItems = () => {
    const query = searchQuery.toLowerCase();
    if (subTab === 'environments') {
      return environments.filter(e => e.name.toLowerCase().includes(query) || e.description.toLowerCase().includes(query));
    } else if (subTab === 'equipments') {
      return equipments.filter(e => e.name.toLowerCase().includes(query) || e.category.toLowerCase().includes(query));
    } else if (subTab === 'lighting') {
      return lightings.filter(e => e.name.toLowerCase().includes(query) || e.notes.toLowerCase().includes(query));
    } else if (subTab === 'backgrounds') {
      return backgrounds.filter(e => e.name.toLowerCase().includes(query) || e.style.toLowerCase().includes(query));
    } else if (subTab === 'props') {
      return props.filter(e => e.name.toLowerCase().includes(query) || e.category.toLowerCase().includes(query));
    } else if (subTab === 'styles') {
      return videoStyles.filter(e => e.name.toLowerCase().includes(query) || e.description.toLowerCase().includes(query));
    } else if (subTab === 'checklists') {
      return checklists.filter(e => e.name.toLowerCase().includes(query));
    }
    return [];
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-pink-light pb-4">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Estúdio de Produção</h1>
          <p className="text-xs text-brand-gray mt-1">Sua biblioteca inteligente de cenários, iluminação, equipamentos e estilo.</p>
        </div>
        <button
          onClick={handleStartAdd}
          className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
        >
          <Plus size={14} /> Novo Recurso
        </button>
      </div>

      {/* Horizontal pill navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 pr-1 scrollbar-thin">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setSubTab(tab.id as any); setSearchQuery(''); handleCloseDetail(); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-brand-pink text-white border-brand-pink shadow-md'
                  : 'bg-white text-brand-charcoal border-brand-pink-light/35 hover:bg-brand-pink-light/20'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-brand-pink-light/40 text-brand-pink'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input
          type="text"
          placeholder={`Buscar em ${subTabs.find(t => t.id === subTab)?.label.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-3 border border-brand-pink-light/60 bg-white rounded-2xl focus:outline-none focus:border-brand-pink shadow-xs"
        />
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Bento Grid List (Full width if no details opened) */}
        <div className={`${selectedItem || isAdding ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center space-y-4">
              <Clapperboard size={36} className="text-brand-pink mx-auto opacity-70 animate-pulse" />
              <div>
                <h4 className="font-serif font-bold text-brand-charcoal">Nenhum item cadastrado</h4>
                <p className="text-xs text-brand-gray mt-1">Crie um novo recurso no Estúdio para organizar suas produções de forma perfeita.</p>
              </div>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${selectedItem || isAdding ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3'} gap-6`}>
              {filteredItems.map((item: any) => {
                const photo = item.photo || item.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600';
                
                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenDetail(subTab, item)}
                    className={`group bg-white border rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedItem?.data.id === item.id ? 'border-brand-pink ring-2 ring-brand-pink/25' : 'border-brand-pink-light/40'
                    }`}
                  >
                    {subTab !== 'checklists' && (
                      <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                        <img
                          src={photo}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-[10px] text-white font-semibold uppercase tracking-wider flex items-center gap-1">
                            <Eye size={12} /> Detalhes & Conexões
                          </span>
                        </div>
                        {/* Sub tab tags */}
                        {item.category && (
                          <span className="absolute top-2.5 left-2.5 text-[9px] font-bold bg-white/95 text-brand-pink px-2.5 py-1 rounded-full shadow-xs">
                            {item.category}
                          </span>
                        )}
                        {item.style && (
                          <span className="absolute top-2.5 left-2.5 text-[9px] font-bold bg-white/95 text-brand-pink px-2.5 py-1 rounded-full shadow-xs">
                            {item.style}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-sm font-bold text-brand-charcoal group-hover:text-brand-pink transition-colors">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-[11px] text-brand-gray mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.notes && !item.description && (
                          <p className="text-[11px] text-brand-gray mt-1 line-clamp-2 italic">
                            "{item.notes}"
                          </p>
                        )}

                        {/* Checklist preview */}
                        {subTab === 'checklists' && item.items && (
                          <div className="space-y-1.5 my-2">
                            {item.items.slice(0, 4).map((chk: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[10px] text-brand-gray">
                                <div className="w-3 h-3 rounded-md border border-brand-nude-dark shrink-0" />
                                <span className="truncate">{chk}</span>
                              </div>
                            ))}
                            {item.items.length > 4 && (
                              <span className="text-[9px] text-brand-pink font-semibold">
                                + {item.items.length - 4} mais itens...
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Connection pills badge count */}
                      <div className="border-t border-brand-pink-light/10 pt-3.5 flex flex-wrap items-center justify-between gap-1 text-[10px]">
                        <span className="text-[9px] text-brand-gray font-medium">Conexões Inteligentes</span>
                        <div className="flex gap-1.5">
                          {((item.productIds?.length || 0) > 0) && (
                            <span className="bg-brand-pink/5 text-brand-pink font-bold px-1.5 py-0.5 rounded-full" title="Produtos Vinculados">
                              📦 {item.productIds.length}
                            </span>
                          )}
                          {((item.scriptIds?.length || 0) > 0) && (
                            <span className="bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-full" title="Roteiros Vinculados">
                              ✍️ {item.scriptIds.length}
                            </span>
                          )}
                          {((item.sceneIds?.length || 0) > 0) && (
                            <span className="bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded-full" title="Cenas Vinculadas">
                              🎥 {item.sceneIds.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Detail View, Add Form, or Edit Form (5 Cols) */}
        {(selectedItem || isAdding) && (
          <div className="lg:col-span-5 space-y-6">
            {isAdding || isEditing ? (
              /* ADD/EDIT FORM CONTAINER */
              <form onSubmit={handleSubmit} className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-4">
                  <div>
                    <h2 className="text-base font-serif text-brand-charcoal font-bold">
                      {isAdding ? 'Adicionar Novo' : 'Editar Recurso'}
                    </h2>
                    <p className="text-[10px] uppercase tracking-wider text-brand-pink font-bold mt-0.5">
                      {subTabs.find(t => t.id === subTab)?.label}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="w-7 h-7 flex items-center justify-center text-brand-gray bg-brand-pink-light rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Common Name field */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Nome / Título *</label>
                    <input
                      type="text"
                      required
                      placeholder={`Ex: ${subTab === 'environments' ? 'Quarto com luz difusa' : subTab === 'equipments' ? 'Ring Light 18' : 'Golden Hour'}`}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    />
                  </div>

                  {/* Common Photo field (Except checklist) */}
                  {subTab !== 'checklists' && (
                    <div className="space-y-1.5">
                      <label className="font-bold text-brand-charcoal">URL da Imagem / Foto</label>
                      <input
                        type="text"
                        placeholder="Ex: https://images.unsplash.com/photo-..."
                        value={formPhoto}
                        onChange={(e) => setFormPhoto(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                  )}

                  {/* SUB-TAB SPECIFIC FIELDS */}
                  {subTab === 'environments' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Descrição Física</label>
                        <textarea
                          rows={2}
                          placeholder="Móveis, cores, características do local..."
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Melhor Horário</label>
                          <input
                            type="text"
                            placeholder="Manhã das 9h às 11h"
                            value={formBestTime}
                            onChange={(e) => setFormBestTime(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Tipo Iluminação</label>
                          <select
                            value={formLightingType}
                            onChange={(e) => setFormLightingType(e.target.value as any)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="natural">Apenas Natural</option>
                            <option value="artificial">Apenas Artificial</option>
                            <option value="ambas">Ambas</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Detalhe Luz Natural</label>
                          <input
                            type="text"
                            placeholder="Ex: Luz difusa de janela ampla"
                            value={formNaturalLight}
                            onChange={(e) => setFormNaturalLight(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Detalhe Luz Artificial</label>
                          <input
                            type="text"
                            placeholder="Ex: Fita led 4000k no espelho"
                            value={formArtificialLight}
                            onChange={(e) => setFormArtificialLight(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Nível de Ruído</label>
                          <select
                            value={formNoiseLevel}
                            onChange={(e) => setFormNoiseLevel(e.target.value as any)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="baixo">Baixo (Silencioso)</option>
                            <option value="medio">Médio (Ruído aceitável)</option>
                            <option value="alto">Alto (Grave com microfone)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Fundo Disponível</label>
                          <input
                            type="text"
                            placeholder="Mesa rústica, azulejo..."
                            value={formAvailableBackground}
                            onChange={(e) => setFormAvailableBackground(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Cores Predominantes</label>
                        <input
                          type="text"
                          placeholder="Branco, Bege, Dourado"
                          value={formPredominantColors}
                          onChange={(e) => setFormPredominantColors(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </>
                  )}

                  {subTab === 'equipments' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Categoria</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="">Selecione categoria</option>
                            {equipmentCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Marca</label>
                          <input
                            type="text"
                            placeholder="Ex: Apple, Rode, DJI"
                            value={formBrand}
                            onChange={(e) => setFormBrand(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Data de Compra</label>
                          <input
                            type="date"
                            value={formPurchaseDate}
                            onChange={(e) => setFormPurchaseDate(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Estado de Conservação</label>
                          <select
                            value={formCondition}
                            onChange={(e) => setFormCondition(e.target.value as any)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="excelente">Excelente (Como Novo)</option>
                            <option value="bom">Bom (Uso leve)</option>
                            <option value="desgastado">Desgastado (Tem marcas)</option>
                            <option value="quebrado">Quebrado (Defeituoso)</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {subTab === 'lighting' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Intensidade</label>
                          <input
                            type="text"
                            placeholder="Ex: Forte / Fraca / Difusa"
                            value={formIntensity}
                            onChange={(e) => setFormIntensity(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Temperatura de Cor</label>
                          <input
                            type="text"
                            placeholder="Ex: 3200k (Quente) / 5500k (Branca)"
                            value={formTemperature}
                            onChange={(e) => setFormTemperature(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Horário Ideal</label>
                          <input
                            type="text"
                            placeholder="Tarde 17:00"
                            value={formBestTime}
                            onChange={(e) => setFormBestTime(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Ambiente Recomendado</label>
                          <input
                            type="text"
                            placeholder="Quarto, Cozinha..."
                            value={formEnvironmentUsed}
                            onChange={(e) => setFormEnvironmentUsed(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Resultado Obtido</label>
                        <input
                          type="text"
                          placeholder="Visual dramático com fundo escuro..."
                          value={formResult}
                          onChange={(e) => setFormResult(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </>
                  )}

                  {subTab === 'backgrounds' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Estilo</label>
                          <select
                            value={formStyle}
                            onChange={(e) => setFormStyle(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="">Selecione estilo</option>
                            {backgroundStyles.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Cor Predominante</label>
                          <input
                            type="text"
                            placeholder="Mármore cinza, Rosa nude..."
                            value={formPredominantColors}
                            onChange={(e) => setFormPredominantColors(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {subTab === 'props' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Categoria</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          >
                            <option value="">Selecione categoria</option>
                            {propCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-bold text-brand-charcoal">Cor Predominante</label>
                          <input
                            type="text"
                            placeholder="Dourado, Branco, etc"
                            value={formPredominantColors}
                            onChange={(e) => setFormPredominantColors(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {subTab === 'styles' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Descrição do Estilo</label>
                        <textarea
                          rows={3}
                          placeholder="Estrutura e dinâmica de vídeo para esse estilo..."
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Link Exemplo (TikTok / IG)</label>
                        <input
                          type="text"
                          placeholder="https://instagram.com/p/..."
                          value={formNotes}
                          onChange={(e) => setFormNotes(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </>
                  )}

                  {subTab === 'checklists' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="font-bold text-brand-charcoal">Itens do Checklist</label>
                        <div className="space-y-2 bg-brand-offwhite p-3 rounded-2xl max-h-56 overflow-y-auto border border-brand-pink-light/45">
                          {checklistItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-brand-pink-light/20 text-[11px]">
                              <span>{item}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveChecklistTextItem(index)}
                                className="text-red-500 hover:text-red-700 font-bold"
                              >
                                Excluir
                              </button>
                            </div>
                          ))}
                          {checklistItems.length === 0 && (
                            <p className="text-stone-400 italic text-[11px] text-center py-4">Nenhum item adicionado ainda.</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Novo check..."
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                        />
                        <button
                          type="button"
                          onClick={handleAddChecklistTextItem}
                          className="bg-brand-pink text-white font-bold px-4 py-2 rounded-xl text-xs"
                        >
                          + Adicionar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Common notes field (Except style & checklist) */}
                  {subTab !== 'styles' && subTab !== 'checklists' && (
                    <div className="space-y-1.5">
                      <label className="font-bold text-brand-charcoal">Observações Internas / Segredos</label>
                      <textarea
                        rows={2}
                        placeholder="Macetes técnicos importantes para esse item..."
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                  )}

                  {/* CONNECTIONS SELECTOR PANEL (Except checklist template) */}
                  {subTab !== 'checklists' && (
                    <div className="border-t border-brand-pink-light/25 pt-4 space-y-4">
                      <div className="flex items-center gap-1.5 text-brand-pink">
                        <Link size={14} />
                        <h4 className="font-serif text-xs font-bold">Vincular Conexões Inteligentes</h4>
                      </div>

                      {/* Products connections */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">Produtos Relacionados</label>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto bg-brand-offwhite p-2 rounded-xl border border-brand-pink-light/35">
                          {products.map(prod => {
                            const isSelected = connectedProducts.includes(prod.id);
                            return (
                              <button
                                type="button"
                                key={prod.id}
                                onClick={() => handleToggleConnection(prod.id, 'products')}
                                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                                  isSelected
                                    ? 'bg-brand-pink text-white border-brand-pink font-semibold'
                                    : 'bg-white text-brand-charcoal border-brand-pink-light/25'
                                }`}
                              >
                                📦 {prod.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Scripts connections */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">Roteiros Relacionados</label>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto bg-brand-offwhite p-2 rounded-xl border border-brand-pink-light/35">
                          {scripts.map(scr => {
                            const isSelected = connectedScripts.includes(scr.id);
                            return (
                              <button
                                type="button"
                                key={scr.id}
                                onClick={() => handleToggleConnection(scr.id, 'scripts')}
                                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                                  isSelected
                                    ? 'bg-brand-pink text-white border-brand-pink font-semibold'
                                    : 'bg-white text-brand-charcoal border-brand-pink-light/25'
                                }`}
                              >
                                ✍️ {scr.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Scenes connections */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">Banco de Cenas Relacionadas</label>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto bg-brand-offwhite p-2 rounded-xl border border-brand-pink-light/35">
                          {scenes.map(sc => {
                            const isSelected = connectedScenes.includes(sc.id);
                            return (
                              <button
                                type="button"
                                key={sc.id}
                                onClick={() => handleToggleConnection(sc.id, 'scenes')}
                                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                                  isSelected
                                    ? 'bg-brand-pink text-white border-brand-pink font-semibold'
                                    : 'bg-white text-brand-charcoal border-brand-pink-light/25'
                                }`}
                              >
                                🎥 {sc.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2.5 pt-2 border-t border-brand-pink-light/20">
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="px-4 py-2 border border-brand-pink-light text-brand-pink hover:bg-brand-pink-light/10 text-xs font-semibold rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold rounded-xl shadow-md"
                  >
                    {isEditing ? 'Atualizar Item' : 'Criar Item'}
                  </button>
                </div>
              </form>
            ) : (
              /* DETAIL VIEW CONTAINER */
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-6 animate-fade-in text-xs">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-4">
                  <div>
                    <h2 className="text-base font-serif text-brand-charcoal font-bold">{selectedItem?.data.name}</h2>
                    <p className="text-[10px] uppercase tracking-wider text-brand-pink font-bold mt-0.5">
                      Ficha do Recurso
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(selectedItem?.type || '', selectedItem?.data)}
                      className="p-1.5 text-brand-pink hover:bg-brand-pink-light/20 rounded-lg"
                      title="Editar"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(selectedItem?.type || '', selectedItem?.data.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Excluir"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={handleCloseDetail}
                      className="w-7 h-7 flex items-center justify-center text-brand-gray bg-brand-pink-light rounded-full ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {selectedItem?.type !== 'checklists' && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner bg-stone-100">
                    <img
                      src={selectedItem?.data.photo || selectedItem?.data.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'}
                      alt={selectedItem?.data.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Info List based on type */}
                <div className="space-y-4">
                  {selectedItem?.type === 'environments' && (
                    <div className="grid grid-cols-2 gap-4 bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Melhor Horário</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.bestTime || 'Não informado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Nível de Ruído</span>
                        <strong className="text-brand-charcoal font-bold capitalize">{selectedItem.data.noiseLevel || 'Baixo'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Luz Natural</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.naturalLight || 'Não informado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Luz Artificial</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.artificialLight || 'Não informado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Fundo Disponível</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.availableBackground || 'Não informado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Cores Predominantes</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.predominantColors || 'Não informado'}</strong>
                      </div>
                    </div>
                  )}

                  {selectedItem?.type === 'equipments' && (
                    <div className="grid grid-cols-2 gap-4 bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Categoria</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.category}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Marca</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.brand || 'Não especificado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Data de Compra</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.purchaseDate || 'Não informado'}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Estado de Conservação</span>
                        <strong className="text-brand-charcoal font-bold capitalize">{selectedItem.data.condition}</strong>
                      </div>
                    </div>
                  )}

                  {selectedItem?.type === 'lighting' && (
                    <div className="grid grid-cols-2 gap-4 bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Intensidade</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.intensity}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Temperatura</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.temperature}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Horário Ideal</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.bestTime}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Ambiente</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.environmentUsed}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-brand-gray text-[10px] block">Resultado Esperado</span>
                        <strong className="text-brand-charcoal font-semibold">{selectedItem.data.result}</strong>
                      </div>
                    </div>
                  )}

                  {selectedItem?.type === 'backgrounds' && (
                    <div className="grid grid-cols-2 gap-4 bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Estilo</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.style}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Cor Predominante</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.predominantColor || selectedItem.data.predominantColors}</strong>
                      </div>
                    </div>
                  )}

                  {selectedItem?.type === 'props' && (
                    <div className="grid grid-cols-2 gap-4 bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Categoria</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.category}</strong>
                      </div>
                      <div>
                        <span className="text-brand-gray text-[10px] block">Cor</span>
                        <strong className="text-brand-charcoal font-bold">{selectedItem.data.color || 'Não informado'}</strong>
                      </div>
                    </div>
                  )}

                  {selectedItem?.type === 'styles' && (
                    <div className="bg-brand-offwhite p-4 rounded-2xl border border-brand-pink-light/20 space-y-3">
                      <div>
                        <span className="text-brand-gray text-[10px] block">Descrição do Formato</span>
                        <p className="text-brand-charcoal font-medium mt-1 leading-relaxed">{selectedItem.data.description}</p>
                      </div>
                      {selectedItem.data.exampleUrl && (
                        <div>
                          <span className="text-brand-gray text-[10px] block">Exemplo de Vídeo</span>
                          <a
                            href={selectedItem.data.exampleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-pink font-semibold hover:underline flex items-center gap-1 mt-1.5"
                          >
                            Assistir Referência do Estilo <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedItem?.type === 'checklists' && (
                    <div className="space-y-3">
                      <span className="text-brand-gray text-[10px] block uppercase font-bold tracking-wider">Itens do Checklist Reutilizável</span>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {selectedItem.data.items?.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-brand-offwhite border border-brand-pink-light/20">
                            <div className="w-4 h-4 rounded-md border border-brand-nude-dark shrink-0" />
                            <span className="font-semibold text-brand-charcoal text-[11px]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* General details or observations */}
                  {selectedItem?.data.description && selectedItem.type !== 'environments' && selectedItem.type !== 'styles' && (
                    <div className="space-y-1">
                      <span className="text-brand-gray text-[10px] block">Descrição</span>
                      <p className="text-brand-charcoal leading-relaxed">{selectedItem.data.description}</p>
                    </div>
                  )}

                  {selectedItem?.data.notes && selectedItem.type !== 'styles' && (
                    <div className="space-y-1.5 bg-brand-pink-light/10 p-4 rounded-2xl border border-brand-pink-light/30">
                      <span className="text-brand-pink font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <Info size={12} /> Segredos e Dicas de Gravação
                      </span>
                      <p className="text-brand-charcoal font-serif italic italic leading-relaxed">
                        "{selectedItem.data.notes}"
                      </p>
                    </div>
                  )}

                  {/* VISUAL CONNECTED ELEMENT INTEGRATIONS */}
                  {selectedItem?.type !== 'checklists' && (
                    <div className="border-t border-brand-pink-light/20 pt-4 space-y-4">
                      <div className="flex items-center gap-1 text-brand-pink">
                        <Link size={13} />
                        <h4 className="font-serif text-xs font-bold">Conexões Ativas</h4>
                      </div>

                      <div className="space-y-3">
                        {/* Connected Products */}
                        <div>
                          <span className="text-brand-gray text-[9px] uppercase font-bold tracking-wider block mb-1">Produtos Vinculados</span>
                          {selectedItem?.data.productIds && selectedItem.data.productIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedItem.data.productIds.map((pId: string) => {
                                const prod = products.find(p => p.id === pId);
                                if (!prod) return null;
                                return (
                                  <span key={pId} className="bg-brand-pink-light/40 text-brand-pink font-semibold px-2.5 py-1 rounded-full text-[10px] border border-brand-pink-light/35">
                                    📦 {prod.name}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-stone-400 italic text-[10px]">Nenhum produto vinculado ainda.</span>
                          )}
                        </div>

                        {/* Connected Scripts */}
                        <div>
                          <span className="text-brand-gray text-[9px] uppercase font-bold tracking-wider block mb-1">Roteiros Sugeridos</span>
                          {selectedItem?.data.scriptIds && selectedItem.data.scriptIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedItem.data.scriptIds.map((sId: string) => {
                                const scr = scripts.find(s => s.id === sId);
                                if (!scr) return null;
                                return (
                                  <span key={sId} className="bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-full text-[10px] border border-amber-200">
                                    ✍️ {scr.title}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-stone-400 italic text-[10px]">Nenhum roteiro vinculado ainda.</span>
                          )}
                        </div>

                        {/* Connected Scenes */}
                        <div>
                          <span className="text-brand-gray text-[9px] uppercase font-bold tracking-wider block mb-1">Cenas Relacionadas</span>
                          {selectedItem?.data.sceneIds && selectedItem.data.sceneIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedItem.data.sceneIds.map((scId: string) => {
                                const sc = scenes.find(s => s.id === scId);
                                if (!sc) return null;
                                return (
                                  <span key={scId} className="bg-purple-50 text-purple-800 font-semibold px-2.5 py-1 rounded-full text-[10px] border border-purple-200">
                                    🎥 {sc.name}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-stone-400 italic text-[10px]">Nenhuma cena vinculada ainda.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

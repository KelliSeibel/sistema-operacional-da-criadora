import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  FolderHeart, 
  Sparkles, 
  Lightbulb, 
  PenTool, 
  Fingerprint, 
  Compass, 
  Video, 
  BrainCircuit, 
  BookOpen, 
  Library, 
  Target, 
  CheckSquare, 
  ClipboardList, 
  Search, 
  Plus, 
  Tv,
  Download
} from 'lucide-react';
import { PaginaFixa } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  selectedPageId: string | null;
  onPageSelect: (id: string | null) => void;
  paginasFixas: PaginaFixa[];
  globalSearchQuery: string;
  onGlobalSearchChange: (query: string) => void;
  onAddNewItem: (dbName: string) => void;
  showInstallBtn?: boolean;
  onInstall?: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  selectedPageId,
  onPageSelect,
  paginasFixas,
  globalSearchQuery,
  onGlobalSearchChange,
  onAddNewItem,
  showInstallBtn,
  onInstall
}: SidebarProps) {
  const [dbsExpanded, setDbsExpanded] = useState(true);
  const [pagesExpanded, setPagesExpanded] = useState(true);

  // Group pages by category
  const manuals = paginasFixas.filter(p => p.categoria === 'Manual');
  const checklists = paginasFixas.filter(p => p.categoria === 'Checklist');
  const otherPages = paginasFixas.filter(p => p.categoria === 'Fluxo' || p.categoria === 'Sistema');

  // Custom database definition matching user specifications
  const dbList = [
    { id: 'projetos', name: 'Projetos', icon: FolderHeart, color: 'text-brand-rose bg-brand-nude/30' },
    { id: 'produtosUgc', name: 'Produtos UGC', icon: Sparkles, color: 'text-[#C98484] bg-brand-cream' },
    { id: 'ideiasConteudo', name: 'Ideias de Conteúdo', icon: Lightbulb, color: 'text-brand-rose bg-brand-cream' },
    { id: 'roteiros', name: 'Roteiros', icon: PenTool, color: 'text-brand-rose-light bg-brand-cream' },
    { id: 'ganchos', name: 'Banco de Ganchos', icon: Fingerprint, color: 'text-brand-rose bg-brand-cream' },
    { id: 'referencias', name: 'Referências', icon: Compass, color: 'text-brand-rose-light bg-brand-cream' },
    { id: 'bancoCenas', name: 'Banco de Cenas', icon: Video, color: 'text-brand-rose bg-brand-cream' },
    { id: 'psicologiaConsumidor', name: 'Psicologia do Consumidor', icon: BrainCircuit, color: 'text-[#C98484] bg-brand-cream' },
    { id: 'estudos', name: 'Estudos', icon: BookOpen, color: 'text-[#C98484] bg-brand-cream' },
    { id: 'leituras', name: 'Leituras', icon: Library, color: 'text-brand-rose-light bg-brand-cream' },
    { id: 'videosPublicados', name: 'Vídeos Publicados', icon: Tv, color: 'text-brand-rose bg-brand-cream' },
    { id: 'metas', name: 'Metas', icon: Target, color: 'text-[#C98484] bg-brand-cream' },
    { id: 'tarefas', name: 'Tarefas', icon: CheckSquare, color: 'text-brand-rose bg-brand-cream' },
  ];

  const handleDbClick = (id: string) => {
    onViewChange(id);
  };

  const handlePageClick = (id: string) => {
    onViewChange('paginaFixa');
    onPageSelect(id);
  };

  return (
    <aside className="w-full md:w-64 border-r border-brand-beige/50 bg-brand-offwhite flex flex-col h-full md:h-screen shrink-0 select-none font-sans">
      {/* Workspace Header */}
      <div className="p-5 border-b border-brand-beige/30 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onViewChange('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-rose to-brand-rose-light flex items-center justify-center text-white font-bold text-lg shadow-sm">
            ✨
          </div>
          <div>
            <h1 className="font-serif-italic italic text-2xl font-semibold tracking-wide text-brand-dark leading-none">
              Criadora OS
            </h1>
            <span className="text-[10px] font-sans font-medium tracking-widest text-brand-rose uppercase block mt-1">
              SEGUNDO CÉREBRO
            </span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-brand-rose-light" />
          <input
            type="text"
            placeholder="Pesquisar no OS..."
            value={globalSearchQuery}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.8 bg-white border border-brand-beige/60 rounded-xl text-xs placeholder-brand-rose-light/70 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose transition-all shadow-sm"
          />
          {globalSearchQuery && (
            <button 
              onClick={() => onGlobalSearchChange('')}
              className="absolute right-3 top-2 text-[10px] text-brand-rose hover:text-brand-dark font-medium"
            >
              limpar
            </button>
          )}
        </div>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-grow overflow-y-auto px-3 space-y-5 py-3 scrollbar-thin">
        {/* Main Section */}
        <div className="space-y-1">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              currentView === 'dashboard'
                ? 'bg-white text-brand-rose shadow-sm border border-brand-beige/40'
                : 'text-brand-muted hover:bg-brand-cream/60 hover:text-brand-dark'
            }`}
          >
            <LayoutDashboard className={`h-4 w-4 ${currentView === 'dashboard' ? 'text-brand-rose' : 'text-brand-rose-light'}`} />
            <span>Painel Principal</span>
          </button>
        </div>

        {/* Relational Databases */}
        <div>
          <button
            onClick={() => setDbsExpanded(!dbsExpanded)}
            className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-brand-rose-light uppercase tracking-widest hover:text-brand-rose transition-all"
          >
            <span>Workspace</span>
            {dbsExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>

          {dbsExpanded && (
            <div className="mt-2 space-y-0.5 pl-1">
              {dbList.map((db) => {
                const isSelected = currentView === db.id;
                const IconComponent = db.icon;
                return (
                  <div key={db.id} className="group flex items-center justify-between pr-2 rounded-xl hover:bg-brand-cream/40 transition-all">
                    <button
                      onClick={() => handleDbClick(db.id)}
                      className={`flex-grow flex items-center space-x-2.5 px-2 py-2 rounded-xl text-xs tracking-wide transition-all text-left ${
                        isSelected
                          ? 'bg-white text-brand-rose font-bold border border-brand-beige/40 shadow-sm'
                          : 'text-brand-muted hover:text-brand-dark'
                      }`}
                    >
                      <span className={`p-1.5 rounded-lg ${db.color} transition-all shrink-0`}>
                        <IconComponent className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{db.name}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddNewItem(db.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-brand-rose-light hover:text-brand-rose hover:bg-white rounded-lg transition-all"
                      title={`Novo item em ${db.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Static Content / Manuals / Checklists */}
        <div>
          <button
            onClick={() => setPagesExpanded(!pagesExpanded)}
            className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-brand-rose-light uppercase tracking-widest hover:text-brand-rose transition-all"
          >
            <span>Manuais e Estudos</span>
            {pagesExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>

          {pagesExpanded && (
            <div className="mt-2 space-y-4 pl-1">
              {/* Manuais Group */}
              <div>
                <span className="px-2 text-[9px] font-bold text-brand-rose tracking-wider uppercase block mb-1">
                  📕 Manuais Estratégicos
                </span>
                <div className="space-y-0.5">
                  {manuals.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2.5 px-2 py-1.8 rounded-xl text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-white text-brand-rose font-bold border border-brand-beige/40 shadow-sm'
                            : 'text-brand-muted hover:bg-brand-cream/30 hover:text-brand-dark'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-brand-rose-light shrink-0" />
                        <span className="truncate">{page.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checklists Group */}
              <div>
                <span className="px-2 text-[9px] font-bold text-brand-rose tracking-wider uppercase block mb-1">
                  ✅ Listas e Processos
                </span>
                <div className="space-y-0.5">
                  {checklists.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2.5 px-2 py-1.8 rounded-xl text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-white text-brand-rose font-bold border border-brand-beige/40 shadow-sm'
                            : 'text-brand-muted hover:bg-brand-cream/30 hover:text-brand-dark'
                        }`}
                      >
                        <ClipboardList className="h-3.5 w-3.5 text-brand-rose-light shrink-0" />
                        <span className="truncate">{page.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fluxos e Sistemas Group */}
              <div>
                <span className="px-2 text-[9px] font-bold text-brand-rose tracking-wider uppercase block mb-1">
                  ⚙️ Fluxos do Sistema
                </span>
                <div className="space-y-0.5">
                  {otherPages.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2.5 px-2 py-1.8 rounded-xl text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-white text-brand-rose font-bold border border-brand-beige/40 shadow-sm'
                            : 'text-brand-muted hover:bg-brand-cream/30 hover:text-brand-dark'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-brand-rose-light shrink-0" />
                        <span className="truncate">{page.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showInstallBtn && onInstall && (
        <div className="p-3.5 border-t border-brand-beige/30 bg-brand-cream/30 shrink-0">
          <button
            onClick={onInstall}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-brand-rose hover:bg-brand-rose/90 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>Instalar Criadora OS</span>
          </button>
        </div>
      )}

      {/* User Info / Profile Banner */}
      <div className="p-4 border-t border-brand-beige/30 bg-brand-cream/50 flex items-center space-x-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C98484] to-[#D6A6A6] flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
          K
        </div>
        <div className="flex-grow truncate">
          <p className="text-xs font-bold text-brand-dark truncate leading-tight">Kelli Rosa</p>
          <p className="text-[10px] text-brand-rose-light font-medium truncate">@criadora_operacoes</p>
        </div>
      </div>
    </aside>
  );
}

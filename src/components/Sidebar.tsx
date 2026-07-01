/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderHeart, 
  Sparkles, 
  Lightbulb, 
  PenTool, 
  Fingerprint, 
  Video, 
  Compass, 
  BookOpen, 
  Library, 
  Target, 
  CheckSquare, 
  BrainCircuit, 
  ChevronDown, 
  ChevronRight, 
  FileText, 
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
  onPageSelect: (id: string) => void;
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

  const dbList = [
    { id: 'projetos', name: 'Projetos', icon: FolderHeart, color: 'text-rose-500 bg-rose-50' },
    { id: 'produtosUgc', name: 'Produtos UGC', icon: Sparkles, color: 'text-amber-500 bg-amber-50' },
    { id: 'ideiasConteudo', name: 'Ideias de Conteúdo', icon: Lightbulb, color: 'text-yellow-500 bg-yellow-50' },
    { id: 'roteiros', name: 'Roteiros', icon: PenTool, color: 'text-indigo-500 bg-indigo-50' },
    { id: 'ganchos', name: 'Banco de Ganchos', icon: Fingerprint, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'referencias', name: 'Referências', icon: Compass, color: 'text-sky-500 bg-sky-50' },
    { id: 'bancoCenas', name: 'Banco de Cenas', icon: Video, color: 'text-teal-500 bg-teal-50' },
    { id: 'psicologiaConsumidor', name: 'Psicologia do Consumidor', icon: BrainCircuit, color: 'text-purple-500 bg-purple-50' },
    { id: 'estudos', name: 'Estudos', icon: BookOpen, color: 'text-orange-500 bg-orange-50' },
    { id: 'leituras', name: 'Leituras', icon: Library, color: 'text-pink-500 bg-pink-50' },
    { id: 'videosPublicados', name: 'Vídeos Publicados', icon: Tv, color: 'text-violet-500 bg-violet-50' },
    { id: 'metas', name: 'Metas', icon: Target, color: 'text-blue-500 bg-blue-50' },
    { id: 'tarefas', name: 'Tarefas', icon: CheckSquare, color: 'text-cyan-500 bg-cyan-50' },
  ];

  const handleDbClick = (id: string) => {
    onViewChange(id);
  };

  const handlePageClick = (id: string) => {
    onViewChange('paginaFixa');
    onPageSelect(id);
  };

  return (
    <aside className="w-full md:w-64 border-r border-gray-200 bg-gray-50 flex flex-col h-full md:h-screen shrink-0 select-none font-sans">
      {/* Workspace Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onViewChange('dashboard')}>
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            🧠
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-sm tracking-tight leading-tight">Criadora OS</h1>
            <span className="text-xs text-gray-500">Segundo Cérebro</span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="px-3 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisa rápida..."
            value={globalSearchQuery}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          {globalSearchQuery && (
            <button 
              onClick={() => onGlobalSearchChange('')}
              className="absolute right-2.5 top-2 text-[10px] text-gray-400 hover:text-gray-600"
            >
              limpar
            </button>
          )}
        </div>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 py-2 scrollbar-thin">
        {/* Main Section */}
        <div className="space-y-0.5">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentView === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className={`h-4 w-4 ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-gray-500'}`} />
            <span>Painel Principal</span>
          </button>
        </div>

        {/* Relational Databases */}
        <div>
          <button
            onClick={() => setDbsExpanded(!dbsExpanded)}
            className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-all"
          >
            <span>Bases de Dados</span>
            {dbsExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>

          {dbsExpanded && (
            <div className="mt-1 space-y-0.5 pl-1">
              {dbList.map((db) => {
                const isSelected = currentView === db.id;
                const IconComponent = db.icon;
                return (
                  <div key={db.id} className="group flex items-center justify-between pr-2 rounded-lg hover:bg-gray-100 transition-all">
                    <button
                      onClick={() => handleDbClick(db.id)}
                      className={`flex-1 flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs transition-all text-left ${
                        isSelected
                          ? 'bg-indigo-50/70 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className={`p-1 rounded ${db.color} transition-all`}>
                        <IconComponent className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{db.name}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddNewItem(db.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-indigo-600 rounded hover:bg-gray-200 transition-all"
                      title={`Adicionar novo em ${db.name}`}
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
            className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-all"
          >
            <span>Documentação & Guias</span>
            {pagesExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>

          {pagesExpanded && (
            <div className="mt-1.5 space-y-3 pl-1">
              {/* Manuais Group */}
              <div>
                <span className="px-2 text-[10px] font-semibold text-gray-400 tracking-wider flex items-center space-x-1">
                  <span>📕 Manuais de Estratégia</span>
                </span>
                <div className="mt-1 space-y-0.5">
                  {manuals.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-indigo-50/70 text-indigo-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{page.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checklists Group */}
              <div>
                <span className="px-2 text-[10px] font-semibold text-gray-400 tracking-wider flex items-center space-x-1">
                  <span>✅ Checklists Operacionais</span>
                </span>
                <div className="mt-1 space-y-0.5">
                  {checklists.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-indigo-50/70 text-indigo-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <ClipboardList className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{page.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fluxos e Sistemas Group */}
              <div>
                <span className="px-2 text-[10px] font-semibold text-gray-400 tracking-wider flex items-center space-x-1">
                  <span>⚙️ Fluxos e Sistemas</span>
                </span>
                <div className="mt-1 space-y-0.5">
                  {otherPages.map((page) => {
                    const isSelected = currentView === 'paginaFixa' && selectedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs transition-all text-left truncate ${
                          isSelected
                            ? 'bg-indigo-50/70 text-indigo-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-gray-400 shrink-0" />
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
        <div className="p-3 border-t border-gray-150 bg-indigo-50/50 shrink-0">
          <button
            onClick={onInstall}
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>Instalar Aplicativo</span>
          </button>
        </div>
      )}

      {/* User Info / Profile Banner */}
      <div className="p-3 border-t border-gray-200 bg-gray-100/50 flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
          K
        </div>
        <div className="flex-1 truncate">
          <p className="text-xs font-semibold text-gray-900 truncate">Kelli Rosa</p>
          <p className="text-[10px] text-gray-500 truncate">@criadora_operacoes</p>
        </div>
      </div>
    </aside>
  );
}

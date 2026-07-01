/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_STATE } from './initialData';
import { WorkspaceState, PaginaFixa } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DatabaseView from './components/DatabaseView';
import PageView from './components/PageView';
import ItemModal from './components/ItemModal';
import { 
  Search, 
  ChevronRight, 
  X, 
  Menu, 
  Download, 
  Home, 
  FolderHeart, 
  Sparkles, 
  BookOpen, 
  User, 
  Award, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Load state from localStorage or default to INITIAL_STATE
  const [state, setState] = useState<WorkspaceState>(() => {
    try {
      const saved = localStorage.getItem('criadora_os_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Falha ao carregar estado do localStorage', e);
    }
    return INITIAL_STATE;
  });

  // Navigation states
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedPageId, setSelectedPageId] = useState<string | null>('pag-ugc');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Mobile UI States
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // PWA Installation States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setShowInstallBtn(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA Installation Choice: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Navigation Wrappers to auto-close Drawer
  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setGlobalSearchQuery('');
    setIsMobileSidebarOpen(false);
  };

  const handlePageSelect = (id: string | null) => {
    setSelectedPageId(id);
    setIsMobileSidebarOpen(false);
  };
  
  // Modal drawer state
  const [activeModal, setActiveModal] = useState<{ dbId: string; itemId: string } | null>(null);

  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('criadora_os_state', JSON.stringify(state));
  }, [state]);

  // Handle Page Update
  const handleUpdatePage = (updatedPage: PaginaFixa) => {
    setState(prev => ({
      ...prev,
      paginasFixas: prev.paginasFixas.map(p => p.id === updatedPage.id ? updatedPage : p)
    }));
  };

  // Handle Database Item Update
  const handleUpdateItem = (dbId: string, itemId: string, updatedItem: any) => {
    setState(prev => {
      const list = prev[dbId as keyof WorkspaceState] as any[];
      const updatedList = list.map(item => item.id === itemId ? updatedItem : item);
      return {
        ...prev,
        [dbId]: updatedList
      };
    });
  };

  // Handle Database Item Deletion
  const handleDeleteItem = (dbId: string, itemId: string) => {
    setState(prev => {
      const list = prev[dbId as keyof WorkspaceState] as any[];
      const updatedList = list.filter(item => item.id !== itemId);
      return {
        ...prev,
        [dbId]: updatedList
      };
    });
    if (activeModal?.itemId === itemId) {
      setActiveModal(null);
    }
  };

  // Handle Quick Task Toggle
  const handleToggleTaskStatus = (taskId: string) => {
    setState(prev => {
      const updatedTasks = prev.tarefas.map(t => {
        if (t.id === taskId) {
          const newStatus = t.status === 'Concluída' ? 'Pendente' : 'Concluída';
          return { ...t, status: newStatus };
        }
        return t;
      });
      return {
        ...prev,
        tarefas: updatedTasks
      };
    });
  };

  // Handle Adding New Item Dynamically
  const handleAddNewItem = (dbId: string) => {
    const newId = `item-${Date.now()}`;
    let newItem: any = { id: newId };

    // Fill default schema values based on database type
    switch (dbId) {
      case 'projetos':
        newItem = {
          ...newItem,
          nome: 'Novo Projeto',
          categoria: 'Geral',
          objetivo: '',
          prioridade: 'Média',
          status: 'Planejado',
          dataInicio: new Date().toISOString().split('T')[0],
          proximaAcao: '',
          observacoes: ''
        };
        break;
      case 'produtosUgc':
        newItem = {
          ...newItem,
          nome: 'Novo Produto',
          marca: 'Marca Exemplo',
          categoria: 'Geral',
          link: '',
          fotos: '📦',
          jaGravei: false,
          videosGravados: 0,
          melhorVideo: '',
          dataGravacao: '',
          status: 'Disponível',
          caracteristicas: '',
          beneficios: '',
          problemasQueResolve: '',
          desejosQueDesperta: '',
          emocoes: '',
          publicoAlvo: '',
          objecoes: '',
          gatilhosMentais: '',
          ideiasDeVideos: '',
          roteirosIds: [],
          videosIds: [],
          ganchosIds: [],
          referenciasIds: []
        };
        break;
      case 'ideiasConteudo':
        newItem = {
          ...newItem,
          titulo: 'Nova Ideia de Vídeo',
          categoria: 'Educação',
          projetoId: '',
          produtoId: '',
          objetivo: '',
          plataforma: 'TikTok',
          formato: 'TikTok',
          ganchoId: '',
          cta: '',
          dificuldade: 'Média',
          tempoEstimado: '',
          status: 'Ideia',
          dataCriacao: new Date().toISOString().split('T')[0],
          dataGravacao: '',
          dataPostagem: '',
          resultado: '',
          observacoes: ''
        };
        break;
      case 'roteiros':
        newItem = {
          ...newItem,
          titulo: 'Novo Roteiro',
          produtoId: '',
          ideiaId: '',
          objetivo: '',
          tipo: 'Orgânico',
          gancho: '',
          desenvolvimento: '',
          finalizacao: '',
          cta: '',
          tempo: '30s',
          status: 'Rascunho',
          videoGravado: false,
          videoPublicadoId: '',
          resultado: ''
        };
        break;
      case 'ganchos':
        newItem = {
          ...newItem,
          gancho: 'Insira o gancho de impacto aqui...',
          categoria: 'Curiosidade',
          tipoEmocao: '',
          objetivo: '',
          exemplo: '',
          melhorPara: '',
          retencaoEsperada: 'Média',
          jaUtilizei: false,
          funcionou: 'Não'
        };
        break;
      case 'referencias':
        newItem = {
          ...newItem,
          titulo: 'Nova Referência',
          link: '',
          categoria: 'Estética',
          analise: '',
          aplicacao: '',
          ideiaConteudoId: '',
          status: 'Não iniciado',
          projetosIds: []
        };
        break;
      case 'bancoCenas':
        newItem = {
          ...newItem,
          titulo: 'Nova Cena',
          linkVideo: '',
          categoria: 'Transição',
          estetica: '',
          equipamento: 'Celular',
          tempo: '5s',
          status: 'Ideia',
          projetosIds: []
        };
        break;
      case 'psicologiaConsumidor':
        newItem = {
          ...newItem,
          desejo: 'Insira o desejo ou dor mapeada...',
          categoria: 'Dores',
          porQueCompra: '',
          comoAtingir: '',
          ideiaConteudoId: '',
          status: 'Pendente'
        };
        break;
      case 'estudos':
        newItem = {
          ...newItem,
          tema: 'Novo Tema de Estudo',
          categoria: 'UGC',
          conceitoChave: '',
          resumo: '',
          aplicacaoPratica: '',
          videosIds: [],
          status: 'Pendente'
        };
        break;
      case 'leituras':
        newItem = {
          ...newItem,
          livro: 'Título do Livro',
          autor: '',
          tema: '',
          capitulo: '',
          resumo: '',
          frasesImportantes: '',
          aplicacao: '',
          conteudosGeradosIds: [],
          videosCriadosIds: [],
          statusLeitura: 'Não iniciado'
        };
        break;
      case 'videosPublicados':
        newItem = {
          ...newItem,
          titulo: 'Novo Vídeo Postado',
          plataforma: 'TikTok',
          projetoId: '',
          produtoId: '',
          data: new Date().toISOString().split('T')[0],
          visualizacoes: 0,
          curtidas: 0,
          comentarios: 0,
          compartilhamentos: 0,
          salvamentos: 0,
          retencao: '',
          resultado: '',
          licoesAprendidas: ''
        };
        break;
      case 'metas':
        newItem = {
          ...newItem,
          meta: 'Minha Nova Meta',
          projetoId: '',
          prazo: '',
          prioridade: 'Média',
          status: 'Não iniciada',
          resultado: '',
          proximaAcao: ''
        };
        break;
      case 'tarefas':
        newItem = {
          ...newItem,
          tarefa: 'Nova Tarefa de Ação',
          projetoId: '',
          responsavel: 'Kelli',
          prioridade: 'Média',
          prazo: new Date().toISOString().split('T')[0],
          status: 'Pendente',
          tempoEstimado: '1 hora'
        };
        break;
      default:
        break;
    }

    // Add to state and auto-open in detail view!
    setState(prev => ({
      ...prev,
      [dbId]: [newItem, ...(prev[dbId as keyof WorkspaceState] as any[])]
    }));
    setActiveModal({ dbId, itemId: newId });
  };

  // Jump from one relation modal card to another seamlessly
  const handleJumpToRelation = (targetDbId: string, targetItemId: string) => {
    setActiveModal({ dbId: targetDbId, itemId: targetItemId });
  };

  // Global Search results lookup
  const globalSearchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return [];

    const query = globalSearchQuery.toLowerCase();
    const results: { dbId: string; item: any; type: 'db' | 'page' }[] = [];

    // Search static pages
    state.paginasFixas.forEach(page => {
      if (page.titulo.toLowerCase().includes(query) || page.conteudo.toLowerCase().includes(query)) {
        results.push({ dbId: 'paginaFixa', item: page, type: 'page' });
      }
    });

    // Search databases
    const dbKeys = [
      'projetos', 'produtosUgc', 'ideiasConteudo', 'roteiros', 'ganchos',
      'referencias', 'bancoCenas', 'psicologiaConsumidor', 'estudos',
      'leituras', 'videosPublicados', 'metas', 'tarefas'
    ];

    dbKeys.forEach(key => {
      const items = (state[key as keyof WorkspaceState] as any[]) || [];
      items.forEach(item => {
        const itemStr = JSON.stringify(item).toLowerCase();
        if (itemStr.includes(query)) {
          results.push({ dbId: key, item, type: 'db' });
        }
      });
    });

    return results.slice(0, 8); // return top 8 matches
  }, [state, globalSearchQuery]);

  // Current active static page object
  const activePage = useMemo(() => {
    return state.paginasFixas.find(p => p.id === selectedPageId) || state.paginasFixas[0];
  }, [state, selectedPageId]);

  return (
    <div className="flex h-screen bg-[#F8F5F2] select-none overflow-hidden font-sans">
      
      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          selectedPageId={selectedPageId}
          onPageSelect={handlePageSelect}
          paginasFixas={state.paginasFixas}
          globalSearchQuery={globalSearchQuery}
          onGlobalSearchChange={setGlobalSearchQuery}
          onAddNewItem={handleAddNewItem}
          showInstallBtn={showInstallBtn}
          onInstall={handleInstallClick}
        />
      </div>

      {/* Mobile Drawer Slide Navigation */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-[#2C2C2C]/50 backdrop-blur-[1px] z-40 md:hidden"
            />

            {/* Sliding Aside Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[80vw] max-w-[290px] bg-[#F8F5F2] z-50 shadow-2xl flex flex-col md:hidden overflow-hidden"
            >
              {/* Close Drawer Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-5 right-5 p-2 text-brand-rose-light hover:text-brand-rose hover:bg-brand-cream/60 rounded-xl transition-all cursor-pointer z-50"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-grow h-full overflow-hidden">
                <Sidebar
                  currentView={currentView}
                  onViewChange={handleViewChange}
                  selectedPageId={selectedPageId}
                  onPageSelect={handlePageSelect}
                  paginasFixas={state.paginasFixas}
                  globalSearchQuery={globalSearchQuery}
                  onGlobalSearchChange={setGlobalSearchQuery}
                  onAddNewItem={handleAddNewItem}
                  showInstallBtn={showInstallBtn}
                  onInstall={handleInstallClick}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Panel Frame */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F8F5F2]">
        
        {/* Mobile App Bar Header */}
        <header className="md:hidden flex items-center justify-between px-4 h-15 bg-white border-b border-brand-beige/40 shrink-0 select-none">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-1.5 text-brand-dark hover:text-brand-rose active:bg-brand-cream/60 rounded-xl transition-all cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-serif-italic italic text-xl font-semibold tracking-wide text-brand-dark">
              {currentView === 'dashboard' 
                ? 'Criadora OS' 
                : currentView === 'paginaFixa' 
                  ? `${activePage?.titulo || 'Diretrizes'}` 
                  : `${currentView === 'produtosUgc' ? 'Produtos UGC' : currentView === 'ideiasConteudo' ? 'Ideias' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="flex items-center space-x-1 bg-brand-cream text-brand-rose px-3 py-1.5 rounded-xl text-[10px] font-bold active:scale-95 transition-all cursor-pointer border border-brand-beige/30"
                title="Instalar aplicativo"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Instalar</span>
              </button>
            )}
          </div>
        </header>
        
        {/* Global Search Results Overlay */}
        {globalSearchQuery.trim() !== '' && (
          <div className="absolute inset-x-0 top-0 max-h-[85vh] bg-white border-b border-brand-beige/40 shadow-xl z-30 flex flex-col overflow-hidden select-text animate-fade-in">
            <div className="p-4 border-b border-brand-beige/20 flex items-center justify-between shrink-0 bg-brand-offwhite">
              <div className="flex items-center space-x-2.5">
                <Search className="h-4 w-4 text-[#C98484] animate-pulse" />
                <span className="text-xs font-bold text-brand-rose-light uppercase tracking-widest">
                  Resultados da busca para: <span className="text-brand-dark">"{globalSearchQuery}"</span>
                </span>
              </div>
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="p-1.5 text-brand-rose-light hover:text-brand-rose hover:bg-brand-cream/50 rounded-lg transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-brand-beige/15">
              {globalSearchResults.length === 0 ? (
                <div className="text-center py-10 text-brand-rose-light text-xs font-semibold">
                  Nenhum registro correspondente encontrado.
                </div>
              ) : (
                globalSearchResults.map((res, index) => {
                  const title = res.item.nome || res.item.titulo || res.item.livro || res.item.meta || res.item.tarefa || res.item.gancho || res.item.desejo;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (res.type === 'page') {
                          setCurrentView('paginaFixa');
                          setSelectedPageId(res.item.id);
                        } else {
                          setActiveModal({ dbId: res.dbId, itemId: res.item.id });
                        }
                        setGlobalSearchQuery('');
                      }}
                      className="p-3.5 hover:bg-brand-cream/30 rounded-2xl cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center space-x-3.5 truncate">
                        <span className="text-lg">
                          {res.type === 'page' ? '📕' : '🗄️'}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-bold text-brand-dark truncate">{title}</p>
                          <p className="text-[9px] text-brand-rose-light font-bold uppercase mt-1 tracking-wider">
                            {res.type === 'page' ? `Manual/Diretrizes > ${res.item.categoria}` : `Base > ${res.dbId}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-[10px] text-brand-rose font-bold hover:underline">
                        <span>Acessar</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Dynamic Inner Router Views */}
        <div className="flex-1 h-full overflow-hidden pb-16 md:pb-0">
          {currentView === 'dashboard' && (
            <Dashboard
              state={state}
              onViewChange={setCurrentView}
              onPageSelect={setSelectedPageId}
              onOpenItemModal={(db, id) => setActiveModal({ dbId: db, itemId: id })}
              onAddNewItem={handleAddNewItem}
              onToggleTaskStatus={handleToggleTaskStatus}
            />
          )}

          {currentView === 'paginaFixa' && activePage && (
            <PageView
              pagina={activePage}
              onPageUpdate={handleUpdatePage}
            />
          )}

          {currentView !== 'dashboard' && currentView !== 'paginaFixa' && (
            <DatabaseView
              dbId={currentView}
              state={state}
              onOpenItemModal={(db, id) => setActiveModal({ dbId: db, itemId: id })}
              onAddNewItem={handleAddNewItem}
            />
          )}
        </div>

        {/* Bottom Navigation Bar - Mobile First Standard App style */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-brand-beige/30 h-16 flex items-center justify-around px-2 z-30 shadow-[0_-4px_24px_-4px_rgba(201,132,132,0.08)]">
          <button 
            onClick={() => handleViewChange('dashboard')}
            className={`flex flex-col items-center justify-center space-y-1 w-14 h-full transition-colors ${
              currentView === 'dashboard' ? 'text-brand-rose' : 'text-brand-rose-light'
            }`}
          >
            <Home className="h-5.5 w-5.5 stroke-[1.8]" />
            <span className="text-[9px] font-bold tracking-wide">Painel</span>
          </button>

          <button 
            onClick={() => handleViewChange('projetos')}
            className={`flex flex-col items-center justify-center space-y-1 w-14 h-full transition-colors ${
              currentView === 'projetos' ? 'text-brand-rose' : 'text-brand-rose-light'
            }`}
          >
            <FolderHeart className="h-5.5 w-5.5 stroke-[1.8]" />
            <span className="text-[9px] font-bold tracking-wide">Projetos</span>
          </button>

          <button 
            onClick={() => handleViewChange('produtosUgc')}
            className={`flex flex-col items-center justify-center space-y-1 w-14 h-full transition-colors ${
              currentView === 'produtosUgc' ? 'text-brand-rose' : 'text-brand-rose-light'
            }`}
          >
            <Sparkles className="h-5.5 w-5.5 stroke-[1.8]" />
            <span className="text-[9px] font-bold tracking-wide">UGC</span>
          </button>

          <button 
            onClick={() => handleViewChange('estudos')}
            className={`flex flex-col items-center justify-center space-y-1 w-14 h-full transition-colors ${
              currentView === 'estudos' ? 'text-brand-rose' : 'text-brand-rose-light'
            }`}
          >
            <BookOpen className="h-5.5 w-5.5 stroke-[1.8]" />
            <span className="text-[9px] font-bold tracking-wide">Estudos</span>
          </button>

          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 w-14 h-full text-brand-rose-light hover:text-brand-rose transition-colors"
          >
            <User className="h-5.5 w-5.5 stroke-[1.8]" />
            <span className="text-[9px] font-bold tracking-wide">Perfil</span>
          </button>
        </nav>
      </main>

      {/* Relational Item Drawer Modal */}
      {activeModal && (
        <ItemModal
          dbId={activeModal.dbId}
          itemId={activeModal.itemId}
          state={state}
          onClose={() => setActiveModal(null)}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          onJumpToRelation={handleJumpToRelation}
        />
      )}

      {/* Profile Modal Sheets (Popup) */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-[#2C2C2C]/50 backdrop-blur-[2px] flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 select-none">
            {/* Backdrop wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0"
            />

            {/* Profile Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 overflow-hidden z-10 text-brand-dark"
            >
              {/* Drag indicator bar for mobile */}
              <div className="w-12 h-1 bg-brand-beige/50 rounded-full mx-auto mb-5 sm:hidden" />

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-brand-rose-light hover:text-brand-rose hover:bg-brand-cream/50 rounded-xl transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C98484] to-[#D6A6A6] flex items-center justify-center text-white font-bold text-3xl shadow-inner mb-3.5 relative">
                  K
                  <span className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-[10px]" title="Online">
                    ✨
                  </span>
                </div>
                
                <h3 className="text-lg font-bold tracking-tight text-brand-dark">Kelli Rosa</h3>
                <p className="text-xs text-brand-rose font-semibold tracking-wider uppercase mt-1">@criadora_operacoes</p>
                
                <p className="text-xs text-brand-rose-light font-medium mt-1">Especialista UGC & Produtora de Conteúdo</p>
              </div>

              {/* Quick stats panel inside profile */}
              <div className="grid grid-cols-3 gap-3.5 mt-6 p-4 bg-brand-offwhite rounded-2xl border border-brand-beige/30">
                <div className="text-center">
                  <span className="text-[9px] text-brand-rose-light block uppercase font-bold tracking-wider">Projetos</span>
                  <span className="text-sm font-bold text-brand-dark block mt-1">{state.projetos.length}</span>
                </div>
                <div className="text-center border-x border-brand-beige/20">
                  <span className="text-[9px] text-brand-rose-light block uppercase font-bold tracking-wider">Produtos</span>
                  <span className="text-sm font-bold text-brand-dark block mt-1">{state.produtosUgc.length}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-brand-rose-light block uppercase font-bold tracking-wider">Concluídas</span>
                  <span className="text-sm font-bold text-brand-dark block mt-1">
                    {state.tarefas.filter(t => t.status === 'Concluída').length}
                  </span>
                </div>
              </div>

              {/* Motivation quote card */}
              <div className="mt-5 p-4 bg-brand-cream/40 border border-[#C98484]/20 rounded-2xl flex items-start space-x-3">
                <Award className="h-5 w-5 text-brand-rose shrink-0 mt-0.5" />
                <div className="text-left text-[11px] leading-relaxed">
                  <span className="font-extrabold text-brand-rose block uppercase tracking-wider text-[9px] mb-0.5">Selo Criadora Premium</span>
                  <p className="text-brand-muted italic">"A consistência atrai as marcas mais refinadas. Continue construindo sua narrativa única."</p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-full mt-6 py-3 bg-brand-rose hover:bg-brand-rose/90 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Voltar ao Painel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

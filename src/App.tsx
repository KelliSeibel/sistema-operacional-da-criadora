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
import { Search, ChevronRight, X } from 'lucide-react';

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
          criador: '',
          plataforma: 'TikTok',
          produtoId: '',
          categoria: '',
          porQueGostei: '',
          gancho: '',
          movimentoCamera: '',
          iluminacao: '',
          edicao: '',
          audio: '',
          cta: '',
          oQueAdaptar: ''
        };
        break;
      case 'bancoCenas':
        newItem = {
          ...newItem,
          nome: 'Nova Cena Estética',
          categoria: 'B-roll',
          produtoId: '',
          local: '',
          equipamento: '',
          descricao: ''
        };
        break;
      case 'psicologiaConsumidor':
        newItem = {
          ...newItem,
          desejo: 'Desejo do cliente...',
          medo: '',
          problema: '',
          sonho: '',
          objecao: '',
          gatilhoMental: '',
          emocao: '',
          necessidade: '',
          exemplosAplicacao: '',
          produtosIds: []
        };
        break;
      case 'estudos':
        newItem = {
          ...newItem,
          tema: 'Novo Tema de Estudo',
          livroId: '',
          curso: '',
          autor: '',
          resumo: '',
          insight: '',
          aplicacao: '',
          ideiaConteudoId: '',
          status: 'Não iniciado',
          projetosIds: []
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
    <div className="flex h-screen bg-white select-none overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setGlobalSearchQuery('');
        }}
        selectedPageId={selectedPageId}
        onPageSelect={setSelectedPageId}
        paginasFixas={state.paginasFixas}
        globalSearchQuery={globalSearchQuery}
        onGlobalSearchChange={setGlobalSearchQuery}
        onAddNewItem={handleAddNewItem}
      />

      {/* Main Panel Frame */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-white">
        
        {/* Global Search Results Overlay */}
        {globalSearchQuery.trim() !== '' && (
          <div className="absolute inset-x-0 top-0 max-h-[85vh] bg-white border-b border-gray-200 shadow-xl z-30 flex flex-col overflow-hidden select-text animate-fade-in">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-indigo-600 animate-pulse" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Resultados da busca global para: <span className="text-indigo-600">"{globalSearchQuery}"</span>
                </span>
              </div>
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
              {globalSearchResults.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs font-medium">
                  Nenhum resultado encontrado para esta palavra-chave.
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
                      className="p-3 hover:bg-indigo-50/40 rounded-xl cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <span className="text-lg">
                          {res.type === 'page' ? '📄' : '🗄️'}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-bold text-gray-900 truncate">{title}</p>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">
                            {res.type === 'page' ? `Página Fixa > ${res.item.categoria}` : `Base > ${res.dbId}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-[10px] text-indigo-600 font-bold hover:underline">
                        <span>Ir para</span>
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
        <div className="flex-grow h-full overflow-hidden">
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
    </div>
  );
}

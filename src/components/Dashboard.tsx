/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Lightbulb, 
  CheckSquare, 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  PlusCircle, 
  Tv, 
  PenTool,
  Eye,
  Award,
  Video,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { WorkspaceState, Tarefa, IdeiaConteudo, Projeto, Meta } from '../types';

interface DashboardProps {
  state: WorkspaceState;
  onViewChange: (view: string) => void;
  onPageSelect: (id: string) => void;
  onOpenItemModal: (dbName: string, itemId: string) => void;
  onAddNewItem: (dbName: string) => void;
  onToggleTaskStatus: (taskId: string) => void;
}

export default function Dashboard({
  state,
  onViewChange,
  onPageSelect,
  onOpenItemModal,
  onAddNewItem,
  onToggleTaskStatus
}: DashboardProps) {
  // Tabs for mobile layout
  const [activeTab, setActiveTab] = useState<'geral' | 'metricas'>('geral');

  // Current time display
  const todayStr = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Analytics calc
  const totalUgcProducts = state.produtosUgc.length;
  const recordedVideos = state.videosPublicados.length;
  const totalViews = state.videosPublicados.reduce((sum, v) => sum + v.visualizacoes, 0);
  const bestVideo = state.videosPublicados.reduce((best, v) => v.visualizacoes > (best?.visualizacoes || 0) ? v : best, state.videosPublicados[0]);

  // Urgent pending tasks (Priority high or medium, status Pending or In Progress)
  const pendingTasks = state.tarefas
    .filter(t => t.status !== 'Concluída')
    .sort((a, b) => {
      const pMap = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
      return pMap[b.prioridade] - pMap[a.prioridade];
    })
    .slice(0, 5);

  // Active / Recent Ideas (Status: Ideia or Roteirizando or Gravando)
  const recentIdeas = state.ideiasConteudo
    .filter(i => i.status !== 'Postado')
    .slice(0, 4);

  // Active Metas
  const activeMetas = state.metas
    .filter(m => m.status !== 'Concluída')
    .slice(0, 3);

  // Active Projects
  const activeProjects = state.projetos
    .filter(p => p.status === 'Em andamento')
    .slice(0, 4);

  // Helper to find project name by ID
  const getProjectName = (projId: string) => {
    return state.projetos.find(p => p.id === projId)?.nome || 'Sem Projeto';
  };

  // Helper to find product name by ID
  const getProductName = (prodId: string) => {
    return state.produtosUgc.find(p => p.id === prodId)?.nome || 'Sem Produto';
  };

  return (
    <div className="flex-grow bg-[#F8F5F2] overflow-y-auto select-none h-screen pb-24 font-sans text-brand-dark scrollbar-thin">
      
      {/* Cover Image Header - Luxury Vibe */}
      <div className="relative min-h-[160px] md:min-h-[220px] w-full bg-gradient-to-br from-[#2C2C2C] via-[#555555] to-[#C98484] flex items-end p-4 md:p-8 overflow-hidden">
        {/* Subtle decorative golden grain overlays */}
        <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8F5F2]/40 to-transparent pointer-events-none" />
        
        <div className="relative w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4 z-10">
          <div className="flex items-center space-x-3.5 md:space-x-5">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-beige flex items-center justify-center text-3xl md:text-4xl shadow-md shrink-0">
              👸
            </div>
            <div>
              <span className="inline-flex items-center space-x-1 text-[8px] md:text-[9px] uppercase tracking-widest font-bold bg-[#C98484]/90 text-white px-2.5 py-1 rounded-full border border-white/20">
                <Sparkle className="h-2 w-2 text-white animate-pulse" />
                <span>Espaço da Criadora</span>
              </span>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight mt-1.5 text-white leading-tight">
                Bom dia, Kelli ✨
              </h1>
              <p className="text-[11px] md:text-xs text-white/90 font-medium flex items-center mt-1">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#E8D9D5]" />
                {todayStr}
              </p>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md border border-brand-beige/50 rounded-2xl p-3 md:px-5 md:py-3 text-[11px] md:text-xs max-w-sm shadow-sm">
            <span className="font-bold text-brand-rose block mb-0.5">Pensamento do Dia:</span>
            <span className="text-brand-muted italic">"Hoje é um ótimo dia para construir sua próxima versão."</span>
          </div>
        </div>
      </div>

      {/* Modern Status Chips Bar */}
      <div className="px-4 md:px-8 mt-5 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] uppercase font-bold text-brand-rose-light tracking-wider mr-2">Foco Atual:</span>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-brand-beige/50 rounded-xl text-xs font-semibold text-brand-dark shadow-sm">
          <span>📚</span>
          <span>ENEM</span>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-brand-beige/50 rounded-xl text-xs font-semibold text-brand-dark shadow-sm">
          <span>🎥</span>
          <span>Gravando UGC</span>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-brand-beige/50 rounded-xl text-xs font-semibold text-[#C98484] shadow-sm">
          <span>✨</span>
          <span>Aurora</span>
        </div>
      </div>

      {/* Quick Access Actions - Premium Styled Buttons */}
      <div className="px-4 md:px-8 mt-6">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-brand-rose uppercase tracking-wider mb-3.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Central de Criação Rápida</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => onAddNewItem('ideiasConteudo')}
            className="flex items-center justify-between p-3.5 bg-white hover:border-brand-rose/60 border border-brand-beige/40 rounded-2xl text-left transition-all active:scale-[0.97] hover:shadow-md duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="p-2.5 rounded-xl bg-brand-cream text-[#C98484] shrink-0">
                <Lightbulb className="h-4.5 w-4.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">Nova Ideia</h4>
                <p className="text-[10px] text-brand-rose-light mt-0.5">Criar conceito</p>
              </div>
            </div>
            <PlusCircle className="h-4.5 w-4.5 text-brand-beige group-hover:text-brand-rose transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('tarefas')}
            className="flex items-center justify-between p-3.5 bg-white hover:border-brand-rose/60 border border-brand-beige/40 rounded-2xl text-left transition-all active:scale-[0.97] hover:shadow-md duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="p-2.5 rounded-xl bg-brand-cream text-[#C98484] shrink-0">
                <CheckSquare className="h-4.5 w-4.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">Nova Tarefa</h4>
                <p className="text-[10px] text-brand-rose-light mt-0.5">Listar afazer</p>
              </div>
            </div>
            <PlusCircle className="h-4.5 w-4.5 text-brand-beige group-hover:text-brand-rose transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('roteiros')}
            className="flex items-center justify-between p-3.5 bg-white hover:border-brand-rose/60 border border-brand-beige/40 rounded-2xl text-left transition-all active:scale-[0.97] hover:shadow-md duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="p-2.5 rounded-xl bg-brand-cream text-[#C98484] shrink-0">
                <PenTool className="h-4.5 w-4.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">Novo Roteiro</h4>
                <p className="text-[10px] text-brand-rose-light mt-0.5">Escrever script</p>
              </div>
            </div>
            <PlusCircle className="h-4.5 w-4.5 text-brand-beige group-hover:text-brand-rose transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('produtosUgc')}
            className="flex items-center justify-between p-3.5 bg-white hover:border-brand-rose/60 border border-brand-beige/40 rounded-2xl text-left transition-all active:scale-[0.97] hover:shadow-md duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="p-2.5 rounded-xl bg-brand-cream text-[#C98484] shrink-0">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">Novo UGC</h4>
                <p className="text-[10px] text-brand-rose-light mt-0.5">Cadastrar marca</p>
              </div>
            </div>
            <PlusCircle className="h-4.5 w-4.5 text-brand-beige group-hover:text-brand-rose transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Selector for Metrics optimization */}
      <div className="px-4 mt-6 block md:hidden">
        <div className="flex bg-brand-cream p-1 rounded-xl border border-brand-beige/50">
          <button 
            onClick={() => setActiveTab('geral')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'geral' 
                ? 'bg-white text-brand-rose shadow-sm' 
                : 'text-brand-muted'
            }`}
          >
            ✨ Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('metricas')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'metricas' 
                ? 'bg-white text-brand-rose shadow-sm' 
                : 'text-brand-muted'
            }`}
          >
            📊 Métricas UGC
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="px-4 md:px-8 mt-5 md:mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Center Column - GENERAL (Hidden on mobile if metrics active) */}
        <div className={`lg:col-span-2 space-y-6 ${activeTab === 'metricas' ? 'hidden md:block' : 'block'}`}>
          
          {/* Section: Urgent Tasks - Compact Mobile Friendly Cards */}
          <div className="bg-white border border-brand-beige/40 rounded-2xl shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4 text-brand-rose" />
                <h3 className="font-bold text-brand-dark text-xs md:text-sm uppercase tracking-wider">Afazeres Hoje</h3>
              </div>
              <button 
                onClick={() => onViewChange('tarefas')} 
                className="text-xs text-brand-rose hover:text-brand-dark flex items-center space-x-0.5 font-bold"
              >
                <span>Ver todas</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {pendingTasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-brand-beige rounded-2xl">
                <p className="text-xs text-brand-rose-light font-semibold">✨ Nenhuma tarefa urgente pendente! Maravilha.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-brand-offwhite/50 border border-brand-beige/30 rounded-2xl hover:border-brand-rose/40 hover:bg-white transition-all select-text"
                  >
                    <div className="flex items-start space-x-3 flex-grow mb-2 sm:mb-0">
                      <label className="relative flex items-center cursor-pointer mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={task.status === 'Concluída'}
                          onChange={() => onToggleTaskStatus(task.id)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-white border-2 border-brand-beige/80 rounded-lg peer-checked:bg-[#C98484] peer-checked:border-[#C98484] flex items-center justify-center transition-all">
                          <svg className="w-3.5 h-3.5 text-white stroke-2 hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>
                      
                      <div className="min-w-0">
                        <p className={`text-xs font-bold leading-tight ${task.status === 'Concluída' ? 'line-through text-brand-rose-light/70' : 'text-brand-dark'}`}>
                          {task.tarefa}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[10px] text-brand-rose-light font-medium">
                          <span className="bg-brand-cream/60 px-1.5 py-0.2 rounded text-[9px]">
                            📁 {getProjectName(task.projetoId)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-0.5 text-brand-rose-light" />
                            Prazo: {task.prazo}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3 border-t sm:border-t-0 border-brand-beige/20 pt-2 sm:pt-0 shrink-0">
                      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-extrabold uppercase tracking-wider ${
                        task.prioridade === 'Alta' 
                          ? 'bg-red-50 text-red-700 border border-red-100' 
                          : task.prioridade === 'Média'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {task.prioridade}
                      </span>
                      <button 
                        onClick={() => onOpenItemModal('tarefas', task.id)}
                        className="text-[10px] text-brand-rose hover:text-brand-dark font-bold hover:bg-brand-cream/50 px-2 py-1 rounded-lg border border-brand-beige/50 transition-all cursor-pointer"
                      >
                        Ver registro
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Active Projects */}
          <div className="bg-white border border-brand-beige/40 rounded-2xl shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-brand-rose" />
                <h3 className="font-bold text-brand-dark text-xs md:text-sm uppercase tracking-wider">Projetos em Andamento</h3>
              </div>
              <button 
                onClick={() => onViewChange('projetos')} 
                className="text-xs text-brand-rose hover:text-brand-dark flex items-center space-x-0.5 font-bold"
              >
                <span>Ver projetos</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => onOpenItemModal('projetos', project.id)}
                  className="p-4 bg-brand-offwhite/40 hover:bg-white border border-brand-beige/30 hover:border-brand-rose/30 rounded-2xl transition-all cursor-pointer flex flex-col justify-between hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] uppercase font-bold text-brand-rose tracking-widest bg-brand-cream/60 px-2 py-0.5 rounded-lg">
                        {project.categoria}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[8px] font-extrabold bg-brand-rose text-white uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-brand-dark text-xs truncate mb-1">
                      {project.nome}
                    </h4>
                    <p className="text-[10px] text-brand-muted line-clamp-2 leading-relaxed">
                      {project.objetivo}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-beige/20">
                    <span className="text-[9px] text-brand-rose-light block font-bold uppercase tracking-wider mb-0.5">Próxima Ação:</span>
                    <p className="text-[10px] text-brand-dark italic font-semibold truncate flex items-center">
                      <ChevronRight className="h-3.5 w-3.5 text-brand-rose shrink-0 mr-0.5" />
                      {project.proximaAcao || 'Nenhuma ação programada'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Guides & Manuals Quick Access */}
          <div className="bg-white border border-brand-beige/40 rounded-2xl shadow-sm p-4 md:p-5">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-4 w-4 text-brand-rose" />
              <h3 className="font-bold text-brand-dark text-xs md:text-sm uppercase tracking-wider">Guias Rápidos</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {[
                { id: 'pag-ugc', title: 'Manual de UGC', emoji: '🧴' },
                { id: 'pag-tiktok', title: 'Manual de TikTok', emoji: '📱' },
                { id: 'pag-storytelling', title: 'Storytelling Eficaz', emoji: '🎬' },
                { id: 'chk-gravacao', title: 'Checklist de Gravação', emoji: '🎙️' },
                { id: 'flux-producao', title: 'Fluxo de Produção', emoji: '🔄' },
                { id: 'sis-revisao', title: 'Auditoria & Revisão', emoji: '🔍' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onViewChange('paginaFixa');
                    onPageSelect(p.id);
                  }}
                  className="flex items-center space-x-2.5 p-3 bg-brand-cream/30 hover:bg-white border border-brand-beige/20 hover:border-brand-rose/30 rounded-2xl transition-all text-left group cursor-pointer"
                >
                  <span className="text-base shrink-0">{p.emoji}</span>
                  <span className="text-xs font-bold text-brand-muted group-hover:text-brand-rose transition-all truncate">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - METRICS & CONTENT STACK (Hidden on mobile if Visão Geral active) */}
        <div className={`space-y-6 ${activeTab === 'geral' ? 'hidden md:block' : 'block'}`}>
          
          {/* Metric Stats Widget - Luxury Premium Vibe */}
          <div className="bg-white border border-[#C98484]/40 rounded-3xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cream/50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="flex items-center justify-between mb-4.5 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose">
                Desempenho UGC & Redes
              </span>
              <TrendingUp className="h-4.5 w-4.5 text-brand-rose" />
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-brand-beige/20 relative z-10">
              <div className="bg-brand-offwhite/50 p-3 rounded-2xl border border-brand-beige/20">
                <span className="text-[9px] text-brand-rose-light block font-bold uppercase tracking-wide">Marcas Atendidas</span>
                <span className="text-xl font-bold tracking-tight text-brand-dark mt-0.5 block">{totalUgcProducts}</span>
              </div>
              <div className="bg-brand-offwhite/50 p-3 rounded-2xl border border-brand-beige/20">
                <span className="text-[9px] text-brand-rose-light block font-bold uppercase tracking-wide">Vídeos Publicados</span>
                <span className="text-xl font-bold tracking-tight text-brand-dark mt-0.5 block">{recordedVideos}</span>
              </div>
            </div>

            <div className="pt-4 space-y-4 relative z-10">
              <div className="flex justify-between items-center bg-brand-cream/40 p-3 rounded-2xl">
                <div>
                  <span className="text-[9px] text-brand-rose-light block font-bold uppercase tracking-wide">Visualizações Totais</span>
                  <span className="text-sm font-bold tracking-tight text-brand-dark flex items-center space-x-1 mt-0.5">
                    <span>📈 {totalViews.toLocaleString('pt-BR')} views</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-brand-rose-light block font-bold uppercase tracking-wide">Seguidores</span>
                  <span className="text-sm font-bold tracking-tight text-brand-rose block mt-0.5">25.4K</span>
                </div>
              </div>

              {bestVideo && (
                <div className="bg-white border border-brand-beige/40 rounded-2xl p-3 text-[10px] leading-relaxed">
                  <span className="font-extrabold text-[#C98484] block mb-1 uppercase tracking-wider text-[8px] flex items-center">
                    <Award className="h-3 w-3 mr-1 shrink-0 text-brand-gold" />
                    Conteúdo Destaque
                  </span>
                  <p className="truncate font-bold text-brand-dark text-xs">{bestVideo.titulo}</p>
                  <p className="text-[10px] text-brand-rose-light mt-1 font-medium flex items-center gap-2">
                    <span className="bg-brand-cream px-1.5 py-0.2 rounded">{bestVideo.visualizacoes.toLocaleString('pt-BR')} views</span>
                    <span>•</span>
                    <span className="bg-brand-cream px-1.5 py-0.2 rounded">{bestVideo.curtidas.toLocaleString('pt-BR')} likes</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ideas Stack Widget */}
          <div className="bg-white border border-brand-beige/40 rounded-2xl shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-brand-rose" />
                <h3 className="font-bold text-brand-dark text-xs md:text-sm uppercase tracking-wider">Ideias Ativas</h3>
              </div>
              <button 
                onClick={() => onViewChange('ideiasConteudo')} 
                className="text-xs text-brand-rose hover:text-brand-dark flex items-center space-x-0.5 font-bold"
              >
                <span>Ver banco</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {recentIdeas.length === 0 ? (
              <div className="text-center py-6 text-xs text-brand-rose-light">
                Nenhuma ideia pendente no momento.
              </div>
            ) : (
              <div className="space-y-3">
                {recentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => onOpenItemModal('ideiasConteudo', idea.id)}
                    className="p-3 bg-brand-offwhite/30 hover:bg-white border border-brand-beige/20 hover:border-brand-rose/20 rounded-2xl transition-all cursor-pointer flex items-start space-x-3 hover:shadow-sm"
                  >
                    <span className="text-sm mt-0.5">💡</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-brand-dark truncate">
                        {idea.titulo}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1.5 text-[9px] font-semibold">
                        <span className="bg-[#E8D9D5] text-[#2C2C2C] px-1.5 py-0.2 rounded-lg">
                          {idea.status}
                        </span>
                        <span className="text-brand-rose-light truncate max-w-[100px]">
                          {getProductName(idea.produtoId)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metas Widget */}
          <div className="bg-white border border-brand-beige/40 rounded-2xl shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-[#C98484]" />
                <h3 className="font-bold text-brand-dark text-xs md:text-sm uppercase tracking-wider">Metas Estratégicas</h3>
              </div>
              <button 
                onClick={() => onViewChange('metas')} 
                className="text-xs text-brand-rose hover:text-brand-dark flex items-center space-x-0.5 font-bold"
              >
                <span>Ver metas</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {activeMetas.length === 0 ? (
              <div className="text-center py-4 text-xs text-brand-rose-light">
                Nenhuma meta cadastrada.
              </div>
            ) : (
              <div className="space-y-3">
                {activeMetas.map((meta) => (
                  <div
                    key={meta.id}
                    onClick={() => onOpenItemModal('metas', meta.id)}
                    className="p-3.5 bg-brand-offwhite/30 hover:bg-white border border-brand-beige/20 hover:border-brand-rose/20 rounded-2xl cursor-pointer transition-all leading-tight"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-brand-dark line-clamp-2 pr-1">
                        {meta.meta}
                      </span>
                      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-extrabold uppercase tracking-wide shrink-0 ${
                        meta.prioridade === 'Alta' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {meta.prioridade}
                      </span>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between text-[10px] text-brand-rose-light font-medium">
                      <span className="bg-brand-cream/50 px-1.5 py-0.2 rounded-lg">📁 {getProjectName(meta.projetoId)}</span>
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-0.5" /> {meta.prazo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

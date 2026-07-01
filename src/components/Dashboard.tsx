/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  Play, 
  PlusCircle, 
  Tv, 
  AlertCircle,
  PenTool
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
    <div className="flex-grow bg-white overflow-y-auto select-none h-screen pb-24 font-sans text-gray-800 scrollbar-thin">
      {/* Cover Image Header */}
      <div className="h-40 md:h-56 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3 text-white">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white border-2 md:border-4 border-white/30 flex items-center justify-center text-2xl md:text-4xl shadow-xl shrink-0">
              👸
            </div>
            <div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-white border border-white/20">
                Workspace Central
              </span>
              <h1 className="text-lg md:text-3xl font-extrabold tracking-tight mt-1 drop-shadow-sm leading-tight">
                Sistema Operacional da Criadora
              </h1>
              <p className="text-[10px] md:text-xs text-white/90 font-medium flex items-center mt-0.5 md:mt-1">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {todayStr}
              </p>
            </div>
          </div>
          <div className="mt-2 md:mt-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 md:px-4 md:py-2.5 text-[10px] md:text-xs">
            <span className="font-semibold block text-white">Status da Criadora:</span>
            <span className="text-white/80">📚 Focada no ENEM | 🧴 Gravando portfólio UGC</span>
          </div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="px-4 md:px-8 mt-4 md:mt-6">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Ações Rápidas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => onAddNewItem('ideiasConteudo')}
            className="flex items-center justify-between p-3 bg-indigo-50/50 hover:md:bg-indigo-50 border border-indigo-100/80 rounded-xl text-left transition-all active:scale-95 duration-150 group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Lightbulb className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-indigo-900 leading-tight">Nova Ideia</h4>
                <p className="text-[10px] text-indigo-500">Adicionar ao banco</p>
              </div>
            </div>
            <PlusCircle className="h-4 w-4 text-indigo-400 group-hover:md:text-indigo-600 transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('tarefas')}
            className="flex items-center justify-between p-3 bg-emerald-50/50 hover:md:bg-emerald-50 border border-emerald-100/80 rounded-xl text-left transition-all active:scale-95 duration-150 group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <CheckSquare className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-emerald-900 leading-tight">Nova Tarefa</h4>
                <p className="text-[10px] text-emerald-500">Listar afazer</p>
              </div>
            </div>
            <PlusCircle className="h-4 w-4 text-emerald-400 group-hover:md:text-emerald-600 transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('roteiros')}
            className="flex items-center justify-between p-3 bg-purple-50/50 hover:md:bg-purple-50 border border-purple-100/80 rounded-xl text-left transition-all active:scale-95 duration-150 group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-lg bg-purple-100 text-purple-700">
                <PenTool className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-purple-900 leading-tight">Novo Roteiro</h4>
                <p className="text-[10px] text-purple-500">Escrever roteiro</p>
              </div>
            </div>
            <PlusCircle className="h-4 w-4 text-purple-400 group-hover:md:text-purple-600 transition-all shrink-0" />
          </button>

          <button 
            onClick={() => onAddNewItem('produtosUgc')}
            className="flex items-center justify-between p-3 bg-amber-50/50 hover:md:bg-amber-50 border border-amber-100/80 rounded-xl text-left transition-all active:scale-95 duration-150 group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-amber-900 leading-tight">Novo Produto UGC</h4>
                <p className="text-[10px] text-amber-500">Cadastrar marca</p>
              </div>
            </div>
            <PlusCircle className="h-4 w-4 text-amber-400 group-hover:md:text-amber-600 transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="px-4 md:px-8 mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Tasks & Active Projects (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Urgent Tasks */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4 text-indigo-600" />
                <h3 className="font-bold text-gray-950 text-sm">Tarefas de Hoje & Urgentes</h3>
              </div>
              <button 
                onClick={() => onViewChange('tarefas')} 
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5 font-medium"
              >
                <span>Ver todas</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {pendingTasks.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-gray-100 rounded-xl">
                <p className="text-xs text-gray-400 font-medium">✨ Nenhuma tarefa urgente pendente! Parabéns!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-3 bg-gray-50/70 border border-gray-100 rounded-xl hover:border-gray-200 transition-all select-text"
                  >
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <input
                        type="checkbox"
                        checked={task.status === 'Concluída'}
                        onChange={() => onToggleTaskStatus(task.id)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div>
                        <p className={`text-xs font-semibold ${task.status === 'Concluída' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {task.tarefa}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] text-gray-400 font-medium">
                            📁 {getProjectName(task.projetoId)}
                          </span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-0.5 text-gray-300" />
                            Prazo: {task.prazo}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        task.prioridade === 'Alta' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                          : task.prioridade === 'Média'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {task.prioridade}
                      </span>
                      <button 
                        onClick={() => onOpenItemModal('tarefas', task.id)}
                        className="text-[10px] text-gray-400 hover:text-indigo-600 bg-white hover:bg-gray-100 px-2 py-1 rounded border border-gray-100 font-medium transition-all"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Active Projects */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-rose-500" />
                <h3 className="font-bold text-gray-950 text-sm">Status dos Projetos Ativos</h3>
              </div>
              <button 
                onClick={() => onViewChange('projetos')} 
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5 font-medium"
              >
                <span>Mapear projetos</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => onOpenItemModal('projetos', project.id)}
                  className="p-3.5 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                        {project.categoria}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {project.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-xs truncate mb-1">
                      {project.nome}
                    </h4>
                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                      {project.objetivo}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider mb-0.5">Próxima Ação:</span>
                    <p className="text-[10px] text-gray-700 italic font-medium truncate">
                      👉 {project.proximaAcao || 'Sem ação cadastrada'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Guides & Manuals Quick Access */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-4 w-4 text-purple-600" />
              <h3 className="font-bold text-gray-950 text-sm">Biblioteca de Sucesso (Acesso Rápido)</h3>
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
                  className="flex items-center space-x-2 p-2.5 bg-gray-50 hover:bg-indigo-50/50 border border-gray-100 rounded-xl transition-all text-left group cursor-pointer"
                >
                  <span className="text-lg shrink-0">{p.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-900 transition-all truncate">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - UGC Metrics & Ideas Stack & Active Metas */}
        <div className="space-y-6">
          
          {/* Metric Stats Widget */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 rounded-2xl text-white p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
                Métricas UGC & Redes
              </span>
              <TrendingUp className="h-4 w-4 text-indigo-300" />
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] text-indigo-200 block font-medium">Marcas / Produtos</span>
                <span className="text-xl font-bold tracking-tight">{totalUgcProducts}</span>
              </div>
              <div>
                <span className="text-[10px] text-indigo-200 block font-medium">Vídeos Publicados</span>
                <span className="text-xl font-bold tracking-tight">{recordedVideos}</span>
              </div>
            </div>

            <div className="pt-3.5 space-y-2">
              <div>
                <span className="text-[10px] text-indigo-200 block font-medium">Total de Visualizações</span>
                <span className="text-sm font-bold tracking-tight text-white flex items-center space-x-1">
                  <span>📈 {totalViews.toLocaleString('pt-BR')} views</span>
                </span>
              </div>

              {bestVideo && (
                <div className="mt-2 bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] text-indigo-100 leading-relaxed">
                  <span className="font-semibold text-white block mb-0.5">🏆 Melhor Desempenho:</span>
                  <p className="truncate font-medium">{bestVideo.titulo}</p>
                  <p className="text-[9px] text-indigo-200/80 mt-0.5">
                    {bestVideo.visualizacoes.toLocaleString('pt-BR')} views • {bestVideo.curtidas.toLocaleString('pt-BR')} likes
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ideas Stack Widget */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="font-bold text-gray-950 text-sm">Produção de Conteúdo</h3>
              </div>
              <button 
                onClick={() => onViewChange('ideiasConteudo')} 
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5 font-medium"
              >
                <span>Banco de ideias</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {recentIdeas.length === 0 ? (
              <div className="text-center py-6 text-xs text-gray-400">
                Nenhuma ideia cadastrada. Adicione uma nova ideia para começar a produzir!
              </div>
            ) : (
              <div className="space-y-3">
                {recentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => onOpenItemModal('ideiasConteudo', idea.id)}
                    className="p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-all cursor-pointer flex items-start space-x-2.5"
                  >
                    <span className="text-sm mt-0.5">💡</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {idea.titulo}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded">
                          {idea.status}
                        </span>
                        <span className="text-[9px] text-gray-400">
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
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-rose-500" />
                <h3 className="font-bold text-gray-950 text-sm">Próximas Metas</h3>
              </div>
              <button 
                onClick={() => onViewChange('metas')} 
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5 font-medium"
              >
                <span>Listar Metas</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {activeMetas.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-400">
                Nenhuma meta cadastrada no momento.
              </div>
            ) : (
              <div className="space-y-3">
                {activeMetas.map((meta) => (
                  <div
                    key={meta.id}
                    onClick={() => onOpenItemModal('metas', meta.id)}
                    className="p-3 bg-gray-50/50 border border-gray-100 hover:border-gray-200 rounded-xl cursor-pointer transition-all leading-tight"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-gray-800 line-clamp-2 pr-1">
                        {meta.meta}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold shrink-0 ${
                        meta.prioridade === 'Alta' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {meta.prioridade}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[9px] text-gray-400 font-medium">
                      <span>📁 {getProjectName(meta.projetoId)}</span>
                      <span>📅 Prazo: {meta.prazo}</span>
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

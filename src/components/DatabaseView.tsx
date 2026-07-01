/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Kanban as KanbanIcon, 
  LayoutGrid, 
  Calendar as CalendarIcon, 
  List, 
  Search, 
  Plus, 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { WorkspaceState } from '../types';

interface DatabaseViewProps {
  dbId: string; // e.g. 'projetos', 'produtosUgc', etc.
  state: WorkspaceState;
  onOpenItemModal: (dbId: string, itemId: string) => void;
  onAddNewItem: (dbId: string) => void;
}

type DatabaseViewType = 'tabela' | 'galeria' | 'kanban' | 'calendario' | 'lista';

export default function DatabaseView({
  dbId,
  state,
  onOpenItemModal,
  onAddNewItem
}: DatabaseViewProps) {
  const [viewType, setViewType] = useState<DatabaseViewType>('tabela');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todos');

  // Database metadata
  const dbInfo = useMemo(() => {
    switch (dbId) {
      case 'projetos':
        return { name: 'Projetos', emoji: '📁', desc: 'Sua central de projetos e iniciativas estratégicas.' };
      case 'produtosUgc':
        return { name: 'Produtos UGC', emoji: '🧴', desc: 'Seu catálogo de produtos físicos e infoprodutos cadastrados.' };
      case 'ideiasConteudo':
        return { name: 'Ideias de Conteúdo', emoji: '💡', desc: 'Seu banco dinâmico de inspirações e temas de vídeos.' };
      case 'roteiros':
        return { name: 'Roteiros', emoji: '✍️', desc: 'Roteiros estruturados prontos para gravação.' };
      case 'ganchos':
        return { name: 'Banco de Ganchos', emoji: '🔑', desc: 'Banco permanente de ganchos virais e chamadas de alta retenção.' };
      case 'referencias':
        return { name: 'Referências', emoji: '🎯', desc: 'Inspirações de vídeos, iluminações e ângulos de câmera colecionados.' };
      case 'bancoCenas':
        return { name: 'Banco de Cenas', emoji: '🎬', desc: 'Catálogo de takes estéticos e B-roll prontos para gravação.' };
      case 'psicologiaConsumidor':
        return { name: 'Psicologia do Consumidor', emoji: '🧠', desc: 'Dores, medos, objeções e gatilhos mentais do seu público-alvo.' };
      case 'estudos':
        return { name: 'Estudos', emoji: '📚', desc: 'Seus resumos de cursos, conceitos de marketing e insights práticos.' };
      case 'leituras':
        return { name: 'Leituras', emoji: '📖', desc: 'Sua estante virtual de absorção e síntese ativa de livros.' };
      case 'videosPublicados':
        return { name: 'Vídeos Publicados', emoji: '📊', desc: 'Histórico de posts com análise detalhada de desempenho e lições.' };
      case 'metas':
        return { name: 'Metas', emoji: '🏁', desc: 'Seus alvos de longo e médio prazo com rastreadores de progresso.' };
      case 'tarefas':
        return { name: 'Tarefas', emoji: '✅', desc: 'Seu checklist de afazeres diários conectado aos projetos.' };
      default:
        return { name: 'Base de Dados', emoji: '🗄️', desc: '' };
    }
  }, [dbId]);

  // Retrieve raw items array from state
  const items = useMemo(() => {
    return (state[dbId as keyof WorkspaceState] as any[]) || [];
  }, [state, dbId]);

  // Extract available filter values
  const filterOptions = useMemo(() => {
    const statuses = new Set<string>();
    const priorities = new Set<string>();
    items.forEach(item => {
      if (item.status) statuses.add(item.status);
      if (item.statusLeitura) statuses.add(item.statusLeitura);
      if (item.statusLeitura === undefined && item.status === undefined && item.prioridade === undefined) {
        // Fallback for objects that don't have standard status
      }
      if (item.prioridade) priorities.add(item.prioridade);
    });
    return {
      statuses: ['Todos', ...Array.from(statuses)],
      priorities: ['Todos', ...Array.from(priorities)]
    };
  }, [items]);

  // Filter and Search items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search matches
      const searchStr = JSON.stringify(item).toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());

      // Status matches
      const itemStatus = item.status || item.statusLeitura || '';
      const matchesStatus = statusFilter === 'Todos' || itemStatus === statusFilter;

      // Priority matches
      const matchesPriority = priorityFilter === 'Todos' || item.prioridade === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [items, searchTerm, statusFilter, priorityFilter]);

  // Helpers to get relations
  const getProjectName = (projId: string) => {
    return state.projetos.find(p => p.id === projId)?.nome || '-';
  };

  const getProductName = (prodId: string) => {
    return state.produtosUgc.find(p => p.id === prodId)?.nome || '-';
  };

  const getLeituraName = (bookId: string) => {
    return state.leituras.find(l => l.id === bookId)?.livro || '-';
  };

  // Drag-and-drop simulated lanes for Kanban
  const kanbanLanes = useMemo(() => {
    if (dbId === 'tarefas') {
      return ['Pendente', 'Em andamento', 'Concluída'];
    }
    if (dbId === 'ideiasConteudo') {
      return ['Ideia', 'Roteirizando', 'Gravando', 'Editando', 'Pronto', 'Postado'];
    }
    if (dbId === 'roteiros') {
      return ['Rascunho', 'Pronto para Gravar', 'Gravado', 'Editando', 'Concluído'];
    }
    if (dbId === 'projetos') {
      return ['Planejado', 'Em andamento', 'Pausado', 'Concluído'];
    }
    if (dbId === 'produtosUgc') {
      return ['Disponível', 'Gravando', 'Concluído', 'Aguardando Envio'];
    }
    if (dbId === 'metas') {
      return ['Não iniciada', 'Em andamento', 'Concluída'];
    }
    // Default lanes if no status
    return ['Ativos'];
  }, [dbId]);

  // Group items by Kanban lanes
  const groupedKanbanItems = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    kanbanLanes.forEach(lane => { groups[lane] = []; });

    filteredItems.forEach(item => {
      const laneKey = item.status || item.statusLeitura || 'Ativos';
      if (groups[laneKey]) {
        groups[laneKey].push(item);
      } else if (kanbanLanes.includes('Ativos')) {
        groups['Ativos'].push(item);
      } else {
        // Fallback
        const defaultLane = kanbanLanes[0];
        if (groups[defaultLane]) groups[defaultLane].push(item);
      }
    });
    return groups;
  }, [filteredItems, kanbanLanes]);

  // Render correct badge for priority
  const renderPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    const colors = {
      'Alta': 'bg-rose-50 text-rose-700 border-rose-100',
      'Média': 'bg-amber-50 text-amber-700 border-amber-100',
      'Baixa': 'bg-blue-50 text-blue-700 border-blue-100'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[priority as keyof typeof colors] || 'bg-gray-50 text-gray-700'}`}>
        {priority}
      </span>
    );
  };

  // Table View Renderer
  const renderTable = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 text-xs font-medium border border-dashed border-gray-100 rounded-2xl">
          Nenhum registro encontrado correspondente aos filtros.
        </div>
      );
    }

    // Dynamic headers based on dbId
    let columns: { key: string; label: string; render?: (val: any, item: any) => React.ReactNode }[] = [];

    switch (dbId) {
      case 'projetos':
        columns = [
          { key: 'nome', label: 'Nome do Projeto', render: (val) => <span className="font-bold text-gray-900">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'objetivo', label: 'Objetivo Principal' },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'status', label: 'Status' },
          { key: 'dataInicio', label: 'Data Início' },
          { key: 'proximaAcao', label: 'Próxima Ação' },
        ];
        break;
      case 'produtosUgc':
        columns = [
          { key: 'nome', label: 'Produto', render: (val, item) => <span className="font-bold text-gray-900">{item.fotos} {val}</span> },
          { key: 'marca', label: 'Marca' },
          { key: 'categoria', label: 'Categoria' },
          { key: 'jaGravei', label: 'Já gravei?', render: (val) => val ? '✅ Sim' : '❌ Não' },
          { key: 'videosGravados', label: 'Vídeos Gravados' },
          { key: 'status', label: 'Status' },
          { key: 'dataGravacao', label: 'Gravação' },
        ];
        break;
      case 'ideiasConteudo':
        columns = [
          { key: 'titulo', label: 'Ideia', render: (val) => <span className="font-semibold text-gray-900">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'produtoId', label: 'Produto Relacionado', render: (val) => getProductName(val) },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'formato', label: 'Formato' },
          { key: 'status', label: 'Status' },
          { key: 'dificuldade', label: 'Dificuldade' },
        ];
        break;
      case 'roteiros':
        columns = [
          { key: 'titulo', label: 'Roteiro', render: (val) => <span className="font-bold text-indigo-950">{val}</span> },
          { key: 'produtoId', label: 'Produto', render: (val) => getProductName(val) },
          { key: 'tipo', label: 'Tipo' },
          { key: 'tempo', label: 'Duração' },
          { key: 'status', label: 'Status' },
          { key: 'videoGravado', label: 'Gravado?', render: (val) => val ? '🎥 Sim' : '❌ Não' },
        ];
        break;
      case 'ganchos':
        columns = [
          { key: 'gancho', label: 'Gancho', render: (val) => <span className="font-medium italic text-gray-900 select-text">"{val}"</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'tipoEmocao', label: 'Emoção Estimulada' },
          { key: 'objetivo', label: 'Objetivo' },
          { key: 'retencaoEsperada', label: 'Retenção' },
          { key: 'jaUtilizei', label: 'Utilizado?', render: (val) => val ? '✅ Sim' : '❌ Não' },
        ];
        break;
      case 'referencias':
        columns = [
          { key: 'titulo', label: 'Título', render: (val) => <span className="font-bold text-gray-900">{val}</span> },
          { key: 'criador', label: 'Criador' },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'categoria', label: 'Categoria' },
          { key: 'link', label: 'Link', render: (val) => <a href={val} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center space-x-1" onClick={(e) => e.stopPropagation()}><span className="text-[10px]">Abrir</span> <ExternalLink className="h-3 w-3 inline" /></a> },
        ];
        break;
      case 'bancoCenas':
        columns = [
          { key: 'nome', label: 'Nome da Cena', render: (val) => <span className="font-semibold text-gray-900">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'produtoId', label: 'Produto', render: (val) => getProductName(val) },
          { key: 'local', label: 'Local de Gravação' },
          { key: 'equipamento', label: 'Equipamento' },
        ];
        break;
      case 'psicologiaConsumidor':
        columns = [
          { key: 'desejo', label: 'Desejo Profundo', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
          { key: 'medo', label: 'Medo Oculto' },
          { key: 'problema', label: 'Problema Comum' },
          { key: 'gatilhoMental', label: 'Gatilho Mental Forte' },
          { key: 'necessidade', label: 'Necessidade Básica' },
        ];
        break;
      case 'estudos':
        columns = [
          { key: 'tema', label: 'Tema de Estudo', render: (val) => <span className="font-bold text-gray-900">{val}</span> },
          { key: 'curso', label: 'Curso/Mentoria' },
          { key: 'autor', label: 'Autor/Especialista' },
          { key: 'status', label: 'Status' },
        ];
        break;
      case 'leituras':
        columns = [
          { key: 'livro', label: 'Título do Livro', render: (val) => <span className="font-extrabold text-gray-950">📖 {val}</span> },
          { key: 'autor', label: 'Autor' },
          { key: 'tema', label: 'Tema Principal' },
          { key: 'statusLeitura', label: 'Status' },
        ];
        break;
      case 'videosPublicados':
        columns = [
          { key: 'titulo', label: 'Título do Post', render: (val) => <span className="font-bold text-gray-900">{val}</span> },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'produtoId', label: 'Produto', render: (val) => getProductName(val) },
          { key: 'visualizacoes', label: 'Views', render: (val) => <span className="font-bold text-indigo-700">{val?.toLocaleString('pt-BR')}</span> },
          { key: 'curtidas', label: 'Curtidas', render: (val) => val?.toLocaleString('pt-BR') },
          { key: 'salvamentos', label: 'Salvos', render: (val) => val?.toLocaleString('pt-BR') },
        ];
        break;
      case 'metas':
        columns = [
          { key: 'meta', label: 'Meta', render: (val) => <span className="font-bold text-gray-900">{val}</span> },
          { key: 'projetoId', label: 'Projeto Relacionado', render: (val) => getProjectName(val) },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'status', label: 'Status' },
          { key: 'prazo', label: 'Prazo Limite' },
        ];
        break;
      case 'tarefas':
        columns = [
          { key: 'tarefa', label: 'Tarefa', render: (val, item) => <span className={`font-semibold ${item.status === 'Concluída' ? 'line-through text-gray-400' : 'text-gray-950'}`}>{val}</span> },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'responsavel', label: 'Responsável' },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'prazo', label: 'Prazo' },
          { key: 'status', label: 'Status' },
        ];
        break;
      default:
        columns = [{ key: 'id', label: 'ID' }];
    }

    return (
      <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-400 select-none">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onOpenItemModal(dbId, item.id)}
                className="hover:bg-indigo-50/25 transition-all cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(item[col.key], item) : item[col.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Gallery View Renderer
  const renderGallery = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 text-xs font-medium">
          Nenhum registro encontrado correspondente aos filtros.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onOpenItemModal(dbId, item.id)}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-400 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between bg-white group"
            >
              <div>
                {/* Header/Cover aspect in Gallery */}
                <div className="h-28 w-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center border-b border-gray-100 relative">
                  <span className="text-4xl filter drop-shadow">
                    {item.fotos || (dbId === 'produtosUgc' ? '🧴' : dbId === 'leituras' ? '📖' : '💡')}
                  </span>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {item.prioridade && renderPriorityBadge(item.prioridade)}
                    {(item.status || item.statusLeitura) && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/80 border border-gray-200 text-gray-700">
                        {item.status || item.statusLeitura}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-extrabold text-gray-900 text-sm tracking-tight leading-snug group-hover:text-indigo-600 transition-all mb-1 truncate">
                    {item.nome || item.titulo || item.livro || item.meta || item.tarefa || item.desejo}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mb-2 uppercase tracking-wide">
                    {item.marca || item.criador || item.autor || getProjectName(item.projetoId) || item.categoria}
                  </p>
                  
                  {/* Item Description Snippet */}
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.descricao || item.objetivo || item.resumo || item.medo || item.gancho || 'Clique para ver detalhes do item.'}
                  </p>
                </div>
              </div>

              {/* Bottom tag actions */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-[10px] text-gray-400">
                <span className="font-semibold">{dbInfo.name}</span>
                <span className="flex items-center text-indigo-600 hover:underline">
                  Ver Cartão <ChevronRight className="h-3 w-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Kanban View Renderer
  const renderKanban = () => {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4 select-none">
        {kanbanLanes.map((lane) => {
          const laneItems = groupedKanbanItems[lane] || [];
          return (
            <div key={lane} className="w-72 shrink-0 bg-gray-50 rounded-2xl p-3 flex flex-col h-[550px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  <h4 className="font-bold text-gray-800 text-xs">{lane}</h4>
                </div>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full">
                  {laneItems.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {laneItems.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl text-[10px] text-gray-400 bg-white">
                    Arraste ou crie cartões aqui
                  </div>
                ) : (
                  laneItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onOpenItemModal(dbId, item.id)}
                      className="p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 cursor-pointer shadow-sm hover:shadow transition-all space-y-2"
                    >
                      <h5 className="font-bold text-gray-900 text-xs leading-snug">
                        {item.nome || item.titulo || item.meta || item.tarefa}
                      </h5>
                      <p className="text-[10px] text-gray-400 leading-tight">
                        {item.categoria || item.marca || getProjectName(item.projetoId) || item.plataforma}
                      </p>

                      {item.prioridade && (
                        <div className="flex items-center justify-between pt-1.5 border-t border-gray-50">
                          {renderPriorityBadge(item.prioridade)}
                          <span className="text-[9px] text-gray-400">
                            {item.prazo || item.tempo || 'Sem prazo'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Calendar View Renderer
  const renderCalendar = () => {
    // Collect all date-associated items
    const datedItems = filteredItems.filter(item => item.dataInicio || item.dataGravacao || item.dataPostagem || item.prazo || item.data);
    
    if (datedItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 text-xs font-medium border border-dashed border-gray-100 rounded-2xl bg-white">
          Nenhum registro possui data preenchida nesta base para exibir no calendário.
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h4 className="font-bold text-gray-900 text-sm">Cronograma Geral de Datas</h4>
          <span className="text-xs text-gray-400">Exibindo itens agendados</span>
        </div>

        <div className="space-y-2.5">
          {datedItems.map((item) => {
            const dateVal = item.dataInicio || item.dataGravacao || item.dataPostagem || item.prazo || item.data;
            return (
              <div
                key={item.id}
                onClick={() => onOpenItemModal(dbId, item.id)}
                className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-indigo-50/30 border border-gray-100 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs">{item.nome || item.titulo || item.meta || item.tarefa}</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {item.categoria || getProjectName(item.projetoId)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    📅 {dateVal}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // List View Renderer
  const renderList = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 text-xs font-medium">
          Nenhum registro encontrado correspondente aos filtros.
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenItemModal(dbId, item.id)}
            className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 cursor-pointer transition-all hover:shadow-sm"
          >
            <div className="flex items-center space-x-3 truncate">
              <span className="text-lg shrink-0">
                {item.fotos || (dbId === 'ganchos' ? '🔑' : dbId === 'referencias' ? '🎯' : '📄')}
              </span>
              <div className="truncate">
                <h5 className="font-bold text-gray-900 text-xs truncate">
                  {item.nome || item.titulo || item.livro || item.meta || item.tarefa || item.gancho || item.desejo}
                </h5>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate leading-tight">
                  {item.categoria || item.marca || getProjectName(item.projetoId) || item.medo}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {item.prioridade && renderPriorityBadge(item.prioridade)}
              <span className={`px-2 py-0.5 rounded text-[9px] font-semibold ${
                item.status === 'Concluído' || item.statusLeitura === 'Concluído'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-indigo-50 text-indigo-700'
              }`}>
                {item.status || item.statusLeitura || 'Ativo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-grow bg-white overflow-y-auto h-screen pb-24 px-8 select-none font-sans">
      {/* DB Header section */}
      <div className="py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 shrink-0">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {dbInfo.emoji}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {dbInfo.name}
            </h1>
            <p className="text-xs text-gray-400 mt-1 leading-normal max-w-xl">
              {dbInfo.desc}
            </p>
          </div>
        </div>

        {/* Quick Database Add Button */}
        <button
          onClick={() => onAddNewItem(dbId)}
          className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.8 rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Item</span>
        </button>
      </div>

      {/* Navigation Filter / Views Panel */}
      <div className="my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 shrink-0">
        
        {/* Toggle Visual Styles */}
        <div className="flex items-center space-x-1">
          {[
            { type: 'tabela', label: 'Tabela', icon: Table },
            { type: 'galeria', label: 'Galeria', icon: LayoutGrid },
            { type: 'kanban', label: 'Kanban', icon: KanbanIcon },
            { type: 'calendario', label: 'Calendário', icon: CalendarIcon },
            { type: 'lista', label: 'Lista', icon: List },
          ].map((v) => {
            const Icon = v.icon;
            const isSelected = viewType === v.type;
            return (
              <button
                key={v.type}
                onClick={() => setViewType(v.type as DatabaseViewType)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-indigo-700 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Local Search and Filter Panel */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar nesta base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all w-44"
            />
          </div>

          {/* Render Filters dynamically if they have more options */}
          {filterOptions.statuses.length > 1 && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg px-2 py-1.2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Todos">Status (Todos)</option>
              {filterOptions.statuses.filter(s => s !== 'Todos').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}

          {filterOptions.priorities.length > 1 && (
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg px-2 py-1.2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Todos">Prioridade (Todos)</option>
              {filterOptions.priorities.filter(p => p !== 'Todos').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Main View Area */}
      <div className="mt-4">
        {viewType === 'tabela' && renderTable()}
        {viewType === 'galeria' && renderGallery()}
        {viewType === 'kanban' && renderKanban()}
        {viewType === 'calendario' && renderCalendar()}
        {viewType === 'lista' && renderList()}
      </div>
    </div>
  );
}

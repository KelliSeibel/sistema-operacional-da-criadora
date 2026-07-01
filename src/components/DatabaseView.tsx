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
      'Alta': 'bg-brand-rose/10 text-brand-rose border-brand-rose/20',
      'Média': 'bg-[#D6A6A6]/10 text-brand-dark border-[#D6A6A6]/20',
      'Baixa': 'bg-brand-cream text-brand-rose-light border-brand-beige/30'
    };
    return (
      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${colors[priority as keyof typeof colors] || 'bg-brand-cream text-brand-dark'}`}>
        {priority}
      </span>
    );
  };

  // Render status badge helper
  const renderStatusBadge = (status?: string) => {
    if (!status) return null;
    const isCompleted = ['Concluído', 'Concluída', 'Postado', 'Pronto'].includes(status);
    return (
      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${
        isCompleted 
          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
          : 'bg-brand-cream text-brand-rose border-brand-beige/30'
      }`}>
        {status}
      </span>
    );
  };

  // Table View Renderer
  const renderTable = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-brand-rose-light text-xs font-semibold border border-dashed border-brand-beige/40 rounded-2xl bg-white">
          Nenhum registro encontrado correspondente aos filtros aplicados.
        </div>
      );
    }

    // Dynamic headers based on dbId
    let columns: { key: string; label: string; render?: (val: any, item: any) => React.ReactNode }[] = [];

    switch (dbId) {
      case 'projetos':
        columns = [
          { key: 'nome', label: 'Nome do Projeto', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'objetivo', label: 'Objetivo Principal' },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
          { key: 'dataInicio', label: 'Data Início' },
          { key: 'proximaAcao', label: 'Próxima Ação' },
        ];
        break;
      case 'produtosUgc':
        columns = [
          { key: 'nome', label: 'Produto', render: (val, item) => <span className="font-bold text-brand-dark">{item.fotos} {val}</span> },
          { key: 'marca', label: 'Marca' },
          { key: 'categoria', label: 'Categoria' },
          { key: 'jaGravei', label: 'Já gravei?', render: (val) => val ? '✅ Sim' : '❌ Não' },
          { key: 'videosGravados', label: 'Vídeos Gravados' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
          { key: 'dataGravacao', label: 'Gravação' },
        ];
        break;
      case 'ideiasConteudo':
        columns = [
          { key: 'titulo', label: 'Ideia', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'produtoId', label: 'Produto Relacionado', render: (val) => getProductName(val) },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'formato', label: 'Formato' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
          { key: 'dificuldade', label: 'Dificuldade' },
        ];
        break;
      case 'roteiros':
        columns = [
          { key: 'titulo', label: 'Roteiro', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'produtoId', label: 'Produto', render: (val) => getProductName(val) },
          { key: 'tipo', label: 'Tipo' },
          { key: 'tempo', label: 'Duração' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
          { key: 'videoGravado', label: 'Gravado?', render: (val) => val ? '🎥 Sim' : '❌ Não' },
        ];
        break;
      case 'ganchos':
        columns = [
          { key: 'gancho', label: 'Gancho', render: (val) => <span className="font-medium italic text-brand-dark select-text">"{val}"</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'tipoEmocao', label: 'Emoção Estimulada' },
          { key: 'objetivo', label: 'Objetivo' },
          { key: 'retencaoEsperada', label: 'Retenção' },
          { key: 'jaUtilizei', label: 'Utilizado?', render: (val) => val ? '✅ Sim' : '❌ Não' },
        ];
        break;
      case 'referencias':
        columns = [
          { key: 'titulo', label: 'Título', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'criador', label: 'Criador' },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'categoria', label: 'Categoria' },
          { key: 'link', label: 'Link', render: (val) => <a href={val} target="_blank" rel="noopener noreferrer" className="text-brand-rose hover:underline flex items-center space-x-1 font-bold" onClick={(e) => e.stopPropagation()}><span className="text-[10px]">Abrir</span> <ExternalLink className="h-3 w-3 inline" /></a> },
        ];
        break;
      case 'bancoCenas':
        columns = [
          { key: 'titulo', label: 'Nome da Cena', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'linkVideo', label: 'Link do Vídeo', render: (val) => val ? <a href={val} target="_blank" rel="noopener noreferrer" className="text-brand-rose hover:underline flex items-center space-x-1 font-bold" onClick={(e) => e.stopPropagation()}><span className="text-[10px]">Vídeo</span> <ExternalLink className="h-3 w-3 inline" /></a> : '-' },
          { key: 'estetica', label: 'Estética' },
          { key: 'equipamento', label: 'Equipamento' },
        ];
        break;
      case 'psicologiaConsumidor':
        columns = [
          { key: 'desejo', label: 'Desejo Profundo', render: (val) => <span className="font-medium text-brand-dark">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'porQueCompra', label: 'Por que compra?' },
          { key: 'comoAtingir', label: 'Como atingir?' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
        ];
        break;
      case 'estudos':
        columns = [
          { key: 'tema', label: 'Tema de Estudo', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'categoria', label: 'Categoria' },
          { key: 'conceitoChave', label: 'Conceito Chave' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
        ];
        break;
      case 'leituras':
        columns = [
          { key: 'livro', label: 'Título do Livro', render: (val) => <span className="font-extrabold text-brand-dark">📖 {val}</span> },
          { key: 'autor', label: 'Autor' },
          { key: 'tema', label: 'Tema Principal' },
          { key: 'statusLeitura', label: 'Status', render: (val) => renderStatusBadge(val) },
        ];
        break;
      case 'videosPublicados':
        columns = [
          { key: 'titulo', label: 'Título do Post', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'plataforma', label: 'Plataforma' },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'produtoId', label: 'Produto', render: (val) => getProductName(val) },
          { key: 'visualizacoes', label: 'Views', render: (val) => <span className="font-extrabold text-brand-rose">{val?.toLocaleString('pt-BR')}</span> },
          { key: 'curtidas', label: 'Curtidas', render: (val) => val?.toLocaleString('pt-BR') },
          { key: 'salvamentos', label: 'Salvos', render: (val) => val?.toLocaleString('pt-BR') },
        ];
        break;
      case 'metas':
        columns = [
          { key: 'meta', label: 'Meta', render: (val) => <span className="font-bold text-brand-dark">{val}</span> },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
          { key: 'prazo', label: 'Prazo Limite' },
        ];
        break;
      case 'tarefas':
        columns = [
          { key: 'tarefa', label: 'Tarefa', render: (val, item) => <span className={`font-bold ${item.status === 'Concluída' ? 'line-through text-brand-rose-light opacity-60' : 'text-brand-dark'}`}>{val}</span> },
          { key: 'projetoId', label: 'Projeto', render: (val) => getProjectName(val) },
          { key: 'responsavel', label: 'Responsável' },
          { key: 'prioridade', label: 'Prioridade', render: (val) => renderPriorityBadge(val) },
          { key: 'prazo', label: 'Prazo' },
          { key: 'status', label: 'Status', render: (val) => renderStatusBadge(val) },
        ];
        break;
      default:
        columns = [{ key: 'id', label: 'ID' }];
    }

    return (
      <div className="space-y-4">
        {/* Table layout for desktop */}
        <div className="hidden md:block overflow-x-auto border border-brand-beige/30 rounded-2xl shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-brand-cream/40 border-b border-brand-beige/20 text-brand-rose-light select-none">
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-4.5 font-bold uppercase tracking-wider text-[10px]">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-beige/10">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onOpenItemModal(dbId, item.id)}
                  className="hover:bg-brand-cream/20 transition-all cursor-pointer"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-brand-dark/90 font-medium">
                      {col.render ? col.render(item[col.key], item) : item[col.key] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for mobile */}
        <div className="block md:hidden space-y-3 px-1">
          {filteredItems.map((item) => {
            const cardTitle = item.nome || item.titulo || item.livro || item.meta || item.tarefa || item.gancho || item.desejo || 'Item sem nome';
            return (
              <div 
                key={item.id}
                onClick={() => onOpenItemModal(dbId, item.id)}
                className="bg-white border border-brand-beige/30 rounded-2xl p-4 shadow-sm active:scale-[0.99] active:bg-brand-cream/10 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2.5 border-b border-brand-beige/10 pb-2">
                  <span className="text-[10px] font-extrabold text-brand-rose uppercase tracking-widest">
                    {dbInfo.name}
                  </span>
                  {item.prioridade && renderPriorityBadge(item.prioridade)}
                </div>
                
                <h4 className="font-bold text-brand-dark text-sm mb-2.5 leading-snug">
                  {cardTitle}
                </h4>

                <div className="space-y-1.5">
                  {columns.map((col) => {
                    // Skip key titles displayed prominently
                    if (['prioridade', 'nome', 'titulo', 'livro', 'meta', 'tarefa', 'gancho', 'desejo'].includes(col.key)) return null;
                    const label = col.label;
                    const val = item[col.key];
                    if (val === undefined || val === '') return null;
                    return (
                      <div key={col.key} className="flex justify-between items-baseline gap-2 text-[11px]">
                        <span className="font-bold text-brand-rose-light shrink-0">{label}:</span>
                        <span className="text-brand-dark text-right truncate max-w-[70%] font-semibold">
                          {col.render ? col.render(val, item) : val}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-brand-beige/10 flex justify-end text-[10px] text-brand-rose font-bold items-center">
                  <span>Abrir Registro</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Gallery View Renderer
  const renderGallery = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-brand-rose-light text-xs font-semibold border border-dashed border-brand-beige/40 rounded-2xl bg-white">
          Nenhum registro encontrado correspondente aos filtros aplicados.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 px-1 md:px-0">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onOpenItemModal(dbId, item.id)}
              className="border border-brand-beige/30 rounded-2xl overflow-hidden hover:border-brand-rose/60 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between bg-white group"
            >
              <div>
                <div className="h-28 w-full bg-gradient-to-tr from-brand-cream/40 via-brand-offwhite to-brand-cream/20 flex items-center justify-center border-b border-brand-beige/20 relative">
                  <span className="text-4xl filter drop-shadow">
                    {item.fotos || (dbId === 'produtosUgc' ? '🧴' : dbId === 'leituras' ? '📖' : '💡')}
                  </span>
                  <div className="absolute top-3 right-3 flex space-x-1.5">
                    {item.prioridade && renderPriorityBadge(item.prioridade)}
                    {(item.status || item.statusLeitura) && (
                      <span className="px-2 py-0.5 rounded-lg text-[8px] font-bold bg-white/90 border border-brand-beige/20 text-brand-dark">
                        {item.status || item.statusLeitura}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4.5">
                  <h4 className="font-bold text-brand-dark text-sm tracking-tight leading-snug group-hover:text-brand-rose transition-all mb-1 truncate">
                    {item.nome || item.titulo || item.livro || item.meta || item.tarefa || item.desejo}
                  </h4>
                  <p className="text-[10px] text-brand-rose-light font-bold mb-2 uppercase tracking-widest">
                    {item.marca || item.criador || item.autor || getProjectName(item.projetoId) || item.categoria}
                  </p>
                  
                  <p className="text-xs text-brand-dark/70 line-clamp-2 leading-relaxed font-medium">
                    {item.descricao || item.objetivo || item.resumo || item.medo || item.gancho || 'Clique para visualizar e editar os detalhes deste registro.'}
                  </p>
                </div>
              </div>

              <div className="px-4.5 py-3 border-t border-brand-beige/10 bg-brand-cream/10 flex items-center justify-between text-[10px] text-brand-rose-light">
                <span className="font-bold tracking-wide uppercase">{dbInfo.name}</span>
                <span className="flex items-center text-brand-rose font-bold">
                  Ver Cartão <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
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
      <div className="flex flex-col md:flex-row md:space-x-4 md:overflow-x-auto space-y-4 md:space-y-0 pb-4 select-none px-1 md:px-0">
        {kanbanLanes.map((lane) => {
          const laneItems = groupedKanbanItems[lane] || [];
          return (
            <div key={lane} className="w-full md:w-72 shrink-0 bg-brand-cream/30 border border-brand-beige/20 rounded-2xl p-4.5 flex flex-col h-[550px]">
              <div className="flex items-center justify-between mb-4.5 px-1">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-brand-rose animate-pulse" />
                  <h4 className="font-bold text-brand-dark text-xs">{lane}</h4>
                </div>
                <span className="text-[10px] font-bold text-brand-rose-light bg-brand-cream px-2 py-0.5 rounded-full border border-brand-beige/20">
                  {laneItems.length}
                </span>
              </div>

              <div className="flex-grow overflow-y-auto space-y-3 pr-1 scrollbar-none">
                {laneItems.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-brand-beige/40 rounded-xl text-[10px] font-bold text-brand-rose-light/70 bg-white">
                    Sem registros nesta etapa
                  </div>
                ) : (
                  laneItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onOpenItemModal(dbId, item.id)}
                      className="p-3.5 bg-white border border-brand-beige/20 rounded-xl hover:border-brand-rose/50 cursor-pointer shadow-sm hover:shadow transition-all space-y-2"
                    >
                      <h5 className="font-bold text-brand-dark text-xs leading-snug">
                        {item.nome || item.titulo || item.meta || item.tarefa}
                      </h5>
                      <p className="text-[10px] text-brand-rose-light font-bold uppercase tracking-wider">
                        {item.categoria || item.marca || getProjectName(item.projetoId) || item.plataforma}
                      </p>

                      {item.prioridade && (
                        <div className="flex items-center justify-between pt-2 border-t border-brand-beige/10">
                          {renderPriorityBadge(item.prioridade)}
                          <span className="text-[9px] text-brand-dark/50 font-bold">
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
    const datedItems = filteredItems.filter(item => item.dataInicio || item.dataGravacao || item.dataPostagem || item.prazo || item.data);
    
    if (datedItems.length === 0) {
      return (
        <div className="text-center py-12 text-brand-rose-light text-xs font-semibold border border-dashed border-brand-beige/40 rounded-2xl bg-white px-4">
          Nenhum registro possui data preenchida nesta base para exibir no calendário.
        </div>
      );
    }

    return (
      <div className="bg-white border border-brand-beige/30 rounded-2xl p-5 shadow-sm space-y-4 px-4 md:px-5">
        <div className="flex items-center justify-between border-b border-brand-beige/10 pb-3">
          <h4 className="font-bold text-brand-dark text-sm">Cronograma de Prazos & Datas</h4>
          <span className="text-xs text-brand-rose-light font-bold">Exibindo registros agendados</span>
        </div>

        <div className="space-y-3">
          {datedItems.map((item) => {
            const dateVal = item.dataInicio || item.dataGravacao || item.dataPostagem || item.prazo || item.data;
            return (
              <div
                key={item.id}
                onClick={() => onOpenItemModal(dbId, item.id)}
                className="flex items-center justify-between p-3.5 bg-brand-cream/10 hover:bg-brand-cream/30 border border-brand-beige/20 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 bg-brand-cream text-brand-rose rounded-xl border border-brand-beige/20">
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-dark text-xs">{item.nome || item.titulo || item.meta || item.tarefa}</h5>
                    <p className="text-[10px] text-brand-rose-light font-bold uppercase tracking-wider mt-0.5">
                      {item.categoria || getProjectName(item.projetoId)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-extrabold text-brand-rose bg-brand-cream border border-brand-beige/30 px-3 py-1 rounded-xl whitespace-nowrap">
                    📅 {dateVal}
                  </span>
                  <ChevronRight className="h-4 w-4 text-brand-rose-light" />
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
        <div className="text-center py-12 text-brand-rose-light text-xs font-semibold border border-dashed border-brand-beige/40 rounded-2xl bg-white">
          Nenhum registro encontrado correspondente aos filtros aplicados.
        </div>
      );
    }

    return (
      <div className="space-y-2.5 px-1 md:px-0">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenItemModal(dbId, item.id)}
            className="flex items-center justify-between p-3.5 bg-white border border-brand-beige/20 rounded-xl hover:border-brand-rose/50 cursor-pointer transition-all hover:shadow-sm"
          >
            <div className="flex items-center space-x-3.5 truncate">
              <span className="text-lg shrink-0">
                {item.fotos || (dbId === 'ganchos' ? '🔑' : dbId === 'referencias' ? '🎯' : '📄')}
              </span>
              <div className="truncate">
                <h5 className="font-bold text-brand-dark text-xs truncate">
                  {item.nome || item.titulo || item.livro || item.meta || item.tarefa || item.gancho || item.desejo}
                </h5>
                <p className="text-[10px] text-brand-rose-light font-bold uppercase tracking-wider mt-0.5 truncate leading-tight">
                  {item.categoria || item.marca || getProjectName(item.projetoId) || item.medo}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {item.prioridade && renderPriorityBadge(item.prioridade)}
              {renderStatusBadge(item.status || item.statusLeitura || 'Ativo')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-grow bg-[#F8F5F2] overflow-y-auto h-screen pb-24 px-4 md:px-8 select-none font-sans scrollbar-none">
      {/* DB Header section */}
      <div className="py-5 md:py-6 border-b border-brand-beige/25 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shrink-0">
        <div className="flex items-start space-x-3.5">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-brand-cream border border-brand-beige/30 flex items-center justify-center text-xl md:text-2xl shadow-inner shrink-0 text-brand-rose">
            {dbInfo.emoji}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight leading-tight">
              {dbInfo.name}
            </h1>
            <p className="text-[11px] md:text-xs text-brand-rose-light font-medium mt-1 leading-normal max-w-xl">
              {dbInfo.desc}
            </p>
          </div>
        </div>

        {/* Quick Database Add Button */}
        <button
          onClick={() => onAddNewItem(dbId)}
          className="flex items-center justify-center space-x-2 bg-brand-rose hover:bg-brand-rose/95 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0 w-full md:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Registro</span>
        </button>
      </div>

      {/* Navigation Filter / Views Panel */}
      <div className="my-3.5 md:my-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5 bg-white p-2 rounded-2xl border border-brand-beige/20 shrink-0 overflow-hidden">
        
        {/* Toggle Visual Styles */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 lg:pb-0 shrink-0 max-w-full">
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
                className={`flex items-center space-x-1.5 px-3 py-1.8 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${
                  isSelected 
                    ? 'bg-brand-rose text-white shadow-sm' 
                    : 'text-brand-rose-light hover:bg-brand-cream hover:text-brand-rose'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Local Search and Filter Panel */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full lg:w-auto">
          <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-brand-rose-light" />
            <input
              type="text"
              placeholder="Pesquisar registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.8 bg-brand-cream/20 border border-brand-beige/30 rounded-xl text-xs font-medium placeholder-brand-rose-light/60 text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose transition-all w-full sm:w-44"
            />
          </div>

          {/* Render Filters dynamically if they have more options */}
          {filterOptions.statuses.length > 1 && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[11px] font-bold text-brand-rose bg-white border border-brand-beige/30 rounded-xl px-2.5 py-1.8 focus:outline-none focus:ring-1 focus:ring-brand-rose shrink-0"
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
              className="text-[11px] font-bold text-brand-rose bg-white border border-brand-beige/30 rounded-xl px-2.5 py-1.8 focus:outline-none focus:ring-1 focus:ring-brand-rose shrink-0"
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
      <div className="mt-4 pb-12">
        {viewType === 'tabela' && renderTable()}
        {viewType === 'galeria' && renderGallery()}
        {viewType === 'kanban' && renderKanban()}
        {viewType === 'calendario' && renderCalendar()}
        {viewType === 'lista' && renderList()}
      </div>
    </div>
  );
}

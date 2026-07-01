/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Save, 
  Link2, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Calendar,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { WorkspaceState } from '../types';

interface ItemModalProps {
  dbId: string;
  itemId: string;
  state: WorkspaceState;
  onClose: () => void;
  onUpdateItem: (dbId: string, itemId: string, updatedItem: any) => void;
  onDeleteItem: (dbId: string, itemId: string) => void;
  onJumpToRelation: (targetDbId: string, targetItemId: string) => void;
}

export default function ItemModal({
  dbId,
  itemId,
  state,
  onClose,
  onUpdateItem,
  onDeleteItem,
  onJumpToRelation
}: ItemModalProps) {
  // Find current item in state
  const originalItem = (state[dbId as keyof WorkspaceState] as any[])?.find(item => item.id === itemId);
  
  const [editedItem, setEditedItem] = useState<any>(null);

  useEffect(() => {
    if (originalItem) {
      setEditedItem({ ...originalItem });
    }
  }, [originalItem, itemId, dbId]);

  if (!originalItem || !editedItem) {
    return null;
  }

  const handleFieldChange = (key: string, value: any) => {
    setEditedItem(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onUpdateItem(dbId, itemId, editedItem);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza de que deseja deletar este registro permanentemente?')) {
      onDeleteItem(dbId, itemId);
      onClose();
    }
  };

  // Helper selectors for dropdowns
  const projetosList = state.projetos;
  const produtosUgcList = state.produtosUgc;
  const leiturasList = state.leituras;
  const ideiasConteudoList = state.ideiasConteudo;
  const ganchosList = state.ganchos;
  const videosPublicadosList = state.videosPublicados;

  return (
    <div className="fixed inset-0 bg-[#2C2C2C]/50 backdrop-blur-[2px] flex justify-end z-50 select-none animate-fade-in font-sans">
      
      {/* Modal Side Drawer */}
      <div className="w-full md:max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden select-text animate-slide-in">
        
        {/* Header bar */}
        <div className="px-6 py-4.5 border-b border-brand-beige/25 flex items-center justify-between shrink-0 bg-brand-cream/20">
          <div className="flex items-center space-x-2.5 text-xs text-brand-rose-light font-bold uppercase tracking-widest">
            <span>🗄️ {dbId === 'produtosUgc' ? 'Produtos UGC' : dbId === 'ideiasConteudo' ? 'Ideias de Conteúdo' : dbId}</span>
            <span>•</span>
            <span className="text-brand-rose">Ficha de Edição</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 text-brand-rose-light hover:text-brand-rose hover:bg-brand-cream/50 rounded-xl transition-all cursor-pointer"
              title="Deletar este registro permanentemente"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-brand-rose-light hover:text-brand-rose hover:bg-brand-cream/50 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic content scrollable pane */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
          
          {/* Top Title */}
          <div>
            <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
              Título / Identificação do Registro
            </label>
            <input
              type="text"
              value={editedItem.nome || editedItem.titulo || editedItem.livro || editedItem.meta || editedItem.tarefa || editedItem.gancho || editedItem.desejo || ''}
              onChange={(e) => {
                const text = e.target.value;
                if (editedItem.nome !== undefined) handleFieldChange('nome', text);
                else if (editedItem.titulo !== undefined) handleFieldChange('titulo', text);
                else if (editedItem.livro !== undefined) handleFieldChange('livro', text);
                else if (editedItem.meta !== undefined) handleFieldChange('meta', text);
                else if (editedItem.tarefa !== undefined) handleFieldChange('tarefa', text);
                else if (editedItem.gancho !== undefined) handleFieldChange('gancho', text);
                else if (editedItem.desejo !== undefined) handleFieldChange('desejo', text);
              }}
              className="w-full text-lg md:text-xl font-bold text-brand-dark border-b border-brand-beige/40 focus:border-brand-rose focus:outline-none pb-2 tracking-tight"
              placeholder="Digite a identificação principal..."
            />
          </div>

          {/* Core Properties Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-cream/20 p-4.5 rounded-2xl border border-brand-beige/25">
            
            {/* Project dropdown selection */}
            {editedItem.projetoId !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  📁 Projeto Relacionado
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.projetoId}
                    onChange={(e) => handleFieldChange('projetoId', e.target.value)}
                    className="flex-1 text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                  >
                    <option value="">Nenhum</option>
                    {projetosList.map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                  {editedItem.projetoId && (
                    <button 
                      onClick={() => onJumpToRelation('projetos', editedItem.projetoId)}
                      className="p-2.5 bg-brand-cream text-brand-rose rounded-xl hover:bg-brand-cream/80 transition-all text-xs font-bold border border-[#C98484]/15 cursor-pointer"
                      title="Abrir Projeto Relacionado"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* UGC Product dropdown selection */}
            {editedItem.produtoId !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  🧴 Produto UGC Relacionado
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.produtoId}
                    onChange={(e) => handleFieldChange('produtoId', e.target.value)}
                    className="flex-1 text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                  >
                    <option value="">Nenhum</option>
                    {produtosUgcList.map(p => (
                      <option key={p.id} value={p.id}>{p.nome} ({p.marca})</option>
                    ))}
                  </select>
                  {editedItem.produtoId && (
                    <button 
                      onClick={() => onJumpToRelation('produtosUgc', editedItem.produtoId)}
                      className="p-2.5 bg-brand-cream text-brand-rose rounded-xl hover:bg-brand-cream/80 transition-all text-xs font-bold border border-[#C98484]/15 cursor-pointer"
                      title="Abrir Produto UGC"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Leitura / Book dropdown selection */}
            {editedItem.livroId !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  📖 Livro / Leitura Relacionada
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.livroId}
                    onChange={(e) => handleFieldChange('livroId', e.target.value)}
                    className="flex-1 text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                  >
                    <option value="">Nenhum</option>
                    {leiturasList.map(l => (
                      <option key={l.id} value={l.id}>{l.livro}</option>
                    ))}
                  </select>
                  {editedItem.livroId && (
                    <button 
                      onClick={() => onJumpToRelation('leituras', editedItem.livroId)}
                      className="p-2.5 bg-brand-cream text-brand-rose rounded-xl hover:bg-brand-cream/80 transition-all text-xs font-bold border border-[#C98484]/15 cursor-pointer"
                      title="Abrir Livro"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Content Idea dropdown selection */}
            {editedItem.ideiaId !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  💡 Ideia de Conteúdo Relacionada
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.ideiaId}
                    onChange={(e) => handleFieldChange('ideiaId', e.target.value)}
                    className="flex-1 text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                  >
                    <option value="">Nenhuma</option>
                    {ideiasConteudoList.map(i => (
                      <option key={i.id} value={i.id}>{i.titulo}</option>
                    ))}
                  </select>
                  {editedItem.ideiaId && (
                    <button 
                      onClick={() => onJumpToRelation('ideiasConteudo', editedItem.ideiaId)}
                      className="p-2.5 bg-brand-cream text-brand-rose rounded-xl hover:bg-brand-cream/80 transition-all text-xs font-bold border border-[#C98484]/15 cursor-pointer"
                      title="Abrir Ideia de Conteúdo"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Status Field */}
            {(editedItem.status !== undefined || editedItem.statusLeitura !== undefined) && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  ⚡ Status Atual
                </label>
                <select
                  value={editedItem.status || editedItem.statusLeitura}
                  onChange={(e) => handleFieldChange(editedItem.status !== undefined ? 'status' : 'statusLeitura', e.target.value)}
                  className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                >
                  {dbId === 'projetos' && (
                    <>
                      <option value="Planejado">Planejado</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Pausado">Pausado</option>
                      <option value="Concluído">Concluído</option>
                    </>
                  )}
                  {dbId === 'produtosUgc' && (
                    <>
                      <option value="Disponível">Disponível</option>
                      <option value="Gravando">Gravando</option>
                      <option value="Aguardando Envio">Aguardando Envio</option>
                      <option value="Concluído">Concluído</option>
                    </>
                  )}
                  {dbId === 'ideiasConteudo' && (
                    <>
                      <option value="Ideia">Ideia</option>
                      <option value="Roteirizando">Roteirizando</option>
                      <option value="Gravando">Gravando</option>
                      <option value="Editando">Editando</option>
                      <option value="Pronto">Pronto</option>
                      <option value="Postado">Postado</option>
                    </>
                  )}
                  {dbId === 'roteiros' && (
                    <>
                      <option value="Rascunho">Rascunho</option>
                      <option value="Pronto para Gravar">Pronto para Gravar</option>
                      <option value="Gravado">Gravado</option>
                      <option value="Editando">Editando</option>
                      <option value="Concluído">Concluído</option>
                    </>
                  )}
                  {dbId === 'estudos' && (
                    <>
                      <option value="Não iniciado">Não iniciado</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluído">Concluído</option>
                    </>
                  )}
                  {dbId === 'leituras' && (
                    <>
                      <option value="Não iniciado">Não iniciado</option>
                      <option value="Lendo">Lendo</option>
                      <option value="Concluído">Concluído</option>
                    </>
                  )}
                  {dbId === 'metas' && (
                    <>
                      <option value="Não iniciada">Não iniciada</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluída">Concluída</option>
                    </>
                  )}
                  {dbId === 'tarefas' && (
                    <>
                      <option value="Pendente">Pendente</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluída">Concluída</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Priority Field */}
            {editedItem.prioridade !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  🔥 Nível de Prioridade
                </label>
                <select
                  value={editedItem.prioridade}
                  onChange={(e) => handleFieldChange('prioridade', e.target.value)}
                  className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            )}

            {/* Category Text/Selection */}
            {editedItem.categoria !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  🏷️ Categoria / Segmento
                </label>
                {dbId === 'ideiasConteudo' || dbId === 'ganchos' ? (
                  <select
                    value={editedItem.categoria}
                    onChange={(e) => handleFieldChange('categoria', e.target.value)}
                    className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                  >
                    {dbId === 'ideiasConteudo' ? (
                      <>
                        <option value="Educação">Educação</option>
                        <option value="Storytelling">Storytelling</option>
                        <option value="Imersão Sensorial">Imersão Sensorial</option>
                        <option value="POV">POV</option>
                        <option value="ASMR">ASMR</option>
                        <option value="Comparação">Comparação</option>
                        <option value="Rotina">Rotina</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Lista">Lista</option>
                        <option value="Experiência">Experiência</option>
                        <option value="Transformação">Transformação</option>
                        <option value="Teste">Teste</option>
                        <option value="Antes e Depois">Antes e Depois</option>
                      </>
                    ) : (
                      <>
                        <option value="Curiosidade">Curiosidade</option>
                        <option value="Mistério">Mistério</option>
                        <option value="Meditação">Meditação</option>
                        <option value="Visualização">Visualização</option>
                        <option value="Experiência">Experiência</option>
                        <option value="História">História</option>
                        <option value="Erro">Erro</option>
                        <option value="Choque">Choque</option>
                        <option value="Estatística">Estatística</option>
                        <option value="POV">POV</option>
                        <option value="Humor">Humor</option>
                        <option value="Autoridade">Autoridade</option>
                        <option value="Pergunta">Pergunta</option>
                        <option value="Contraste">Contraste</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={editedItem.categoria}
                    onChange={(e) => handleFieldChange('categoria', e.target.value)}
                    className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                    placeholder="Categoria do item..."
                  />
                )}
              </div>
            )}

            {/* Date Fields */}
            {(editedItem.dataInicio !== undefined || editedItem.dataGravacao !== undefined || editedItem.dataPostagem !== undefined || editedItem.prazo !== undefined || editedItem.data !== undefined) && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  📅 Data Agendada / Prazo
                </label>
                <input
                  type="date"
                  value={editedItem.dataInicio || editedItem.dataGravacao || editedItem.dataPostagem || editedItem.prazo || editedItem.data || ''}
                  onChange={(e) => {
                    const d = e.target.value;
                    if (editedItem.dataInicio !== undefined) handleFieldChange('dataInicio', d);
                    else if (editedItem.dataGravacao !== undefined) handleFieldChange('dataGravacao', d);
                    else if (editedItem.dataPostagem !== undefined) handleFieldChange('dataPostagem', d);
                    else if (editedItem.prazo !== undefined) handleFieldChange('prazo', d);
                    else if (editedItem.data !== undefined) handleFieldChange('data', d);
                  }}
                  className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                />
              </div>
            )}

            {/* Numeric Fields */}
            {editedItem.videosGravados !== undefined && (
              <div>
                <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                  📹 Vídeos Gravados
                </label>
                <input
                  type="number"
                  value={editedItem.videosGravados}
                  onChange={(e) => handleFieldChange('videosGravados', parseInt(e.target.value) || 0)}
                  className="w-full text-xs font-semibold text-brand-dark bg-white border border-brand-beige/30 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose"
                />
              </div>
            )}

            {/* Checkbox fields */}
            {editedItem.jaGravei !== undefined && (
              <div className="flex items-center space-x-2.5 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.jaGravei}
                  onChange={(e) => handleFieldChange('jaGravei', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-brand-beige text-brand-rose focus:ring-brand-rose cursor-pointer transition-all"
                />
                <label className="text-xs font-bold text-brand-dark">
                  Já gravei este produto?
                </label>
              </div>
            )}

            {editedItem.videoGravado !== undefined && (
              <div className="flex items-center space-x-2.5 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.videoGravado}
                  onChange={(e) => handleFieldChange('videoGravado', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-brand-beige text-brand-rose focus:ring-brand-rose cursor-pointer transition-all"
                />
                <label className="text-xs font-bold text-brand-dark">
                  Vídeo do roteiro gravado?
                </label>
              </div>
            )}

            {editedItem.jaUtilizei !== undefined && (
              <div className="flex items-center space-x-2.5 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.jaUtilizei}
                  onChange={(e) => handleFieldChange('jaUtilizei', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-brand-beige text-brand-rose focus:ring-brand-rose cursor-pointer transition-all"
                />
                <label className="text-xs font-bold text-brand-dark">
                  Gancho já utilizado em posts?
                </label>
              </div>
            )}

          </div>

          {/* Special UGC Product sub-panels (Características, Benefícios, etc.) */}
          {dbId === 'produtosUgc' && (
            <div className="space-y-4 bg-brand-cream/15 border border-[#C98484]/15 rounded-2xl p-5">
              <div className="flex items-center space-x-2 text-brand-rose font-bold text-xs uppercase tracking-wider border-b border-brand-beige/10 pb-2">
                <Sparkles className="h-4 w-4 text-brand-rose animate-pulse" />
                <span>Análise de Copys & Psicologia de Vendas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Características</label>
                  <textarea
                    value={editedItem.caracteristicas || ''}
                    onChange={(e) => handleFieldChange('caracteristicas', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Textura fluida, embalagem luxo..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Benefícios</label>
                  <textarea
                    value={editedItem.beneficios || ''}
                    onChange={(e) => handleFieldChange('beneficios', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Pele hidratada em 10 dias..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Problemas que resolve</label>
                  <textarea
                    value={editedItem.problemasQueResolve || ''}
                    onChange={(e) => handleFieldChange('problemasQueResolve', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Ressecamento, base craquelada..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Desejos que desperta</label>
                  <textarea
                    value={editedItem.desejosQueDesperta || ''}
                    onChange={(e) => handleFieldChange('desejosQueDesperta', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Aparência limpa, de spa..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Emoções estimuladas</label>
                  <textarea
                    value={editedItem.emocoes || ''}
                    onChange={(e) => handleFieldChange('emocoes', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Confiança, leveza..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Público-alvo</label>
                  <textarea
                    value={editedItem.publicoAlvo || ''}
                    onChange={(e) => handleFieldChange('publicoAlvo', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Estudantes femininas, influencers..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Objeções Comuns</label>
                  <textarea
                    value={editedItem.objecoes || ''}
                    onChange={(e) => handleFieldChange('objecoes', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Preço elevado, receio de oleosidade..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Gatilhos Mentais</label>
                  <textarea
                    value={editedItem.gatilhosMentais || ''}
                    onChange={(e) => handleFieldChange('gatilhosMentais', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Prova social, reciprocidade..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-xs text-brand-rose-light mb-1">Ideias de vídeos sugeridos</label>
                <textarea
                  value={editedItem.ideiaDeVideos || editedItem.ideiasDeVideos || ''}
                  onChange={(e) => handleFieldChange('ideiasDeVideos', e.target.value)}
                  className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-24 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                  placeholder="Liste as ideias rápidas de gravação UGC para este produto..."
                />
              </div>
            </div>
          )}

          {/* Roteiro Specific detailed textareas */}
          {dbId === 'roteiros' && (
            <div className="space-y-4 bg-brand-cream/15 border border-[#C98484]/15 rounded-2xl p-5 text-xs">
              <div className="font-bold text-brand-rose border-b border-brand-beige/20 pb-2">
                ✍️ Estrutura Literária do Roteiro
              </div>

              <div>
                <label className="block font-bold text-brand-rose-light mb-1">O Gancho (Abertura - primeiros 3s)</label>
                <textarea
                  value={editedItem.gancho || ''}
                  onChange={(e) => handleFieldChange('gancho', e.target.value)}
                  className="w-full p-3 bg-white border border-brand-beige/25 rounded-xl h-20 focus:ring-1 focus:ring-brand-rose focus:outline-none italic"
                  placeholder='Ex: [SOM DE VIDRO] "Se você quer a pele iluminada sem filtro..."'
                />
              </div>

              <div>
                <label className="block font-bold text-brand-rose-light mb-1">O Desenvolvimento (Apresentação, textura, demonstração)</label>
                <textarea
                  value={editedItem.desenvolvimento || ''}
                  onChange={(e) => handleFieldChange('desenvolvimento', e.target.value)}
                  className="w-full p-3 bg-white border border-brand-beige/25 rounded-xl h-28 focus:ring-1 focus:ring-brand-rose focus:outline-none"
                  placeholder="Escreva a narrativa e demonstração prática do vídeo..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">Finalização</label>
                  <textarea
                    value={editedItem.finalizacao || ''}
                    onChange={(e) => handleFieldChange('finalizacao', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 focus:ring-1 focus:ring-brand-rose focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-rose-light mb-1">CTA (Chamada de Ação)</label>
                  <textarea
                    value={editedItem.cta || ''}
                    onChange={(e) => handleFieldChange('cta', e.target.value)}
                    className="w-full p-2.5 bg-white border border-brand-beige/25 rounded-xl h-20 focus:ring-1 focus:ring-brand-rose focus:outline-none"
                    placeholder="Ex: Clique no link da bio..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Simple Description fields for general databases */}
          {editedItem.resumo !== undefined && (
            <div>
              <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                📝 Resumo / Notas de Absorção
              </label>
              <textarea
                value={editedItem.resumo || ''}
                onChange={(e) => handleFieldChange('resumo', e.target.value)}
                className="w-full p-3 border border-brand-beige/30 rounded-xl h-28 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                placeholder="Insira o resumo ou notas..."
              />
            </div>
          )}

          {editedItem.aplicacao !== undefined && (
            <div>
              <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                ⚡ Aplicação Prática / Próxima Ação
              </label>
              <textarea
                value={editedItem.aplicacao || ''}
                onChange={(e) => handleFieldChange('aplicacao', e.target.value)}
                className="w-full p-3 border border-brand-beige/30 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none font-medium text-brand-dark"
                placeholder="Onde ou como você vai aplicar este insight no seu conteúdo?"
              />
            </div>
          )}

          {editedItem.observacoes !== undefined && (
            <div>
              <label className="block text-[9px] font-bold text-brand-rose-light uppercase tracking-widest mb-1.5">
                💬 Observações Gerais
              </label>
              <textarea
                value={editedItem.observacoes || ''}
                onChange={(e) => handleFieldChange('observacoes', e.target.value)}
                className="w-full p-3 border border-brand-beige/30 rounded-xl h-20 text-xs focus:ring-1 focus:ring-brand-rose focus:outline-none"
                placeholder="Anotações adicionais do cartão..."
              />
            </div>
          )}

        </div>

        {/* Action button bar */}
        <div className="px-6 py-4 border-t border-brand-beige/25 flex items-center justify-end space-x-3 bg-brand-cream/10 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white hover:bg-brand-cream/40 text-brand-rose-light hover:text-brand-rose rounded-xl text-xs font-bold border border-brand-beige/35 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-brand-rose hover:bg-brand-rose/95 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Registro</span>
          </button>
        </div>

      </div>
    </div>
  );
}

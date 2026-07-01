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
    <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px] flex justify-end z-50 select-none animate-fade-in font-sans">
      
      {/* Modal Side Drawer */}
      <div className="w-full md:max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden select-text animate-slide-in">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
          <div className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>🗄️ {dbId}</span>
            <span>•</span>
            <span className="text-indigo-600">Ficha do Registro</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              title="Deletar este registro"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic content scrollable pane */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Title */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Título / Identificação
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
              className="w-full text-xl font-extrabold text-gray-900 border-b border-gray-200 focus:border-indigo-500 focus:outline-none pb-2 tracking-tight"
              placeholder="Digite o título principal..."
            />
          </div>

          {/* Core Properties Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
            
            {/* Project dropdown selection */}
            {editedItem.projetoId !== undefined && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  📁 Projeto Relacionado
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.projetoId}
                    onChange={(e) => handleFieldChange('projetoId', e.target.value)}
                    className="flex-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Nenhum</option>
                    {projetosList.map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                  {editedItem.projetoId && (
                    <button 
                      onClick={() => onJumpToRelation('projetos', editedItem.projetoId)}
                      className="p-1.8 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-all text-xs font-semibold"
                      title="Ir para o Projeto"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  🧴 Produto UGC Relacionado
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.produtoId}
                    onChange={(e) => handleFieldChange('produtoId', e.target.value)}
                    className="flex-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Nenhum</option>
                    {produtosUgcList.map(p => (
                      <option key={p.id} value={p.id}>{p.nome} ({p.marca})</option>
                    ))}
                  </select>
                  {editedItem.produtoId && (
                    <button 
                      onClick={() => onJumpToRelation('produtosUgc', editedItem.produtoId)}
                      className="p-1.8 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-all text-xs font-semibold"
                      title="Ir para o Produto"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  📖 Livro / Leitura Relacionada
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.livroId}
                    onChange={(e) => handleFieldChange('livroId', e.target.value)}
                    className="flex-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Nenhum</option>
                    {leiturasList.map(l => (
                      <option key={l.id} value={l.id}>{l.livro}</option>
                    ))}
                  </select>
                  {editedItem.livroId && (
                    <button 
                      onClick={() => onJumpToRelation('leituras', editedItem.livroId)}
                      className="p-1.8 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-all text-xs font-semibold"
                      title="Ir para a Leitura"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  💡 Ideia de Conteúdo Relacionada
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editedItem.ideiaId}
                    onChange={(e) => handleFieldChange('ideiaId', e.target.value)}
                    className="flex-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Nenhuma</option>
                    {ideiasConteudoList.map(i => (
                      <option key={i.id} value={i.id}>{i.titulo}</option>
                    ))}
                  </select>
                  {editedItem.ideiaId && (
                    <button 
                      onClick={() => onJumpToRelation('ideiasConteudo', editedItem.ideiaId)}
                      className="p-1.8 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-all text-xs font-semibold"
                      title="Ir para a Ideia"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  ⚡ Status Atual
                </label>
                <select
                  value={editedItem.status || editedItem.statusLeitura}
                  onChange={(e) => handleFieldChange(editedItem.status !== undefined ? 'status' : 'statusLeitura', e.target.value)}
                  className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  🔥 Prioridade
                </label>
                <select
                  value={editedItem.prioridade}
                  onChange={(e) => handleFieldChange('prioridade', e.target.value)}
                  className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  🏷️ Categoria / Segmento
                </label>
                {dbId === 'ideiasConteudo' || dbId === 'ganchos' ? (
                  <select
                    value={editedItem.categoria}
                    onChange={(e) => handleFieldChange('categoria', e.target.value)}
                    className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none"
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
                    className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none"
                    placeholder="Categoria do item..."
                  />
                )}
              </div>
            )}

            {/* Date Fields */}
            {(editedItem.dataInicio !== undefined || editedItem.dataGravacao !== undefined || editedItem.dataPostagem !== undefined || editedItem.prazo !== undefined || editedItem.data !== undefined) && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
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
                  className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none"
                />
              </div>
            )}

            {/* Numeric Fields */}
            {editedItem.videosGravados !== undefined && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  📹 Quantos vídeos gravei?
                </label>
                <input
                  type="number"
                  value={editedItem.videosGravados}
                  onChange={(e) => handleFieldChange('videosGravados', parseInt(e.target.value) || 0)}
                  className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none"
                />
              </div>
            )}

            {/* Checkbox fields */}
            {editedItem.jaGravei !== undefined && (
              <div className="flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.jaGravei}
                  onChange={(e) => handleFieldChange('jaGravei', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label className="text-xs font-bold text-gray-700">
                  Já Gravei este produto?
                </label>
              </div>
            )}

            {editedItem.videoGravado !== undefined && (
              <div className="flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.videoGravado}
                  onChange={(e) => handleFieldChange('videoGravado', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label className="text-xs font-bold text-gray-700">
                  Vídeo do roteiro gravado?
                </label>
              </div>
            )}

            {editedItem.jaUtilizei !== undefined && (
              <div className="flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  checked={editedItem.jaUtilizei}
                  onChange={(e) => handleFieldChange('jaUtilizei', e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label className="text-xs font-bold text-gray-700">
                  Gancho já utilizado?
                </label>
              </div>
            )}

          </div>

          {/* Special UGC Product sub-panels (Características, Benefícios, etc.) */}
          {dbId === 'produtosUgc' && (
            <div className="space-y-4 bg-amber-50/20 border border-amber-100 rounded-2xl p-5">
              <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-xs uppercase tracking-wider border-b border-amber-100/50 pb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Análise de Copys e Psicologia do Produto</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Características</label>
                  <textarea
                    value={editedItem.caracteristicas || ''}
                    onChange={(e) => handleFieldChange('caracteristicas', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Textura fluida, embalagem luxo..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Benefícios</label>
                  <textarea
                    value={editedItem.beneficios || ''}
                    onChange={(e) => handleFieldChange('beneficios', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Pele hidratada em 10 dias..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Problemas que resolve</label>
                  <textarea
                    value={editedItem.problemasQueResolve || ''}
                    onChange={(e) => handleFieldChange('problemasQueResolve', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Ressecamento, base craquelada..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Desejos que desperta</label>
                  <textarea
                    value={editedItem.desejosQueDesperta || ''}
                    onChange={(e) => handleFieldChange('desejosQueDesperta', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Aparência limpa, de spa..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Emoções</label>
                  <textarea
                    value={editedItem.emocoes || ''}
                    onChange={(e) => handleFieldChange('emocoes', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Confiança, leveza..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Público-alvo</label>
                  <textarea
                    value={editedItem.publicoAlvo || ''}
                    onChange={(e) => handleFieldChange('publicoAlvo', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Estudantes femininas, influencers..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Objeções Comuns</label>
                  <textarea
                    value={editedItem.objecoes || ''}
                    onChange={(e) => handleFieldChange('objecoes', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Preço elevado, receio de oleosidade..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-500 mb-1">Gatilhos Mentais</label>
                  <textarea
                    value={editedItem.gatilhosMentais || ''}
                    onChange={(e) => handleFieldChange('gatilhosMentais', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg h-20 focus:outline-none"
                    placeholder="Ex: Prova social, reciprocidade..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-xs text-gray-500 mb-1">Ideias de vídeos sugeridos</label>
                <textarea
                  value={editedItem.ideiaDeVideos || editedItem.ideiasDeVideos || ''}
                  onChange={(e) => handleFieldChange('ideiasDeVideos', e.target.value)}
                  className="w-full p-2 bg-white border border-gray-200 rounded-lg h-24 text-xs focus:outline-none"
                  placeholder="Liste ideias rápidas de vídeos..."
                />
              </div>
            </div>
          )}

          {/* Roteiro Specific detailed textareas */}
          {dbId === 'roteiros' && (
            <div className="space-y-4 bg-indigo-50/20 border border-indigo-100 rounded-2xl p-5 text-xs">
              <div className="font-bold text-indigo-900 border-b border-indigo-100/50 pb-2">
                ✍️ Estrutura Literária do Roteiro
              </div>

              <div>
                <label className="block font-bold text-gray-500 mb-1">O Gancho (Abertura - primeiros 3s)</label>
                <textarea
                  value={editedItem.gancho || ''}
                  onChange={(e) => handleFieldChange('gancho', e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl h-20 focus:ring-1 focus:ring-indigo-500 focus:outline-none italic"
                  placeholder='Ex: [SOM DE VIDRO] "Se você quer a pele iluminada sem filtro..."'
                />
              </div>

              <div>
                <label className="block font-bold text-gray-500 mb-1">O Desenvolvimento (Apresentação, textura, demonstração)</label>
                <textarea
                  value={editedItem.desenvolvimento || ''}
                  onChange={(e) => handleFieldChange('desenvolvimento', e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl h-28 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Escreva a narrativa do vídeo..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Finalização</label>
                  <textarea
                    value={editedItem.finalizacao || ''}
                    onChange={(e) => handleFieldChange('finalizacao', e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl h-20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1">CTA (Call to Action)</label>
                  <textarea
                    value={editedItem.cta || ''}
                    onChange={(e) => handleFieldChange('cta', e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl h-20 focus:outline-none animate-pulse-once"
                    placeholder="Ex: Clique no link da bio..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Simple Description fields for general databases */}
          {editedItem.resumo !== undefined && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                📝 Resumo / Conteúdo de Absorção
              </label>
              <textarea
                value={editedItem.resumo || ''}
                onChange={(e) => handleFieldChange('resumo', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl h-28 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                placeholder="Insira o resumo ou notas..."
              />
            </div>
          )}

          {editedItem.aplicacao !== undefined && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                ⚡ Aplicação Prática / Próxima Ação
              </label>
              <textarea
                value={editedItem.aplicacao || ''}
                onChange={(e) => handleFieldChange('aplicacao', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl h-20 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium text-gray-800"
                placeholder="Onde ou como você vai aplicar este insight no seu conteúdo?"
              />
            </div>
          )}

          {editedItem.observacoes !== undefined && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                💬 Observações Gerais
              </label>
              <textarea
                value={editedItem.observacoes || ''}
                onChange={(e) => handleFieldChange('observacoes', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl h-20 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                placeholder="Anotações adicionais do cartão..."
              />
            </div>
          )}

        </div>

        {/* Action button bar */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end space-x-3 bg-gray-50/50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold border border-gray-200 transition-all cursor-pointer"
          >
            Fechar sem salvar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Registro</span>
          </button>
        </div>

      </div>
    </div>
  );
}

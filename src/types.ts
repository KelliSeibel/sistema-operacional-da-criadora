/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Projeto {
  id: string;
  nome: string;
  categoria: string;
  objetivo: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Planejado' | 'Em andamento' | 'Concluído' | 'Pausado';
  dataInicio: string;
  proximaAcao: string;
  observacoes: string;
}

export interface ProdutoUGC {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  link: string;
  fotos: string; // URL or emoji-based visual representation
  jaGravei: boolean;
  videosGravados: number;
  melhorVideo: string;
  dataGravacao: string;
  status: 'Disponível' | 'Gravando' | 'Concluído' | 'Aguardando Envio';
  
  // Specific internal fields
  caracteristicas: string;
  beneficios: string;
  problemasQueResolve: string;
  desejosQueDesperta: string;
  emocoes: string;
  publicoAlvo: string;
  objecoes: string;
  gatilhosMentais: string;
  ideiasDeVideos: string;

  // Relationships
  roteirosIds: string[];
  videosIds: string[];
  ganchosIds: string[];
  referenciasIds: string[];
}

export interface IdeiaConteudo {
  id: string;
  titulo: string;
  categoria:
    | 'Educação'
    | 'Storytelling'
    | 'Imersão Sensorial'
    | 'POV'
    | 'ASMR'
    | 'Comparação'
    | 'Rotina'
    | 'Tutorial'
    | 'Lista'
    | 'Experiência'
    | 'Transformação'
    | 'Teste'
    | 'Antes e Depois';
  projetoId: string; // Relates to Projeto
  produtoId: string; // Relates to ProdutoUGC
  objetivo: string;
  plataforma: 'TikTok' | 'Instagram' | 'YouTube Shorts' | 'Pinterest' | 'Outra';
  formato: 'Reels' | 'Carrossel' | 'Vídeo Longo' | 'Short' | 'TikTok';
  ganchoId: string; // Relates to Gancho
  cta: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  tempoEstimado: string;
  status: 'Ideia' | 'Roteirizando' | 'Gravando' | 'Editando' | 'Pronto' | 'Postado';
  dataCriacao: string;
  dataGravacao: string;
  dataPostagem: string;
  resultado: string; // views or performance summary
  observacoes: string;
}

export interface Roteiro {
  id: string;
  titulo: string;
  produtoId: string; // Relates to ProdutoUGC
  ideiaId: string; // Relates to IdeiaConteudo
  objetivo: string;
  tipo: 'UGC Orgânico' | 'UGC Pago (Ad)' | 'Orgânico' | 'Outro';
  gancho: string;
  desenvolvimento: string;
  finalizacao: string;
  cta: string;
  tempo: string; // e.g. "30s"
  status: 'Rascunho' | 'Pronto para Gravar' | 'Gravado' | 'Editando' | 'Concluído';
  videoGravado: boolean;
  videoPublicadoId: string; // Relates to VideoPublicado
  resultado: string;
}

export interface Gancho {
  id: string;
  gancho: string;
  categoria:
    | 'Curiosidade'
    | 'Mistério'
    | 'Meditação'
    | 'Visualização'
    | 'Experiência'
    | 'História'
    | 'Erro'
    | 'Choque'
    | 'Estatística'
    | 'POV'
    | 'Humor'
    | 'Autoridade'
    | 'Pergunta'
    | 'Contraste';
  tipoEmocao: string;
  objetivo: string;
  exemplo: string;
  melhorPara: string;
  retencaoEsperada: 'Alta' | 'Média' | 'Baixa';
  jaUtilizei: boolean;
  funcionou: boolean | 'Parcialmente' | string;
}

export interface Referencia {
  id: string;
  titulo: string;
  link: string;
  criador: string;
  plataforma: string;
  produtoId: string; // Relates to ProdutoUGC
  categoria: string;
  porQueGostei: string;
  gancho: string;
  movimentoCamera: string;
  iluminacao: string;
  edicao: string;
  audio: string;
  cta: string;
  oQueAdaptar: string;
}

export interface BancoCena {
  id: string;
  nome: string;
  categoria: string; // "Abrindo embalagem", "B-roll", etc.
  produtoId: string; // Relates to ProdutoUGC
  local: string;
  equipamento: string;
  descricao: string;
}

export interface PsicologiaConsumidor {
  id: string;
  desejo: string;
  medo: string;
  problema: string;
  sonho: string;
  objecao: string;
  gatilhoMental: string;
  emocao: string;
  necessidade: string;
  exemplosAplicacao: string;
  produtosIds: string[]; // Relates to ProdutoUGC
}

export interface Estudo {
  id: string;
  tema: string;
  livroId: string; // Relates to Leitura
  curso: string;
  autor: string;
  resumo: string;
  insight: string;
  aplicacao: string;
  ideiaConteudoId: string; // Relates to IdeiaConteudo
  status: 'Não iniciado' | 'Em andamento' | 'Concluído';
  projetosIds: string[]; // Relates to Projeto
}

export interface Leitura {
  id: string;
  livro: string;
  autor: string;
  tema: string;
  capitulo: string;
  resumo: string;
  frasesImportantes: string;
  aplicacao: string;
  conteudosGeradosIds: string[]; // Relates to IdeiaConteudo
  videosCriadosIds: string[]; // Relates to VideoPublicado
  statusLeitura: 'Não iniciado' | 'Lendo' | 'Concluído';
}

export interface VideoPublicado {
  id: string;
  titulo: string;
  plataforma: 'TikTok' | 'Instagram' | 'YouTube' | 'Outra';
  projetoId: string; // Relates to Projeto
  produtoId: string; // Relates to ProdutoUGC
  data: string;
  visualizacoes: number;
  curtidas: number;
  comentarios: number;
  compartilhamentos: number;
  salvamentos: number;
  retencao: string; // e.g. "45%"
  resultado: string;
  licoesAprendidas: string;
}

export interface Meta {
  id: string;
  meta: string;
  projetoId: string; // Relates to Projeto
  prazo: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Não iniciada' | 'Em andamento' | 'Concluída';
  resultado: string;
  proximaAcao: string;
}

export interface Tarefa {
  id: string;
  tarefa: string;
  projetoId: string; // Relates to Projeto
  responsavel: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  prazo: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída';
  tempoEstimado: string;
}

// Fixed Page Definition
export interface PaginaFixa {
  id: string;
  titulo: string;
  categoria: 'Manual' | 'Checklist' | 'Fluxo' | 'Sistema';
  conteudo: string; // Markdown / Text content
}

// Global state structure
export interface WorkspaceState {
  projetos: Projeto[];
  produtosUgc: ProdutoUGC[];
  ideiasConteudo: IdeiaConteudo[];
  roteiros: Roteiro[];
  ganchos: Gancho[];
  referencias: Referencia[];
  bancoCenas: BancoCena[];
  psicologiaConsumidor: PsicologiaConsumidor[];
  estudos: Estudo[];
  leituras: Leitura[];
  videosPublicados: VideoPublicado[];
  metas: Meta[];
  tarefas: Tarefa[];
  paginasFixas: PaginaFixa[];
}

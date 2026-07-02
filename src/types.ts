export type Category =
  | 'Skincare'
  | 'Perfumes'
  | 'Maquiagem'
  | 'Cabelos'
  | 'Corpo'
  | 'Moda'
  | 'Casa'
  | 'Tecnologia'
  | 'Alimentação'
  | 'Lifestyle'
  | 'Outros';

export type ReferenceStatus = 'inspiration' | 'recorded' | 'adapt' | 'favorite';

export type PlatformType = 'tiktok' | 'instagram' | 'pinterest' | 'youtube' | 'facebook' | 'ads' | 'site';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  emotion: string; // Emoção que vende
  problemResolved: string; // Problema que resolve
  transformation: string; // Transformação
  sensation: string; // Sensação
  audience: string; // Público
  benefits: string; // Benefícios
  objections: string; // Objeções
  keywords: string[]; // Palavras-chave
  purchaseDate: string; // Data de compra
  expiryDate: string; // Data de validade
  notes: string; // Observações
  tags: string[];
  imageUrl: string; // Imagem grande
  relatedProductIds: string[]; // Produtos relacionados
  images?: string[]; // Múltiplas fotos do produto
  storageLocation?: string; // Local onde está armazenado
  value?: string; // Valor / Preço
  purchaseLink?: string; // Link para compra
  differentials?: string; // Diferenciais
}

export interface Reference {
  id: string;
  title: string;
  imageUrl: string; // Imagem de capa
  link: string;
  notes: string;
  tags: string[];
  productId: string; // Produto relacionado
  category: Category;
  platform: PlatformType;
  status: ReferenceStatus;
}

export type HookCategory =
  | 'curiosidade'
  | 'erro'
  | 'pov'
  | 'storytelling'
  | 'asmr'
  | 'rotina'
  | 'comparacao'
  | 'review'
  | 'unboxing'
  | 'luxo'
  | 'elegancia'
  | 'economia'
  | 'emocional'
  | 'autoridade'
  | 'urgencia';

export interface Hook {
  id: string;
  title: string;
  category: HookCategory;
  content: string;
  productIds: string[]; // Ligado a vários produtos
}

export type SceneType =
  | 'close'
  | 'slowmotion'
  | 'asmr'
  | 'detalhe'
  | 'aplicacao'
  | 'lifestyle'
  | 'macro'
  | 'maos'
  | 'ambiente'
  | 'luz_natural'
  | 'luz_artificial';

export interface Scene {
  id: string;
  imageUrl: string; // Visual bank scene
  name: string;
  description: string;
  productIds: string[]; // Produtos relacionados
  type: SceneType;
  isRecorded: boolean; // Cena já gravada
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  productId: string;
  category: Category;
  referenceId: string;
  scriptId: string;
  hookId: string;
  sceneId: string;
  createdAt: string;
}

export type WorkflowStage =
  | 'idea'
  | 'planning'
  | 'script'
  | 'recording'
  | 'editing'
  | 'review'
  | 'scheduled'
  | 'published';

export interface Script {
  id: string;
  title: string;
  productId: string;
  objective: string;
  hookId: string;
  development: string;
  cta: string;
  estimatedTime: string; // e.g. "45s"
  checklist: { id: string; label: string; checked: boolean }[];
  sceneIds: string[]; // Banco de cenas utilizado
  referenceIds: string[]; // Referências utilizadas
  status: WorkflowStage;
  // Estúdio de Produção suggestions
  environmentId?: string;
  equipmentIds?: string[];
  backgroundId?: string;
  propIds?: string[];
  lightingId?: string;
  videoStyleId?: string;
}

export interface Environment {
  id: string;
  name: string;
  photo: string;
  description: string;
  bestTime: string;
  lightingType: 'natural' | 'artificial' | 'ambas';
  naturalLight: string;
  artificialLight: string;
  noiseLevel: 'baixo' | 'medio' | 'alto';
  availableBackground: string;
  predominantColors: string;
  notes: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface Equipment {
  id: string;
  name: string;
  photo: string;
  category: string;
  brand: string;
  purchaseDate: string;
  condition: 'excelente' | 'bom' | 'desgastado' | 'quebrado';
  notes: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface LightingConfig {
  id: string;
  name: string;
  photo: string;
  bestTime: string;
  environmentUsed: string;
  intensity: string;
  temperature: string;
  result: string;
  notes: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface Background {
  id: string;
  name: string;
  photo: string;
  predominantColor: string;
  style: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface Prop {
  id: string;
  name: string;
  photo: string;
  category: string;
  color: string;
  notes: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  exampleUrl?: string;
  productIds: string[];
  scriptIds: string[];
  sceneIds: string[];
  ideaIds: string[];
}

export interface Planning {
  id: string;
  scriptId: string;
  deadline: string;
  weekday: string;
  priority: 'baixa' | 'media' | 'alta';
  estimatedDuration: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  energyNeeded: 'baixa' | 'media' | 'alta';
  location: string;
  materialsNeeded: string;
  backlog: string; // Pendências
  notes: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface CustomChecklist {
  id: string;
  name: string;
  items: string[];
}

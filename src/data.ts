import { Product, Reference, Hook, Scene, Idea, Script, Planning, Category, Environment, Equipment, LightingConfig, Background, Prop, VideoStyle } from './types';

export const CATEGORIES: Category[] = [
  'Skincare',
  'Perfumes',
  'Maquiagem',
  'Cabelos',
  'Corpo',
  'Moda',
  'Casa',
  'Tecnologia',
  'Alimentação',
  'Lifestyle',
  'Outros'
];export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-gloss-oceane',
    name: 'Gloss Lip Glow',
    brand: 'Océane',
    category: 'Maquiagem',
    description: 'Gloss labial com brilho natural, textura ultra leve que não gruda e hidratação profunda através de óleo de esqualano e ácido hialurônico.',
    emotion: 'Autoconfiança e sofisticação no dia a dia. Sentir-se com lábios carnudos, saudáveis e elegantes de forma natural.',
    problemResolved: 'Lábios secos, glosses pegajosos que acumulam nos cantos e cabelo grudando na boca com qualquer vento.',
    transformation: 'De lábios sem vida e ressecados para uma boca super iluminada, com aspect de saúde, hidratação de luxo e volume discreto imediato.',
    sensation: 'Refrescância leve e toque aveludado, como uma seda nos lábios sem peso.',
    audience: 'Mulheres jovens e adultas entre 18 e 35 anos que buscam a estética Clean Girl, praticidade no dia a dia e valorizam marcas cruelty-free.',
    benefits: 'Hidratação prolongada de 8h, brilho espelhado luxuoso, aplicador anatômico macio, ativos de skincare integrados.',
    objections: '"É muito caro para um gloss comum", "Vai grudar no meu cabelo", "A cor some muito rápido".',
    keywords: ['clean girl', 'gloss de esqualano', 'labios hidratados', 'oceane glow', 'maquiagem natural'],
    purchaseDate: '2026-05-12',
    expiryDate: '2028-05-12',
    notes: 'A embalagem dourada suave fica maravilhosa em fotos com luz natural de final de tarde.',
    tags: ['Favorito', 'Estética Clean', 'Glow'],
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    relatedProductIds: ['prod-serum-niacinamida'],
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800'
    ],
    storageLocation: 'Gaveta Superior da Penteadeira de Maquiagem',
    value: 'R$ 49,90',
    purchaseLink: 'https://www.oceane.com.br/gloss-lip-glow-oceane/p',
    differentials: 'Fórmula enriquecida com óleo de esqualano puro e ácido hialurônico, textura não pegajosa exclusiva, aplicador jumbo anatômico para alta fixação e brilho espelhado que não escorre.'
  },
  {
    id: 'prod-perfume-libre',
    name: 'Libre Eau de Parfum',
    brand: 'Yves Saint Laurent',
    category: 'Perfumes',
    description: 'A fragrância da liberdade. Um perfume floral grandioso que combina a sensualidade da lavanda da França com a audácia da flor de laranjeira do Marrocos.',
    emotion: 'Poder pessoal, sofisticação extrema, luxo inabalável e sensualidade livre.',
    problemResolved: 'Fragrâncias doces enjoativas ou perfumes importados comuns que perdem a fixação em poucas horas.',
    transformation: 'Sentir-se imponente, elegante e marcar presença em qualquer ambiente através de um rastro marcante e magnético.',
    sensation: 'Empoderamento instantâneo, elegância clássica e frescor quente de alta costura.',
    audience: 'Mulheres independentes, confiantes, elegantes e apaixonadas por alta perfumaria e lifestyle luxuoso.',
    benefits: 'Fixação incrível de 12h, projeção alta nas primeiras horas, frasco icônico com design de joia de alta costura.',
    objections: '"Fragrância muito forte para o dia", "Preço muito elevado", "Lavanda parece perfume masculino".',
    keywords: ['ysl libre', 'perfume importado de luxo', 'grife lavanda', 'assinatura olfativa', 'unboxing perfume'],
    purchaseDate: '2026-04-01',
    expiryDate: '2029-04-01',
    notes: 'Usar o frasco dourado em superfícies de mármore com espelhos para gravar transições de luxo.',
    tags: ['Luxo', 'Importado', 'Noite'],
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    relatedProductIds: [],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    storageLocation: 'Prateleira Central do Armário de Perfumes',
    value: 'R$ 749,00',
    purchaseLink: 'https://www.yslbeauty.com.br/libre-eau-de-parfum/p',
    differentials: 'Design do frasco com o logo clássico da YSL esculpido em metal dourado de alta costura, fixação prolongada de lavanda floral e baunilha preta, versatilidade marcante que evoca a liberdade.'
  },
  {
    id: 'prod-serum-niacinamida',
    name: 'Sérum Hidratante Niacinamida 10%',
    brand: 'Simple',
    category: 'Skincare',
    description: 'Sérum facial de alta absorção para uniformização de tom, redução de poros dilatados e barreira cutânea fortalecida.',
    emotion: 'Paz ao olhar no espelho e ver a pele saudável, radiante e livre de manchas, sem precisar de maquiagem pesada.',
    problemResolved: 'Pele oleosa, manchas de acne persistentes, textura irregular e sensibilidade com outros ácidos fortes.',
    transformation: 'De uma barreira danificada e tom irregular para uma pele com viço saudável de spa, poros visivelmente menores e textura lisa.',
    sensation: 'Toque aquoso refrescante, rápida absorção sem resíduo pegajoso.',
    audience: 'Pessoas focadas em rotinas minimalistas de autocuidado, que sofrem com manchas de acne ou oleosidade excessiva.',
    benefits: 'Livre de parabenos e fragrância, hipoalergênico, controla oleosidade, restaura barreira natural.',
    objections: '"Niacinamida me dá espinhas no começo", "Marca de farmácia funciona?", "Demora para ver resultados".',
    keywords: ['niacinamida simple', 'skincare minimalista', 'poros dilatados', 'pele com acne', 'rotina skincare de luxo'],
    purchaseDate: '2026-06-15',
    expiryDate: '2028-06-15',
    notes: 'Perfeito para o clássico take da pipeta pingando o produto na bochecha em câmera lenta (slow motion).',
    tags: ['Dia a Dia', 'Skincare', 'Textura Hidratante'],
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    relatedProductIds: ['prod-gloss-oceane'],
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800'
    ],
    storageLocation: 'Organizador de Skincare no Banheiro',
    value: 'R$ 54,90',
    purchaseLink: 'https://www.simple.com.br/serum-niacinamida-10/p',
    differentials: 'Fórmula 100% vegana, livre de álcool, corantes e perfumes sintéticos. Niacinamida altamente concentrada de alta tolerabilidade clínica, ideal para peles extremamente sensíveis e reativas.'
  }
];

export const INITIAL_HOOKS: Hook[] = [
  {
    id: 'hook-1',
    title: 'POV: O gloss de grife do seu banheiro',
    category: 'pov',
    content: 'POV: Você finalmente encontrou o único gloss que dá o efeito de boca de milhões sem grudar um único fio de cabelo no vento.',
    productIds: ['prod-gloss-oceane']
  },
  {
    id: 'hook-2',
    title: 'O segredo da estética Clean Girl',
    category: 'curiosidade',
    content: 'O segredo mais bem guardado das influenciadoras de beleza para aquela pele com viço natural de quem bebe 3 litros de água por dia...',
    productIds: ['prod-serum-niacinamida', 'prod-gloss-oceane']
  },
  {
    id: 'hook-3',
    title: 'ASMR Sons do Frasco Libre',
    category: 'asmr',
    content: '[Sem falar nada] Som satisfatório da tampa de metal batendo, o spray perfeito e o frasco deslizando no mármore dourado.',
    productIds: ['prod-perfume-libre']
  },
  {
    id: 'hook-4',
    title: 'A economia que parece luxo puro',
    category: 'luxo',
    content: 'Como elevar a sua rotina de autocuidado gastando menos de 60 reais com um produto que entrega a mesma qualidade das marcas internacionais.',
    productIds: ['prod-serum-niacinamida']
  },
  {
    id: 'hook-5',
    title: '3 erros cometidos com hidratação labial',
    category: 'erro',
    content: 'Pare de fazer isso agora mesmo se você quer uma boca hidratada de verdade neste inverno.',
    productIds: ['prod-gloss-oceane']
  }
];

export const INITIAL_REFERENCES: Reference[] = [
  {
    id: 'ref-1',
    title: 'Gloss Viral Glow Transição Labial',
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    link: 'https://www.tiktok.com/@creator/video/12345678',
    notes: 'Essa criadora usa uma iluminação de janela maravilhosa. Copiar a transição onde ela aproxima o gloss da câmera e corta para a boca já pintada.',
    tags: ['Transição', 'Luz Natural', 'Sucesso'],
    productId: 'prod-gloss-oceane',
    category: 'Maquiagem',
    platform: 'tiktok',
    status: 'inspiration'
  },
  {
    id: 'ref-2',
    title: 'Unboxing Estético Perfume Premium',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    link: 'https://www.instagram.com/p/B89zxyLp/',
    notes: 'Focar na retirada do plástico protetor de forma extremamente lenta e silenciosa para gerar estímulo de ASMR auditivo.',
    tags: ['Estética', 'ASMR', 'Sofisticado'],
    productId: 'prod-perfume-libre',
    category: 'Perfumes',
    platform: 'instagram',
    status: 'favorite'
  },
  {
    id: 'ref-3',
    title: 'Rotina de Banheiro Estilo Pinterest',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    link: 'https://pinterest.com/pin/987654321',
    notes: 'Inspirar-se na paleta de cores neutras e beges para organizar os itens na bancada de mármore clara antes de gravar o sérum facial.',
    tags: ['Aesthetic', 'Organização', 'Bege'],
    productId: 'prod-serum-niacinamida',
    category: 'Skincare',
    platform: 'pinterest',
    status: 'adapt'
  }
];

export const INITIAL_SCENES: Scene[] = [
  {
    id: 'scene-1',
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    name: 'Cena Aplicando nos Lábios',
    description: 'Close-up extremo do aplicador macio depositando o gloss brilhoso nos lábios. Movimentos bem lentos.',
    productIds: ['prod-gloss-oceane'],
    type: 'close',
    isRecorded: true
  },
  {
    id: 'scene-2',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    name: 'Cena Retirando a Tampa',
    description: 'Take em slow motion retirando a tampa preta e dourada do Libre YSL com fundo de espelho desfocado.',
    productIds: ['prod-perfume-libre'],
    type: 'slowmotion',
    isRecorded: true
  },
  {
    id: 'scene-3',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
    name: 'Cena Gotas de Sérum na Bochecha',
    description: 'Pipeta de vidro se aproximando e pingando uma gota do sérum translúcido na bochecha, escorrendo devagar.',
    productIds: ['prod-serum-niacinamida'],
    type: 'aplicacao',
    isRecorded: false
  },
  {
    id: 'scene-4',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    name: 'Cena Textura Gloss no Braço',
    description: 'Pincelando o aplicador de esqualano no antebraço para mostrar o reflexo e a transparência em luz natural.',
    productIds: ['prod-gloss-oceane'],
    type: 'detalhe',
    isRecorded: false
  }
];

export const INITIAL_SCRIPTS: Script[] = [
  {
    id: 'script-1',
    title: 'Get Ready With Me Estética Clean',
    productId: 'prod-gloss-oceane',
    objective: 'Demonstrar o produto integrado em uma maquiagem natural de "acordei linda" de forma aspiracional e estética.',
    hookId: 'hook-1',
    development: 'Começo mostrando meu rosto limpo pela manhã. Aplico o sérum de niacinamida para dar o viço. Em seguida, finalizo apenas preenchendo as sobrancelhas e aplicando o Gloss Lip Glow da Océane. Explico como a fórmula com esqualano mantém meus lábios macios sem aquela sensação incômoda de gloss pegajoso.',
    cta: 'Se você também cansou de cabelo grudando no gloss, clica no link da minha bio para testar o Lip Glow.',
    estimatedTime: '45 segundos',
    checklist: [
      { id: 'chk-1', label: 'Separar o gloss e o sérum limpos', checked: true },
      { id: 'chk-2', label: 'Limpar a lente da câmera do celular', checked: true },
      { id: 'chk-3', label: 'Montar ring light na janela para mix de luzes', checked: true },
      { id: 'chk-4', label: 'Gravar take inicial de rosto limpo', checked: true },
      { id: 'chk-5', label: 'Gravar aplicação de gloss em super macro', checked: false },
      { id: 'chk-6', label: 'Editar no CapCut com música lo-fi', checked: false }
    ],
    sceneIds: ['scene-1', 'scene-3'],
    referenceIds: ['ref-1', 'ref-3'],
    status: 'recording'
  },
  {
    id: 'script-2',
    title: 'Unboxing Sensorial Libre YSL',
    productId: 'prod-perfume-libre',
    objective: 'Vídeo focado em ASMR e sensação de luxo supremo ao receber o produto de alta perfumaria.',
    hookId: 'hook-3',
    development: 'Zero falas nos primeiros 15 segundos, apenas o som plástico do unboxing, o corte preciso da tesoura e a textura da caixa texturizada da YSL. Depois, introduzo o frasco com iluminação de final de tarde e borrifo o perfume em câmera lenta com luz de fundo contra o Sol.',
    cta: 'Qual perfume te faz sentir mais poderosa? Me conta nos comentários.',
    estimatedTime: '30 segundos',
    checklist: [
      { id: 'chk-10', label: 'Produto limpo e caixa intacta', checked: true },
      { id: 'chk-11', label: 'Microfone de lapela bem posicionado', checked: true },
      { id: 'chk-12', label: 'Fundo escuro estético', checked: true },
      { id: 'chk-13', label: 'Cena principal gravada', checked: true },
      { id: 'chk-14', label: 'Edição finalizada', checked: true },
      { id: 'chk-15', label: 'Publicado e engajando', checked: true }
    ],
    sceneIds: ['scene-2'],
    referenceIds: ['ref-2'],
    status: 'published'
  },
  {
    id: 'script-3',
    title: 'Rotina Minimalista Anti-Poros',
    productId: 'prod-serum-niacinamida',
    objective: 'Gerar autoridade e ensinar como o produto funciona de maneira simples e didática para quem tem pele oleosa.',
    hookId: 'hook-2',
    development: 'Mostro uma foto antiga de close de poros abertos e explico que niacinamida é o único ativo que resolveu minha textura. Faço o take da pipeta escorrendo suavemente na bochecha e mostro a absorção incrível dele.',
    cta: 'Diga adeus aos poros abertos. Use o sérum Simple diariamente. Link nos stories!',
    estimatedTime: '50 segundos',
    checklist: [
      { id: 'chk-20', label: 'Organizar b-roll de pele saudável', checked: true },
      { id: 'chk-21', label: 'Luz natural do sol da manhã montada', checked: true },
      { id: 'chk-22', label: 'Roteiro decorado e estruturado', checked: true },
      { id: 'chk-23', label: 'Gravação da voz de fundo', checked: false },
      { id: 'chk-24', label: 'Legenda editada e sincronizada', checked: false }
    ],
    sceneIds: ['scene-3'],
    referenceIds: ['ref-3'],
    status: 'editing'
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    title: 'Misturar Gloss com Batom Marrom',
    description: 'Criar uma transição labial usando contorno marrom escuro estilo anos 90 e o Gloss Océane por cima para o brilho perfeito.',
    productId: 'prod-gloss-oceane',
    category: 'Maquiagem',
    referenceId: 'ref-1',
    scriptId: '',
    hookId: 'hook-1',
    sceneId: 'scene-1',
    createdAt: '2026-06-28'
  },
  {
    id: 'idea-2',
    title: 'Onde aplicar perfume para durar mais',
    description: 'Vídeo curto de utilidade pública mostrando os pontos de pulsação aplicando o Libre YSL.',
    productId: 'prod-perfume-libre',
    category: 'Perfumes',
    referenceId: 'ref-2',
    scriptId: '',
    hookId: 'hook-3',
    sceneId: 'scene-2',
    createdAt: '2026-06-30'
  }
];

export const INITIAL_PLANNINGS: Planning[] = [
  {
    id: 'plan-1',
    scriptId: 'script-1',
    deadline: '2026-07-04',
    weekday: 'Sábado',
    priority: 'alta',
    estimatedDuration: '2h de produção',
    difficulty: 'medio',
    energyNeeded: 'media',
    location: 'Bancada do Banheiro e Quarto com Luz de Janela',
    materialsNeeded: 'Espelho redondo, faixa de cabelo neutra, toalha branca plush, pincel de blush',
    backlog: 'Fazer o take do esmalte combinando com o gloss para estética Clean',
    notes: 'A trilha sonora precisa ser um jazz suave ou piano instrumental no estilo TikTok aesthetic.'
  },
  {
    id: 'plan-2',
    scriptId: 'script-2',
    deadline: '2026-06-25',
    weekday: 'Quinta-feira',
    priority: 'media',
    estimatedDuration: '1h de produção',
    difficulty: 'facil',
    energyNeeded: 'baixa',
    location: 'Mesa de cabeceira de mármore no quarto',
    materialsNeeded: 'Vela perfumada acesa, bandeja dourada, caixa lacrada do perfume',
    backlog: 'Vídeo gravado e publicado com ótimo alcance.',
    notes: 'Deixar o foco manual fixado no frasco para a luz de fundo estourar maravilhosamente.'
  },
  {
    id: 'plan-3',
    scriptId: 'script-3',
    deadline: '2026-07-02',
    weekday: 'Quinta-feira',
    priority: 'alta',
    estimatedDuration: '1.5h de produção',
    difficulty: 'medio',
    energyNeeded: 'alta',
    location: 'Espelho do banheiro principal',
    materialsNeeded: 'Água micelar, algodão macio, frasco do sérum limpo',
    backlog: 'Falta gravar o take da pipeta escorrendo e fazer a gravação da locução de áudio.',
    notes: 'Manter a locução calma, em tom intimista de conversa de amigas.'
  }
];

export const DEFAULT_CHECKLIST: string[] = [
  'Produto separado',
  'Produto limpo',
  'Ambiente preparado',
  'Luz pronta',
  'Roteiro pronto',
  'Áudio escolhido',
  'Cena principal gravada',
  'B-Roll gravado',
  'Thumb pronta',
  'Editado',
  'Legenda pronta',
  'Publicado'
];

export const MOTIVATIONAL_QUOTES = [
  "A sua criatividade é a assinatura que você deixa na alma do seu conteúdo. ✨",
  "O mundo precisa da sua visão estética única hoje. Crie com paixão!",
  "A consistência encontra o ritmo na harmonia dos seus detalhes. 💫",
  "Grave com o coração, edite com carinho, publique com orgulho. 🌸",
  "Cada take é um pedaço de arte que você compartilha com o mundo.",
  "Estética e organização caminham de mãos dadas para criar mágica. 🥐"
];

export const INITIAL_ENVIRONMENTS: Environment[] = [
  {
    id: 'env-banheiro',
    name: 'Banheiro Principal',
    photo: 'https://images.unsplash.com/photo-1552321554-5fecd8c7856a?auto=format&fit=crop&q=80&w=600',
    description: 'Banheiro com pia de mármore branco, espelho redondo iluminado por LED e tons neutros de cinza e bege.',
    bestTime: 'Manhã (08:00 - 10:30) - Ótima luz difusa',
    lightingType: 'ambas',
    naturalLight: 'Indireta vinda de janela basculante alta',
    artificialLight: 'Fita de LED 4000k atrás do espelho e spots dicróicos embutidos',
    noiseLevel: 'baixo',
    availableBackground: 'Bancada de mármore e box de vidro com revestimento estético',
    predominantColors: 'Branco, Mármore, Bege, Cinza Claro',
    notes: 'Excelente para rotinas de skincare, aplicação de tônicos, séruns e close-ups de espuma e sabonete.',
    productIds: ['prod-serum-niacinamida', 'prod-gloss-oceane'],
    scriptIds: ['script-1', 'script-3'],
    sceneIds: ['scene-1', 'scene-3'],
    ideaIds: ['idea-1']
  },
  {
    id: 'env-quarto',
    name: 'Quarto & Penteadeira',
    photo: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=600',
    description: 'Quarto aconchegante com cabeceira estofada em linho cru, mesa de cabeceira de madeira clara e penteadeira com espelho camarim.',
    bestTime: 'Tarde (14:00 - 16:30) - Luz direta mais quente',
    lightingType: 'natural',
    naturalLight: 'Luz direta e forte de janela ampla, com cortina translúcida para suavizar',
    artificialLight: 'Lâmpadas globo quente de 3000k no espelho camarim',
    noiseLevel: 'baixo',
    availableBackground: 'Cabeceira neutra, lençóis brancos em algodão egípcio e prateleira de livros estéticos',
    predominantColors: 'Nude, Branco, Madeira Clara, Fendi',
    notes: 'Ideal para vídeos de Get Ready With Me (GRWM), resenhas de maquiagem na penteadeira e transições de looks de moda.',
    productIds: ['prod-gloss-oceane', 'prod-perfume-libre'],
    scriptIds: ['script-1', 'script-2'],
    sceneIds: ['scene-1', 'scene-2'],
    ideaIds: []
  },
  {
    id: 'env-sala',
    name: 'Sala de Estar Minimalista',
    photo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
    description: 'Sala de estar ampla com sofá boucle off-white, mesa de centro de travertino e vasos de cerâmica rústica.',
    bestTime: 'Meio do dia (11:00 - 13:30) - Alta luminosidade',
    lightingType: 'natural',
    naturalLight: 'Luz ampla e brilhante da porta de correr de vidro da varanda',
    artificialLight: 'Luminária de piso de design com cúpula de papel arroz e lâmpada quente',
    noiseLevel: 'medio',
    availableBackground: 'Parede de textura de cimento queimado claro, sofá boucle e poltrona de palhinha',
    predominantColors: 'Off-white, Travertino, Bege, Madeira de Demolição',
    notes: 'Perfeito para introduções de vídeos de lifestyle, unboxings estéticos na mesa de centro e takes de bem-estar.',
    productIds: ['prod-perfume-libre'],
    scriptIds: ['script-2'],
    sceneIds: [],
    ideaIds: []
  }
];

export const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: 'eq-iphone',
    name: 'iPhone 15 Pro Max 512GB',
    photo: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600',
    category: 'Celular',
    brand: 'Apple',
    purchaseDate: '2026-01-10',
    condition: 'excelente',
    notes: 'Gravar sempre no modo Cinema (4K 24fps) para profundidade de campo cinematográfica. Lente 3x excelente para texturas.',
    productIds: ['prod-gloss-oceane', 'prod-perfume-libre', 'prod-serum-niacinamida'],
    scriptIds: [],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'eq-tripe-manfrotto',
    name: 'Tripé Manfrotto Pro Compact',
    photo: 'https://images.unsplash.com/photo-1619597455322-4fbbd820250a?auto=format&fit=crop&q=80&w=600',
    category: 'Tripé',
    brand: 'Manfrotto',
    purchaseDate: '2026-02-15',
    condition: 'excelente',
    notes: 'Tripé pesado e muito estável. Excelente para tomadas panorâmicas suaves de unboxing e fotos de produtos de luxo.',
    productIds: [],
    scriptIds: [],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'eq-ringlight',
    name: 'Ring Light Ring 18" Premium',
    photo: 'https://images.unsplash.com/photo-1626266025191-4709849ef95c?auto=format&fit=crop&q=80&w=600',
    category: 'Ring Light',
    brand: 'GlowLED',
    purchaseDate: '2026-03-01',
    condition: 'bom',
    notes: 'Controle de temperatura de cor bi-color integrado. Usar difusor macio para evitar reflexo redondo muito forte nos olhos.',
    productIds: ['prod-gloss-oceane'],
    scriptIds: [],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'eq-microfone-rode',
    name: 'Microfone Rode Wireless ME',
    photo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600',
    category: 'Microfone',
    brand: 'Rode',
    purchaseDate: '2026-04-12',
    condition: 'excelente',
    notes: 'Incrível para gravação de ASMR direto no celular ou narrações nítidas sem chiado ao fundo.',
    productIds: ['prod-perfume-libre', 'prod-serum-niacinamida'],
    scriptIds: [],
    sceneIds: [],
    ideaIds: []
  }
];

export const INITIAL_LIGHTINGS: LightingConfig[] = [
  {
    id: 'light-window',
    name: 'Luz da Janela com Difusor',
    photo: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
    bestTime: '09:00 - 11:30',
    environmentUsed: 'Quarto ou Banheiro',
    intensity: 'Forte, porém suave (difundida)',
    temperature: '5000K (Neutra/Natural)',
    result: 'Sombras super suaves, realça cores reais dos cosméticos de skincare e maquiagem.',
    notes: 'Usar cortina branca translúcida ou rebatedor branco do lado oposto para preencher sombras do rosto.',
    productIds: ['prod-serum-niacinamida', 'prod-gloss-oceane'],
    scriptIds: ['script-1', 'script-3'],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'light-golden',
    name: 'Golden Hour Natural',
    photo: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=600',
    bestTime: '16:45 - 17:30',
    environmentUsed: 'Varanda ou Janela do Quarto',
    intensity: 'Média e direcional',
    temperature: '3200K (Quente / Âmbar)',
    result: 'Glow dourado luxuoso, brilho cintilante nos frascos e atmosfera intimista de conforto e autocuidado.',
    notes: 'Gravar texturas em close com o sol batendo de lado. O contraste do dourado do sol cria estética rica imediata.',
    productIds: ['prod-gloss-oceane', 'prod-perfume-libre'],
    scriptIds: ['script-1', 'script-2'],
    sceneIds: ['scene-1'],
    ideaIds: []
  }
];

export const INITIAL_BACKGROUNDS: Background[] = [
  {
    id: 'bg-marmore',
    name: 'Placa de Mármore Carrara Estética',
    photo: 'https://images.unsplash.com/photo-1618221823713-c89b1d78d21c?auto=format&fit=crop&q=80&w=600',
    predominantColor: 'Branco com veios cinza escuro',
    style: 'Luxo / Clean / Clássico',
    productIds: ['prod-perfume-libre', 'prod-gloss-oceane'],
    scriptIds: ['script-2'],
    sceneIds: ['scene-1'],
    ideaIds: []
  },
  {
    id: 'bg-minimalista-offwhite',
    name: 'Fundo Texturizado Areia / Off-white',
    photo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
    predominantColor: 'Creme, Bege Claro, Areia',
    style: 'Minimalista / Wabi-sabi / Conforto',
    productIds: ['prod-serum-niacinamida'],
    scriptIds: ['script-3'],
    sceneIds: [],
    ideaIds: []
  }
];

export const INITIAL_PROPS: Prop[] = [
  {
    id: 'prop-vela',
    name: 'Vela Aromática de Cera de Soja',
    photo: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600',
    category: 'Velas',
    color: 'Creme / Branco com pavio de madeira',
    notes: 'Acender sempre 5 minutos antes de gravar para que a poça de cera líquida brilhe e o pavio crie uma chama alta.',
    productIds: ['prod-perfume-libre'],
    scriptIds: ['script-2'],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'prop-bandeja-ouro',
    name: 'Bandeja Espelhada Dourada de Luxo',
    photo: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600',
    category: 'Bandejas',
    color: 'Dourado Escovado / Espelho',
    notes: 'Reflete as luzes de velas e bokeh de fundo maravilhosamente. Perfeita para apoiar vidros de perfumes e glosses.',
    productIds: ['prod-perfume-libre', 'prod-gloss-oceane'],
    scriptIds: ['script-1', 'script-2'],
    sceneIds: [],
    ideaIds: []
  }
];

export const INITIAL_VIDEO_STYLES: VideoStyle[] = [
  {
    id: 'style-ugc-lifestyle',
    name: 'UGC Lifestyle Estético',
    description: 'Foco na incorporação natural do produto em uma rotina sofisticada e aconchegante, sem apelo comercial agressivo. Usa cortes rítmicos rápidos e música lo-fi/soft jazz.',
    exampleUrl: 'https://tiktok.com',
    productIds: ['prod-gloss-oceane', 'prod-serum-niacinamida'],
    scriptIds: ['script-1', 'script-3'],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'style-asmr',
    name: 'ASMR Sensorial Extremo',
    description: 'Prioridade total para sons reais do produto: clique da tampa abrindo, som da pipeta, aplicação suave na pele, barulho de unhas de gel batendo no vidro (nail tapping) e trilha sonora quase imperceptível.',
    exampleUrl: 'https://tiktok.com',
    productIds: ['prod-perfume-libre', 'prod-serum-niacinamida'],
    scriptIds: ['script-3'],
    sceneIds: [],
    ideaIds: []
  },
  {
    id: 'style-unboxing-lux',
    name: 'Luxury Unboxing & Review',
    description: 'Estilo focado no prazer visual de abrir uma embalagem de alta costura ou produto premium. Iluminação de alto contraste, luvas de cetim, plano de câmera macro no lacre sendo removido de forma lenta.',
    exampleUrl: 'https://tiktok.com',
    productIds: ['prod-perfume-libre'],
    scriptIds: ['script-2'],
    sceneIds: [],
    ideaIds: []
  }
];


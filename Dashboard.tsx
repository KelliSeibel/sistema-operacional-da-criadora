/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkspaceState } from './types';

export const INITIAL_STATE: WorkspaceState = {
  projetos: [
    {
      id: 'proj-1',
      nome: 'TikTok',
      categoria: 'Criação de Conteúdo Orgânico',
      objetivo: 'Alcançar 100k seguidores e consolidar autoridade em criação de conteúdo digital',
      prioridade: 'Alta',
      status: 'Em andamento',
      dataInicio: '2026-01-10',
      proximaAcao: 'Criar cronograma de postagens para a próxima semana',
      observacoes: 'Focar em consistência e análise de métricas diárias.'
    },
    {
      id: 'proj-2',
      nome: 'UGC (User Generated Content)',
      categoria: 'Trabalho Autônomo / Freelance',
      objetivo: 'Fechar 5 novos contratos de marcas recorrentes por mês',
      prioridade: 'Alta',
      status: 'Em andamento',
      dataInicio: '2026-02-01',
      proximaAcao: 'Enviar portfólio atualizado para agências de assessoria',
      observacoes: 'Excelente fonte de monetização direta de curto prazo.'
    },
    {
      id: 'proj-3',
      nome: 'Projeto Aurora',
      categoria: 'Infoproduto / Lançamento',
      objetivo: 'Desenvolver e lançar o e-book/comunidade para criadoras iniciantes',
      prioridade: 'Alta',
      status: 'Planejado',
      dataInicio: '2026-07-15',
      proximaAcao: 'Definir estrutura de módulos e sumário do e-book',
      observacoes: 'Será o principal pilar de renda passiva.'
    },
    {
      id: 'proj-4',
      nome: 'A.RS Motors',
      categoria: 'Social Media / Cliente',
      objetivo: 'Aumentar o engajamento local em 40% através de Reels dinâmicos',
      prioridade: 'Média',
      status: 'Em andamento',
      dataInicio: '2026-03-15',
      proximaAcao: 'Gravar b-roll na concessionária na quinta-feira',
      observacoes: 'Foco em estética automotiva moderna e storytelling.'
    },
    {
      id: 'proj-5',
      nome: 'ENEM',
      categoria: 'Estudos Acadêmicos',
      objetivo: 'Alcançar média superior a 780 pontos para aprovação',
      prioridade: 'Alta',
      status: 'Em andamento',
      dataInicio: '2026-01-05',
      proximaAcao: 'Fazer simulado de matemática e redação neste domingo',
      observacoes: 'Requer 3 horas de estudo focado diário.'
    },
    {
      id: 'proj-6',
      nome: 'Estudos de Marketing',
      categoria: 'Autoaperfeiçoamento',
      objetivo: 'Dominar estratégias de marketing de resposta direta e funis',
      prioridade: 'Média',
      status: 'Em andamento',
      dataInicio: '2026-01-01',
      proximaAcao: 'Finalizar resumo do curso de Tráfego de Atração',
      observacoes: 'Aplicar os conceitos imediatamente nos roteiros de UGC.'
    },
    {
      id: 'proj-7',
      nome: 'Estudos de Branding',
      categoria: 'Autoaperfeiçoamento',
      objetivo: 'Construir posicionamento premium inabalável nas redes sociais',
      prioridade: 'Média',
      status: 'Em andamento',
      dataInicio: '2026-02-10',
      proximaAcao: 'Refazer a identidade visual dos destaques do Instagram',
      observacoes: 'Branding é o que as pessoas dizem sobre você quando você sai da sala.'
    },
    {
      id: 'proj-8',
      nome: 'Leituras',
      categoria: 'Hábito Pessoal / Desenvolvimento',
      objetivo: 'Ler 12 livros estratégicos de negócios, psicologia e storytelling no ano',
      prioridade: 'Baixa',
      status: 'Em andamento',
      dataInicio: '2026-01-01',
      proximaAcao: 'Ler capítulo 4 do livro atual',
      observacoes: 'Foco em absorção ativa e anotação de insights úteis.'
    }
  ],
  produtosUgc: [
    {
      id: 'prod-1',
      nome: 'Sérum Hidratante Glow',
      marca: 'Lumière Skin',
      categoria: 'Cosméticos / Skincare',
      link: 'https://lumiere-skin.example.com/serum-glow',
      fotos: '🧴',
      jaGravei: true,
      videosGravados: 3,
      melhorVideo: 'Rotina Noturna com Glow - 150k views',
      dataGravacao: '2026-06-15',
      status: 'Concluído',
      caracteristicas: 'Textura ultra-leve, ácido hialurônico a 2%, extrato de chá verde, frasco conta-gotas de vidro fosco minimalista.',
      beneficios: 'Hidrata profundamente sem pesar, deixa um brilho natural (dewy skin), reduz a aparência de poros em 2 semanas.',
      problemasQueResolve: 'Pele ressecada e sem vida sob a maquiagem, oleosidade rebote provocada por desidratação.',
      desejosQueDesperta: 'Pele perfeita de "nasci assim", sensação de luxo e autocuidado de spa rico dentro de casa.',
      emocoes: 'Autoconfiança, frescor, relaxamento, satisfação sensorial ao aplicar o conta-gotas gelado.',
      publicoAlvo: 'Mulheres de 18 a 35 anos que amam estética clean girl, usam maquiagem diariamente e sofrem com pele seca ou mista.',
      objecoes: '"É muito caro para um hidratante", "Vai deixar minha pele oleosa", "Já usei outros que deram espinhas".',
      gatilhosMentais: 'Prova Social (antes e depois real), Autoridade (ingredientes dermatologicamente testados), Exclusividade.',
      ideiasDeVideos: '1. "Se você usa maquiagem e pula esse passo, sua pele vai craquelar."\n2. ASMR abrindo a embalagem e aplicando na luz natural.',
      roteirosIds: ['rot-1'],
      videosIds: ['vid-1'],
      ganchosIds: ['gan-1', 'gan-2'],
      referenciasIds: ['ref-1']
    },
    {
      id: 'prod-2',
      nome: 'Planner Digital Foco Extra',
      marca: 'Astro Studio',
      categoria: 'Produtividade / Papelaria',
      link: 'https://astro-studio.example.com/planner-foco',
      fotos: '📅',
      jaGravei: false,
      videosGravados: 0,
      melhorVideo: '-',
      dataGravacao: '',
      status: 'Disponível',
      caracteristicas: 'Template editável no Notion com visão mensal, semanal, rastreador de hábitos, controle financeiro e banco de ideias.',
      beneficios: 'Centraliza toda a rotina em um único lugar acessível por celular ou computador. Design estético em tons pastéis e intuitivo.',
      problemasQueResolve: 'Procrastinação, anotações perdidas em papéis espalhados, falta de clareza sobre as metas diárias.',
      desejosQueDesperta: 'Sensação de controle total da vida, estética de garota organizada de Pinterest, produtividade sem estresse.',
      emocoes: 'Tranquilidade, clareza mental, foco, empolgação de riscar tarefas concluídas.',
      publicoAlvo: 'Estudantes (ENEM/vestibulares) e jovens criadoras de conteúdo que se sentem sobrecarregadas com mil tarefas.',
      objecoes: '"Não sei usar o Notion", "Vou comprar e deixar parado igual aos outros", "Prefiro papel".',
      gatilhosMentais: 'Praticidade (mostrando cliques fáceis), Facilidade de Uso, Antecipação do resultado organizado.',
      ideiasDeVideos: '1. Tour rápido pela minha central de produtividade: como organizo o ENEM e o TikTok ao mesmo tempo.\n2. Do caos à calma em 3 minutos.',
      roteirosIds: [],
      videosIds: [],
      ganchosIds: ['gan-3'],
      referenciasIds: []
    }
  ],
  ideiasConteudo: [
    {
      id: 'idea-1',
      titulo: 'Como conciliar o ENEM e a Criação de Conteúdo sem pirar',
      categoria: 'Rotina',
      projetoId: 'proj-1',
      produtoId: 'prod-2',
      objetivo: 'Engajamento e conexão emocional com o público estudantil',
      plataforma: 'TikTok',
      formato: 'TikTok',
      ganchoId: 'gan-3',
      cta: 'Comente como você se organiza atualmente!',
      dificuldade: 'Média',
      tempoEstimado: '1 hora de roteiro + gravação',
      status: 'Postado',
      dataCriacao: '2026-06-10',
      dataGravacao: '2026-06-12',
      dataPostagem: '2026-06-14',
      resultado: '45.200 views, 4.200 curtidas',
      observacoes: 'Vídeo performou super bem porque a dor de falta de tempo é gigante.'
    },
    {
      id: 'idea-2',
      titulo: 'ASMR Skincare Estética Clean Girl com Lumière Glow',
      categoria: 'ASMR',
      projetoId: 'proj-2',
      produtoId: 'prod-1',
      objetivo: 'UGC focado em estética e conversão de vendas',
      plataforma: 'Instagram',
      formato: 'Reels',
      ganchoId: 'gan-2',
      cta: 'Clique no link da bio para garantir o seu com 10% de desconto',
      dificuldade: 'Fácil',
      tempoEstimado: '30 minutos',
      status: 'Pronto',
      dataCriacao: '2026-06-20',
      dataGravacao: '2026-06-25',
      dataPostagem: '',
      resultado: 'Pronto para postar no reels do portfólio',
      observacoes: 'Som de vidro e textura estão excelentes.'
    },
    {
      id: 'idea-3',
      titulo: 'Por que o UGC é o melhor trabalho para quem tem vergonha de aparecer',
      categoria: 'Educação',
      projetoId: 'proj-2',
      produtoId: 'prod-1',
      objetivo: 'Atrair interessadas para o Projeto Aurora',
      plataforma: 'TikTok',
      formato: 'TikTok',
      ganchoId: 'gan-1',
      cta: 'Acesse o link no perfil para entrar na lista de espera do Projeto Aurora',
      dificuldade: 'Média',
      tempoEstimado: '45 minutos',
      status: 'Roteirizando',
      dataCriacao: '2026-06-29',
      dataGravacao: '',
      dataPostagem: '',
      resultado: '-',
      observacoes: 'Focar em mostrar apenas as mãos segurando o produto no começo para reforçar o gancho.'
    }
  ],
  roteiros: [
    {
      id: 'rot-1',
      titulo: 'Roteiro - ASMR Sensorial Lumière',
      produtoId: 'prod-1',
      ideiaId: 'idea-2',
      objetivo: 'Venda direta através do apelo estético visual e sonoro',
      tipo: 'UGC Orgânico',
      gancho: '[SOM DO VIDRO BATENDO LEVEMENTE] "Se você quer aquela pele que brilha de longe sem parecer oleosa..."',
      desenvolvimento: 'Mostra o conta-gotas retirando o produto em slow motion. Aplica 3 gotas nas bochechas. Espalha suavemente mostrando a transição imediata de pele opaca para iluminada e viçosa. Close no produto refletindo a luz do sol.',
      finalizacao: 'Mostra o frasco esteticamente posicionado ao lado de flores brancas.',
      cta: 'Garanta sua dose diária de Glow clicando no link.',
      tempo: '25s',
      status: 'Concluído',
      videoGravado: true,
      videoPublicadoId: 'vid-1',
      resultado: 'Excelente aceitação da marca.'
    }
  ],
  ganchos: [
    {
      id: 'gan-1',
      gancho: 'Você não precisa ter 10 mil seguidores ou até mesmo aparecer para ganhar dinheiro gravando vídeos...',
      categoria: 'Curiosidade',
      tipoEmocao: 'Alívio e Esperança',
      objetivo: 'Quebrar a objeção de que precisa ser famosa para ser paga por marcas.',
      exemplo: 'Mostrar bastidores gravando um produto apenas com as mãos no enquadramento.',
      melhorPara: 'Venda do Projeto Aurora (Transição de carreira)',
      retencaoEsperada: 'Alta',
      jaUtilizei: true,
      funcionou: 'Sim, gerou muitos comentários perguntando "como?"'
    },
    {
      id: 'gan-2',
      gancho: '[Som de textura cremosa espalhando] + "Essa é a única coisa que salvou minha maquiagem de craquelar no frio"',
      categoria: 'Contraste',
      tipoEmocao: 'Desejo de Solução',
      objetivo: 'Identificar com um problema comum de quem usa maquiagem diária.',
      exemplo: 'Pele com base craquelada de um lado, e pele macia do outro.',
      melhorPara: 'UGC Skincare / Lumière skin',
      retencaoEsperada: 'Alta',
      jaUtilizei: true,
      funcionou: 'Sim, prendeu a atenção dos primeiros 3 segundos perfeitamente.'
    },
    {
      id: 'gan-3',
      gancho: 'POV: Você estuda pro ENEM, cuida de duas contas de conteúdo e ainda tenta ter vida social...',
      categoria: 'POV',
      tipoEmocao: 'Identificação e Empatia',
      objetivo: 'Gerar conexão profunda com estudantes que sofrem com rotina exaustiva.',
      exemplo: 'Montagem rápida de acordar às 5h da manhã com cara de sono, notebook aberto e café.',
      melhorPara: 'Planner Digital / Estilo de vida organizadora',
      retencaoEsperada: 'Média',
      jaUtilizei: true,
      funcionou: 'Parcialmente'
    }
  ],
  referencias: [
    {
      id: 'ref-1',
      titulo: 'Inspiração UGC Skincare Premium',
      link: 'https://tiktok.example.com/share/video/ugc-premium',
      criador: 'Estela_Skincare',
      plataforma: 'TikTok',
      produtoId: 'prod-1',
      categoria: 'Skincare Estético',
      porQueGostei: 'A transição de iluminação natural e o áudio relaxante criam uma atmosfera de altíssimo valor percebido.',
      gancho: 'Isso aqui deveria ser ilegal de tão bom...',
      movimentoCamera: 'Pan horizontal lento aproximando do frasco, zoom digital suave na pós-produção.',
      iluminacao: 'Golden hour pura vinda de uma janela lateral grande. Sem luz artificial direta.',
      edicao: 'Cortes secos e rápidos no ritmo da batida lo-fi de fundo.',
      audio: 'Lo-fi relaxante com ruído de natureza sutil de fundo misturado aos barulhos do ASMR.',
      cta: 'Link na bio com meu cupom ESTELA10',
      oQueAdaptar: 'Usar o mesmo esquema de Golden Hour lateral para gravar o produto Lumière Skin na minha penteadeira branca.'
    }
  ],
  bancoCenas: [
    {
      id: 'scene-1',
      nome: 'Abertura de Embalagem (Unboxing Estético)',
      categoria: 'Transições / Unboxing',
      produtoId: 'prod-1',
      local: 'Mesa de madeira clara perto da janela',
      equipamento: 'iPhone 13, tripé de mesa e luz natural',
      descricao: 'Corte rápido rasgando a fita adesiva de papel craft, mostrando o papel de seda se abrindo e revelando o frasco perfeitamente embalado com um bilhete.'
    },
    {
      id: 'scene-2',
      nome: 'Close do Gotejamento',
      categoria: 'Textura / ASMR',
      produtoId: 'prod-1',
      local: 'Fundo infinito de azulejos do banheiro higienizado',
      equipamento: 'iPhone com lente macro instalada',
      descricao: 'Gota do sérum caindo lentamente da ponta do conta-gotas de vidro direto em uma colher de acrílico transparente para destacar a consistência aquosa brilhante.'
    }
  ],
  psicologiaConsumidor: [
    {
      id: 'psic-1',
      desejo: 'Sentir-se bonita e confiante com a "pele perfeita"',
      medo: 'Sofrer com julgamentos por imperfeições, poros dilatados ou maquiagem grosseira.',
      problema: 'Investir fortunas em cosméticos caros que prometem milagres e deixam a pele oleosa ou irritada.',
      sonho: 'Ter aquela pele de modelo iluminada e lisa (glass skin) sem precisar passar base pesada todo santo dia.',
      objecao: 'Todos esses vídeos de influencer são patrocinados e cheios de filtros de imagem.',
      gatilhoMental: 'Prova Social (mostrar closes reais na luz natural sem nenhum filtro)',
      emocao: 'Alívio, pertencimento, prazer estético de se cuidar.',
      necessidade: 'Segurança de investir em um cosmético limpo e que entrega o resultado prometido de hidratação profunda.',
      exemplosAplicacao: 'Nos roteiros de Lumière Skin, focar em mostrar a pele de pertinho, contra a luz do sol, provando que o brilho é real e não de filtro.',
      produtosIds: ['prod-1']
    }
  ],
  estudos: [
    {
      id: 'est-1',
      tema: 'Estratégias de Posicionamento Premium',
      livroId: 'read-1',
      curso: 'Mentoria Creator de Elite',
      autor: 'Clarice Mendes',
      resumo: 'Como cobrar 3x mais por conteúdos de UGC criando uma marca pessoal forte e portfólio luxuoso. A diferença de preço está na percepção de valor estética e curadoria de marca.',
      insight: 'Marcas de luxo não vendem características (fórmula do sérum), vendem o estilo de vida que o produto proporciona (o ritual de autocuidado de uma mulher independente).',
      aplicacao: 'Mudar a estética do meu perfil de UGC. Substituir o fundo bagunçado por cantos minimalistas, luz suave e edição elegante.',
      ideiaConteudoId: 'idea-3',
      status: 'Concluído',
      projetosIds: ['proj-2', 'proj-7']
    }
  ],
  leituras: [
    {
      id: 'read-1',
      livro: 'Roube Como um Artista',
      autor: 'Austin Kleon',
      tema: 'Criatividade na Era Digital',
      capitulo: 'Capítulo 1 a 3',
      resumo: 'Nada é 100% original. Todo trabalho criativo é construído sobre o que veio antes. O importante é colecionar boas referências e misturá-las para encontrar sua própria voz.',
      frasesImportantes: '"Se você rouba de um autor, é plágio; se você rouba de muitos, é pesquisa."\n"Você é o resultado do que você deixa entrar na sua vida."',
      aplicacao: 'Criar uma pasta de referências de vídeos gringos que bombam e listar os ganchos mais fortes para adaptar ao público brasileiro.',
      conteudosGeradosIds: ['idea-1'],
      videosCriadosIds: [],
      statusLeitura: 'Concluído'
    },
    {
      id: 'read-2',
      livro: 'Gatilhos Mentais',
      autor: 'Gustavo Ferreira',
      tema: 'Copywriting e Persuasão',
      capitulo: 'Introdução e Reciprocidade',
      resumo: 'Estudo profundo dos estimulantes psicológicos que guiam as decisões do cérebro humano subconsciente ao comprar ou engajar.',
      frasesImportantes: '"Pessoas compram pela emoção e justificam com a razão."',
      aplicacao: 'Estruturar os roteiros de UGC usando sempre o gatilho da especificidade (ex: "reduz poros em 14 dias" em vez de "reduz rápido").',
      conteudosGeradosIds: ['idea-3'],
      videosCriadosIds: [],
      statusLeitura: 'Lendo'
    }
  ],
  videosPublicados: [
    {
      id: 'vid-1',
      titulo: 'Rotina de Skincare Clean Girl Estético',
      plataforma: 'TikTok',
      projetoId: 'proj-1',
      produtoId: 'prod-1',
      data: '2026-06-18',
      visualizacoes: 145000,
      curtidas: 18200,
      comentarios: 345,
      compartilhamentos: 890,
      salvamentos: 2400,
      retencao: '52% até a metade',
      resultado: 'Trouxe 1.200 novos seguidores e 45 cliques no link afiliado.',
      licoesAprendidas: 'O gancho sensorial de bater o frasco de vidro de skincare atraiu 20% a mais de retenção nos primeiros 3 segundos do que vídeos normais falados.'
    }
  ],
  metas: [
    {
      id: 'meta-1',
      meta: 'Alcançar 15.000 visualizações médias nos Reels de UGC do portfólio',
      projetoId: 'proj-2',
      prazo: '2026-08-01',
      prioridade: 'Alta',
      status: 'Em andamento',
      resultado: 'Média atual está em 8.500.',
      proximaAcao: 'Postar mais ganchos focados em dores reais do consumidor de skincare'
    },
    {
      id: 'meta-2',
      meta: 'Lançar a lista de espera oficial do Projeto Aurora',
      projetoId: 'proj-3',
      prazo: '2026-07-20',
      prioridade: 'Alta',
      status: 'Não iniciada',
      resultado: '-',
      proximaAcao: 'Finalizar a página de captura simples e o vídeo de anúncio'
    }
  ],
  tarefas: [
    {
      id: 'task-1',
      tarefa: 'Estruturar os criativos do produto Lumière Skin para portfólio',
      projetoId: 'proj-2',
      responsavel: 'Kelli',
      prioridade: 'Alta',
      prazo: '2026-07-03',
      status: 'Em andamento',
      tempoEstimado: '3 horas'
    },
    {
      id: 'task-2',
      tarefa: 'Estudar módulo de redação nota 1000 - Competência 3 e 4',
      projetoId: 'proj-5',
      responsavel: 'Kelli',
      prioridade: 'Alta',
      prazo: '2026-07-04',
      status: 'Pendente',
      tempoEstimado: '2 horas'
    },
    {
      id: 'task-3',
      tarefa: 'Escrever roteiro para o vídeo de lançamento do Projeto Aurora',
      projetoId: 'proj-3',
      responsavel: 'Kelli',
      prioridade: 'Alta',
      prazo: '2026-07-08',
      status: 'Pendente',
      tempoEstimado: '1.5 horas'
    }
  ],
  paginasFixas: [
    {
      id: 'pag-ugc',
      titulo: 'Manual de UGC',
      categoria: 'Manual',
      conteudo: `# Manual de UGC (User Generated Content)

Bem-vinda ao seu guia estratégico definitivo para atuar como criadora de conteúdo UGC profissional e fechar contratos premium com grandes marcas.

---

## 🎯 O que é UGC de Alto Nível?
Diferente de influenciadoras tradicionais, no UGC a marca contrata você para criar **conteúdos autênticos e orgânicos** para serem publicados no perfil *delas* ou como *anúncios pagos (Dark Posts/Spark Ads)*. 
- Você não precisa vender sua audiência;
- Você vende a sua **habilidade de prender a atenção e gerar desejo de compra**.

---

## 🛠️ Pilares do Conteúdo UGC Lucrativo
1. **Verossimilhança:** O vídeo precisa parecer um conteúdo orgânico de amigo para amigo, não um comercial de TV antigo.
2. **Qualidade Técnica Impecável:** Áudio limpo, luz suave de janela (natural) e enquadramentos focados no produto com closes macro de textura.
3. **Copywriting Persuasivo:** Ganchos fortes baseados na dor do consumidor, seguidos da demonstração real do produto (solução), quebra de objeções e chamada para ação (CTA) assertiva.

---

## ⚡ Estrutura de Roteiro Vendedor (Formula de 30 segundos)
- **0s - 3s (O Gancho):** Um estímulo visual chocante ou uma frase que toca na dor mais íntima do seu público-alvo.
- **3s - 12s (A Apresentação do Problema + Introdução do Produto):** "Eu costumava gastar rios de dinheiro tentando esconder minhas manchas até que..."
- **12s - 22s (Demonstração Teatral & Textura):** Aplicar o produto, mostrar close do aplicador, espalhar na pele, sons ASMR (tampa abrindo, toque de plástico/vidro).
- **22s - 27s (Quebra de Objeções):** "Diferente de outros óleos, ele absorve em menos de um minuto e não deixa aspecto gorduroso."
- **27s - 30s (CTA Direta):** "Garanta o seu com desconto usando meu cupom no link oficial da bio."

---

## 📈 Tabela de Preços Sugerida (Para Negociações)
- **1 Vídeo UGC Organico:** R$ 250 - R$ 400
- **Pacote com 3 Vídeos:** R$ 650 - R$ 900
- **Taxa de Direitos de Uso de Imagem (Ad Rights/Spark Ads - 3 meses):** +30% a 50% sobre o valor base do vídeo.
`
    },
    {
      id: 'pag-tiktok',
      titulo: 'Manual de TikTok',
      categoria: 'Manual',
      conteudo: `# Manual de Algoritmo do TikTok

O guia de otimização de retenção, SEO e viralização orgânica na plataforma mais veloz do mundo.

---

## 🧠 Como Funciona o Algoritmo (2026 Edition)
O TikTok prioriza principalmente três métricas essenciais para distribuir seu conteúdo aos feeds de recomendação:
1. **Retenção dos Primeiros 3 Segundos:** Se o usuário passar rápido pelo seu vídeo nos primeiros instantes, o vídeo é considerado "chato" e cai no limbo.
2. **Tempo de Assistência Médio (Watch Time):** Vídeos assistidos até o final (ou repetidos) ganham impulso absurdo de distribuição.
3. **Sinais Ativos de Engajamento:** Salvamentos (a métrica mais poderosa atualmente), compartilhamentos, comentários e curtidas, nessa ordem de peso.

---

## 🎯 Pilares da Viralização Consistente
- **SEO no TikTok:** O buscador do TikTok é o novo Google das novas gerações. Inclua palavras-chave de forma falada (o algoritmo transcreve seu áudio), escrita na tela (textos de legenda nativos), na legenda descritiva e nas hashtags estratégicas.
- **Micro-Edição Dinâmica:** Cortes a cada 1.5 ou 2.5 segundos para resetar o foco ocular do espectador. Use efeitos sonoros rápidos (whoosh, pop, click) para ancorar transições importantes.
- **Storytelling de Loop:** Formule o final do vídeo de forma que ele se encaixe perfeitamente com a frase de abertura do gancho, criando um loop infinito que aumenta drasticamente o watch time.

---

## 📅 Protocolo de Publicação Diário
1. Use áudios em alta de volume moderado (5% de som ambiente se houver voz).
2. Escreva uma legenda descritiva simples e focada em SEO com 3 a 5 hashtags muito direcionadas (ex: #ugcbrasil #rotinadeestudos #aestheticgirl).
3. Responda a todos os comentários da primeira hora com outras perguntas para induzir novas respostas.
`
    },
    {
      id: 'pag-storytelling',
      titulo: 'Manual de Storytelling',
      categoria: 'Manual',
      conteudo: `# Manual de Storytelling para Vídeos Curtos

A arte de envolver, emocionar e converter desconhecidos em fãs leais através da narrativa audiovisual.

---

## 🌋 A Jornada do Herói em 45 Segundos
Como contar uma história completa, prender a atenção e vender sem parecer chato:

1. **O Estado de Equilíbrio Frágil (0s - 5s):** Apresente o cenário de forma altamente visual. "Eu acreditava que acordar cedo era frescura de coach..."
2. **O Incidente Incitador (5s - 15s):** O momento em que o caos se instala. "Até que minhas notas despencaram e eu percebi que não daria tempo de estudar tudo pro ENEM."
3. **A Descoberta da Solução/Mentor (15s - 30s):** Introduzir o elemento salvador de forma humilde. "Foi aí que parei de resistir e montei essa central de organização minimalista."
4. **O Clímax / Prova Prática (30s - 40s):** Mostrar o antes e depois, o progresso nítido, o prazer da mudança. "Em duas semanas minha ansiedade reduziu pela metade e finalmente voltei a tirar simulados nota alta."
5. **A Resolução com CTA (40s - 45s):** Chamar para a ação alinhada. "Se você também está nesse barco, me segue que eu compartilho essa rotina toda semana."

---

## 🎨 Técnicas Narrativas Indispensáveis
- **Mostre, Não Conte (Show, Don't Tell):** Em vez de dizer "estou muito cansada hoje", mostre o close de um bocejo, o café quente sendo servido, a caneta caindo da mão. Deixe que o visual conte a história por si só.
- **Contraste Extremo:** O cérebro humano é viciado em contraste. Mostre o caos completo de uma mesa bagunçada e, em seguida, a transição para a mesa limpa e perfeita. O alívio visual prende o usuário no vídeo.
- **Conflito Imediato:** Comece a história pelo ponto de maior estresse ou clímax. Exemplo: "Eu quase desisti de tudo ontem..." em vez de "Ontem eu acordei, tomei banho e decidi estudar...".
`
    },
    {
      id: 'pag-branding',
      titulo: 'Manual de Branding',
      categoria: 'Manual',
      conteudo: `# Manual de Branding Pessoal Premium

Como moldar a percepção pública sobre o seu trabalho para ser vista como autoridade, atrair clientes sofisticados e cobrar valores mais altos.

---

## 🥂 O Que é Branding?
Branding não é apenas seu logotipo ou as cores da sua paleta. **Branding é a emoção e a imagem residual que ficam na mente das pessoas quando elas entram em contato com você.**

---

## 🪐 Os 3 Vetores do Posicionamento Premium
1. **Identidade Visual Impecável:**
   - Evite excesso de cores berrantes. Prefira paletas neutras (tons de creme, areia, cinza quente, preto, marrom, branco-gelo).
   - Tipografia limpa, minimalista e legível (Sans-serif moderna ou Serifas elegantes clássicas).
2. **Curadoria de Ambiente:**
   - O que está no fundo dos seus vídeos conta uma história. Um quarto desarrumado comunica descuido; uma mesa limpa com uma vela acesa e uma xícara bonita comunica elegância, foco e alto padrão.
3. **Tom de Voz e Linguagem:**
   - Fale com calma e pausas intencionais. Evite gírias excessivas se o objetivo for atrair marcas sofisticadas de skincare ou tecnologia. Demonstre autoridade técnica explicando os *porquês* com termos precisos.

---

## 💎 Ritual de Elevação de Valor Percebido
- Em cada vídeo, insira pelo menos um elemento estético de alto padrão: uma xícara de cerâmica artesanal, um livro bonito na mesa de cabeceira, iluminação suave, embalagens luxuosas de produtos ou um look minimalista (clean look).
- Nunca diga que seu serviço "é barato". Posicione seu trabalho como uma **solução altamente lucrativa de investimento estratégico** para a marca.
`
    },
    {
      id: 'pag-marketing',
      titulo: 'Manual de Marketing',
      categoria: 'Manual',
      conteudo: `# Manual de Marketing Digital de Atração

Estratégias de funil de vendas, atração orgânica e captação de clientes recorrentes.

---

## ⏳ O Funil de Conteúdo de 3 Etapas

### 1. Topo de Funil (Atração em Massa)
- **Objetivo:** Alcançar o maior número de visualizações qualificadas.
- **Temas:** Desafios comuns, piadas internas da nicho (relatabilidade), dicas rápidas, tendências adaptadas ou opiniões polêmicas leves.
- **Exemplo:** "O maior erro de organização que 90% dos estudantes cometem sem perceber."

### 2. Meio de Funil (Conexão & Educação)
- **Objetivo:** Educar a audiência sobre o seu método ou provar que você sabe do que está falando.
- **Temas:** Bastidores detalhados do seu dia, tutoriais passo a passo de como resolveu um problema específico, estudos de caso.
- **Exemplo:** "Como eu estruturei minha central de estudos no Notion do zero usando psicologia de retenção."

### 3. Base de Funil (Conversão de Vendas)
- **Objetivo:** Fazer o cliente tomar a decisão de compra imediata.
- **Temas:** Depoimentos, provas sociais, demonstrações aprofundadas dos benefícios reais, ofertas por tempo limitado com quebras assertivas de objeções.
- **Exemplo:** "Faltam apenas 3 dias para fechar as vagas da lista VIP do Projeto Aurora."

---

## 🏹 Prospecção Ativa de Marcas para UGC
Não espere as marcas virem até você. Crie sua própria demanda:
- Liste 20 marcas médias no Instagram que vendem produtos que você consome diariamente.
- Analise os anúncios ativos delas na biblioteca do Facebook Ads. Identifique falhas (ex: falta de ganchos dinâmicos, vídeos robóticos demais).
- Escreva um e-mail curto ou DM direta oferecendo uma análise gratuita de roteiro e proponha um pacote experimental com ótimos termos.
`
    },
    {
      id: 'pag-edicao',
      titulo: 'Manual de Edição',
      categoria: 'Manual',
      conteudo: `# Manual de Edição de Vídeo Estético

Como transformar gravações amadoras em produções cinematográficas magnéticas de alto engajamento usando apenas o celular (CapCut).

---

## 🎬 Configurações de Gravação Essenciais (Câmera)
- **Resolução:** Sempre em **1080p a 60 FPS** (para movimentos de câmera fluidos e possibilidade de câmera lenta perfeita) ou **4K a 30 FPS** (para foco máximo de texturas macro e zoom sem perda de nitidez).
- **Exposição de Luz:** Sempre trave o foco e diminua a exposição manualmente deslizando o dedo para baixo antes de gravar. Isso evita aquela luz estourada esteticamente amadora e dá um tom cinematográfico.
- **Lente Limpa:** Regra número zero! Sempre limpe a lente da câmera traseira do celular antes de cada take com um pano de microfibra macio.

---

## ✂️ Diretrizes de Edição Dinâmica
1. **Remoção de Silêncios:** Corte absolutamente cada milissegundo de respiração desnecessária, pausas ou pensamentos. O ritmo deve ser contínuo e rítmico.
2. **Corte na Ação:** Faça cortes entre takes no meio de um movimento de mão (ex: corte enquanto levanta a caneta, e comece o próximo take com a caneta já encostando no papel). Isso torna as transições imperceptíveis e fluidas.
3. **Efeitos de Transição Sonoros:**
   - **Swoosh / Whoosh:** Ótimo para transições rápidas de deslizar de tela.
   - **Click / Mouse Pop:** Excelente para realçar o aparecimento de textos rápidos ou adesivos visuais na tela.
   - **Keyboard Typing:** Som sutil para digitação de títulos na tela.

---

## 🎶 Design de Áudio (Sonorização)
O áudio é responsável por 50% do valor percebido do vídeo.
- A trilha sonora de fundo deve ser adaptada ao humor: Lo-Fi/Chill para skincare e estudos calmos; Beats rápidos/Phonk para B-roll de esportes, carros (A.RS Motors) ou cortes dinâmicos.
- O volume da música de fundo nunca deve ultrapassar **-22dB** se houver voz falada por cima, garantindo perfeita legibilidade da voz principal.
`
    },
    {
      id: 'pag-copywriting',
      titulo: 'Manual de Copywriting',
      categoria: 'Manual',
      conteudo: `# Manual de Copywriting Persuasivo para Redes Sociais

Como dominar a arte de escrever palavras que vendem produtos, geram engajamento genuíno e comandam ações do público sem que pareça propaganda.

---

## 🔬 A Fórmula AIDA Adaptada para Reels/TikTok

- **A - Atenção (0 a 3 segundos):**
  - Desperte curiosidade imediata ou quebre um padrão visual comum na feed.
  - Exemplo: "Não compre o Sérum Lumière skin antes de ler isso..."

- **I - Interesse (3 a 15 segundos):**
  - Relate uma dor específica e mostre empatia real.
  - Exemplo: "Eu também achava que minha oleosidade rebote era culpa do calor, até descobrir o verdadeiro vilão que desidratava minha barreira de pele."

- **D - Desejo (15 a 25 segundos):**
  - Apresente o produto como o herói que resolve a dor do cliente, mostrando os benefícios estáticos e sensoriais.
  - Exemplo: "Com apenas 3 gotas desse sérum à noite, você acorda com aquela pele iluminada e uniforme que parece que você dormiu 10 horas seguidas."

- **A - Ação (25 a 30 segundos):**
  - Faça uma chamada para ação clara, simples e focada em apenas uma direção.
  - Exemplo: "Visite o link oficial no perfil e use o cupom GLOW10 para frete grátis hoje."

---

## 🚀 Gatilhos Psicológicos de Alta Conversão
1. **Especificidade:** Troque "Esse sérum hidrata muito rápido" por "Este sérum aumenta a hidratação celular em até 84% em apenas 12 dias." O cérebro confia em dados exatos.
2. **Urgência Subjacente:** Em vez de "Compre quando quiser", use "Este lote promocional é limitado por conta dos ingredientes importados."
3. **Contraste de Status:** "De pele craquelada por base barata a pele de rica iluminada." O desejo humano é sempre a elevação de status pessoal.
`
    },
    {
      id: 'chk-gravacao',
      titulo: 'Checklist de Gravação',
      categoria: 'Checklist',
      conteudo: `# ������ Checklist de Gravação Profissional

Siga este protocolo exato antes de apertar o botão de gravar para evitar retrabalho e garantir excelente qualidade técnica de imagem e som.

---

## 🧼 1. Preparação de Equipamentos e Ambiente
- [ ] Limpar as lentes das câmeras traseira e frontal do celular com microfibra.
- [ ] Ativar o **Modo Avião / Não Perturbe** para impedir que chamadas ou mensagens cortem a gravação do vídeo ou áudio.
- [ ] Verificar se há pelo menos **10 GB de espaço livre** na memória interna do aparelho.
- [ ] Carregar a bateria do celular e dos microfones sem fio até 100%.
- [ ] Limpar o cenário (remover poeira, cabos soltos, lixos ou roupas penduradas ao fundo).

## 💡 2. Iluminação e Áudio
- [ ] Posicionar-se de frente ou a 45 graus para a fonte de luz principal (janela ou Softbox). Nunca fique contra a luz (contra-luz) a menos que queira silhueta.
- [ ] Travar a exposição de luz da câmera no seu rosto e reduzir um pouco o brilho para dar tom profissional e evitar superexposição.
- [ ] Fazer um teste rápido de áudio de 5 segundos de gravação para garantir que não há eco excessivo ou ruídos estridentes (ventilador, ar condicionado barulhento).

## 📝 3. Execução do Take
- [ ] Revisar as 3 primeiras linhas do roteiro (gancho) para ensaiar a entonação correta, com energia e velocidade dinâmicas.
- [ ] Deixar pelo menos **1.5 segundo de silêncio** no início e no final de cada take para facilitar os cortes na edição.
- [ ] Gravar versões alternativas do gancho com entonações e expressões diferentes para ter opções adicionais na hora da pós-produção.
`
    },
    {
      id: 'chk-publicacao',
      titulo: 'Checklist de Publicação',
      categoria: 'Checklist',
      conteudo: `# 🚀 Checklist de Publicação Estratégica

Siga este protocolo meticulosamente para garantir que o algoritmo do TikTok/Instagram catalogue e distribua seu vídeo para a audiência correta de forma otimizada.

---

## ✍️ 1. Legenda, Hashtags e SEO
- [ ] Escrever uma legenda curta (duas linhas) que instigue comentários ou reforce a curiosidade do vídeo.
- [ ] Incluir de **2 a 4 palavras-chave estratégicas** integradas naturalmente no texto da legenda para otimizar o mecanismo de busca.
- [ ] Selecionar de 3 a 5 hashtags altamente relevantes (ex: #ugcbrasil #skincareaesthetic #rotinadeestudos). Nunca use tags genéricas como #foryou ou #fyp.
- [ ] Adicionar localização estratégica se for conteúdo focado em alcance regional (ex: São Paulo, Concessionária A.RS Motors).

## 🎨 2. Capa e Elementos de Plataforma
- [ ] Definir um frame de capa estético, chamativo e em alta definição.
- [ ] Adicionar um título em formato de gancho visível na capa usando a mesma tipografia padronizada do feed para manter a estética do portfólio intacta.
- [ ] Adicionar uma faixa de música em alta (trending audio) e diminuir o volume dela para **3% a 5%** caso o vídeo seja narrado.
- [ ] Ativar a chave de **"Permitir carregamento em alta qualidade"** nas configurações avançadas de publicação de cada plataforma.

## 👥 3. Pós-Publicação Imediata
- [ ] Compartilhar o vídeo imediatamente nos Stories do Instagram com uma caixinha de perguntas ou adesivo misterioso instigando o clique.
- [ ] Monitorar a seção de comentários durante os primeiros **60 minutos** e responder a absolutamente todas as interações instigando um bate-papo ativo.
`
    },
    {
      id: 'chk-equipamentos',
      titulo: 'Checklist de Equipamentos',
      categoria: 'Checklist',
      conteudo: `# 🎒 Checklist de Equipamentos Essenciais para Criadoras

Uma lista organizada de ferramentas físicas necessárias para estruturar um estúdio portátil de criação de alta qualidade sem gastar fortunas.

---

## 📱 Dispositivos Principais
- [ ] **Smartphone principal (ex: iPhone 11 ou superior / Samsung S21 ou superior):** Câmeras confiáveis com estabilização ótica e bom processamento de imagem diurna e noturna.
- [ ] **Notebook ou Tablet de Estudos:** Essencial para organizar roteiros no Notion, analisar métricas e realizar estudos.

## 💡 Iluminação Profissional
- [ ] **Luz Natural de Janela:** A melhor e mais barata luz do mundo. Use cortina branca translúcida para difusão perfeita e sombras suaves.
- [ ] **Ring Light de Mesa:** Útil para luz de preenchimento ou preencher sombras sob o queixo.
- [ ] **Bastão de Luz RGB:** Excelente para dar um toque de cor de preenchimento no fundo do cenário (background light) e elevar o valor estético do enquadramento.

## 🎙️ Áudio Cristalino
- [ ] **Microfone de Lapela Sem Fio (ex: Boya BY-V20 ou K9):** Essencial para gravações com distanciamento de câmera e remoção ativa de ruídos de ambiente.
- [ ] **Espuma Abafadora de Lapela:** Para gravações em locais abertos ou com vento forte.

## 🏗️ Suporte e Estabilidade
- [ ] **Tripé de Chão Articulável (1.60m):** Essencial para enquadramentos de corpo inteiro, POV de rotina e transições de movimento de câmera rápidos.
- [ ] **Tripé de Mesa Flexível (Octopus):** Ótimo para prender em móveis e filmar closes de texturas de produtos na mesa ou pia do banheiro.
`
    },
    {
      id: 'flux-producao',
      titulo: 'Fluxo de Produção',
      categoria: 'Fluxo',
      conteudo: `# 🔄 Fluxo de Produção Semanal de Conteúdo

O funil de operação ágil para sair da ideia em branco ao vídeo publicado com eficiência impecável, evitando estresse e bloqueio criativo.

---

## 🗺️ O Funil de Produção Passo a Passo

> **[ IDEIA ]** ➔ **[ ROTEIRO ]** ➔ **[ GRAVAÇÃO ]** ➔ **[ EDIÇÃO ]** ➔ **[ PUBLICAÇÃO ]**

---

## ⚡ Etapas Detalhadas

### 1. Etapa de Captura & Pesquisa (Segunda-feira)
- Analisar referências salvas no banco de referências.
- Capturar dores na base de dados de Psicologia do Consumidor.
- Catalogar de 3 a 5 ideias brutas na base de Ideias de Conteúdo.

### 2. Etapa de Roteirização (Terça-feira)
- Abrir a base de Roteiros e desenvolver a estrutura de cada ideia aprovada.
- Aplicar ganchos validados do banco de Ganchos permanente.
- Definir as chamadas para ação (CTAs) e os tempos estimados de cada take.

### 3. Etapa de Lote de Gravação (Quarta-feira - "Batching")
- Organizar o cenário de uma única vez usando os checklists de gravação.
- Gravar todos os takes de voz falados seguidos.
- Gravar todas as cenas complementares de B-roll (Banco de Cenas) e texturas estéticas de uma vez para economizar tempo de setup.

### 4. Etapa de Edição (Quinta-feira)
- Importar todos os arquivos brutos para o CapCut no computador ou celular.
- Aplicar cortes secos rápidos, sincronizar trilhas sonoras adequadas, ajustar volumes e exportar com máxima definição de vídeo.

### 5. Etapa de Agendamento e Postagem (Sexta-feira a Domingo)
- Revisar metadados, capas, legendas em SEO e agendar as publicações diárias nos horários de pico de engajamento da audiência.
`
    },
    {
      id: 'flux-organizacao',
      titulo: 'Fluxo de Organização',
      categoria: 'Fluxo',
      conteudo: `# 🧠 Fluxo de Organização do Segundo Cérebro

Como manter seu ecossistema digital limpo, funcional, catalogado e livre de bagunça mental diária, mantendo o foco absoluto nas prioridades.

---

## 🌊 O Fluxo das 3 Caixas

### 1. Caixa de Entrada (Inbox)
- **Local:** Tudo que você anota rapidamente pelo celular na rua (ideias que surgem do nada, referências avulsas, tarefas rápidas).
- **Regra:** Não tente organizar no momento em que anota. Apenas registre rápido no app para esvaziar a cabeça e manter o foco na ação do momento.

### 2. Processamento Diário (Triagem)
- **Quando:** Todos os finais de tarde ou manhãs.
- **Ação:** Revisar a Caixa de Entrada e mover cada item para sua respectiva base de dados relacionada:
  - Uma tarefa vai para a base de **Tarefas** com prazo e projeto definido.
  - Uma ideia de vídeo vai para a base de **Ideias de Conteúdo** relacionada a um produto UGC e um projeto.
  - Um insight de leitura vai para a base de **Leituras/Estudos** com aplicação prática anotada.

### 3. Execução & Arquivo
- **Ação:** Executar as tarefas prioritárias do dia listadas na dashboard.
- Mudar o status de projetos concluídos e arquivar itens antigos para manter a interface principal limpa de ruídos.
`
    },
    {
      id: 'sis-semanal',
      titulo: 'Sistema Semanal',
      categoria: 'Sistema',
      conteudo: `# 📅 Sistema Semanal de Execução (O Ritmo da Semana)

O roteiro operacional semanal de planejamento para organizar tarefas, metas e blocos de estudo sem sobrecarga mental.

---

## 🗓️ Cronograma Operacional Semanal

### 🎯 Domingo à Noite: O Planejamento
- Revisar as metas semanais na base de **Metas**.
- Distribuir as tarefas necessárias na base de **Tarefas**, definindo os prazos realistas para cada dia da semana seguinte.
- Definir os 3 objetivos principais inegociáveis que devem ser cumpridos para a semana ser considerada vitoriosa.

### 📚 Segunda a Quarta: Foco Criativo e Estudos
- Realizar as sessões de estudo focadas do ENEM (3h diárias) e leituras de negócios na parte da manhã.
- Produzir e estruturar os roteiros das marcas de UGC e roteiros de conteúdo orgânico do TikTok na parte da tarde.

### 📸 Quinta-feira: Dia de Lote de Gravação (Shoot Day)
- Gravar em lote todos os criativos de UGC pendentes e conteúdos da semana. Foco exclusivo em iluminação, som e estética de takes macro.

### ✂️ Sexta-feira: Finalização de Edições e Entregas
- Editar e finalizar as entregas de UGC para os clientes aprovarem.
- Agendar postagens de final de semana nas plataformas sociais.

### 🧼 Sábado: Descanso & Organização Pessoal
- Dia livre para repor as energias mentais e limpar o espaço físico de trabalho.
`
    },
    {
      id: 'sis-mensal',
      titulo: 'Sistema Mensal',
      categoria: 'Sistema',
      conteudo: `# 🪐 Sistema Mensal de Metas e Alinhamento Estratégico

O mapa de planejamento mensal focado em mensurar progresso de longo prazo, fechar novos clientes de UGC e acompanhar metas acadêmicas.

---

## 🛠️ Ritual do Último Dia do Mês (Revisão Mensal)
No último dia de cada mês, reserve 2 horas para preencher o seguinte protocolo de alinhamento estratégico:

### 📈 1. Análise de Métricas Gerais (Vídeos Publicados)
- Filtrar a base de **Vídeos Publicados** pelo mês correspondente.
- Somar o alcance total de visualizações, novos seguidores obtidos e cliques gerados no link de afiliado.
- Identificar os 3 vídeos que mais performaram bem e escrever as lições técnicas aprendidas de cada um (ex: "uso do gancho X com som de ASMR gerou 40% a mais de salvamentos").

### 💼 2. Fechamento de Caixa UGC
- Somar o faturamento bruto gerado com entregas de UGC no mês.
- Avaliar a taxa de retenção de clientes (quantos voltaram a pedir novos pacotes).
- Definir a meta de faturamento e prospecção de marcas parceiras para o mês seguinte.

### 🎓 3. Diagnóstico de Estudos e ENEM
- Analisar a quantidade de simulados realizados e a média geral de evolução de pontuação.
- Reajustar o cronograma de disciplinas com base nos pontos fracos identificados nos simulados do mês.
`
    },
    {
      id: 'sis-revisao',
      titulo: 'Sistema de Revisão',
      categoria: 'Sistema',
      conteudo: `# 🔍 Sistema de Revisão Periódica (Auditoria de Métricas)

Como auditar cientificamente o seu negócio digital e estudos para garantir melhora contínua e eliminar gargalos operacionais rapidamente.

---

## 🎛️ Fluxograma de Auditoria de Conteúdo

### ❓ Se o Alcance de Views está Baixo:
- **Causa Provável:** O **Gancho** visual ou verbal nos primeiros 3 segundos do vídeo está fraco ou comum demais.
- **Ação Corretiva:** Abrir a base permanente de **Ganchos**, selecionar ganchos de alta retenção comprovada e gravar variações com transições mais dinâmicas no início do vídeo.

### ❓ Se as Visualizações são Altas mas o Engajamento (Curtidas/Comentários) está Baixo:
- **Causa Provável:** O conteúdo ensina algo óbvio demais ou não gera identificação real/identificação de nicho.
- **Ação Corretiva:** Revisar a base de **Psicologia do Consumidor** para redescobrir as dores ocultas da audiência e falar sobre medos e sonhos reais nos próximos roteiros, em vez de apenas listar características.

### ❓ Se o Engajamento é Alto mas as Vendas/Seguidores não Crescem:
- **Causa Provável:** A chamada para ação (**CTA**) ao final do vídeo foi fraca, confusa ou inexistente.
- **Ação Corretiva:** Revisar a estrutura de finalização na base de **Roteiros** e usar CTAs curtas, diretas e com recompensa óbvia de clique (ex: "comente QUERO para receber o link com desconto exclusivo no direct").
`
    }
  ]
};

import React, { useState, useEffect } from 'react';
import { useAppState } from './StateContext';
import { MOTIVATIONAL_QUOTES } from '../data';
import {
  Sparkles,
  Plus,
  Package,
  Clapperboard,
  Video,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  ChevronRight,
  AlertCircle,
  CheckSquare,
  Square,
  Flame,
  TrendingUp,
  Bookmark,
  FileText,
  Lightbulb,
  Camera,
  ArrowRight
} from 'lucide-react';
import { Product, Script } from '../types';

export const Dashboard: React.FC = () => {
  const {
    products,
    scripts,
    references,
    ideas,
    setActiveTab,
    setSelectedScriptId,
    setSelectedProductId
  } = useAppState();

  const [quote, setQuote] = useState('');
  const [streakDays, setStreakDays] = useState(12);

  // Load quote and streak on mount
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIdx]);

    // Track streaks
    const storedStreak = localStorage.getItem('aurora_creator_streak');
    if (storedStreak) {
      setStreakDays(parseInt(storedStreak));
    } else {
      localStorage.setItem('aurora_creator_streak', '12');
    }
  }, []);

  // Helper to calculate elegant deterministic/dynamic progress and steps for products
  const getProductProgressDetails = (product: Product) => {
    // Find scripts related to this product
    const productScripts = scripts.filter((s) => s.productId === product.id);

    if (productScripts.length > 0) {
      const stageWeights: Record<string, number> = {
        idea: 15,
        planning: 30,
        script: 45,
        recording: 60,
        editing: 80,
        review: 90,
        published: 100
      };

      // Sort by highest status
      const sortedScripts = [...productScripts].sort((a, b) => {
        const wA = stageWeights[a.status] || 0;
        const wB = stageWeights[b.status] || 0;
        return wB - wA;
      });

      const leadScript = sortedScripts[0];
      const percentage = stageWeights[leadScript.status] || 25;

      let nextStage = "Planejar roteiro";
      let deliveryDay = "Quinta-feira";
      let statusText = "Planejado";
      let statusColor = "bg-purple-50 text-purple-700 border-purple-200/50";

      switch (leadScript.status) {
        case 'idea':
          nextStage = "Desenvolver ganchos";
          deliveryDay = "Quinta-feira";
          statusText = "Ideia";
          statusColor = "bg-purple-50 text-purple-700 border-purple-200/40";
          break;
        case 'planning':
          nextStage = "Escrever roteiro";
          deliveryDay = "Sexta-feira";
          statusText = "Em Planejamento";
          statusColor = "bg-blue-50 text-blue-700 border-blue-200/40";
          break;
        case 'script':
          nextStage = "Gravar cenas";
          deliveryDay = "Amanhã";
          statusText = "Roteiro Pronto";
          statusColor = "bg-indigo-50 text-indigo-700 border-indigo-200/40";
          break;
        case 'recording':
          nextStage = "Editar vídeo";
          deliveryDay = "Hoje";
          statusText = "Gravação";
          statusColor = "bg-amber-50 text-amber-700 border-amber-200/40";
          break;
        case 'editing':
          nextStage = "Ajustar cortes e áudio";
          deliveryDay = "Quarta-feira";
          statusText = "Edição";
          statusColor = "bg-pink-50 text-brand-pink border-brand-pink-light/40";
          break;
        case 'review':
          nextStage = "Exportar corte final";
          deliveryDay = "Sexta-feira";
          statusText = "Aprovação";
          statusColor = "bg-rose-50 text-rose-700 border-rose-200/40";
          break;
        case 'published':
          nextStage = "Publicado!";
          deliveryDay = "Concluído";
          statusText = "Publicado";
          statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200/40";
          break;
      }

      return { percentage, nextStage, deliveryDay, statusText, statusColor };
    }

    // Beautiful fallback scenarios so everything looks like a premium finished layout
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('gloss') || product.id === 'prod-gloss-oceane') {
      return {
        percentage: 80,
        nextStage: "Editar vídeo",
        deliveryDay: "Quarta-feira",
        statusText: "Em Edição",
        statusColor: "bg-pink-50 text-brand-pink border-brand-pink-light/50"
      };
    } else if (nameLower.includes('serum') || nameLower.includes('niacinamida') || product.id === 'prod-serum-niacinamida') {
      return {
        percentage: 55,
        nextStage: "Gravar cenas de aplicação",
        deliveryDay: "Amanhã",
        statusText: "Em Gravação",
        statusColor: "bg-amber-50 text-amber-700 border-amber-200/50"
      };
    } else if (nameLower.includes('perfume') || nameLower.includes('214') || product.id === 'prod-perfume-boticario') {
      return {
        percentage: 30,
        nextStage: "Estruturar roteiro",
        deliveryDay: "Sexta-feira",
        statusText: "Planejado",
        statusColor: "bg-blue-50 text-blue-700 border-blue-200/50"
      };
    }

    // Default calculations for any user added products
    const hash = product.name.length;
    const percentages = [40, 65, 85];
    const percentage = percentages[hash % percentages.length];
    const stages = ["Planejar B-roll", "Gravar depoimento", "Sincronizar ASMR"];
    const nextStage = stages[hash % stages.length];
    const days = ["Hoje", "Amanhã", "Sexta-feira"];
    const deliveryDay = days[hash % days.length];
    const statuses = ["Em Produção", "Gravação", "Edição"];
    const statusText = statuses[hash % statuses.length];
    const colors = [
      "bg-purple-50 text-purple-700 border-purple-200/50",
      "bg-amber-50 text-amber-700 border-amber-200/50",
      "bg-pink-50 text-brand-pink border-brand-pink-light/50"
    ];
    const statusColor = colors[hash % colors.length];

    return { percentage, nextStage, deliveryDay, statusText, statusColor };
  };

  const handleCreateProduct = () => {
    setActiveTab('products');
    setSelectedProductId('new');
  };

  const handleOpenProductHub = (id: string) => {
    setSelectedProductId(id);
    setActiveTab('products');
  };

  const handleGoToScript = (id: string) => {
    setActiveTab('scripts');
    setSelectedScriptId(id);
  };

  // Get active items for "Produtos da Semana" (limit to top 4 products for clean layout)
  const activeProducts = products.slice(0, 4);

  // Setup Dynamic "Continue de onde parou" Launcher list
  const getInterruptedWorks = () => {
    const list = [];

    // Find a real script
    const firstScript = scripts[0];
    list.push({
      id: 'work-1',
      title: firstScript ? `Editar roteiro: ${firstScript.title}` : 'Editar roteiro do Gloss Lip Glow',
      category: 'Roteiros',
      type: 'script',
      targetId: firstScript?.id || 'new',
      icon: <FileText size={14} className="text-brand-pink" />
    });

    // Find a reference
    const firstRef = references[0];
    list.push({
      id: 'work-2',
      title: firstRef ? `Revisar referências de: ${firstRef.title}` : 'Adicionar referências estéticas da Océane',
      category: 'Referências',
      type: 'references',
      targetId: '',
      icon: <Bookmark size={14} className="text-brand-gold" />
    });

    // Find product checklist
    const secondProduct = products[1] || products[0];
    list.push({
      id: 'work-3',
      title: secondProduct ? `Completar checklist do: ${secondProduct.name}` : 'Finalizar checklist do Sérum de Niacinamida',
      category: 'Estúdio',
      type: 'planning',
      targetId: '',
      icon: <CheckSquare size={14} className="text-purple-500" />
    });

    return list;
  };

  const interruptedWorks = getInterruptedWorks();

  const handleWorkClick = (work: typeof interruptedWorks[0]) => {
    if (work.type === 'script') {
      setActiveTab('scripts');
      if (work.targetId) setSelectedScriptId(work.targetId);
    } else if (work.type === 'references') {
      setActiveTab('references');
    } else if (work.type === 'planning') {
      setActiveTab('planning');
    }
  };

  // Setup "Próximas Entregas" dynamic agenda matching the aesthetic of the prompt
  const getUpcomingDeliveries = () => {
    const p1 = products[0]; // Gloss
    const p2 = products[1] || p1; // Niacinamida
    const p3 = products[2] || p2; // Perfume

    return [
      {
        day: "Hoje",
        title: p3 ? `Gravar ${p3.name}` : "Gravar Botica 214",
        brand: p3?.brand || "O Boticário",
        type: "recording",
        badge: "Câmera",
        productId: p3?.id || null
      },
      {
        day: "Amanhã",
        title: p2 ? `Editar ${p2.name}` : "Editar Sérum Niacinamida",
        brand: p2?.brand || "Widi Care",
        type: "editing",
        badge: "Edição",
        productId: p2?.id || null
      },
      {
        day: "Sexta",
        title: p1 ? `Publicar ${p1.name}` : "Publicar Natura Una",
        brand: p1?.brand || "Natura Una",
        type: "publishing",
        badge: "Postagem",
        productId: p1?.id || null
      }
    ];
  };

  const upcomingDeliveries = getUpcomingDeliveries();

  const handleDeliveryClick = (delivery: typeof upcomingDeliveries[0]) => {
    if (delivery.productId) {
      handleOpenProductHub(delivery.productId);
    } else {
      setActiveTab('products');
    }
  };

  // Metrics for "Resumo da Semana"
  const activeProductsCount = products.length;
  const scriptsCount = scripts.length;
  const recordedScenesCount = scripts.filter(s => ['editing', 'review', 'published'].includes(s.status)).length;
  const publishedCount = scripts.filter(s => s.status === 'published').length;
  const ideasCount = ideas.length;
  const referencesCount = references.length;

  return (
    <div className="space-y-8 pb-32 text-brand-charcoal select-none animate-fadeIn selection:bg-brand-pink/20">
      
      {/* 1. GREETING & AMBIENT HEADLINE */}
      <header className="flex flex-col justify-start items-start gap-3 border-b border-brand-pink-light/30 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-pink animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold text-brand-pink font-mono">Estúdio Criativo Aurora</span>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-dark">Bem-vinda, Criadora ✨</h2>
          <p className="text-xs italic text-brand-gray mt-1 leading-relaxed">"{quote}"</p>
        </div>
        
        {/* Dynamic mini clock indicator */}
        <div className="w-full mt-2 bg-brand-nude/40 border border-brand-pink-light/55 px-4 py-3 rounded-2xl flex items-center gap-3">
          <Clock className="text-brand-pink shrink-0" size={16} />
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-pink-dark">Foco Semanal</p>
            <p className="text-xs font-serif font-bold text-brand-charcoal">Visual Premium & Produção de Conteúdo UGC</p>
          </div>
        </div>
      </header>

      {/* 2. SEÇÃO PRINCIPAL: ✨ PRODUTOS DA SEMANA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-brand-dark flex items-center gap-2">
              <span>✨ Seus Produtos</span>
            </h3>
            <p className="text-[11px] text-brand-gray">Toque no produto para abrir a central completa.</p>
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-brand-pink hover:text-brand-pink-dark flex items-center gap-1 transition-colors group cursor-pointer"
          >
            Ver todos <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {activeProducts.length === 0 ? (
          <div className="bg-white/45 p-10 rounded-[32px] border border-dashed border-brand-pink-light text-center space-y-3">
            <Package size={32} className="text-brand-pink/50 mx-auto" />
            <h4 className="font-serif font-bold text-brand-dark text-xs">Nenhum produto cadastrado</h4>
            <p className="text-xs text-brand-gray max-w-xs mx-auto">Cadastre seu primeiro produto para iniciar o planejamento e produção de conteúdos.</p>
            <button
              onClick={handleCreateProduct}
              className="bg-brand-pink text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all"
            >
              + Cadastrar Produto
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {activeProducts.map((product) => {
              const { percentage, nextStage, deliveryDay, statusText, statusColor } = getProductProgressDetails(product);
              
              // Generate character progress bar
              const blocksCount = Math.round(percentage / 10);
              const filledBlocks = "█".repeat(blocksCount);
              const emptyBlocks = "░".repeat(10 - blocksCount);
              const textProgressStr = `${filledBlocks}${emptyBlocks} ${percentage}%`;

              // Primary cover photo
              const coverPhoto = product.images && product.images.length > 0 
                ? product.images[0] 
                : product.imageUrl;

              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenProductHub(product.id)}
                  className="bg-white rounded-[28px] overflow-hidden border border-brand-pink-light hover:border-brand-pink shadow-xs hover:shadow-premium cursor-pointer group transition-all duration-300 flex flex-col w-full"
                >
                  {/* Photo Cover Wrapper */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-pink-50/20">
                    <img
                      src={coverPhoto}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Floating Status Pill */}
                    <span className={`absolute top-3 right-3 text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-xs ${statusColor}`}>
                      {statusText}
                    </span>

                    {/* Category Label Overlay */}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-4.5 flex flex-col justify-between flex-1 space-y-3.5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray">{product.brand}</span>
                      <h4 className="font-serif font-bold text-brand-dark group-hover:text-brand-pink transition-colors text-base leading-tight">{product.name}</h4>
                    </div>

                    {/* Elegant Progress Area */}
                    <div className="space-y-2 pt-2 border-t border-brand-pink-light/30">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-pink-dark">
                        <span className="tracking-tight">{textProgressStr}</span>
                      </div>

                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-pink rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Workflow Details */}
                      <div className="pt-1.5 space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-brand-gray">Próxima etapa:</span>
                          <span className="font-bold text-brand-dark truncate max-w-[150px]">{nextStage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-gray">Entrega:</span>
                          <span className="font-semibold text-brand-pink-dark">{deliveryDay}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. BOTÃO PRINCIPAL: 📦 NOVO PRODUTO */}
      <div className="flex justify-center py-2">
        <button
          onClick={handleCreateProduct}
          className="relative inline-flex items-center justify-center gap-2.5 bg-brand-pink text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-pink-dark hover:scale-[1.02] active:scale-95 transition-all font-serif font-bold tracking-wide uppercase text-xs cursor-pointer border border-brand-pink-light/30 group"
        >
          <span className="text-sm bg-white/20 w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={14} />
          </span>
          <span>📦 Novo Produto</span>
          <span className="absolute -right-1 -top-1 bg-brand-gold text-brand-charcoal text-[8px] font-sans font-extrabold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
            Criar
          </span>
        </button>
      </div>

      {/* 4. VERTICAL MOBILE COLUMNS: CONTINUE DE ONDE PAROU & PRÓXIMAS ENTREGAS */}
      <div className="flex flex-col gap-6">
        
        {/* CONTINUE DE ONDE PAROU */}
        <div className="space-y-4 bg-white p-5 rounded-[28px] border border-brand-pink-light shadow-xs">
          <div>
            <h3 className="text-sm font-serif font-bold text-brand-dark flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-brand-pink" />
              <span>Continue de onde parou</span>
            </h3>
            <p className="text-[11px] text-brand-gray mt-0.5">Acesse rapidamente as tarefas de criação recentes.</p>
          </div>

          <div className="space-y-3">
            {interruptedWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => handleWorkClick(work)}
                className="flex items-center justify-between p-3 rounded-2xl bg-brand-offwhite hover:bg-brand-pink-light/30 border border-brand-pink-light/40 hover:border-brand-pink/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl border border-brand-pink-light/40 group-hover:scale-105 transition-transform shrink-0">
                    {work.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-brand-pink block">{work.category}</span>
                    <p className="text-xs font-semibold text-brand-dark group-hover:text-brand-pink transition-colors truncate w-[180px]">{work.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-brand-pink shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <span>Abrir</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRÓXIMAS ENTREGAS */}
        <div className="space-y-4 bg-brand-nude/20 p-5 rounded-[28px] border border-brand-pink-light shadow-xs relative overflow-hidden">
          <div>
            <h3 className="text-sm font-serif font-bold text-brand-dark flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-brand-gold" />
              <span>Próximas Entregas</span>
            </h3>
            <p className="text-[11px] text-brand-gray mt-0.5">Sua agenda imediata de gravação e publicação UGC.</p>
          </div>

          <div className="space-y-3 relative z-10">
            {upcomingDeliveries.map((delivery, index) => {
              const isToday = delivery.day === 'Hoje';
              return (
                <div
                  key={index}
                  onClick={() => handleDeliveryClick(delivery)}
                  className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                    isToday 
                      ? 'bg-white border-brand-pink shadow-xs hover:shadow-premium-hover hover:border-brand-pink' 
                      : 'bg-white/50 border-brand-pink-light/40 hover:bg-white hover:border-brand-pink hover:shadow-sm'
                  }`}
                  title="Clique para abrir a central do produto"
                >
                  {/* Left day circle */}
                  <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 border font-mono font-bold ${
                    isToday 
                      ? 'bg-brand-pink border-brand-pink text-white shadow-xs' 
                      : 'bg-white border-brand-pink-light/40 text-brand-gray'
                  }`}>
                    <span className="text-[8px] uppercase tracking-tighter opacity-80">{isToday ? "Ag" : "Pr"}</span>
                    <span className="text-[11px] font-semibold mt-0.5">{delivery.day}</span>
                  </div>

                  {/* Title and Badge */}
                  <div className="flex-1 space-y-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-extrabold uppercase tracking-wider text-brand-pink truncate max-w-[100px]">{delivery.brand}</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm font-sans shrink-0 ${
                        delivery.type === 'recording' 
                          ? 'bg-purple-100 text-purple-700' 
                          : delivery.type === 'editing' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {delivery.badge}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-brand-dark truncate">{delivery.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Golden background aura */}
          <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
        </div>

      </div>

      {/* 5. RESUMO DA SEMANA PANEL (Canva/Pinterest bento layout) */}
      <section className="space-y-4 pt-2">
        <div className="text-left">
          <h3 className="text-sm font-serif font-bold text-brand-dark flex items-center gap-2">
            <TrendingUp size={15} className="text-brand-pink" />
            <span>Resumo do Estúdio Aurora</span>
          </h3>
          <p className="text-[11px] text-brand-gray mt-0.5">Estatísticas gerais de produção do seu portfólio.</p>
        </div>

        {/* Bento Stat Grid - Designed beautifully for 2 Columns */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stat 1: Ativos */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Produtos Ativos</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{activeProductsCount}</span>
            <span className="text-[8px] text-brand-gray">no catálogo</span>
          </div>

          {/* Stat 2: Roteiros */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Roteiros Criados</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{scriptsCount}</span>
            <span className="text-[8px] text-brand-gray">planejados</span>
          </div>

          {/* Stat 3: Gravados */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Vídeos Gravados</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{recordedScenesCount}</span>
            <span className="text-[8px] text-brand-gray">em pós-produção</span>
          </div>

          {/* Stat 4: Publicados */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Vídeos no Ar</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{publishedCount}</span>
            <span className="text-[8px] text-brand-gray">no portfólio</span>
          </div>

          {/* Stat 5: Ideias */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Ideias Salvas</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{ideasCount}</span>
            <span className="text-[8px] text-brand-gray">banco de insights</span>
          </div>

          {/* Stat 6: Referências */}
          <div className="bg-white border border-brand-pink-light/60 p-3.5 rounded-2xl flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[9px] uppercase font-bold tracking-tight text-brand-gray">Referências</span>
            <span className="text-xl font-serif font-bold text-brand-pink my-1">{referencesCount}</span>
            <span className="text-[8px] text-brand-gray">estéticas salvas</span>
          </div>

          {/* Stat 7: Consecutive days STREAK! */}
          <div className="bg-brand-pink text-white p-4 rounded-2xl flex flex-col justify-between items-center text-center shadow-sm col-span-2 border border-brand-pink-light/20 relative overflow-hidden">
            <span className="text-[9px] uppercase font-bold tracking-tight opacity-90">Produção Ativa</span>
            <div className="flex items-center gap-1 my-1">
              <Flame size={18} className="text-brand-gold animate-bounce" />
              <span className="text-xl font-serif font-bold">{streakDays}</span>
            </div>
            <span className="text-[8px] opacity-80">Dias seguidos de criação ativa 🔥</span>
          </div>
        </div>
      </section>

    </div>
  );
};

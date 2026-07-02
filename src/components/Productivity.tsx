import React from 'react';
import { useAppState } from './StateContext';
import {
  BarChart2,
  TrendingUp,
  Award,
  Flame,
  Package,
  Video,
  Bookmark,
  CheckCircle,
  HelpCircle,
  FolderHeart
} from 'lucide-react';

export const Productivity: React.FC = () => {
  const { products, scripts, references, scenes } = useAppState();

  // Metrics calculations
  const totalProducts = products.length;
  const publishedCount = scripts.filter(s => s.status === 'published').length;
  const recordedCount = scripts.filter(s => ['editing', 'review', 'published'].includes(s.status)).length;
  const inProgressCount = scripts.filter(s => ['planning', 'script', 'recording', 'editing', 'review'].includes(s.status)).length;
  const referencesCount = references.length;
  const scenesCount = scenes.length;

  // Most used categories
  const getMostUsedCategories = () => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  };

  // Most used products (linked to scripts)
  const getMostUsedProducts = () => {
    const counts: Record<string, number> = {};
    scripts.forEach((s) => {
      counts[s.productId] = (counts[s.productId] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([id, count]) => {
        const prod = products.find((p) => p.id === id);
        return {
          name: prod ? `${prod.name} (${prod.brand})` : 'Produto Desconhecido',
          count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  };

  const mostUsedCategories = getMostUsedCategories();
  const mostUsedProducts = getMostUsedProducts();

  // Simulated streak (dias consecutivos produzindo)
  const streakDays = 14;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="border-b border-brand-pink-light pb-4">
        <h1 className="text-3xl font-serif text-brand-charcoal font-bold font-serif">Painel de Produtividade</h1>
        <p className="text-xs text-brand-gray mt-1 font-sans">Acompanhe suas estatísticas de criação, desempenho de portfólio e conquistas de constância criativa.</p>
      </div>

      {/* METRIC ROWS WITH FLAME STREAK HERO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Streak Flame Card */}
        <div className="bg-gradient-to-tr from-brand-pink to-[#EFA8B1] border border-brand-pink text-white rounded-3xl p-6 shadow-premium flex items-center justify-between gap-4 col-span-1 md:col-span-1">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-pink-light/95">Consistência UGC</span>
            <h2 className="text-3xl font-serif font-bold leading-none">{streakDays} dias</h2>
            <p className="text-xs text-brand-pink-light leading-relaxed font-medium">Dias seguidos criando, organizando ou roteirizando conteúdo estético.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-brand-gold shrink-0 animate-pulse">
            <Flame size={32} className="text-white fill-white" />
          </div>
        </div>

        {/* Total Assets Summary box */}
        <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium flex flex-col justify-between col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 border-b border-brand-pink-light/10 pb-3 mb-3">
            <TrendingUp className="text-brand-pink" size={18} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray">Status Ativo do seu Cérebro UGC</h4>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl font-serif font-bold text-brand-charcoal">{referencesCount}</span>
              <p className="text-[10px] text-brand-gray font-semibold uppercase tracking-wider mt-1">Referências</p>
            </div>
            <div className="border-x border-brand-pink-light/20">
              <span className="text-2xl font-serif font-bold text-brand-charcoal">{scenesCount}</span>
              <p className="text-[10px] text-brand-gray font-semibold uppercase tracking-wider mt-1">Banco Cenas</p>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-brand-charcoal">{totalProducts}</span>
              <p className="text-[10px] text-brand-gray font-semibold uppercase tracking-wider mt-1">Produtos</p>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Item 1 */}
        <div className="bg-white border border-brand-pink-light/30 p-5 rounded-2xl shadow-premium">
          <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Publicados</p>
          <span className="text-3xl font-serif font-bold text-brand-charcoal mt-1 block">{publishedCount}</span>
          <div className="w-full bg-brand-pink-light/35 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand-pink h-full" style={{ width: '65%' }} />
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white border border-brand-pink-light/30 p-5 rounded-2xl shadow-premium">
          <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Cenas Gravadas</p>
          <span className="text-3xl font-serif font-bold text-brand-charcoal mt-1 block">{recordedCount}</span>
          <div className="w-full bg-emerald-100 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: '80%' }} />
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-white border border-brand-pink-light/30 p-5 rounded-2xl shadow-premium">
          <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Em Andamento</p>
          <span className="text-3xl font-serif font-bold text-brand-charcoal mt-1 block">{inProgressCount}</span>
          <div className="w-full bg-sky-100 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-full" style={{ width: '45%' }} />
          </div>
        </div>

        {/* Item 4 */}
        <div className="bg-white border border-brand-pink-light/30 p-5 rounded-2xl shadow-premium">
          <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Taxa de Conclusão</p>
          <span className="text-3xl font-serif font-bold text-brand-charcoal mt-1 block">
            {scripts.length > 0 ? `${Math.round((publishedCount / scripts.length) * 100)}%` : '0%'}
          </span>
          <div className="w-full bg-purple-100 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-500 h-full" style={{ width: '50%' }} />
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRAPH/BREAKDOWN: MOST USED CATEGORIES & PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Most used categories */}
        <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-pink-light/10 pb-3">
            <FolderHeart className="text-brand-pink" size={18} />
            <h3 className="text-sm font-bold text-brand-charcoal">Categorias Mais Usadas no Portfólio</h3>
          </div>
          
          <div className="space-y-4 pt-2">
            {mostUsedCategories.length === 0 ? (
              <p className="text-xs text-brand-gray italic">Nenhuma informação disponível.</p>
            ) : (
              mostUsedCategories.map(([cat, val], idx) => {
                const percent = Math.round((val / totalProducts) * 100) || 0;
                return (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-brand-charcoal">{cat}</span>
                      <span className="text-brand-pink">{val} {val === 1 ? 'produto' : 'produtos'} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-brand-offwhite h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-pink h-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Most used products */}
        <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-pink-light/10 pb-3">
            <Package className="text-brand-pink" size={18} />
            <h3 className="text-sm font-bold text-brand-charcoal">Produtos Mais Viculados a Conteúdo</h3>
          </div>

          <div className="space-y-4 pt-2">
            {mostUsedProducts.length === 0 ? (
              <p className="text-xs text-brand-gray italic">Nenhum roteiro escrito ainda.</p>
            ) : (
              mostUsedProducts.map((p, idx) => {
                const totalScripts = scripts.length;
                const percent = Math.round((p.count / totalScripts) * 100) || 0;
                return (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-brand-charcoal truncate pr-2">{p.name}</span>
                      <span className="text-brand-pink shrink-0">{p.count} vids ({percent}%)</span>
                    </div>
                    <div className="w-full bg-brand-offwhite h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-pink h-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* GOLD TROPHY MOTIVATION CARD */}
      <div className="bg-gradient-to-tr from-brand-beige/40 via-white to-brand-pink-light/30 border border-brand-pink-light/20 rounded-3xl p-6 sm:p-7 shadow-sm text-center max-w-lg mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto mb-2">
          <Award size={26} className="fill-brand-gold/10" />
        </div>
        <h4 className="font-serif text-base font-bold text-brand-charcoal">Estética Impecável em Constância 🏆</h4>
        <p className="text-xs text-brand-gray leading-relaxed max-w-sm mx-auto">
          "A beleza reside nos detalhes organizados. Ao manter sua consistência de postagem e referências, você eleva a qualidade do UGC brasileiro."
        </p>
      </div>

    </div>
  );
};

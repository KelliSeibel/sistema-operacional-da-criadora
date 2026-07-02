import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Search as SearchIcon, Package, Magnet, Film, Bookmark, FileText, Lightbulb, ChevronRight, AlertCircle, ExternalLink } from 'lucide-react';

export const Search: React.FC = () => {
  const {
    products,
    hooks,
    scenes,
    references,
    scripts,
    ideas,
    setActiveTab,
    setSelectedProductId,
    setSelectedScriptId
  } = useAppState();

  const [query, setQuery] = useState('');

  const handleProductJump = (id: string) => {
    setSelectedProductId(id);
    setActiveTab('products');
  };

  const handleScriptJump = (id: string) => {
    setSelectedScriptId(id);
    setActiveTab('scripts');
  };

  // Perform search
  const isQuerying = query.trim().length > 0;
  const q = query.toLowerCase();

  const matchedProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
  );

  const matchedHooks = hooks.filter(
    (h) => h.title.toLowerCase().includes(q) || h.content.toLowerCase().includes(q)
  );

  const matchedScenes = scenes.filter(
    (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  );

  const matchedReferences = references.filter(
    (r) => r.title.toLowerCase().includes(q) || r.notes.toLowerCase().includes(q)
  );

  const matchedScripts = scripts.filter(
    (s) => s.title.toLowerCase().includes(q) || s.objective.toLowerCase().includes(q)
  );

  const matchedIdeas = ideas.filter(
    (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
  );

  const totalResults =
    matchedProducts.length +
    matchedHooks.length +
    matchedScenes.length +
    matchedReferences.length +
    matchedScripts.length +
    matchedIdeas.length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="border-b border-brand-pink-light pb-4">
        <h1 className="text-3xl font-serif text-brand-charcoal font-bold font-serif">Busca Inteligente</h1>
        <p className="text-xs text-brand-gray mt-1 font-sans">Busque qualquer palavra-chave e visualize conexões instantâneas entre ganchos, cenas, roteiros e produtos.</p>
      </div>

      {/* BIG SEARCH BAR INPUT */}
      <div className="relative">
        <SearchIcon size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-pink" />
        <input
          type="text"
          placeholder="Ex: Gloss, ASMR, Clean, Roteiro, Libre, Oceane..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-sm pl-14 pr-5 py-4 border-2 border-brand-pink-light bg-white rounded-3xl focus:outline-none focus:border-brand-pink font-medium shadow-premium"
        />
      </div>

      {/* SEARCH RESULTS SUMMARY */}
      {isQuerying && (
        <p className="text-xs text-brand-gray font-semibold uppercase tracking-wider">
          Encontrados {totalResults} resultados correspondentes para "{query}"
        </p>
      )}

      {/* RENDER DYNAMIC RESULTS ACCORDING TO DATA MODELS */}
      {!isQuerying ? (
        <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-8 shadow-premium text-center max-w-md mx-auto space-y-3">
          <SearchIcon size={32} className="text-brand-pink mx-auto animate-pulse" />
          <h4 className="font-serif font-bold text-brand-charcoal">Digite algo para pesquisar</h4>
          <p className="text-xs text-brand-gray leading-relaxed">
            Nossa pesquisa indexa produtos, marcas, ganchos magnéticos, tomadas visuais, ideias capturadas, roteiros e referências de forma simultânea.
          </p>
        </div>
      ) : totalResults === 0 ? (
        <div className="bg-white border border-dashed border-brand-pink-light/50 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
          <AlertCircle size={36} className="text-brand-pink mx-auto" />
          <div>
            <h4 className="font-serif font-bold text-brand-charcoal">Nenhum resultado correspondente</h4>
            <p className="text-xs text-brand-gray mt-1">Nenhum item do seu cérebro criativo bate com os termos digitados. Tente simplificar.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* 1. PRODUCT MATCHES */}
          {matchedProducts.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <Package size={14} className="text-brand-pink" /> Produtos Relacionados ({matchedProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductJump(p.id)}
                    className="p-3 bg-brand-offwhite hover:bg-brand-pink-light/35 rounded-2xl border border-transparent hover:border-brand-pink-light/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-pink">{p.name}</p>
                      <p className="text-[10px] text-brand-gray mt-0.5">{p.brand} • {p.category}</p>
                    </div>
                    <ChevronRight size={14} className="text-brand-gray group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. SCRIPT MATCHES */}
          {matchedScripts.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <FileText size={14} className="text-brand-pink" /> Roteiros UGC ({matchedScripts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                {matchedScripts.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleScriptJump(s.id)}
                    className="p-3 bg-brand-offwhite hover:bg-brand-pink-light/35 rounded-2xl border border-transparent hover:border-brand-pink-light/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-pink">{s.title}</p>
                      <p className="text-[10px] text-brand-gray mt-0.5">Tempo: {s.estimatedTime} • Etapa: {s.status}</p>
                    </div>
                    <ChevronRight size={14} className="text-brand-gray group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. HOOKS MATCHES */}
          {matchedHooks.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <Magnet size={14} className="text-brand-pink" /> Banco de Ganchos ({matchedHooks.length})
              </h3>
              <div className="space-y-2.5 pt-1.5">
                {matchedHooks.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setActiveTab('hooks')}
                    className="p-3 bg-brand-offwhite hover:bg-brand-pink-light/30 rounded-2xl border border-transparent cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-brand-pink">#{h.category} • {h.title}</p>
                    <p className="text-xs text-brand-charcoal italic mt-1 font-serif">"{h.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SCENE MATCHES */}
          {matchedScenes.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <Film size={14} className="text-brand-pink" /> Banco Visual de Cenas ({matchedScenes.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1.5">
                {matchedScenes.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveTab('scenes')}
                    className="group relative rounded-2xl overflow-hidden aspect-video border border-brand-pink-light/10 cursor-pointer shadow-xs"
                  >
                    <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
                      <p className="text-[10px] font-semibold text-white truncate">{s.name}</p>
                      <span className="text-[8px] uppercase tracking-wide font-bold text-brand-pink mt-0.5">
                        {s.type} • {s.isRecorded ? 'Gravada' : 'A gravar'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REFERÊNCIAS MATCHES */}
          {matchedReferences.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <Bookmark size={14} className="text-brand-pink" /> Referências de Redes ({matchedReferences.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                {matchedReferences.map((ref) => (
                  <div
                    key={ref.id}
                    className="p-3 bg-brand-offwhite rounded-2xl border border-transparent flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img src={ref.imageUrl} alt={ref.title} className="w-9 h-9 object-cover rounded-xl" />
                      <div>
                        <p className="text-xs font-semibold text-brand-charcoal line-clamp-1">{ref.title}</p>
                        <p className="text-[10px] text-brand-pink font-semibold uppercase">{ref.platform}</p>
                      </div>
                    </div>
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-brand-pink hover:text-white transition-colors text-brand-gray shrink-0 ml-1"
                    >
                      <ExternalLink size={12} className="scale-90" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. IDEIAS MATCHES */}
          {matchedIdeas.length > 0 && (
            <div className="space-y-3 bg-white border border-brand-pink-light/30 rounded-3xl p-5 shadow-premium">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                <Lightbulb size={14} className="text-brand-pink" /> Ideias de Inbox ({matchedIdeas.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                {matchedIdeas.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => setActiveTab('ideas')}
                    className="p-3 bg-brand-offwhite hover:bg-brand-pink-light/35 rounded-2xl border border-transparent hover:border-brand-pink-light/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-brand-charcoal group-hover:text-brand-pink">{i.title}</p>
                      <p className="text-[10px] text-brand-gray mt-0.5 truncate max-w-xs">{i.description}</p>
                    </div>
                    <ChevronRight size={14} className="text-brand-gray group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

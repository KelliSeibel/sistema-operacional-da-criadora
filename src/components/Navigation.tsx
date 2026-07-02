import React, { useState, useEffect } from 'react';
import { useAppState } from './StateContext';
import {
  Home,
  Package,
  Magnet,
  Compass,
  Lightbulb,
  FileText,
  Film,
  Calendar,
  ListTodo,
  Search,
  BarChart2,
  Settings,
  Plus,
  Clapperboard,
  Grid,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedProductId, setSelectedScriptId } = useAppState();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Close "Mais" menu when tab changes externally
  useEffect(() => {
    setIsMoreOpen(false);
  }, [activeTab]);

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProductId(null);
    setSelectedScriptId(null);
    setIsMoreOpen(false);
  };

  const handleNewProduct = () => {
    setActiveTab('products');
    setSelectedProductId('new');
    setSelectedScriptId(null);
    setIsMoreOpen(false);
  };

  // Extra options for the slide-up "Mais" menu
  const extraItems: NavItem[] = [
    { id: 'hooks', label: 'Ganchos', icon: Magnet },
    { id: 'ideas', label: 'Ideias', icon: Lightbulb },
    { id: 'references', label: 'Referências', icon: Compass },
    { id: 'scenes', label: 'Banco de Cenas', icon: Film },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'planning', label: 'Planejamento', icon: ListTodo },
    { id: 'productivity', label: 'Produtividade', icon: BarChart2 },
    { id: 'settings', label: 'Ajustes', icon: Settings }
  ];

  return (
    <>
      {/* TOP BRAND HEADER (Clean & Minimalist) */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md border-b border-brand-pink-light/30">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => handleNav('dashboard')}>
          <span className="font-cursive text-3xl font-semibold bg-gradient-to-r from-brand-pink to-brand-pink-dark bg-clip-text text-transparent">
            Aurora Creator
          </span>
          <span className="text-[9px] tracking-widest bg-brand-pink-light text-brand-pink-dark font-bold px-2 py-0.5 rounded-full mt-1.5 scale-90">
            UGC
          </span>
        </div>
        
        {/* Quick action button for searching */}
        <button
          onClick={() => handleNav('search')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-brand-gray hover:text-brand-pink hover:bg-brand-pink-light/35 transition-colors active:scale-95"
          title="Pesquisar"
        >
          <Search size={20} />
        </button>
      </header>

      {/* MORE OPTIONS SLIDE-UP DRAWER (Bottom Sheet Overlay) */}
      {isMoreOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          {/* Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Slide-Up Bottom Sheet */}
          <div className="relative bg-white rounded-t-[36px] shadow-2xl p-6 border-t border-brand-pink-light/50 flex flex-col max-h-[80%] overflow-y-auto animate-in slide-in-from-bottom duration-300 z-50">
            {/* Header / Pull Bar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-1 bg-brand-gray-light rounded-full mb-3" />
              <div className="flex items-center justify-between w-full">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-pink" /> Central de Criação
                </h3>
                <button 
                  onClick={() => setIsMoreOpen(false)}
                  className="text-xs font-semibold text-brand-pink hover:text-brand-pink-dark px-3 py-1 rounded-full bg-brand-pink-light"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Grid of Tools */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {extraItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="flex flex-col items-center text-center justify-center p-2 rounded-2xl hover:bg-brand-pink-light/30 transition-all active:scale-95 group h-20"
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                      isActive 
                        ? 'bg-brand-pink text-white shadow-premium' 
                        : 'bg-brand-pink-light/40 text-brand-pink group-hover:bg-brand-pink-light'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-brand-charcoal truncate w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-brand-pink-light/40 mt-3 pt-4 text-center">
              <p className="text-[10px] italic text-brand-gray font-serif">Aurora Creator • Seu Cérebro UGC ✨</p>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t border-brand-pink-light/30 flex items-center justify-around z-40 px-3 pb-safe shadow-[0_-4px_16px_rgba(201,138,146,0.04)]">
        {/* Tab 1: Dashboard */}
        <button
          onClick={() => handleNav('dashboard')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all active:scale-90 ${
            activeTab === 'dashboard' ? 'text-brand-pink scale-105 font-bold' : 'text-brand-gray'
          }`}
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <Home size={22} className={activeTab === 'dashboard' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[9px] mt-0.5 tracking-tight">Início</span>
        </button>

        {/* Tab 2: Products */}
        <button
          onClick={() => handleNav('products')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all active:scale-90 ${
            (activeTab === 'products' || activeTab === 'categories') ? 'text-brand-pink scale-105 font-bold' : 'text-brand-gray'
          }`}
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <Package size={22} className={(activeTab === 'products' || activeTab === 'categories') ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[9px] mt-0.5 tracking-tight">Produtos</span>
        </button>
        
        {/* Tab 3: Central Primary Action - Novo Produto */}
        <button
          onClick={handleNewProduct}
          className="w-14 h-14 -mt-6 bg-gradient-to-tr from-brand-pink to-brand-pink-dark text-white rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-50 border-4 border-white"
          style={{ minHeight: '48px', minWidth: '48px' }}
          title="Cadastrar Novo Produto"
        >
          <Plus size={26} className="stroke-[2.5px]" />
        </button>

        {/* Tab 4: Scripts */}
        <button
          onClick={() => handleNav('scripts')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all active:scale-90 ${
            activeTab === 'scripts' ? 'text-brand-pink scale-105 font-bold' : 'text-brand-gray'
          }`}
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <FileText size={22} className={activeTab === 'scripts' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[9px] mt-0.5 tracking-tight">Roteiros</span>
        </button>

        {/* Tab 5: Mais Bottom Sheet Toggle */}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all active:scale-90 ${
            isMoreOpen ? 'text-brand-pink font-bold' : 'text-brand-gray'
          }`}
          style={{ minHeight: '44px', minWidth: '44px' }}
          title="Mais Ferramentas"
        >
          {isMoreOpen ? (
            <ChevronDown size={22} className="text-brand-pink stroke-[2.5px]" />
          ) : (
            <Grid size={22} className="stroke-[1.8px]" />
          )}
          <span className="text-[9px] mt-0.5 tracking-tight">Mais</span>
        </button>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { useAppState } from './StateContext';
import { Settings as SettingsIcon, User, RefreshCw, CheckSquare, Trash2, ShieldAlert, Award, Sparkles } from 'lucide-react';

export const Settings: React.FC = () => {
  const { checklists, addChecklist, deleteChecklist } = useAppState();

  const [creatorName, setCreatorName] = useState('Mariana Costa');
  const [creatorNiche, setCreatorNiche] = useState('Beleza & Skincare Premium');
  const [creatorEmail, setCreatorEmail] = useState('mariana.costa@ugc.com');
  const [creatorAvatar, setCreatorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');

  const [newChecklistName, setNewChecklistName] = useState('');
  const [newChecklistItems, setNewChecklistItems] = useState('');

  // Save creator profile
  useEffect(() => {
    const savedName = localStorage.getItem('aurora_creator_name');
    const savedNiche = localStorage.getItem('aurora_creator_niche');
    const savedEmail = localStorage.getItem('aurora_creator_email');
    const savedAvatar = localStorage.getItem('aurora_creator_avatar');

    if (savedName) setCreatorName(savedName);
    if (savedNiche) setCreatorNiche(savedNiche);
    if (savedEmail) setCreatorEmail(savedEmail);
    if (savedAvatar) setCreatorAvatar(savedAvatar);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aurora_creator_name', creatorName);
    localStorage.setItem('aurora_creator_niche', creatorNiche);
    localStorage.setItem('aurora_creator_email', creatorEmail);
    localStorage.setItem('aurora_creator_avatar', creatorAvatar);
    alert('Perfil atualizado com sucesso! ✨');
  };

  const handleResetDatabase = () => {
    if (confirm('ATENÇÃO: Isso irá apagar todos os produtos, ganchos, cenas e roteiros criados por você e restaurará os dados demonstrativos conectados originais. Deseja prosseguir?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleCreateChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistName || !newChecklistItems) return;

    const itemsArray = newChecklistItems
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    addChecklist({
      id: `chk-custom-${Date.now()}`,
      name: newChecklistName,
      items: itemsArray
    });

    setNewChecklistName('');
    setNewChecklistItems('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* HEADER */}
      <div className="border-b border-brand-pink-light pb-4">
        <h1 className="text-3xl font-serif text-brand-charcoal font-bold font-serif">Ajustes & Configurações</h1>
        <p className="text-xs text-brand-gray mt-1 font-sans">Personalize seu espaço de trabalho, gerencie modelos de checklist e organize a memória do seu aplicativo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CREATOR PROFILE (7 COLS) */}
        <div className="md:col-span-7 bg-white border border-brand-pink-light/35 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
          <div className="flex items-center gap-2 border-b border-brand-pink-light/15 pb-4">
            <User className="text-brand-pink" size={18} />
            <h3 className="text-sm font-bold text-brand-charcoal">Perfil da Criadora UGC</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
            {/* Avatar & Greetings */}
            <div className="flex items-center gap-4">
              <img
                src={creatorAvatar}
                alt={creatorName}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-pink/60 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <label className="font-bold text-brand-charcoal">URL da Imagem de Perfil</label>
                <input
                  type="url"
                  value={creatorAvatar}
                  onChange={(e) => setCreatorAvatar(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-brand-charcoal">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-brand-charcoal">Nicho / Especialidade</label>
                <input
                  type="text"
                  required
                  value={creatorNiche}
                  onChange={(e) => setCreatorNiche(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-brand-charcoal">E-mail Profissional</label>
              <input
                type="email"
                required
                value={creatorEmail}
                onChange={(e) => setCreatorEmail(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-premium transition-all"
            >
              Gravar Alterações
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: SYSTEM CONTROLS & CHECKLIST TEMPLATES (5 COLS) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* CUSTOM CHECKLIST TEMPLATES */}
          <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-pink-light/15 pb-3">
              <CheckSquare className="text-brand-pink" size={18} />
              <h4 className="text-sm font-bold text-brand-charcoal">Checklist de Gravação</h4>
            </div>

            {/* List templates */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {checklists.map((chk) => (
                <div key={chk.id} className="p-3 bg-brand-offwhite rounded-2xl flex items-center justify-between text-xs font-semibold">
                  <div>
                    <p className="text-brand-charcoal">{chk.name}</p>
                    <p className="text-[9px] text-brand-gray mt-0.5">{chk.items.length} etapas inclusas</p>
                  </div>
                  {chk.id !== 'chk-t-default' && (
                    <button
                      onClick={() => deleteChecklist(chk.id)}
                      className="text-brand-gray hover:text-red-500 p-1 rounded-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Create checklist form */}
            <form onSubmit={handleCreateChecklist} className="space-y-3 pt-3 border-t border-brand-pink-light/15 text-xs">
              <p className="text-[10px] uppercase font-bold text-brand-gray">Criar Modelo Personalizado</p>
              
              <div className="space-y-1">
                <input
                  type="text"
                  required
                  placeholder="Nome do Modelo (Ex: Luxo Perfumes)"
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                />
              </div>

              <div className="space-y-1">
                <textarea
                  rows={3}
                  required
                  placeholder="Insira as etapas, uma por linha..."
                  value={newChecklistItems}
                  onChange={(e) => setNewChecklistItems(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/60 bg-brand-offwhite"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-pink text-white text-[11px] font-bold py-2.5 rounded-xl"
              >
                Adicionar Modelo de Checklist
              </button>
            </form>
          </div>

          {/* DANGEROUS RECOVERY / BACKUP TOOLS */}
          <div className="bg-red-50/40 border border-red-200/40 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-red-200/20 pb-3">
              <ShieldAlert className="text-red-600" size={18} />
              <h4 className="text-sm font-bold text-red-800">Ferramentas de Limpeza</h4>
            </div>

            <p className="text-[10px] text-red-700/80 leading-relaxed font-medium">
              Essas ações apagarão permanentemente todo o seu histórico e recarregarão o banco de dados demonstrativos conectados originais.
            </p>

            <button
              onClick={handleResetDatabase}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
              Resetar Banco de Dados
            </button>
          </div>

        </div>
      </div>

      {/* DESIGN CREDITS (Hiding infrastructure/telemetry clutter as strictly requested in guidelines!) */}
      <div className="bg-white/40 border border-brand-pink-light/10 rounded-2xl p-4 text-center max-w-sm mx-auto">
        <span className="font-cursive text-2xl text-brand-pink block leading-none">Aurora Creator</span>
        <span className="text-[9px] uppercase tracking-widest text-brand-gray font-bold mt-1 block">Espaço da Criadora UGC • Versão 1.0</span>
      </div>

    </div>
  );
};

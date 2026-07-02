import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Reference,
  Hook,
  Scene,
  Idea,
  Script,
  Planning,
  CustomChecklist,
  Category,
  Environment,
  Equipment,
  LightingConfig,
  Background,
  Prop,
  VideoStyle
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_HOOKS,
  INITIAL_REFERENCES,
  INITIAL_SCENES,
  INITIAL_SCRIPTS,
  INITIAL_IDEAS,
  INITIAL_PLANNINGS,
  INITIAL_ENVIRONMENTS,
  INITIAL_EQUIPMENTS,
  INITIAL_LIGHTINGS,
  INITIAL_BACKGROUNDS,
  INITIAL_PROPS,
  INITIAL_VIDEO_STYLES
} from '../data';

interface StateContextType {
  products: Product[];
  hooks: Hook[];
  references: Reference[];
  scenes: Scene[];
  ideas: Idea[];
  scripts: Script[];
  plannings: Planning[];
  checklists: CustomChecklist[];
  environments: Environment[];
  equipments: Equipment[];
  lightings: LightingConfig[];
  backgrounds: Background[];
  props: Prop[];
  videoStyles: VideoStyle[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedScriptId: string | null;
  setSelectedScriptId: (id: string | null) => void;

  // Mutators
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  addHook: (hook: Hook) => void;
  updateHook: (hook: Hook) => void;
  deleteHook: (id: string) => void;

  addReference: (ref: Reference) => void;
  updateReference: (ref: Reference) => void;
  deleteReference: (id: string) => void;

  addScene: (scene: Scene) => void;
  updateScene: (scene: Scene) => void;
  deleteScene: (id: string) => void;

  addIdea: (idea: Idea) => void;
  updateIdea: (idea: Idea) => void;
  deleteIdea: (id: string) => void;

  addScript: (script: Script) => void;
  updateScript: (script: Script) => void;
  deleteScript: (id: string) => void;

  addPlanning: (plan: Planning) => void;
  updatePlanning: (plan: Planning) => void;
  deletePlanning: (id: string) => void;

  addChecklist: (checklist: CustomChecklist) => void;
  updateChecklist: (checklist: CustomChecklist) => void;
  deleteChecklist: (id: string) => void;

  addEnvironment: (env: Environment) => void;
  updateEnvironment: (env: Environment) => void;
  deleteEnvironment: (id: string) => void;

  addEquipment: (eq: Equipment) => void;
  updateEquipment: (eq: Equipment) => void;
  deleteEquipment: (id: string) => void;

  addLighting: (light: LightingConfig) => void;
  updateLighting: (light: LightingConfig) => void;
  deleteLighting: (id: string) => void;

  addBackground: (bg: Background) => void;
  updateBackground: (bg: Background) => void;
  deleteBackground: (id: string) => void;

  addProp: (prop: Prop) => void;
  updateProp: (prop: Prop) => void;
  deleteProp: (id: string) => void;

  addVideoStyle: (style: VideoStyle) => void;
  updateVideoStyle: (style: VideoStyle) => void;
  deleteVideoStyle: (id: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [checklists, setChecklists] = useState<CustomChecklist[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [lightings, setLightings] = useState<LightingConfig[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [props, setProps] = useState<Prop[]>([]);
  const [videoStyles, setVideoStyles] = useState<VideoStyle[]>([]);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const localProducts = localStorage.getItem('aurora_products');
    const localHooks = localStorage.getItem('aurora_hooks');
    const localReferences = localStorage.getItem('aurora_references');
    const localScenes = localStorage.getItem('aurora_scenes');
    const localIdeas = localStorage.getItem('aurora_ideas');
    const localScripts = localStorage.getItem('aurora_scripts');
    const localPlannings = localStorage.getItem('aurora_plannings');
    const localChecklists = localStorage.getItem('aurora_checklists');
    const localEnvironments = localStorage.getItem('aurora_environments');
    const localEquipments = localStorage.getItem('aurora_equipments');
    const localLightings = localStorage.getItem('aurora_lightings');
    const localBackgrounds = localStorage.getItem('aurora_backgrounds');
    const localProps = localStorage.getItem('aurora_props');
    const localVideoStyles = localStorage.getItem('aurora_video_styles');

    if (localProducts) setProducts(JSON.parse(localProducts));
    else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('aurora_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    if (localHooks) setHooks(JSON.parse(localHooks));
    else {
      setHooks(INITIAL_HOOKS);
      localStorage.setItem('aurora_hooks', JSON.stringify(INITIAL_HOOKS));
    }

    if (localReferences) setReferences(JSON.parse(localReferences));
    else {
      setReferences(INITIAL_REFERENCES);
      localStorage.setItem('aurora_references', JSON.stringify(INITIAL_REFERENCES));
    }

    if (localScenes) setScenes(JSON.parse(localScenes));
    else {
      setScenes(INITIAL_SCENES);
      localStorage.setItem('aurora_scenes', JSON.stringify(INITIAL_SCENES));
    }

    if (localIdeas) setIdeas(JSON.parse(localIdeas));
    else {
      setIdeas(INITIAL_IDEAS);
      localStorage.setItem('aurora_ideas', JSON.stringify(INITIAL_IDEAS));
    }

    if (localScripts) setScripts(JSON.parse(localScripts));
    else {
      setScripts(INITIAL_SCRIPTS);
      localStorage.setItem('aurora_scripts', JSON.stringify(INITIAL_SCRIPTS));
    }

    if (localPlannings) setPlannings(JSON.parse(localPlannings));
    else {
      setPlannings(INITIAL_PLANNINGS);
      localStorage.setItem('aurora_plannings', JSON.stringify(INITIAL_PLANNINGS));
    }

    if (localEnvironments) setEnvironments(JSON.parse(localEnvironments));
    else {
      setEnvironments(INITIAL_ENVIRONMENTS);
      localStorage.setItem('aurora_environments', JSON.stringify(INITIAL_ENVIRONMENTS));
    }

    if (localEquipments) setEquipments(JSON.parse(localEquipments));
    else {
      setEquipments(INITIAL_EQUIPMENTS);
      localStorage.setItem('aurora_equipments', JSON.stringify(INITIAL_EQUIPMENTS));
    }

    if (localLightings) setLightings(JSON.parse(localLightings));
    else {
      setLightings(INITIAL_LIGHTINGS);
      localStorage.setItem('aurora_lightings', JSON.stringify(INITIAL_LIGHTINGS));
    }

    if (localBackgrounds) setBackgrounds(JSON.parse(localBackgrounds));
    else {
      setBackgrounds(INITIAL_BACKGROUNDS);
      localStorage.setItem('aurora_backgrounds', JSON.stringify(INITIAL_BACKGROUNDS));
    }

    if (localProps) setProps(JSON.parse(localProps));
    else {
      setProps(INITIAL_PROPS);
      localStorage.setItem('aurora_props', JSON.stringify(INITIAL_PROPS));
    }

    if (localVideoStyles) setVideoStyles(JSON.parse(localVideoStyles));
    else {
      setVideoStyles(INITIAL_VIDEO_STYLES);
      localStorage.setItem('aurora_video_styles', JSON.stringify(INITIAL_VIDEO_STYLES));
    }

    if (localChecklists) setChecklists(JSON.parse(localChecklists));
    else {
      const initialChecklist: CustomChecklist[] = [
        {
          id: 'chk-t-default',
          name: 'Checklist Padrão UGC',
          items: [
            'Carregar celular',
            'Limpar lente',
            'Carregar luz',
            'Preparar ambiente',
            'Separar produto',
            'Separar acessórios',
            'Preparar roupas',
            'Gravar takes principais',
            'Gravar B-Roll',
            'Capturar fotos',
            'Backup dos arquivos'
          ]
        }
      ];
      setChecklists(initialChecklist);
      localStorage.setItem('aurora_checklists', JSON.stringify(initialChecklist));
    }
  }, []);

  // Save helper
  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Product helper functions
  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    setProducts(updated);
    saveToLocalStorage('aurora_products', updated);
  };
  const updateProduct = (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    setProducts(updated);
    saveToLocalStorage('aurora_products', updated);
  };
  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToLocalStorage('aurora_products', updated);
  };

  // Hook helper functions
  const addHook = (hook: Hook) => {
    const updated = [hook, ...hooks];
    setHooks(updated);
    saveToLocalStorage('aurora_hooks', updated);
  };
  const updateHook = (hook: Hook) => {
    const updated = hooks.map((h) => (h.id === hook.id ? hook : h));
    setHooks(updated);
    saveToLocalStorage('aurora_hooks', updated);
  };
  const deleteHook = (id: string) => {
    const updated = hooks.filter((h) => h.id !== id);
    setHooks(updated);
    saveToLocalStorage('aurora_hooks', updated);
  };

  // Reference helper functions
  const addReference = (ref: Reference) => {
    const updated = [ref, ...references];
    setReferences(updated);
    saveToLocalStorage('aurora_references', updated);
  };
  const updateReference = (ref: Reference) => {
    const updated = references.map((r) => (r.id === ref.id ? ref : r));
    setReferences(updated);
    saveToLocalStorage('aurora_references', updated);
  };
  const deleteReference = (id: string) => {
    const updated = references.filter((r) => r.id !== id);
    setReferences(updated);
    saveToLocalStorage('aurora_references', updated);
  };

  // Scene helper functions
  const addScene = (scene: Scene) => {
    const updated = [scene, ...scenes];
    setScenes(updated);
    saveToLocalStorage('aurora_scenes', updated);
  };
  const updateScene = (scene: Scene) => {
    const updated = scenes.map((s) => (s.id === scene.id ? scene : s));
    setScenes(updated);
    saveToLocalStorage('aurora_scenes', updated);
  };
  const deleteScene = (id: string) => {
    const updated = scenes.filter((s) => s.id !== id);
    setScenes(updated);
    saveToLocalStorage('aurora_scenes', updated);
  };

  // Idea helper functions
  const addIdea = (idea: Idea) => {
    const updated = [idea, ...ideas];
    setIdeas(updated);
    saveToLocalStorage('aurora_ideas', updated);
  };
  const updateIdea = (idea: Idea) => {
    const updated = ideas.map((i) => (i.id === idea.id ? idea : i));
    setIdeas(updated);
    saveToLocalStorage('aurora_ideas', updated);
  };
  const deleteIdea = (id: string) => {
    const updated = ideas.filter((i) => i.id !== id);
    setIdeas(updated);
    saveToLocalStorage('aurora_ideas', updated);
  };

  // Script helper functions
  const addScript = (script: Script) => {
    const updated = [script, ...scripts];
    setScripts(updated);
    saveToLocalStorage('aurora_scripts', updated);
  };
  const updateScript = (script: Script) => {
    const updated = scripts.map((s) => (s.id === script.id ? script : s));
    setScripts(updated);
    saveToLocalStorage('aurora_scripts', updated);
  };
  const deleteScript = (id: string) => {
    const updated = scripts.filter((s) => s.id !== id);
    setScripts(updated);
    saveToLocalStorage('aurora_scripts', updated);
  };

  // Planning helper functions
  const addPlanning = (plan: Planning) => {
    const updated = [plan, ...plannings];
    setPlannings(updated);
    saveToLocalStorage('aurora_plannings', updated);
  };
  const updatePlanning = (plan: Planning) => {
    const updated = plannings.map((p) => (p.id === plan.id ? plan : p));
    setPlannings(updated);
    saveToLocalStorage('aurora_plannings', updated);
  };
  const deletePlanning = (id: string) => {
    const updated = plannings.filter((p) => p.id !== id);
    setPlannings(updated);
    saveToLocalStorage('aurora_plannings', updated);
  };

  // Checklist helper functions
  const addChecklist = (checklist: CustomChecklist) => {
    const updated = [checklist, ...checklists];
    setChecklists(updated);
    saveToLocalStorage('aurora_checklists', updated);
  };
  const updateChecklist = (checklist: CustomChecklist) => {
    const updated = checklists.map((c) => (c.id === checklist.id ? checklist : c));
    setChecklists(updated);
    saveToLocalStorage('aurora_checklists', updated);
  };
  const deleteChecklist = (id: string) => {
    const updated = checklists.filter((c) => c.id !== id);
    setChecklists(updated);
    saveToLocalStorage('aurora_checklists', updated);
  };

  // Environment helpers
  const addEnvironment = (env: Environment) => {
    const updated = [env, ...environments];
    setEnvironments(updated);
    saveToLocalStorage('aurora_environments', updated);
  };
  const updateEnvironment = (env: Environment) => {
    const updated = environments.map((e) => (e.id === env.id ? env : e));
    setEnvironments(updated);
    saveToLocalStorage('aurora_environments', updated);
  };
  const deleteEnvironment = (id: string) => {
    const updated = environments.filter((e) => e.id !== id);
    setEnvironments(updated);
    saveToLocalStorage('aurora_environments', updated);
  };

  // Equipment helpers
  const addEquipment = (eq: Equipment) => {
    const updated = [eq, ...equipments];
    setEquipments(updated);
    saveToLocalStorage('aurora_equipments', updated);
  };
  const updateEquipment = (eq: Equipment) => {
    const updated = equipments.map((e) => (e.id === eq.id ? eq : e));
    setEquipments(updated);
    saveToLocalStorage('aurora_equipments', updated);
  };
  const deleteEquipment = (id: string) => {
    const updated = equipments.filter((e) => e.id !== id);
    setEquipments(updated);
    saveToLocalStorage('aurora_equipments', updated);
  };

  // Lighting helpers
  const addLighting = (light: LightingConfig) => {
    const updated = [light, ...lightings];
    setLightings(updated);
    saveToLocalStorage('aurora_lightings', updated);
  };
  const updateLighting = (light: LightingConfig) => {
    const updated = lightings.map((l) => (l.id === light.id ? light : l));
    setLightings(updated);
    saveToLocalStorage('aurora_lightings', updated);
  };
  const deleteLighting = (id: string) => {
    const updated = lightings.filter((l) => l.id !== id);
    setLightings(updated);
    saveToLocalStorage('aurora_lightings', updated);
  };

  // Background helpers
  const addBackground = (bg: Background) => {
    const updated = [bg, ...backgrounds];
    setBackgrounds(updated);
    saveToLocalStorage('aurora_backgrounds', updated);
  };
  const updateBackground = (bg: Background) => {
    const updated = backgrounds.map((b) => (b.id === bg.id ? bg : b));
    setBackgrounds(updated);
    saveToLocalStorage('aurora_backgrounds', updated);
  };
  const deleteBackground = (id: string) => {
    const updated = backgrounds.filter((b) => b.id !== id);
    setBackgrounds(updated);
    saveToLocalStorage('aurora_backgrounds', updated);
  };

  // Prop helpers
  const addProp = (prop: Prop) => {
    const updated = [prop, ...props];
    setProps(updated);
    saveToLocalStorage('aurora_props', updated);
  };
  const updateProp = (prop: Prop) => {
    const updated = props.map((p) => (p.id === prop.id ? prop : p));
    setProps(updated);
    saveToLocalStorage('aurora_props', updated);
  };
  const deleteProp = (id: string) => {
    const updated = props.filter((p) => p.id !== id);
    setProps(updated);
    saveToLocalStorage('aurora_props', updated);
  };

  // Video style helpers
  const addVideoStyle = (style: VideoStyle) => {
    const updated = [style, ...videoStyles];
    setVideoStyles(updated);
    saveToLocalStorage('aurora_video_styles', updated);
  };
  const updateVideoStyle = (style: VideoStyle) => {
    const updated = videoStyles.map((s) => (s.id === style.id ? style : s));
    setVideoStyles(updated);
    saveToLocalStorage('aurora_video_styles', updated);
  };
  const deleteVideoStyle = (id: string) => {
    const updated = videoStyles.filter((s) => s.id !== id);
    setVideoStyles(updated);
    saveToLocalStorage('aurora_video_styles', updated);
  };

  return (
    <StateContext.Provider
      value={{
        products,
        hooks,
        references,
        scenes,
        ideas,
        scripts,
        plannings,
        checklists,
        environments,
        equipments,
        lightings,
        backgrounds,
        props,
        videoStyles,
        activeTab,
        setActiveTab,
        selectedProductId,
        setSelectedProductId,
        selectedScriptId,
        setSelectedScriptId,
        addProduct,
        updateProduct,
        deleteProduct,
        addHook,
        updateHook,
        deleteHook,
        addReference,
        updateReference,
        deleteReference,
        addScene,
        updateScene,
        deleteScene,
        addIdea,
        updateIdea,
        deleteIdea,
        addScript,
        updateScript,
        deleteScript,
        addPlanning,
        updatePlanning,
        deletePlanning,
        addChecklist,
        updateChecklist,
        deleteChecklist,
        addEnvironment,
        updateEnvironment,
        deleteEnvironment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        addLighting,
        updateLighting,
        deleteLighting,
        addBackground,
        updateBackground,
        deleteBackground,
        addProp,
        updateProp,
        deleteProp,
        addVideoStyle,
        updateVideoStyle,
        deleteVideoStyle
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};

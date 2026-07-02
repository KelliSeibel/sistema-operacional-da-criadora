import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from './StateContext';
import { CATEGORIES } from '../data';
import { Category, Product, Reference, Hook, Scene, Script, Idea } from '../types';
import {
  Package,
  Plus,
  ArrowLeft,
  Calendar,
  Tag,
  Bookmark,
  Video,
  FileText,
  Magnet,
  Lightbulb,
  Heart,
  CalendarDays,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Edit,
  Trash2,
  AlertCircle,
  Camera,
  Image as ImageIcon,
  ChevronLeft,
  Maximize2,
  Crown,
  MapPin,
  DollarSign,
  Link,
  Upload,
  X,
  Star,
  ArrowUp,
  ArrowDown,
  RefreshCw
} from 'lucide-react';

export const Products: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    references,
    scenes,
    scripts,
    hooks,
    ideas,
    selectedProductId,
    setSelectedProductId,
    setActiveTab,
    setSelectedScriptId
  } = useAppState();

  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Carousel & Zoom States
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [zoomIndex, setZoomIndex] = useState<number>(0);
  const [zoomImagesList, setZoomImagesList] = useState<string[]>([]);

  // MediaDevices Camera Integration States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Maquiagem');
  const [formDescription, setFormDescription] = useState('');
  const [formEmotion, setFormEmotion] = useState('');
  const [formProblem, setFormProblem] = useState('');
  const [formTransformation, setFormTransformation] = useState('');
  const [formSensation, setFormSensation] = useState('');
  const [formAudience, setFormAudience] = useState('');
  const [formBenefits, setFormBenefits] = useState('');
  const [formObjections, setFormObjections] = useState('');
  const [formKeywords, setFormKeywords] = useState('');
  const [formPurchaseDate, setFormPurchaseDate] = useState('');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formRelatedIds, setFormRelatedIds] = useState<string[]>([]);

  // NEW FORM STATES FOR PHOTOS & EXTRA FIELDS
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formStorageLocation, setFormStorageLocation] = useState('');
  const [formValue, setFormValue] = useState('');
  const [formPurchaseLink, setFormPurchaseLink] = useState('');
  const [formDifferentials, setFormDifferentials] = useState('');
  const [formStep, setFormStep] = useState(1);

  // Auto-label helpers matching the exact prompt examples
  const getPhotoLabel = (index: number) => {
    const labels = ['Capa', 'Frente', 'Verso', 'Textura', 'Aplicação'];
    return labels[index] || `Detalhe ${index - 4}`;
  };

  // Listen for navigation trigger from Dashboard to auto-open creation flow
  useEffect(() => {
    if (selectedProductId === 'new') {
      setIsCreating(true);
      setIsEditing(false);
      resetForm();
      setSelectedProductId(null);
    }
  }, [selectedProductId, setSelectedProductId]);

  // Camera Stream Lifecycle Management and Device Enumeration
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCameraStream = async () => {
      if (!isCameraActive) return;
      setCameraError(null);

      try {
        // Enumerate video input devices first to populate selection
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter(d => d.kind === 'videoinput');
          setCameraDevices(videoInputs);
        }

        const constraints: any = {
          video: selectedCameraId
            ? { deviceId: { exact: selectedCameraId } }
            : { facingMode: cameraFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        };

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("A API MediaDevices não é suportada neste navegador ou ambiente iFrame.");
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = stream;
        setCameraStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Play the stream
          videoRef.current.play().catch(err => {
            console.warn("Autoplay foi impedido ou falhou:", err);
          });
        }
      } catch (err: any) {
        console.error("Erro ao acessar a câmera do dispositivo:", err);
        setCameraError(
          err.name === 'NotAllowedError' 
            ? "Permissão de acesso à câmera negada. Conceda permissão nas configurações do seu navegador para capturar fotos."
            : `Não foi possível acessar a câmera do dispositivo: ${err.message || err}`
        );
      }
    };

    if (isCameraActive) {
      startCameraStream();
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive, cameraFacingMode, selectedCameraId]);

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;

    // Trigger visual flash effect for premium feedback
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    const canvas = canvasRef.current || document.createElement('canvas');
    const video = videoRef.current;
    
    // Use high resolution from the video feed
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror the frame only if the camera is front-facing (user selfie mode)
      if (cameraFacingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      // Add the snapshot to the product images array
      setFormImages(prev => [...prev, dataUrl]);
    }
  };

  const handleSwitchCamera = () => {
    if (cameraDevices.length > 1) {
      const currentIndex = cameraDevices.findIndex(d => d.deviceId === selectedCameraId);
      const nextIndex = (currentIndex + 1) % cameraDevices.length;
      const nextDevice = cameraDevices[nextIndex];
      setSelectedCameraId(nextDevice.deviceId);
      
      const label = nextDevice.label.toLowerCase();
      if (label.includes('front') || label.includes('selfie') || label.includes('frontal') || label.includes('user')) {
        setCameraFacingMode('user');
      } else {
        setCameraFacingMode('environment');
      }
    } else {
      // Toggle basic constraints if device enumeration list is empty
      const nextMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
      setCameraFacingMode(nextMode);
      setSelectedCameraId(''); // reset to let browser select
    }
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Aesthetic beauty photo presets for instant testing/preview
  const presetPhotos = [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', // Skincare pink serum
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800', // Makeup palette
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800', // Clean cosmetic jar
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800', // Golden serum droplets
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800', // Essential oil
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800'  // Frothy skincare cream
  ];

  const handleAddPresetPhoto = () => {
    // Pick a random preset photo that isn't already in the form
    const available = presetPhotos.filter(p => !formImages.includes(p));
    const randomUrl = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)]
      : presetPhotos[Math.floor(Math.random() * presetPhotos.length)];
    
    setFormImages([...formImages, randomUrl]);
  };

  // Handle local image file selections
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Clear input value so same file can be uploaded again
    e.target.value = '';
  };

  // Drag and drop sorting mechanics
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedIndexStr = e.dataTransfer.getData('text/plain');
    if (!draggedIndexStr) return;
    const dragIndex = parseInt(draggedIndexStr);
    if (dragIndex === targetIndex) return;

    const newImages = [...formImages];
    const [draggedItem] = newImages.splice(dragIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);
    setFormImages(newImages);
  };

  // Reorder utility button handlers (extremely touch-friendly for mobile devices)
  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formImages.length) return;

    const newImages = [...formImages];
    const temp = newImages[index];
    newImages[index] = newImages[newIndex];
    newImages[newIndex] = temp;
    setFormImages(newImages);
  };

  // Set selected photo as cover (index 0)
  const setAsCover = (index: number) => {
    if (index === 0) return;
    const newImages = [...formImages];
    const [cover] = newImages.splice(index, 1);
    newImages.unshift(cover);
    setFormImages(newImages);
  };

  // Delete image easily
  const handleDeleteImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  // Open edit form
  const handleStartEdit = (p: Product) => {
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormDescription(p.description);
    setFormEmotion(p.emotion);
    setFormProblem(p.problemResolved);
    setFormTransformation(p.transformation);
    setFormSensation(p.sensation);
    setFormAudience(p.audience);
    setFormBenefits(p.benefits);
    setFormObjections(p.objections || '');
    setFormKeywords(p.keywords.join(', '));
    setFormPurchaseDate(p.purchaseDate);
    setFormExpiryDate(p.expiryDate);
    setFormNotes(p.notes);
    setFormTags(p.tags.join(', '));
    setFormImageUrl(p.imageUrl);
    setFormRelatedIds(p.relatedProductIds);

    // Set new fields
    setFormImages(p.images && p.images.length > 0 ? p.images : [p.imageUrl]);
    setFormStorageLocation(p.storageLocation || '');
    setFormValue(p.value || '');
    setFormPurchaseLink(p.purchaseLink || '');
    setFormDifferentials(p.differentials || '');

    setIsEditing(true);
  };

  // Submit product (create/update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formBrand) return;

    const parsedKeywords = formKeywords.split(',').map((k) => k.trim()).filter(Boolean);
    const parsedTags = formTags.split(',').map((t) => t.trim()).filter(Boolean);
    
    // Choose the first image in formImages as cover, or fallback to standard
    const coverImage = formImages[0] || formImageUrl.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800';

    const pData: Product = {
      id: isEditing && selectedProductId ? selectedProductId : `prod-${Date.now()}`,
      name: formName,
      brand: formBrand,
      category: formCategory,
      description: formDescription,
      emotion: formEmotion,
      problemResolved: formProblem,
      transformation: formTransformation,
      sensation: formSensation,
      audience: formAudience,
      benefits: formBenefits,
      objections: formObjections,
      keywords: parsedKeywords,
      purchaseDate: formPurchaseDate,
      expiryDate: formExpiryDate,
      notes: formNotes,
      tags: parsedTags,
      imageUrl: coverImage, // capa image
      relatedProductIds: formRelatedIds,
      // Expand storage payload
      images: formImages.length > 0 ? formImages : [coverImage],
      storageLocation: formStorageLocation,
      value: formValue,
      purchaseLink: formPurchaseLink,
      differentials: formDifferentials
    };

    if (isEditing) {
      updateProduct(pData);
      setIsEditing(false);
    } else {
      addProduct(pData);
      setIsCreating(false);
    }

    // Reset Form
    resetForm();
  };

  const resetForm = () => {
    setFormName('');
    setFormBrand('');
    setFormCategory('Maquiagem');
    setFormDescription('');
    setFormEmotion('');
    setFormProblem('');
    setFormTransformation('');
    setFormSensation('');
    setFormAudience('');
    setFormBenefits('');
    setFormObjections('');
    setFormKeywords('');
    setFormPurchaseDate('');
    setFormExpiryDate('');
    setFormNotes('');
    setFormTags('');
    setFormImageUrl('');
    setFormRelatedIds([]);

    // Reset new states
    setFormImages([]);
    setFormStorageLocation('');
    setFormValue('');
    setFormPurchaseLink('');
    setFormDifferentials('');
    setActiveImgIndex(0);
    setFormStep(1);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este produto e remover as conexões?')) {
      deleteProduct(id);
      setSelectedProductId(null);
    }
  }  // Filter products by category
  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  // Active product details
  const activeProduct = products.find((p) => p.id === selectedProductId);

  // Active carousel state (for the details page)
  const productImages = activeProduct
    ? (activeProduct.images && activeProduct.images.length > 0
        ? activeProduct.images
        : [activeProduct.imageUrl])
    : [];

  const handleOpenZoom = (imagesList: string[], startIndex: number) => {
    setZoomImagesList(imagesList);
    setZoomIndex(startIndex);
    setZoomImage(imagesList[startIndex]);
  };

  const handleNextZoom = () => {
    const nextIdx = (zoomIndex + 1) % zoomImagesList.length;
    setZoomIndex(nextIdx);
    setZoomImage(zoomImagesList[nextIdx]);
  };

  const handlePrevZoom = () => {
    const prevIdx = (zoomIndex - 1 + zoomImagesList.length) % zoomImagesList.length;
    setZoomIndex(prevIdx);
    setZoomImage(zoomImagesList[prevIdx]);
  };

  // Connect items automatically for the active product
  const connectedReferences = references.filter((r) => r.productId === selectedProductId);
  const connectedScenes = scenes.filter((s) => s.productIds.includes(selectedProductId || ''));
  const connectedScripts = scripts.filter((s) => s.productId === selectedProductId);
  const connectedHooks = hooks.filter((h) => h.productIds.includes(selectedProductId || ''));
  const connectedIdeas = ideas.filter((i) => i.productId === selectedProductId);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* 1. PRODUCT DETAILS / CONNECTED UGC HUB PAGE */}
      {selectedProductId && activeProduct ? (
        <div className="space-y-8">
          {/* Back button and controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => { setSelectedProductId(null); setActiveImgIndex(0); }}
              className="flex items-center gap-2 text-sm font-semibold text-brand-pink hover:text-brand-pink-dark transition-colors"
            >
              <ArrowLeft size={16} /> Voltar para lista de produtos
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStartEdit(activeProduct)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 border border-brand-pink-light bg-white hover:bg-brand-pink-light/30 rounded-xl transition-all"
              >
                <Edit size={14} /> Editar Produto
              </button>
              <button
                onClick={() => handleDelete(activeProduct.id)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 border border-red-100 bg-white hover:bg-red-50 text-red-600 rounded-xl transition-all"
              >
                <Trash2 size={14} /> Excluir
              </button>
            </div>
          </div>

          {/* MAIN PRODUCT HERO HEADER WITH INTERACTIVE CAROUSEL */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white border border-brand-pink-light/35 rounded-3xl p-6 sm:p-8 shadow-premium overflow-hidden">
            
            {/* Left Col: Photo Carousel / Pinterest Gallery */}
            <div className="md:col-span-5 space-y-3 flex flex-col">
              <div className="relative group rounded-2xl overflow-hidden aspect-square bg-brand-offwhite border border-brand-pink-light/10">
                
                {/* Active Main Carousel Image */}
                <img
                  src={productImages[activeImgIndex]}
                  alt={`${activeProduct.name} - ${getPhotoLabel(activeImgIndex)}`}
                  className="w-full h-full object-cover cursor-zoom-in group-hover:scale-102 transition-transform duration-500"
                  onClick={() => handleOpenZoom(productImages, activeImgIndex)}
                />

                {/* Tags & Labels Overlay */}
                <div className="absolute top-3 left-3 bg-glass/95 px-3 py-1.5 rounded-full border border-brand-pink-light/40 flex items-center gap-1 shadow-sm">
                  <Tag size={12} className="text-brand-pink" />
                  <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider">{activeProduct.category}</span>
                </div>

                {/* Photo Position Marker / Label */}
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded-lg text-[10px] font-medium text-white flex items-center gap-1">
                  <span>Foto {activeImgIndex + 1} • {getPhotoLabel(activeImgIndex)}</span>
                </div>

                {/* Direct Lightbox Zoom Hint */}
                <button
                  onClick={() => handleOpenZoom(productImages, activeImgIndex)}
                  className="absolute bottom-3 right-3 bg-glass/80 hover:bg-brand-pink p-2 rounded-lg text-brand-charcoal hover:text-white transition-colors border border-brand-pink-light/20 shadow-xs"
                  title="Ampliar Foto"
                >
                  <Maximize2 size={14} />
                </button>

                {/* Next/Prev Swipe Overlay */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand-pink text-brand-charcoal hover:text-white w-8 h-8 rounded-full flex items-center justify-center border border-brand-pink-light/20 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev + 1) % productImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand-pink text-brand-charcoal hover:text-white w-8 h-8 rounded-full flex items-center justify-center border border-brand-pink-light/20 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {productImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIndex(i)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImgIndex === i ? 'border-brand-pink scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white py-0.5 truncate text-center">
                        {getPhotoLabel(i)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Photo Counter Indicator */}
              <p className="text-[10px] text-brand-gray text-center font-semibold">
                Mostrando {activeImgIndex + 1} de {productImages.length} fotos do produto
              </p>
            </div>

            {/* Right Col: Details & Acquisition Sheet */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-brand-gray">{activeProduct.brand}</span>
                <h1 className="text-3xl font-serif text-brand-charcoal font-bold tracking-tight mt-1">{activeProduct.name}</h1>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeProduct.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-brand-pink-light/70 text-brand-pink-dark px-2.5 py-1 rounded-full font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-brand-gray leading-relaxed mt-4 bg-brand-offwhite/50 p-4 rounded-2xl border border-brand-pink-light/10">
                  {activeProduct.description}
                </p>
              </div>

              {/* STOCK, PRICE & PURCHASE ACTION SHEET */}
              <div className="bg-brand-offwhite p-4.5 rounded-2xl border border-brand-pink-light/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Storage Location */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-pink-50 border border-brand-pink-light/40 flex items-center justify-center text-brand-pink shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-gray font-bold block">Armazenado em</span>
                    <span className="font-semibold text-brand-charcoal text-[11px]">{activeProduct.storageLocation || 'Não informado'}</span>
                  </div>
                </div>

                {/* Price / Value */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <DollarSign size={15} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-gray font-bold block">Valor Estimado</span>
                    <span className="font-bold text-emerald-700 text-[11px]">{activeProduct.value || 'Não informado'}</span>
                  </div>
                </div>

                {/* Purchase Link Option */}
                <div className="sm:col-span-2 pt-2 border-t border-brand-pink-light/20 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] text-brand-gray font-medium">Link para reposição de produto:</span>
                  {activeProduct.purchaseLink ? (
                    <a
                      href={activeProduct.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-pink text-white font-semibold rounded-xl text-xs shadow-xs hover:bg-brand-pink-dark hover:shadow-md transition-all"
                    >
                      <ExternalLink size={13} /> Ir para Loja de Compra
                    </a>
                  ) : (
                    <span className="text-xs text-brand-gray italic">Nenhum link salvo</span>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 border-t border-brand-pink-light/30 pt-4 text-xs">
                <div>
                  <p className="text-brand-gray font-semibold">Data de Compra:</p>
                  <p className="text-brand-charcoal font-medium mt-0.5">{activeProduct.purchaseDate || 'Não informada'}</p>
                </div>
                <div>
                  <p className="text-brand-gray font-semibold">Validade:</p>
                  <p className="text-brand-charcoal font-medium mt-0.5">{activeProduct.expiryDate || 'Não informada'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* THE SELLING BRAIN OF THE PRODUCT WITH COMPETITIVE DIFFERENTIALS */}
          <div className="bg-gradient-to-tr from-brand-beige/20 via-white to-brand-pink-light/10 border border-brand-pink-light/30 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-lg font-serif font-bold text-brand-charcoal border-b border-brand-pink-light pb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-brand-pink" /> Cérebro Criativo & Emoções UGC
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">💓 Emoção que Vende</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.emotion}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">🔍 Problema que Resolve</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.problemResolved}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">✨ Transformação</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.transformation}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">🌿 Sensação / Textura</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.sensation}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20 col-span-1 md:col-span-2">
                <span className="font-bold text-brand-pink uppercase tracking-wider">⚡ Diferenciais Competitivos</span>
                <p className="text-brand-charcoal leading-relaxed font-semibold text-[11px] bg-brand-pink-light/10 p-3 rounded-xl border border-brand-pink-light/30">
                  {activeProduct.differentials || 'Nenhum diferencial preenchido.'}
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">🎯 Público-Alvo</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.audience}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-brand-pink-light/20">
                <span className="font-bold text-brand-pink uppercase tracking-wider">🛡️ Objeções Mais Comuns</span>
                <p className="text-brand-charcoal leading-relaxed font-medium">{activeProduct.objections}</p>
              </div>
            </div>

            {/* Benefits & Keywords */}
            <div className="pt-2 text-xs grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <span className="font-bold text-brand-gray uppercase tracking-wider">⭐ Principais Benefícios</span>
                <p className="text-brand-charcoal leading-relaxed bg-brand-offwhite p-4 rounded-2xl">{activeProduct.benefits}</p>
              </div>
              <div className="space-y-2">
                <span className="font-bold text-brand-gray uppercase tracking-wider">🏷️ Palavras-Chave UGC</span>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.keywords.map((kw, i) => (
                    <span key={i} className="bg-brand-beige text-brand-charcoal text-[11px] font-semibold px-3 py-1.5 rounded-xl border border-brand-nude-dark/40">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* INTERCONNECTED UGC BRAIN MAP */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif text-brand-charcoal font-semibold tracking-tight">
              Cérebro Conectado de Criação UGC <span className="text-brand-pink">🧠</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. ROTEIROS RELACIONADOS */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="text-brand-pink" size={18} />
                    <h4 className="text-sm font-bold text-brand-charcoal">Roteiros e Campanhas</h4>
                  </div>
                  <span className="text-xs bg-brand-pink-light text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                    {connectedScripts.length}
                  </span>
                </div>
                
                <div className="space-y-3.5">
                  {connectedScripts.length === 0 ? (
                    <p className="text-xs text-brand-gray italic">Nenhum roteiro vinculado ainda.</p>
                  ) : (
                    connectedScripts.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => { setActiveTab('scripts'); setSelectedScriptId(s.id); }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-brand-offwhite hover:bg-brand-pink-light/20 border border-transparent hover:border-brand-pink-light/40 transition-all cursor-pointer group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-brand-charcoal line-clamp-1 group-hover:text-brand-pink">{s.title}</p>
                          <p className="text-[10px] text-brand-gray mt-0.5">Tempo estimado: {s.estimatedTime}</p>
                        </div>
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-white border border-brand-pink-light text-brand-pink">
                          {s.status}
                        </span>
                      </div>
                    ))
                  )}
                  <button
                    onClick={() => { setActiveTab('scripts'); setSelectedScriptId('new'); }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 border-2 border-dashed border-brand-nude-dark/60 hover:border-brand-pink hover:text-brand-pink rounded-2xl text-xs font-semibold text-brand-gray transition-all mt-2"
                  >
                    <Plus size={14} /> Criar Roteiro para este Produto
                  </button>
                </div>
              </div>

              {/* 2. REFERÊNCIAS DE SUCESSO */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-3">
                  <div className="flex items-center gap-2">
                    <Bookmark className="text-brand-pink" size={18} />
                    <h4 className="text-sm font-bold text-brand-charcoal">Referências e Inspirações</h4>
                  </div>
                  <span className="text-xs bg-brand-pink-light text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                    {connectedReferences.length}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {connectedReferences.length === 0 ? (
                    <p className="text-xs text-brand-gray italic">Nenhuma referência vinculada.</p>
                  ) : (
                    connectedReferences.map((ref) => (
                      <div
                        key={ref.id}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-offwhite hover:bg-brand-pink-light/20 transition-all border border-transparent"
                      >
                        <div className="flex items-center gap-2.5">
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
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-brand-pink hover:text-white transition-colors text-brand-gray"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    ))
                  )}
                  <button
                    onClick={() => { setActiveTab('references'); }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 border-2 border-dashed border-brand-nude-dark/60 hover:border-brand-pink hover:text-brand-pink rounded-2xl text-xs font-semibold text-brand-gray transition-all mt-2"
                  >
                    <Plus size={14} /> Vincular Referência
                  </button>
                </div>
              </div>

              {/* 3. BANCO VISUAL DE CENAS */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-3">
                  <div className="flex items-center gap-2">
                    <Video className="text-brand-pink" size={18} />
                    <h4 className="text-sm font-bold text-brand-charcoal">Banco Visual de Cenas</h4>
                  </div>
                  <span className="text-xs bg-brand-pink-light text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                    {connectedScenes.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {connectedScenes.length === 0 ? (
                    <p className="text-xs text-brand-gray italic col-span-2">Nenhuma cena cadastrada.</p>
                  ) : (
                    connectedScenes.map((scene) => (
                      <div
                        key={scene.id}
                        onClick={() => setActiveTab('scenes')}
                        className="group relative rounded-2xl overflow-hidden aspect-video border border-brand-pink-light/10 cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                      >
                        <img src={scene.imageUrl} alt={scene.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent p-2.5 flex flex-col justify-end">
                          <p className="text-[10px] font-semibold text-white truncate">{scene.name}</p>
                          <span className="text-[8px] uppercase tracking-wide font-bold text-brand-pink-light mt-0.5">
                            {scene.type} • {scene.isRecorded ? 'Gravada' : 'A gravar'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 4. GANCHOS E IDEIAS RELACIONADAS */}
              <div className="bg-white border border-brand-pink-light/35 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center justify-between border-b border-brand-pink-light pb-3">
                  <div className="flex items-center gap-2">
                    <Magnet className="text-brand-pink" size={18} />
                    <h4 className="text-sm font-bold text-brand-charcoal">Ganchos e Ideias Ativas</h4>
                  </div>
                  <span className="text-xs bg-brand-pink-light text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                    {connectedHooks.length + connectedIdeas.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Hooks list */}
                  {connectedHooks.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">Ganchos Potenciais</p>
                      {connectedHooks.slice(0, 3).map((hook) => (
                        <div key={hook.id} className="p-2.5 rounded-xl bg-brand-pink-light/30 border border-brand-pink-light/30">
                          <p className="text-xs font-bold text-brand-pink-dark">#{hook.category}</p>
                          <p className="text-[11px] text-brand-charcoal mt-0.5 italic">"{hook.content}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ideas list */}
                  {connectedIdeas.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-brand-pink-light/20">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">Ideias Rápidas</p>
                      {connectedIdeas.map((idea) => (
                        <div key={idea.id} className="p-2.5 rounded-xl bg-brand-beige/50 border border-brand-nude-dark/40 flex items-center gap-2">
                          <Lightbulb size={12} className="text-brand-gold" />
                          <div>
                            <p className="text-xs font-semibold text-brand-charcoal">{idea.title}</p>
                            <p className="text-[10px] text-brand-gray line-clamp-1">{idea.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {connectedHooks.length === 0 && connectedIdeas.length === 0 && (
                    <p className="text-xs text-brand-gray italic">Nenhum gancho ou ideia vinculado ainda.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : isCreating || isEditing ? (
        
        /* 2. CREATE / EDIT PRODUCT FORM (VERTICAL STEP-BY-STEP MOBILE-FIRST WIZARD) */
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn pb-12 select-none">
          
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-brand-pink-light pb-3">
            <div>
              <h2 className="text-xl font-serif text-brand-charcoal font-bold">
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <p className="text-[10px] text-brand-gray font-sans">Passo {formStep} de 3</p>
            </div>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setIsEditing(false); resetForm(); }}
              className="text-xs font-semibold text-brand-pink bg-brand-pink-light/60 hover:bg-brand-pink hover:text-white px-3 py-2 rounded-full transition-colors"
              style={{ minHeight: '36px' }}
            >
              Cancelar
            </button>
          </div>

          {/* STEP INDICATOR PILLS */}
          <div className="flex items-center gap-2 w-full pt-1">
            <button
              type="button"
              onClick={() => formStep > 1 && setFormStep(1)}
              className={`flex-1 py-2 text-center rounded-full text-[9px] font-extrabold tracking-wider transition-all uppercase ${
                formStep === 1 
                  ? 'bg-brand-pink text-white shadow-premium' 
                  : formStep > 1 
                    ? 'bg-brand-pink/15 text-brand-pink' 
                    : 'bg-neutral-100 text-neutral-400'
              }`}
              style={{ minHeight: '36px' }}
            >
              1. 📷 Fotos
            </button>
            <button
              type="button"
              onClick={() => {
                if (formStep > 2) {
                  setFormStep(2);
                } else if (formStep === 1) {
                  setFormStep(2);
                }
              }}
              className={`flex-1 py-2 text-center rounded-full text-[9px] font-extrabold tracking-wider transition-all uppercase ${
                formStep === 2 
                  ? 'bg-brand-pink text-white shadow-premium' 
                  : formStep > 2 
                    ? 'bg-brand-pink/15 text-brand-pink' 
                    : 'bg-neutral-100 text-neutral-400'
              }`}
              style={{ minHeight: '36px' }}
            >
              2. 📦 Dados
            </button>
            <button
              type="button"
              onClick={() => {
                if (formName.trim() && formBrand.trim()) {
                  setFormStep(3);
                }
              }}
              disabled={!formName.trim() || !formBrand.trim()}
              className={`flex-1 py-2 text-center rounded-full text-[9px] font-extrabold tracking-wider transition-all uppercase ${
                formStep === 3 
                  ? 'bg-brand-pink text-white shadow-premium' 
                  : 'bg-neutral-100 text-neutral-400'
              }`}
              style={{ minHeight: '36px' }}
            >
              3. 🧠 UGC
            </button>
          </div>

          {/* ==================== STEP 1: FOTOS DO PRODUTO ==================== */}
          {formStep === 1 && (
            <div className="space-y-5 animate-slideIn">
              <div className="bg-white border border-brand-pink-light/40 rounded-3xl p-5 shadow-premium space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-brand-charcoal flex items-center gap-1.5">
                    📷 Fotos do Produto
                  </h3>
                  <p className="text-[11px] text-brand-gray mt-1 leading-relaxed">
                    Adicione imagens para ilustrar os ângulos e texturas. A primeira foto será a <strong>Capa</strong> do produto em todas as telas.
                  </p>
                </div>

                {/* ACTION BUTTONS (Camera, Gallery, Sample presets) */}
                <div className="flex flex-col gap-3">
                  {/* Tirar Foto Button */}
                  <button
                    type="button"
                    onClick={() => setIsCameraActive(true)}
                    className="flex items-center justify-center gap-2 p-4 border border-dashed border-brand-pink/50 hover:border-brand-pink bg-pink-50/20 hover:bg-pink-50/50 rounded-2xl cursor-pointer transition-all text-center group h-12"
                    style={{ minHeight: '44px' }}
                  >
                    <Camera className="text-brand-pink shrink-0 group-hover:scale-105 transition-transform" size={18} />
                    <span className="text-xs font-bold text-brand-pink-dark">Tirar Foto com a Câmera</span>
                  </button>

                  {/* Selecionar da Galeria Button */}
                  <label className="flex items-center justify-center gap-2 p-4 border border-dashed border-brand-pink/50 hover:border-brand-pink bg-pink-50/20 hover:bg-pink-50/50 rounded-2xl cursor-pointer transition-all text-center group h-12" style={{ minHeight: '44px' }}>
                    <ImageIcon className="text-brand-pink shrink-0 group-hover:scale-105 transition-transform" size={18} />
                    <span className="text-xs font-bold text-brand-pink-dark">Carregar da Galeria</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                  </label>

                  {/* Inject Aesthetic Sample Button */}
                  <button
                    type="button"
                    onClick={handleAddPresetPhoto}
                    className="flex items-center justify-center gap-2 p-4 border border-dashed border-amber-300 hover:border-amber-400 bg-amber-50/20 hover:bg-amber-50/50 rounded-2xl cursor-pointer transition-all text-center group h-12"
                    style={{ minHeight: '44px' }}
                  >
                    <Sparkles className="text-amber-500 shrink-0 group-hover:scale-105 transition-transform" size={18} />
                    <span className="text-xs font-bold text-amber-900">Foto de Exemplo Estético</span>
                  </button>
                </div>

                {/* GALLERIES / SLIDES CONTAINER */}
                {formImages.length === 0 ? (
                  <div className="border border-dashed border-brand-pink-light/50 rounded-2xl p-6 text-center text-brand-gray text-xs flex flex-col items-center justify-center space-y-2 bg-brand-offwhite/50">
                    <Upload size={28} className="text-brand-pink-light animate-bounce" />
                    <p className="font-semibold">Nenhuma imagem adicionada ainda</p>
                    <p className="text-[10px] text-stone-400">Tire fotos ou selecione arquivos do celular para compor seu produto.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-brand-gray">
                      Organize a ordem dos ângulos do produto:
                    </p>

                    {/* Touch-Friendly Vertical Stack of thumbnails instead of small horizontal boxes */}
                    <div className="grid grid-cols-2 gap-3.5">
                      {formImages.map((img, i) => {
                        const isCover = i === 0;
                        return (
                          <div
                            key={i}
                            className={`relative rounded-2xl overflow-hidden aspect-square border shadow-xs transition-all ${
                              isCover ? 'border-brand-pink ring-2 ring-brand-pink-light scale-98' : 'border-brand-pink-light/40'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${i}`}
                              className="w-full h-full object-cover"
                              onClick={() => handleOpenZoom(formImages, i)}
                            />

                            {/* Controls Overlay */}
                            <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                              {isCover ? (
                                <div className="bg-brand-pink text-white px-2 py-0.5 rounded-md text-[8px] font-extrabold flex items-center gap-0.5 shadow-sm">
                                  <Crown size={9} /> Capa
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setAsCover(i)}
                                  className="bg-white/95 text-brand-pink p-1 rounded-md shadow-xs"
                                  style={{ minWidth: '24px', minHeight: '24px' }}
                                >
                                  <Star size={10} />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeleteImage(i)}
                                className="bg-white/95 text-red-600 p-1 rounded-md shadow-xs"
                                style={{ minWidth: '24px', minHeight: '24px' }}
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>

                            {/* Reorder Label bar */}
                            <div className="absolute bottom-1 inset-x-1 bg-black/60 backdrop-blur-xs py-1 px-1.5 rounded-lg flex items-center justify-between text-white text-[9px] font-bold">
                              <span className="truncate max-w-[50px]">
                                {i + 1}. {getPhotoLabel(i)}
                              </span>
                              <div className="flex items-center gap-1">
                                {i > 0 && (
                                  <button type="button" onClick={() => moveImage(i, 'left')} className="p-0.5 hover:text-brand-pink">
                                    <ChevronLeft size={11} />
                                  </button>
                                )}
                                {i < formImages.length - 1 && (
                                  <button type="button" onClick={() => moveImage(i, 'right')} className="p-0.5 hover:text-brand-pink">
                                    <ChevronRight size={11} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 1 Footer */}
              <div className="flex justify-between items-center gap-3 pt-3 border-t border-brand-pink-light/30">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setIsEditing(false); resetForm(); }}
                  className="px-5 py-3.5 text-xs font-semibold rounded-full border border-brand-pink-light/60 text-brand-gray bg-white flex-1"
                  style={{ minHeight: '44px' }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormStep(2);
                    const el = document.getElementById('app-viewport');
                    if (el) el.scrollTop = 0;
                  }}
                  className="flex-1 py-3.5 bg-brand-pink text-white text-xs font-bold rounded-full shadow-premium text-center hover:bg-brand-pink-dark transition-all flex items-center justify-center gap-1 cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Avançar <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 2: DADOS BÁSICOS E INFORMAÇÕES ==================== */}
          {formStep === 2 && (
            <div className="space-y-5 animate-slideIn">
              <div className="bg-white border border-brand-pink-light/40 rounded-3xl p-5 shadow-premium space-y-4 text-xs">
                <h3 className="text-sm font-serif font-bold text-brand-pink border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                  <Package size={15} /> Informações Básicas
                </h3>

                {/* Nome do Produto */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gloss Lip Glow, Libre EDP"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Marca */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: O Boticário, Sallve, Natura"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Categoria */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Categoria *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Category)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Valor / Preço */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Preço do Item (R$)</label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 89,90"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Local de armazenamento */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Local de Armazenamento</label>
                  <input
                    type="text"
                    placeholder="Ex: Penteadeira, Estojo de Viagem"
                    value={formStorageLocation}
                    onChange={(e) => setFormStorageLocation(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Link para reposição */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Link de Compra / Reposição</label>
                  <input
                    type="url"
                    placeholder="https://site.com/produto"
                    value={formPurchaseLink}
                    onChange={(e) => setFormPurchaseLink(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Datas de Validade */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Data de Compra</label>
                    <input
                      type="date"
                      value={formPurchaseDate}
                      onChange={(e) => setFormPurchaseDate(e.target.value)}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none"
                      style={{ minHeight: '44px' }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-charcoal">Data de Validade</label>
                    <input
                      type="date"
                      value={formExpiryDate}
                      onChange={(e) => setFormExpiryDate(e.target.value)}
                      className="w-full text-xs px-3 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none"
                      style={{ minHeight: '44px' }}
                    />
                  </div>
                </div>

                {/* Tags Rápidas */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Tags Rápidas (Separadas por vírgula)</label>
                  <input
                    type="text"
                    placeholder="Ex: Favorito, Clean Girl, Glow"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Breve Descrição do Produto</label>
                  <textarea
                    rows={2}
                    placeholder="Descreva as propriedades físicas e proposta comercial rápida..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2 Footer */}
              <div className="flex justify-between items-center gap-3 pt-3 border-t border-brand-pink-light/30">
                <button
                  type="button"
                  onClick={() => {
                    setFormStep(1);
                    const el = document.getElementById('app-viewport');
                    if (el) el.scrollTop = 0;
                  }}
                  className="px-5 py-3.5 text-xs font-semibold rounded-full border border-brand-pink-light text-brand-gray bg-white flex items-center gap-1"
                  style={{ minHeight: '44px' }}
                >
                  <ChevronLeft size={14} /> Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!formName.trim() || !formBrand.trim()) {
                      alert('Por favor, digite o Nome e a Marca do produto.');
                      return;
                    }
                    setFormStep(3);
                    const el = document.getElementById('app-viewport');
                    if (el) el.scrollTop = 0;
                  }}
                  className="flex-1 py-3.5 bg-brand-pink text-white text-xs font-bold rounded-full shadow-premium text-center hover:bg-brand-pink-dark transition-all flex items-center justify-center gap-1 cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Avançar <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 3: CÉREBRO CRIATIVO E UGC POSICIONAMENTO ==================== */}
          {formStep === 3 && (
            <div className="space-y-5 animate-slideIn">
              <div className="bg-white border border-brand-pink-light/40 rounded-3xl p-5 shadow-premium space-y-4 text-xs">
                <h3 className="text-sm font-serif font-bold text-brand-pink border-b border-brand-pink-light pb-2 flex items-center gap-1.5">
                  <Sparkles size={15} /> Cérebro Criativo & Posicionamento UGC
                </h3>

                {/* Emoção que vende */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">💓 Emoção que Vende (Sentimento a evocar)</label>
                  <input
                    type="text"
                    placeholder="Ex: Autocuidado premium, luxo acessível"
                    value={formEmotion}
                    onChange={(e) => setFormEmotion(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Problema que resolve */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">🔍 Problema que Resolve</label>
                  <input
                    type="text"
                    placeholder="Ex: Lábios ressecados ou base craquelada"
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Sensação */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">🌿 Sensação / Textura na Gravação</label>
                  <input
                    type="text"
                    placeholder="Ex: Toque aveludado, frescor mentolado"
                    value={formSensation}
                    onChange={(e) => setFormSensation(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none focus:border-brand-pink"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Transformação Visual */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">✨ Transformação Visual</label>
                  <input
                    type="text"
                    placeholder="Ex: Brilho espelhado imediato"
                    value={formTransformation}
                    onChange={(e) => setFormTransformation(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Público Alvo */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">🎯 Público-Alvo Ideal</label>
                  <input
                    type="text"
                    placeholder="Ex: Mulheres modernas que amam maquiagem prática"
                    value={formAudience}
                    onChange={(e) => setFormAudience(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Diferenciais */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">⚡ Diferenciais Competitivos</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Não escorre, frasco de vidro elegante..."
                    value={formDifferentials}
                    onChange={(e) => setFormDifferentials(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite focus:outline-none"
                  />
                </div>

                {/* Benefícios */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">⭐ Principais Benefícios (Separados por vírgula)</label>
                  <input
                    type="text"
                    placeholder="Ex: Hidratação 12h, Toque Seco, Vegano"
                    value={formBenefits}
                    onChange={(e) => setFormBenefits(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Palavras-Chave */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">🏷️ Palavras-Chave UGC</label>
                  <input
                    type="text"
                    placeholder="Ex: asmr, unboxing, skincare estetico"
                    value={formKeywords}
                    onChange={(e) => setFormKeywords(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Objeções */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">🛡️ Objeções Comuns</label>
                  <input
                    type="text"
                    placeholder="Ex: 'Preço elevado' (mostrar alta durabilidade)"
                    value={formObjections}
                    onChange={(e) => setFormObjections(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Notas de produção */}
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal">Observações de B-Roll / Luz / Detalhes</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Gravar perto da janela na luz dourada da tarde para destacar o frasco..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-brand-pink-light/80 bg-brand-offwhite"
                  />
                </div>
              </div>

              {/* Step 3 Footer */}
              <div className="flex justify-between items-center gap-3 pt-3 border-t border-brand-pink-light/30">
                <button
                  type="button"
                  onClick={() => {
                    setFormStep(2);
                    const el = document.getElementById('app-viewport');
                    if (el) el.scrollTop = 0;
                  }}
                  className="px-5 py-3.5 text-xs font-semibold rounded-full border border-brand-pink-light text-brand-gray bg-white flex items-center gap-1"
                  style={{ minHeight: '44px' }}
                >
                  <ChevronLeft size={14} /> Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-gradient-to-tr from-brand-pink to-brand-pink-dark text-white text-xs font-bold rounded-full shadow-premium text-center hover:scale-102 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  ✨ Salvar Produto
                </button>
              </div>
            </div>
          )}

        </form>
      ) : (
        
        /* 3. PRODUCT BROWSER & CATEGORIES DASHBOARD */
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-brand-pink-light pb-4">
            <div>
              <h1 className="text-3xl font-serif text-brand-charcoal font-bold">Meus Produtos</h1>
              <p className="text-xs text-brand-gray mt-1">Navegue pelas suas categorias e acesse o cérebro conectado de cada item.</p>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-premium transition-transform hover:shadow-premium-hover active:scale-95"
            >
              <Plus size={14} /> Cadastrar Produto
            </button>
          </div>

          {/* CATEGORIES HORIZONTAL NAVIGATION (Apple/Pinterest style) */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gray">Filtrar por Categoria</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-3 pr-4 no-scrollbar">
              <button
                onClick={() => setActiveCategory('Todos')}
                className={`shrink-0 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all ${
                  activeCategory === 'Todos'
                    ? 'bg-brand-pink border-brand-pink text-white shadow-premium'
                    : 'bg-white border-brand-pink-light/40 text-brand-charcoal hover:bg-brand-pink-light/20'
                }`}
              >
                Todos ({products.length})
              </button>

              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all ${
                      activeCategory === cat
                        ? 'bg-brand-pink border-brand-pink text-white shadow-premium'
                        : 'bg-white border-brand-pink-light/40 text-brand-charcoal hover:bg-brand-pink-light/20'
                    }`}
                  >
                    {cat} {count > 0 && <span className="opacity-70 ml-0.5">({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRODUCT CARD GRID */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-dashed border-brand-pink-light/60 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
              <Package size={36} className="text-brand-pink mx-auto" />
              <div>
                <h4 className="font-serif font-bold text-brand-charcoal">Nenhum produto cadastrado</h4>
                <p className="text-xs text-brand-gray mt-1">Parece que você ainda não tem produtos cadastrados nesta categoria. Comece a criar seu ecossistema!</p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-brand-pink-light/50 border border-brand-pink hover:bg-brand-pink hover:text-white text-brand-pink text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1"
              >
                <Plus size={14} /> Cadastrar Produto
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredProducts.map((p) => {
                // Connections counts
                const refsCount = references.filter((r) => r.productId === p.id).length;
                const scriptsCount = scripts.filter((s) => s.productId === p.id).length;
                const scenesCount = scenes.filter((s) => s.productIds.includes(p.id)).length;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className="group bg-white border border-brand-pink-light/40 rounded-3xl p-4 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Image Frame */}
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-pink-light/10">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-glass/95 border border-brand-pink-light/30 px-2.5 py-1 rounded-full text-[9px] font-bold text-brand-pink uppercase tracking-wider">
                          {p.category}
                        </span>
                      </div>

                      {/* Header Title */}
                      <div>
                        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">{p.brand}</span>
                        <h3 className="text-lg font-serif font-bold text-brand-charcoal group-hover:text-brand-pink transition-colors mt-0.5 line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-xs text-brand-gray line-clamp-2 mt-1.5 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer indicators (interconnected UGC dots) */}
                    <div className="mt-5 border-t border-brand-pink-light/20 pt-3.5 flex items-center justify-between text-[10px] font-semibold text-brand-gray">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1" title={`${scriptsCount} Roteiros`}>
                          <FileText size={12} className="text-brand-pink" /> {scriptsCount} {scriptsCount === 1 ? 'Rot' : 'Rots'}
                        </span>
                        <span className="flex items-center gap-1" title={`${scenesCount} Cenas`}>
                          <Video size={12} className="text-brand-pink" /> {scenesCount} {scenesCount === 1 ? 'Cena' : 'Cenas'}
                        </span>
                        <span className="flex items-center gap-1" title={`${refsCount} Referências`}>
                          <Bookmark size={12} className="text-brand-pink" /> {refsCount} {refsCount === 1 ? 'Ref' : 'Refs'}
                        </span>
                      </div>

                      <span className="text-brand-pink group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                        Abrir Hub <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STUNNING PINTEREST-STYLE LIGHTBOX ZOOM OVERLAY */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 bg-white/15 hover:bg-white/20 text-white p-3 rounded-full hover:scale-105 transition-all cursor-pointer border border-white/10 shadow-lg"
            title="Fechar (Esc)"
          >
            <X size={24} />
          </button>

          {/* Counter Indicator */}
          <div className="absolute top-6 left-6 text-white/90 text-sm font-semibold tracking-wider font-mono">
            {zoomIndex + 1} / {zoomImagesList.length} • {getPhotoLabel(zoomIndex)}
          </div>

          {/* Main Image Container */}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomImage}
              alt="Zoom Foto Produto"
              className="max-w-full max-h-full object-contain rounded-2xl border border-white/5 shadow-2xl select-none"
            />

            {/* Lightbox Navigation Controls */}
            {zoomImagesList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevZoom}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center border border-white/10 shadow-lg hover:scale-105 transition-all"
                  title="Anterior"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  type="button"
                  onClick={handleNextZoom}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center border border-white/10 shadow-lg hover:scale-105 transition-all"
                  title="Próxima"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Mini Gallery Thumbnails */}
          {zoomImagesList.length > 1 && (
            <div className="absolute bottom-6 flex items-center gap-2 max-w-full overflow-x-auto px-4 no-scrollbar">
              {zoomImagesList.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setZoomIndex(i);
                    setZoomImage(img);
                  }}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    zoomIndex === i ? 'border-brand-pink scale-95 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Zoom Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FULL-SCREEN LIVE CAMERA CAPTURE OVERLAY (MediaDevices API) */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6 text-white selection:bg-brand-pink/30">
          
          {/* Top Bar Controls */}
          <div className="w-full max-w-2xl flex items-center justify-between py-2 z-10">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold text-brand-pink font-mono">Câmera Ativa</span>
              <span className="text-xs text-white/60 font-medium">Modo: {cameraFacingMode === 'user' ? 'Frontal (Selfie)' : 'Traseira (Produto)'}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Switch camera button */}
              {(cameraDevices.length > 1 || true) && (
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white p-2.5 rounded-full border border-white/10 shadow-lg transition-all"
                  title="Inverter Câmera (Frente/Trás)"
                >
                  <RefreshCw size={18} />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseCamera}
                className="bg-brand-pink hover:bg-brand-pink-dark active:scale-95 text-white p-2.5 rounded-full shadow-lg transition-all"
                title="Fechar Câmera"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Central Live Video Window or Error Message */}
          <div className="relative w-full max-w-2xl aspect-square md:aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
            {cameraError ? (
              <div className="p-6 text-center max-w-md space-y-4">
                <AlertCircle className="text-red-500 mx-auto animate-pulse" size={40} />
                <h4 className="font-serif font-bold text-lg text-white">Ops! Acesso à Câmera Bloqueado</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {cameraError}
                </p>
                <div className="pt-2">
                  <label className="inline-flex items-center gap-1.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors">
                    <Upload size={14} /> Selecionar Arquivo Manual
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        handleImageFileChange(e);
                        handleCloseCamera();
                      }}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <>
                {/* Visual Capture Flash Overlay */}
                {isFlashActive && (
                  <div className="absolute inset-0 bg-white z-20 animate-none opacity-90 transition-opacity" />
                )}

                {/* Professional Framing Camera Gridlines */}
                <div className="absolute inset-0 border-2 border-white/5 pointer-events-none z-10 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div></div>
                </div>

                {/* Live Stream Viewport */}
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className={`w-full h-full object-cover select-none pointer-events-none ${
                    cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''
                  }`}
                />

                {/* Secret canvas for frame extraction */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Ambient Tag showing target angle suggestions based on current photos count */}
                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-wider uppercase text-brand-pink-light">
                  📸 Sugestão: {getPhotoLabel(formImages.length)}
                </div>
              </>
            )}
          </div>

          {/* Bottom Section: Shutter Trigger + Live Elegant Carrossel Previews */}
          <div className="w-full max-w-2xl space-y-4">
            
            {/* Captured Photos Elegant Carousel Bar */}
            {formImages.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-white/50 px-1">
                  <span className="font-bold uppercase tracking-wider">Carrossel de Capturas ({formImages.length})</span>
                  <span>Arraste ou role para o lado</span>
                </div>
                
                {/* Carousel Row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                  {formImages.map((img, index) => {
                    const isCover = index === 0;
                    return (
                      <div
                        key={index}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 group transition-all ${
                          isCover ? 'border-brand-pink ring-2 ring-brand-pink-light/40' : 'border-white/10'
                        }`}
                      >
                        <img src={img} alt={`Captura ${index}`} className="w-full h-full object-cover" />
                        
                        {/* Quick label */}
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center font-bold truncate py-0.5">
                          {index + 1}. {getPhotoLabel(index).split(' ')[0]}
                        </div>

                        {/* Quick Delete overlay */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formImages];
                            updated.splice(index, 1);
                            setFormImages(updated);
                          }}
                          className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Shutter Trigger Button Controls */}
            <div className="flex items-center justify-center gap-8 py-3">
              {/* Gallery upload inside camera picker */}
              <label className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center cursor-pointer transition-colors active:scale-90" title="Upload da Galeria">
                <ImageIcon size={18} className="text-white/80" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageFileChange}
                />
              </label>

              {/* Central Shutter Circle */}
              <button
                type="button"
                disabled={!!cameraError}
                onClick={handleCapturePhoto}
                className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-90 bg-transparent ${
                  cameraError ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                }`}
                title="Capturar Foto"
              >
                <div className="w-16 h-16 rounded-full bg-white hover:bg-brand-pink-light transition-colors flex items-center justify-center">
                  <Camera size={26} className="text-black" />
                </div>
              </button>

              {/* Finish Capturing / OK button */}
              <button
                type="button"
                onClick={handleCloseCamera}
                className="w-12 h-12 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white flex items-center justify-center transition-colors active:scale-90 shadow-lg font-bold text-xs"
                title="Finalizar"
              >
                OK
              </button>
            </div>

            {/* Safety instruction */}
            <p className="text-[10px] text-center text-white/40 font-medium">
              As fotos capturadas serão adicionadas imediatamente ao carrossel do produto.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

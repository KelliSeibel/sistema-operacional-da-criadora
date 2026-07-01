/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Edit3, Check, Eye, BookOpen, Trash2 } from 'lucide-react';
import { PaginaFixa } from '../types';

interface PageViewProps {
  pagina: PaginaFixa;
  onPageUpdate: (updatedPage: PaginaFixa) => void;
}

export default function PageView({ pagina, onPageUpdate }: PageViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(pagina.titulo);
  const [editContent, setEditContent] = useState(pagina.conteudo);

  // Sync state when page changes
  useEffect(() => {
    setEditTitle(pagina.titulo);
    setEditContent(pagina.conteudo);
    setIsEditing(false);
  }, [pagina]);

  const handleSave = () => {
    onPageUpdate({
      ...pagina,
      titulo: editTitle,
      conteudo: editContent
    });
    setIsEditing(false);
  };

  // Basic custom markdown parser to render beautiful HTML elements
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    let inList = false;
    let listItems: React.ReactNode[] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: string) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-brand-dark/95 text-sm font-medium">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Horizontal Rule
      if (trimmed === '---') {
        flushList(`hr-${index}`);
        elements.push(<hr key={`hr-${index}`} className="my-6 border-t border-brand-beige/20" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        flushList(`h1-${index}`);
        elements.push(
          <h1 key={`h1-${index}`} className="text-2xl font-bold text-brand-dark mt-6 mb-3 tracking-tight border-b border-brand-beige/25 pb-2">
            {trimmed.slice(2)}
          </h1>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList(`h2-${index}`);
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl font-bold text-brand-dark mt-6 mb-2 tracking-tight">
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith('### ')) {
        flushList(`h3-${index}`);
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-bold text-brand-dark mt-4 mb-2">
            {trimmed.slice(4)}
          </h3>
        );
        return;
      }

      // Checklists (interactive checkboxes)
      if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('- [x] ') || trimmed.startsWith('- [X] ')) {
        flushList(`chk-${index}`);
        const checked = trimmed.startsWith('- [x] ') || trimmed.startsWith('- [X] ');
        const text = trimmed.slice(6);
        elements.push(
          <div key={`chk-${index}`} className="flex items-start space-x-3 my-2.5">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                // Update this checkbox line in the markdown content and save automatically
                const newLines = [...lines];
                newLines[index] = checked ? `- [ ] ${text}` : `- [x] ${text}`;
                onPageUpdate({
                  ...pagina,
                  conteudo: newLines.join('\n')
                });
              }}
              className="mt-1 h-4.5 w-4.5 rounded-lg border-brand-beige text-brand-rose focus:ring-brand-rose cursor-pointer transition-all"
            />
            <span className={`text-sm font-semibold ${checked ? 'line-through text-brand-rose-light/50 font-medium' : 'text-brand-dark/90'}`}>
              {text}
            </span>
          </div>
        );
        return;
      }

      // Unordered list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        const text = trimmed.slice(2);
        
        // Match simple bold words **text**
        const parts = text.split('**');
        const formattedText = parts.map((part, pIdx) => {
          if (pIdx % 2 === 1) {
            return <strong key={pIdx} className="font-bold text-brand-rose">{part}</strong>;
          }
          return part;
        });

        listItems.push(
          <li key={`li-${index}`} className="leading-relaxed">
            {formattedText}
          </li>
        );
        return;
      }

      // If it was in list, and the line is empty or doesn't start with list marker, flush
      if (trimmed === '' || (!trimmed.startsWith('- ') && !trimmed.startsWith('* '))) {
        flushList(`flush-${index}`);
      }

      // Normal paragraph
      if (trimmed !== '') {
        // Simple bold replacements inside paragraphs too
        const parts = trimmed.split('**');
        const formattedParagraph = parts.map((part, pIdx) => {
          if (pIdx % 2 === 1) {
            return <strong key={pIdx} className="font-bold text-brand-rose">{part}</strong>;
          }
          return part;
        });

        elements.push(
          <p key={`p-${index}`} className="text-sm text-brand-dark/80 my-3 leading-relaxed font-semibold">
            {formattedParagraph}
          </p>
        );
      } else {
        elements.push(<div key={`empty-${index}`} className="h-2" />);
      }
    });

    // Final flush in case document ends with list
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc pl-6 my-4 space-y-2 text-brand-dark/95 text-sm font-semibold">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F5F2] select-text scrollbar-none">
      {/* Page Header Cover */}
      <div className="h-28 md:h-36 w-full bg-gradient-to-tr from-[#C98484]/20 via-[#F1ECE8] to-[#D6A6A6]/20 relative shrink-0">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
        <div className="absolute -bottom-6 left-4 md:-bottom-8 md:left-12 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-md border border-brand-beige/25 flex items-center justify-center text-2xl md:text-3xl text-brand-rose">
          {pagina.categoria === 'Manual' ? '📕' : pagina.categoria === 'Checklist' ? '✅' : '⚙️'}
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="mt-8 md:mt-12 px-4 md:px-12 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-beige/20 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-0.5 rounded-lg text-[10px] md:text-xs font-bold bg-brand-cream text-brand-rose border border-[#C98484]/20">
            {pagina.categoria}
          </span>
          <span className="text-[10px] md:text-xs text-brand-rose-light font-bold">• Central de Conhecimento</span>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 w-full sm:w-auto cursor-pointer ${
            isEditing
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
              : 'bg-white hover:bg-brand-cream/40 text-brand-dark border-brand-beige/35 shadow-sm'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Salvar Alterações</span>
            </>
          ) : (
            <>
              <Edit3 className="h-3.5 w-3.5" />
              <span>Editar Diretrizes</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-8 max-w-4xl w-full mx-auto pb-24">
        {isEditing ? (
          <div className="space-y-4 h-full flex flex-col">
            <div>
              <label className="block text-[10px] font-bold text-brand-rose-light uppercase tracking-wider mb-1">
                Título do Manual / Guia
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-xl md:text-2xl font-bold text-brand-dark border-b border-brand-beige/40 focus:outline-none focus:border-brand-rose pb-2"
                placeholder="Insira o título da diretriz..."
              />
            </div>

            <div className="flex-grow flex flex-col min-h-[350px]">
              <label className="block text-[10px] font-bold text-brand-rose-light uppercase tracking-wider mb-1">
                Conteúdo do Guia (Markdown Simples)
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex-grow w-full p-4.5 bg-white border border-brand-beige/30 rounded-2xl focus:ring-1 focus:ring-brand-rose focus:border-brand-rose font-mono text-xs leading-relaxed text-brand-dark"
                placeholder="Use # para títulos, - para listas e - [ ] para checklists..."
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  setEditTitle(pagina.titulo);
                  setEditContent(pagina.conteudo);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-xs font-bold text-brand-rose-light bg-brand-cream/60 rounded-xl hover:bg-brand-cream transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold text-white bg-brand-rose rounded-xl hover:bg-brand-rose/95 shadow transition-all cursor-pointer"
              >
                Salvar Guia
              </button>
            </div>
          </div>
        ) : (
          <article className="prose max-w-none text-brand-dark font-sans select-text">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark tracking-tight leading-tight mb-2">
              {pagina.titulo}
            </h1>
            <p className="text-xs text-brand-rose-light font-bold mb-8">
              Posicionado na Central de Conhecimento • Última edição salva localmente
            </p>
            <div className="space-y-1">
              {renderMarkdown(pagina.conteudo)}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

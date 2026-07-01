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
          <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-gray-700 text-sm">
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
        elements.push(<hr key={`hr-${index}`} className="my-6 border-t border-gray-200" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        flushList(`h1-${index}`);
        elements.push(
          <h1 key={`h1-${index}`} className="text-2xl font-bold text-gray-900 mt-6 mb-3 tracking-tight border-b border-gray-100 pb-2">
            {trimmed.slice(2)}
          </h1>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList(`h2-${index}`);
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl font-semibold text-gray-800 mt-6 mb-2 tracking-tight">
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith('### ')) {
        flushList(`h3-${index}`);
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-medium text-gray-800 mt-4 mb-2">
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
              className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className={`text-sm ${checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
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
            return <strong key={pIdx} className="font-semibold text-gray-900">{part}</strong>;
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
            return <strong key={pIdx} className="font-semibold text-gray-900">{part}</strong>;
          }
          return part;
        });

        elements.push(
          <p key={`p-${index}`} className="text-sm text-gray-600 my-3 leading-relaxed">
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
        <ul key="list-final" className="list-disc pl-6 my-4 space-y-2 text-gray-700 text-sm">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="flex flex-col h-full bg-white select-text scrollbar-thin">
      {/* Page Header Cover */}
      <div className="h-32 md:h-44 w-full bg-gradient-to-r from-indigo-100 via-rose-100 to-amber-100 relative shrink-0">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
        <div className="absolute -bottom-6 left-4 md:-bottom-8 md:left-12 w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-2xl md:text-3xl">
          {pagina.categoria === 'Manual' ? '📕' : pagina.categoria === 'Checklist' ? '✅' : '⚙️'}
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="mt-8 md:mt-12 px-4 md:px-12 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {pagina.categoria}
          </span>
          <span className="text-[10px] md:text-xs text-gray-400">• Central de Conhecimento</span>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className={`flex items-center justify-center space-x-1.5 px-3 py-1.8 rounded-lg text-xs font-medium border transition-all active:scale-95 w-full sm:w-auto cursor-pointer ${
            isEditing
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
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
              <span>Editar Página</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-8 max-w-4xl w-full mx-auto pb-24">
        {isEditing ? (
          <div className="space-y-4 h-full flex flex-col">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Título da Página
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-2xl font-bold text-gray-900 border-b border-gray-200 focus:outline-none focus:border-indigo-500 pb-2"
                placeholder="Insira o título da página..."
              />
            </div>

            <div className="flex-1 flex flex-col min-h-[350px]">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Conteúdo (Formatado em Markdown simples)
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex-1 w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm leading-relaxed text-gray-700"
                placeholder="Escreva as diretrizes usando # para títulos, - para listas e - [ ] para checklists..."
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  setEditTitle(pagina.titulo);
                  setEditContent(pagina.conteudo);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow transition-all"
              >
                Salvar
              </button>
            </div>
          </div>
        ) : (
          <article className="prose max-w-none text-gray-800 font-sans">
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight leading-tight mb-2">
              {pagina.titulo}
            </h1>
            <p className="text-xs text-gray-400 mb-8">
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

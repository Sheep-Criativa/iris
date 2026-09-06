'use client'

import { useState } from 'react'
import { MessageSquare, X, Sparkles, BookOpen } from 'lucide-react'

export function AdminHelpWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-semibold text-slate-800 text-sm">
                Central de Apoio Iris
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Dúvidas sobre como publicar novos artigos, organizar categorias ou fazer upload de fotos para a biblioteca de mídia?
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <a
              href="mailto:contato@ecosistema-iris.com?subject=Duvida%20Admin"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Chamar Suporte</span>
            </a>
            <a
              href="/blog"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Ver Blog em Produção</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button (Exact match for reference green circle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95"
        aria-label="Ajuda e Suporte"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  )
}

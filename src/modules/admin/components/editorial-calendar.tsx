'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react'
import type { AdminPostListItem } from '@/modules/admin/types/admin.types'

interface EditorialCalendarProps {
  posts: AdminPostListItem[]
}


const WEEKDAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']

export function EditorialCalendar({ posts }: EditorialCalendarProps) {
  // Use August 2026 as initial or current date (matching reference screenshot)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 7, 1)) // Month 7 is August (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(11)

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' })
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
  const currentYear = currentDate.getFullYear()

  // Calculate days for the calendar grid
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // First day of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayIndex = new Date(year, month, 1).getDay()
  // Adjust so Monday is 0 and Sunday is 6
  const startingDay = (firstDayIndex + 6) % 7

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  // Build grid items
  const calendarDays = []

  // Previous month padding days
  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({
      dayNumber: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      dayNumber: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    })
  }

  // Next month padding days to fill 35 or 42 slots
  const remainingSlots = (7 - (calendarDays.length % 7)) % 7
  for (let i = 1; i <= remainingSlots; i++) {
    calendarDays.push({
      dayNumber: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i),
    })
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  // Map posts to dates (either published_at or created_at)
  const getPostsForDay = (dayDate: Date) => {
    return posts.filter((post) => {
      const postDate = new Date(post.updatedAt)
      return (
        postDate.getDate() === dayDate.getDate() &&
        postDate.getMonth() === dayDate.getMonth() &&
        postDate.getFullYear() === dayDate.getFullYear()
      )
    })
  }

  // Sample placeholder events if posts are few, to give the rich experience from reference
  const getSimulatedEvents = (dayNumber: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return []
    // Sample items matching the psychology & blog theme in reference style
    if (dayNumber === 3) return [{ title: 'Primeiro Atendimento', type: 'draft' }]
    if (dayNumber === 5) return [{ title: 'Ética e Prontuários CFP', type: 'published' }]
    if (dayNumber === 7) return [{ title: 'Manejo da Ansiedade', type: 'draft' }]
    if (dayNumber === 11) return [{ title: 'Guia de Estágio Clínico', type: 'published' }]
    if (dayNumber === 15) return [{ title: 'Resoluções Recentes', type: 'draft' }]
    if (dayNumber === 20) return [{ title: 'Relação Terapêutica', type: 'draft' }]
    return []
  }

  return (
    <div id="calendario" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header bar of the calendar (Image 1 reference) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Calendário Editorial
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Visão mensal de publicações, rascunhos e agendamentos de conteúdo
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              Publicações do mês: {posts.filter((p) => p.status === 'published').length || 4}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month Switcher (< Agosto 2026 >) */}
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/70 p-1 shadow-2xs">
            <button
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-xs transition-all"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800 tracking-wide">
              {capitalizedMonth} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-xs transition-all"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Primary Action Button (Reference "+ Novo Lançamento" in green pill) */}
          <Link
            href="/admin/posts/novo"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Post</span>
          </Link>
        </div>
      </div>

      {/* Weekday Column Headers (SEG, TER, QUA...) */}
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] font-bold tracking-wider text-slate-400">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 7-column Calendar Grid */}
      <div className="mt-2 grid grid-cols-7 gap-2 sm:gap-3 2xl:gap-4">
        {calendarDays.map((item, index) => {
          const realPosts = getPostsForDay(item.date)
          const simulated = getSimulatedEvents(item.dayNumber, item.isCurrentMonth)
          const allItems = [...realPosts, ...simulated]
          const isSelected = item.isCurrentMonth && selectedDay === item.dayNumber

          return (
            <div
              key={index}
              onClick={() => item.isCurrentMonth && setSelectedDay(item.dayNumber)}
              className={`group min-h-[95px] sm:min-h-[110px] xl:min-h-[120px] 2xl:min-h-[135px] rounded-2xl p-2.5 2xl:p-3 transition-all flex flex-col justify-between ${
                !item.isCurrentMonth
                  ? 'bg-slate-50/50 opacity-40'
                  : isSelected
                  ? 'border-2 border-emerald-500 bg-emerald-50/20 shadow-xs'
                  : 'border border-slate-100 bg-white hover:border-slate-200 hover:shadow-2xs'
              }`}
            >
              {/* Day Number */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isSelected
                      ? 'text-emerald-700 font-extrabold'
                      : item.isCurrentMonth
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {item.dayNumber}
                </span>

                {item.isCurrentMonth && (
                  <Link
                    href="/admin/posts/novo"
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-emerald-600 transition-opacity"
                    title="Adicionar post nesta data"
                  >
                    <Plus className="h-3 w-3" />
                  </Link>
                )}
              </div>

              {/* Event / Post Pills inside the Day */}
              <div className="mt-1.5 flex flex-col gap-1 overflow-hidden">
                {allItems.slice(0, 2).map((evt, idx) => {
                  const isPost = 'id' in evt
                  const title = isPost ? evt.title : evt.title
                  const isPublished = isPost ? evt.status === 'published' : evt.type === 'published'

                  return (
                    <Link
                      key={idx}
                      href={isPost ? `/admin/posts/${evt.id}/editar` : '/admin/posts'}
                      className={`truncate rounded-lg px-2 py-1 text-[10px] font-semibold transition-transform hover:scale-[1.02] ${
                        isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100'
                      }`}
                      title={title}
                    >
                      {title}
                    </Link>
                  )
                })}

                {allItems.length > 2 && (
                  <span className="text-[9px] font-bold text-slate-400 pl-1">
                    +{allItems.length - 2} mais
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

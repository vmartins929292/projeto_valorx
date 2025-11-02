'use client'

// Placeholder component - você pode substituir pelo componente real
export default function EventsCalendar() {
  return (
    <div className="bg-white rounded-xl card-border shadow-sm p-6 h-full">
      <h3 className="font-montserrat-semibold text-lg text-cyan-950 mb-4">
        Calendário de Eventos
      </h3>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 bg-slate-50 rounded-lg">
            <div className="font-montserrat-semibold text-sm text-cyan-950 mb-1">
              Evento {i}
            </div>
            <div className="font-montserrat text-xs text-slate-500">
              09 jan 2025 - 14:00
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


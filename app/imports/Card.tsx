'use client'

// Placeholder component - você pode substituir pelo componente real
export default function Card() {
  return (
    <div className="bg-white rounded-xl card-border shadow-sm p-6 h-full">
      <h3 className="font-montserrat-semibold text-lg text-cyan-950 mb-4">
        Últimas Notícias
      </h3>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="pb-4 border-b border-slate-100 last:border-0">
            <h4 className="font-montserrat-medium text-sm text-cyan-950 mb-1 line-clamp-2">
              Notícia {i}
            </h4>
            <p className="font-montserrat text-xs text-slate-500">
              09 jan 2025
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


'use client'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#073a47] text-slate-50 border-t-2 border-[#01b792]/20 animate-fade-in">
      <div className="site-container pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="text-2xl mb-4 inline-block group">
              <span className="font-sora text-[#01b792] transition-all duration-300 group-hover:text-[#00bfa5]">valor</span>
              <span className="font-sora font-semibold text-slate-100">news</span>
            </a>
            <p className="font-montserrat text-sm text-slate-400 leading-relaxed max-w-xs mt-4">
              Análises precisas e notícias em tempo real sobre commodities e mercados financeiros.
            </p>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h3 className="font-montserrat-semibold text-slate-100 mb-4">Navegação</h3>
            <ul className="space-y-2.5 font-montserrat text-sm">
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Commodities</a></li>
              <li className="pl-4">
                <ul className="space-y-2 mt-2">
                  <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Soja</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Milho</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Trigo</a></li>
                </ul>
              </li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Análises</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Mercado Global</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Live Feed</a></li>
            </ul>
          </div>
          
          {/* Institutional Column */}
          <div>
            <h3 className="font-montserrat-semibold text-slate-100 mb-4">Institucional</h3>
            <ul className="space-y-2.5 font-montserrat text-sm">
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Sobre Nós</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Contato</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">FAQ</a></li>
              <li className="mt-4">
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-[#01b792]/10 hover:bg-[#01b792]/20 border border-[#01b792]/30 rounded-md font-montserrat-medium text-[#01b792] transition-all duration-200 hover:scale-105">
                  Assine o Pro
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal & Social Column */}
          <div>
            <h3 className="font-montserrat-semibold text-slate-100 mb-4">Legal</h3>
            <ul className="space-y-2.5 font-montserrat text-sm mb-6">
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Termos de Uso</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Política de Privacidade</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Política de Cookies</a></li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-montserrat-medium text-sm text-slate-300 mb-3">Redes Sociais</h4>
              <div className="flex gap-3">
                {['facebook', 'x', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-9 h-9 flex items-center justify-center border border-slate-600 rounded-md hover:border-[#01b792] hover:bg-[#01b792]/10 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#01b792]/20"
                    aria-label={social}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-slate-400 rounded"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-montserrat text-sm text-slate-400 opacity-60">
            © 2025 Valornews. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-montserrat text-xs text-slate-500">
            <a href="#" className="hover:text-[#01b792] transition-colors">Mapa do Site</a>
            <a href="#" className="hover:text-[#01b792] transition-colors">Acessibilidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


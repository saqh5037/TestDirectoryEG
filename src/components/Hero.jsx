import { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const stats = [
    { label: 'Años de experiencia', value: '43' },
    { label: 'Estudios disponibles', value: '100+' },
    { label: 'Pacientes atendidos', value: '50K+' },
    { label: 'Resultados en 24h', value: '90%' },
  ];

  return (
    <section id="inicio" className="relative bg-gradient-to-b from-white to-eg-light-gray py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-eg-purple mb-4">
            Tu salud, nuestra prioridad
          </h1>
          <p className="text-lg text-eg-gray mb-8 max-w-3xl mx-auto">
            Con 43 años de experiencia, LaboratorioEG ofrece más de 100 estudios clínicos 
            con la mejor calidad y precios competitivos en Caracas
          </p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar estudios: hematología, glicemia, cultivos..."
                className="input-field pr-32"
              />
              <button
                type="submit"
                className="absolute right-2 btn-primary py-2 px-4 text-sm"
              >
                🔍 Buscar
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#estudios" className="btn-secondary">
              Ver todos los estudios
            </a>
            <a href="#paquetes" className="btn-primary">
              Ver paquetes especiales
            </a>
            <a href="https://wa.me/584149019327" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              💬 WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-eg-purple mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-eg-gray">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-eg-pink/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-eg-purple/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
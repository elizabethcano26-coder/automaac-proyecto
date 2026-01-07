import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, ChevronRight, ChevronLeft, 
  BarChart2, X, Sparkles, Loader2, RotateCcw, Link as LinkIcon, FolderOpen, Download, Info
} from 'lucide-react';

// --- BASE DE DATOS OFICIAL ACUERDO 01 DE 2025 ---
const FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", icon: BookOpen, description: "Referentes filosóficos, pedagógicos y organizacionales del programa.", characteristics: [
    { id: 1, title: "Proyecto educativo del programa", desc: "Coherencia con la misión institucional y campos de acción." },
    { id: 2, title: "Relevancia académica y pertinencia social", desc: "Respuesta a necesidades locales y globales." }
  ]},
  { id: 2, title: "Comunidad de Estudiantes", icon: Users, description: "Desarrollo integral, permanencia y participación estudiantil.", characteristics: [
    { id: 3, title: "Actividades de formación integral", desc: "Participación en investigación, cultura y deporte." },
    { id: 4, title: "Acompañamiento y seguimiento", desc: "Impacto en formación, permanencia y graduación." },
    { id: 5, title: "Autonomía y trabajo colaborativo", desc: "Estrategias para fortalecer la responsabilidad social." },
    { id: 6, title: "Políticas académicas y cultura de paz", desc: "Reglamentos, inclusión y respeto mutuo." },
    { id: 7, title: "Estímulos y apoyos", desc: "Impacto de incentivos académicos y socioeconómicos." }
  ]},
  { id: 3, title: "Comunidad de Profesores", icon: UserCheck, description: "Calidad, dedicación y desarrollo de la planta docente.", characteristics: [
    { id: 8, title: "Selección, vinculación y permanencia", desc: "Transparencia y eficacia de los criterios." },
    { id: 9, title: "Estatuto y trayectoria profesoral", desc: "Reconocimiento de méritos y ascenso en escalafón." },
    { id: 10, title: "Planta profesoral suficiente", desc: "Dedicación y formación para las labores académicas." },
    { id: 11, title: "Desarrollo profesoral", desc: "Capacitaciones, investigación e internacionalización." },
    { id: 12, title: "Estímulos a la trayectoria", desc: "Reconocimiento a la excelencia docente." },
    { id: 13, title: "Producción de material docente", desc: "Materiales propios evaluados periódicamente." },
    { id: 14, title: "Evaluación integral de profesores", desc: "Efectos en el mejoramiento del programa." }
  ]},
  { id: 4, title: "Comunidad de Egresados", icon: GraduationCap, description: "Impacto y seguimiento de los graduados en el entorno.", characteristics: [
    { id: 15, title: "Seguimiento y aportes de egresados", desc: "Ubicación, redes e impacto en el programa." },
    { id: 16, title: "Reconocimientos de egresados", desc: "Aportes destacados a la sociedad y profesión." }
  ]},
  { id: 5, title: "Aspectos Académicos", icon: FileText, description: "Currículo, pedagogía y sistemas de evaluación.", characteristics: [
    { id: 17, title: "Gestión curricular", desc: "Integralidad, flexibilidad e interdisciplinariedad." },
    { id: 18, title: "Estrategias pedagógicas", desc: "Coherencia con el modelo pedagógico." },
    { id: 19, title: "Sistema de evaluación de estudiantes", desc: "Políticas claras y valoración de aprendizajes." },
    { id: 20, title: "Mejoramiento curricular", desc: "Uso de resultados para ajustar el plan de estudios." },
    { id: 21, title: "Resultados académicos previstos", desc: "Logro de competencias y perfiles de egreso." }
  ]},
  { id: 6, title: "Permanencia y Graduación", icon: TrendingUp, description: "Estrategias para reducir la deserción.", characteristics: [
    { id: 22, title: "Políticas de bienestar y permanencia", desc: "Inducción, acompañamiento y apoyos." },
    { id: 23, title: "Sistemas de alertas tempranas", desc: "Efectividad en la prevención de la deserción." },
    { id: 24, title: "Ajustes por seguimiento", desc: "Evolución curricular basada en cifras de graduación." }
  ]},
  { id: 7, title: "Proyección e Interacción", icon: Globe, description: "Relacionamiento con el entorno nacional e internacional.", characteristics: [
    { id: 25, title: "Inserción en contextos globales", desc: "Tendencias internacionales y estado del arte." },
    { id: 26, title: "Cooperación académica", desc: "Resultados de convenios y redes de trabajo." },
    { id: 27, title: "Habilidades comunicativas", desc: "Segunda lengua e interculturalidad." }
  ]},
  { id: 8, title: "Investigación e Innovación", icon: Lightbulb, description: "Aportes a la ciencia, tecnología y creación artística.", characteristics: [
    { id: 28, title: "Capacidades de investigación", desc: "Grupos, semilleros y recursos disponibles." },
    { id: 29, title: "Resultados e impacto", desc: "Productos que enriquecen el currículo y la sociedad." },
    { id: 30, title: "Formación para la investigación", desc: "Desarrollo del pensamiento crítico en estudiantes." }
  ]},
  { id: 9, title: "Bienestar de la Comunidad", icon: Heart, description: "Programas y servicios para el desarrollo humano.", characteristics: [
    { id: 31, title: "Políticas de bienestar", desc: "Atención a la diversidad e inclusión." },
    { id: 32, title: "Impacto en formación integral", desc: "Mejora de la calidad de vida de la comunidad." }
  ]},
  { id: 10, title: "Recursos Físicos y Medios", icon: Monitor, description: "Infraestructura, bibliotecas y plataformas tecnológicas.", characteristics: [
    { id: 33, title: "Medios educativos", desc: "Recursos para el aprendizaje y la investigación." },
    { id: 34, title: "Infraestructura física y tecnológica", desc: "Aulas, laboratorios y centros de simulación." }
  ]},
  { id: 11, title: "Organización y Financiación", icon: Settings, description: "Gestión administrativa y sostenibilidad financiera.", characteristics: [
    { id: 35, title: "Estructura organizacional", desc: "Liderazgo, participación y procesos claros." },
    { id: 36, title: "Sostenibilidad financiera", desc: "Recursos para funcionamiento e inversión." }
  ]},
  { id: 12, title: "Aseguramiento de la Calidad", icon: ShieldCheck, description: "Procesos de autoevaluación y mejoramiento permanente.", characteristics: [
    { id: 37, title: "Cultura de la autoevaluación", desc: "Participación de la comunidad en la toma de decisiones." },
    { id: 38, title: "Planes de mejoramiento", desc: "Seguimiento y efectividad de las acciones de mejora." }
  ]}
];

// --- GUIAS DE NIVEL ---
const LEVEL_GUIDE = [
  { val: 0, label: "Inexistencia", color: "bg-red-50 text-red-600", desc: "Sin políticas ni evidencias." },
  { val: 1, label: "Existencia", color: "bg-orange-50 text-orange-600", desc: "Documento oficial sin despliegue." },
  { val: 2, label: "Despliegue", color: "bg-yellow-50 text-yellow-700", desc: "Se aplica sistemáticamente." },
  { val: 3, label: "Impacto", color: "bg-green-50 text-green-700", desc: "Resultados medibles positivos." },
  { val: 4, label: "Mejora Continua", color: "bg-blue-50 text-blue-700", desc: "Optimización constante con datos." }
];

function App() {
  const [view, setView] = useState('assessment');
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  
  const [assessments, setAssessments] = useState({});
  const [factorWeights, setFactorWeights] = useState({});
  const [programConfig, setProgramConfig] = useState({ name: "", rootFolder: "" });

  useEffect(() => {
    const d = localStorage.getItem('maac_final_data');
    const c = localStorage.getItem('maac_final_conf');
    const w = localStorage.getItem('maac_final_weights');
    if (d) setAssessments(JSON.parse(d));
    if (c) setProgramConfig(JSON.parse(c));
    if (w) setFactorWeights(JSON.parse(w));
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_final_data', JSON.stringify(assessments));
    localStorage.setItem('maac_final_conf', JSON.stringify(programConfig));
    localStorage.setItem('maac_final_weights', JSON.stringify(factorWeights));
  }, [assessments, programConfig, factorWeights]);

  const activeF = FACTORS[activeFactorIndex];
  const activeC = activeF.characteristics[activeCharIndex];
  const current = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  const totalWeight = useMemo(() => {
    return Object.values(factorWeights).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [factorWeights]);

  const handleReset = () => {
    if (window.confirm("¿Deseas reiniciar toda la evaluación?")) {
      setAssessments({});
      setProgramConfig({name:"", rootFolder:""});
      setFactorWeights({});
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExport = () => {
    let report = `REPORTE MAAC - ${programConfig.name || "PROGRAMA NO DEFINIDO"}\n`;
    report += `Ponderación Total: ${totalWeight}%\n\n`;
    FACTORS.forEach(f => {
      const p = factorWeights[f.id] || 0;
      report += `FACTOR ${f.id}: ${f.title} (${p}%)\n`;
      f.characteristics.forEach(c => {
        const a = assessments[c.id];
        if (a) report += ` - ${c.title}: Nivel ${a.level}\n`;
      });
      report += `\n`;
    });
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_MAAC.txt`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-xl">
        <div className="py-4 border-b border-slate-800">
          <h1 className="text-2xl font-black text-blue-500 italic">AUTO-MAAC</h1>
        </div>
        <nav className="flex-1 overflow-y-auto space-y-1">
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-xl flex items-center font-bold text-sm ${view === 'dashboard' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}>
            <BarChart2 className="mr-3" size={18}/> Ponderación
          </button>
          <div className="h-px bg-slate-800 my-4" />
          {FACTORS.map((f, i) => (
            <button key={f.id} onClick={()=>{setActiveFactorIndex(i); setActiveCharIndex(0); setView('assessment');}} className={`w-full text-left p-3 rounded-xl text-[10px] font-black tracking-widest ${activeFactorIndex === i && view === 'assessment' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-500 hover:text-white'}`}>
              FACTOR {f.id}
            </button>
          ))}
        </nav>
        <button onClick={handleReset} className="p-4 text-red-500 font-bold text-[10px] uppercase flex items-center justify-center hover:bg-red-500/10 rounded-xl">
          <RotateCcw size={14} className="mr-2"/> Reiniciar
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'assessment' ? (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-2">Factor {activeF.id} • {activeF.title}</span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">{activeC.title}</h2>
                <p className="text-slate-400 text-xs mt-2">{activeC.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black text-blue-600">{current.level*25}%</span>
                <p className="text-[10px] font-black text-slate-300 uppercase mt-2">Peso Factor: {factorWeights[activeF.id] || 0}%</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-10 bg-slate-50">
              <div className="max-w-3xl mx-auto space-y-6">
                <section className="bg-white p-6 rounded-3xl border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Escala de Calidad</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {LEVEL_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...current, level: g.val}})} className={`p-3 rounded-xl border-2 text-left transition-all ${current.level === g.val ? 'border-blue-600 bg-blue-50' : 'border-slate-50 hover:border-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase ${current.level === g.val ? 'text-blue-600' : 'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[8px] text-slate-400 leading-tight mt-1">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-6 rounded-3xl border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidencia (Link)</h3>
                  <input type="text" className="w-full p-3 bg-slate-50 rounded-xl border-none text-blue-600 text-xs font-medium" value={current.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, evidenceLink: e.target.value}})} placeholder="Link a Drive..." />
                </section>
                <section className="bg-white p-6 rounded-3xl border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sustentación y Hallazgos</h3>
                  <textarea className="w-full h-48 p-4 bg-slate-50 rounded-2xl border-none text-xs font-medium text-slate-600" value={current.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, observations: e.target.value}})} placeholder="Escriba aquí..." />
                </section>
              </div>
            </div>

            <footer className="p-6 bg-white border-t flex justify-between px-10">
              <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex-1); else if(activeFactorIndex > 0) { setActiveFactorIndex(activeFactorIndex-1); setActiveCharIndex(FACTORS[activeFactorIndex-1].characteristics.length-1); }}} className="font-black text-slate-400 text-[10px] tracking-widest uppercase hover:text-slate-800 transition-colors">Anterior</button>
              <button onClick={()=>{
                if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex + 1);
                else if(activeFactorIndex < FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex + 1); setActiveCharIndex(0); }
                else setView('dashboard');
              }} className="px-10 py-3 bg-blue-600 text-white font-black text-[10px] tracking-widest uppercase rounded-xl shadow-lg hover:bg-blue-700 transition-all">Siguiente</button>
            </footer>
          </>
        ) : (
          <div className="p-10 max-w-4xl mx-auto space-y-8 overflow-y-auto h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter">CONFIGURACIÓN Y PONDERACIÓN</h2>
              <button onClick={handleExport} className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-green-700">Exportar Reporte</button>
            </div>
            
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Datos Generales</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="p-3 bg-slate-50 rounded-xl outline-none border-none font-bold text-xs" placeholder="Programa" value={programConfig.name} onChange={e=>setProgramConfig({...programConfig, name:e.target.value})}/>
                <input type="text" className="p-3 bg-slate-50 rounded-xl outline-none border-none font-bold text-xs" placeholder="Carpeta Raíz" value={programConfig.rootFolder} onChange={e=>setProgramConfig({...programConfig, rootFolder:e.target.value})}/>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pesos por Factor (%)</h3>
                <span className={`text-[10px] font-black px-4 py-1 rounded-full ${totalWeight === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  Suma total: {totalWeight}% / 100%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {FACTORS.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-black uppercase text-slate-500">F{f.id}. {f.title}</span>
                    <input type="number" className="w-14 p-1.5 rounded-lg text-center font-black text-xs bg-white border-none shadow-sm" value={factorWeights[f.id] || ""} onChange={e => setFactorWeights({...factorWeights, [f.id]: e.target.value})} placeholder="0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

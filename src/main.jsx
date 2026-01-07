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
  { val: 0, label: "Inexistencia", color: "bg-red-50 text-red-600", desc: "No se cuenta con políticas ni evidencias documentadas." },
  { val: 1, label: "Existencia", color: "bg-orange-50 text-orange-600", desc: "Existe el documento oficial pero no hay implementación clara." },
  { val: 2, label: "Despliegue", color: "bg-yellow-50 text-yellow-700", desc: "Se aplica sistemáticamente en el programa." },
  { val: 3, label: "Impacto", color: "bg-green-50 text-green-700", desc: "Resultados medibles y positivos en la comunidad." },
  { val: 4, label: "Mejora Continua", color: "bg-blue-50 text-blue-700", desc: "Optimización constante basada en datos y referente externo." }
];

// --- COMPONENTES ---

function App() {
  const [view, setView] = useState('assessment');
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [assessments, setAssessments] = useState({});
  const [programConfig, setProgramConfig] = useState({ name: "", rootFolder: "" });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState(null);

  useEffect(() => {
    const d = localStorage.getItem('maac_final_data'), c = localStorage.getItem('maac_final_conf');
    if (d) setAssessments(JSON.parse(d)); if (c) setProgramConfig(JSON.parse(c));
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_final_data', JSON.stringify(assessments));
    localStorage.setItem('maac_final_conf', JSON.stringify(programConfig));
  }, [assessments, programConfig]);

  const activeF = FACTORS[activeFactorIndex], activeC = activeF.characteristics[activeCharIndex];
  const current = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  const handleReset = () => {
    if (window.confirm("¿Deseas reiniciar toda la evaluación?")) { setAssessments({}); setProgramConfig({name:"", rootFolder:""}); localStorage.clear(); }
  };

  const handleExport = () => {
    let report = `REPORTE MAAC - ${programConfig.name || "PROGRAMA NO DEFINIDO"}\nLink Raíz: ${programConfig.rootFolder}\n${"=".repeat(50)}\n\n`;
    FACTORS.forEach(f => {
      report += `FACTOR ${f.id}: ${f.title}\n`;
      f.characteristics.forEach(c => {
        const a = assessments[c.id];
        if (a) report += ` - ${c.title}\n   Nivel: ${a.level} | Link: ${a.evidenceLink}\n   Análisis: ${a.observations}\n\n`;
      });
    });
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_MAAC_2025.txt`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4">
        <div className="py-4 border-b border-slate-800"><h1 className="text-2xl font-black text-blue-500 italic">AUTO-MAAC</h1></div>
        <nav className="flex-1 overflow-y-auto space-y-1">
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-xl flex items-center font-bold text-sm ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart2 className="mr-3"/> Dashboard</button>
          <div className="h-px bg-slate-800 my-4" />
          {FACTORS.map((f, i) => (
            <button key={f.id} onClick={()=>{setActiveFactorIndex(i); setActiveCharIndex(0); setView('assessment');}} className={`w-full text-left p-3 rounded-xl text-[10px] font-black tracking-widest ${activeFactorIndex === i && view === 'assessment' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-500 hover:text-white'}`}>
              FACTOR {f.id}
            </button>
          ))}
        </nav>
        <button onClick={handleReset} className="p-4 text-red-500 font-bold text-[10px] uppercase flex items-center justify-center hover:bg-red-500/10 rounded-xl"><RotateCcw size={14} className="mr-2"/> Reiniciar</button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'assessment' ? (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-2">Factor {activeF.id} • Característica {activeC.id}</span>
                <h2 className="text-4xl font-black text-slate-800 leading-tight">{activeC.title}</h2>
                <p className="text-slate-400 text-sm mt-2">{activeC.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-6xl font-black text-blue-600">{current.level*25}%</span>
                <p className="text-[10px] font-black text-slate-300 uppercase mt-2">Cumplimiento de Calidad</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-10 bg-slate-50">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Selector de Nivel con Guía */}
                <section className="bg-white p-8 rounded-[2rem] border border-slate-200">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center"><Info size={14} className="mr-2"/> Evaluación del Nivel de Calidad</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {LEVEL_GUIDE.map(g => (
                      <button 
                        key={g.val} 
                        onClick={()=>setAssessments({...assessments, [activeC.id]: {...current, level: g.val}})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${current.level === g.val ? 'border-blue-600 bg-blue-50 scale-105 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <p className={`text-[10px] font-black uppercase ${current.level === g.val ? 'text-blue-600' : 'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[9px] text-slate-500 mt-2 leading-tight">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Link de Carpeta Evidencia</h3>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-4 top-4 text-slate-300"/>
                      <input type="text" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 font-medium text-xs" value={current.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, evidenceLink: e.target.value}})} placeholder="Link Drive/SharePoint de la característica..." />
                    </div>
                  </div>
                  <div className="bg-blue-600 p-8 rounded-[2rem] text-white">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-70 italic text-blue-200">Definición Factor {activeF.id}:</h3>
                    <p className="text-xs font-bold leading-relaxed">{activeF.description}</p>
                  </div>
                </div>

                <section className="bg-white p-8 rounded-[2rem] border border-slate-200">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Hallazgos, Análisis y Plan de Mejoramiento</h3>
                  <textarea className="w-full h-64 p-8 bg-slate-50 rounded-[2rem] border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-600" value={current.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, observations: e.target.value}})} placeholder="Describa los hallazgos positivos y los aspectos a mejorar para esta característica..."></textarea>
                </section>
              </div>
            </div>

            <footer className="p-8 bg-white border-t flex justify-between px-10">
              <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex-1); }} className="font-black text-slate-400 text-[10px] tracking-widest uppercase hover:text-slate-800">Anterior</button>
              <button onClick={()=>{
                if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex+1);
                else if(activeFactorIndex < FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex+1); setActiveCharIndex(0); }
                else setView('dashboard');
              }} className="px-10 py-4 bg-blue-600 text-white font-black text-[10px] tracking-widest uppercase rounded-2xl shadow-xl hover:bg-blue-700 transition-all">Siguiente Característica</button>
            </footer>
          </>
        ) : (
          <div className="p-10 max-w-5xl mx-auto space-y-8 overflow-y-auto h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic">DASHBOARD MAAC</h2>
              <button onClick={handleExport} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-green-700">Exportar Informe Final</button>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuración Inicial</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" placeholder="Nombre del Programa" value={programConfig.name} onChange={e=>setProgramConfig({...programConfig, name:e.target.value})}/>
                <input type="text" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs" placeholder="Link Raíz de Carpeta de Evidencias" value={programConfig.rootFolder} onChange={e=>setProgramConfig({...programConfig, rootFolder:e.target.value})}/>
              </div>
            </div>

            <div className="space-y-4 pb-10">
              {FACTORS.map(f => {
                let factorScore = 0, count = 0;
                f.characteristics.forEach(c => { if(assessments[c.id]) { factorScore += (assessments[c.id].level*25); count++; } });
                const avg = count > 0 ? factorScore / count : 0;
                return (
                  <div key={f.id} onClick={()=>{setActiveFactorIndex(f.id-1); setActiveCharIndex(0); setView('assessment');}} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all cursor-pointer group">
                    <div className="flex justify-between mb-4"><span className="font-black text-[10px] text-slate-400 uppercase">Factor {f.id}</span><span className="font-black text-blue-600">{avg.toFixed(0)}%</span></div>
                    <h4 className="font-bold text-slate-800 mb-4 group-hover:text-blue-600">{f.title}</h4>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-1000" style={{width: `${avg}%`}}/></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

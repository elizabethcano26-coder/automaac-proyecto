import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, BarChart2, RotateCcw, Link as LinkIcon, Download, Info, Award, AlertCircle, TrendingDown
} from 'lucide-react';

// --- BASE DE DATOS COMPLETA ACUERDO 01 DE 2025 (12 FACTORES / 51 CARACTERÍSTICAS) ---
const FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", description: "Referentes filosóficos y organizacionales del programa.", characteristics: [
    { id: 1, title: "Proyecto educativo del programa", desc: "Coherencia con la misión institucional, los campos de acción y la naturaleza jurídica de la institución." },
    { id: 2, title: "Relevancia académica y pertinencia social", desc: "Respuesta del programa a las necesidades de formación del contexto local, regional y global." }
  ]},
  { id: 2, title: "Comunidad de Estudiantes", description: "Desarrollo integral, permanencia y participación estudiantil.", characteristics: [
    { id: 3, title: "Actividades de formación integral", desc: "Participación de estudiantes en actividades de investigación, creación, cultura y deporte." },
    { id: 4, title: "Acompañamiento y seguimiento", desc: "Estrategias de orientación con impacto en la formación, permanencia y graduación." },
    { id: 5, title: "Autonomía y trabajo colaborativo", desc: "Fomento de la responsabilidad social y el aprendizaje autónomo en los estudiantes." },
    { id: 6, title: "Políticas académicas y cultura de paz", desc: "Aplicación de reglamentos en un marco de convivencia, inclusión y respeto mutuo." },
    { id: 7, title: "Estímulos y apoyos", desc: "Impacto de los incentivos académicos y apoyos socioeconómicos en la comunidad estudiantil." }
  ]},
  { id: 3, title: "Comunidad de Profesores", description: "Calidad, dedicación y desarrollo de la planta docente.", characteristics: [
    { id: 8, title: "Selección, vinculación y permanencia", desc: "Criterios de transparencia, mérito y eficacia en la vinculación docente." },
    { id: 9, title: "Estatuto y trayectoria profesoral", desc: "Aplicación del escalafón y reconocimiento a la estabilidad y méritos de los profesores." },
    { id: 10, title: "Planta profesoral suficiente", desc: "Número y dedicación de los profesores acorde a las labores formativas y de investigación." },
    { id: 11, title: "Desarrollo profesoral", desc: "Estrategias de capacitación, actualización y fortalecimiento del perfil docente." },
    { id: 12, title: "Estímulos a la trayectoria", desc: "Reconocimientos a la excelencia docente y su impacto en la calidad del programa." },
    { id: 13, title: "Producción de material docente", desc: "Desarrollo de contenidos y recursos didácticos propios evaluados por pares." },
    { id: 14, title: "Evaluación integral de profesores", desc: "Resultados del desempeño docente utilizados para el mejoramiento continuo." }
  ]},
  { id: 4, title: "Comunidad de Egresados", description: "Impacto y seguimiento de los graduados en el entorno.", characteristics: [
    { id: 15, title: "Seguimiento y aportes de egresados", desc: "Ubicación, redes de contacto e impacto de los graduados en el programa académico." },
    { id: 16, title: "Reconocimientos de egresados", desc: "Logros y aportes destacados de los egresados a la sociedad y al ejercicio profesional." }
  ]},
  { id: 5, title: "Aspectos Académicos", description: "Currículo, pedagogía y sistemas de evaluación.", characteristics: [
    { id: 17, title: "Gestión curricular", desc: "Integralidad, flexibilidad e interdisciplinariedad en la organización del plan de estudios." },
    { id: 18, title: "Estrategias pedagógicas", desc: "Coherencia de los métodos de enseñanza con el modelo pedagógico y la naturaleza del programa." },
    { id: 19, title: "Sistema de evaluación de estudiantes", desc: "Políticas claras de evaluación de aprendizajes y retroalimentación oportuna." },
    { id: 20, title: "Mejoramiento curricular", desc: "Uso de resultados de evaluación para la actualización y pertinencia del currículo." },
    { id: 21, title: "Resultados académicos previstos", desc: "Grado de cumplimiento de las competencias y perfiles de egreso declarados." }
  ]},
  { id: 6, title: "Permanencia y Graduación", description: "Estrategias para reducir la deserción.", characteristics: [
    { id: 22, title: "Políticas de bienestar y permanencia", desc: "Efectividad de los procesos de inducción y acompañamiento integral." },
    { id: 23, title: "Sistemas de alertas tempranas", desc: "Detección y atención oportuna de estudiantes con riesgo de deserción." },
    { id: 24, title: "Ajustes por seguimiento", desc: "Mejoras en el programa basadas en las tasas de retención y tiempo de graduación." }
  ]},
  { id: 7, title: "Proyección e Interacción", description: "Relacionamiento con el entorno nacional e internacional.", characteristics: [
    { id: 25, title: "Inserción en contextos globales", desc: "Consideración de tendencias internacionales en el desarrollo del programa." },
    { id: 26, title: "Cooperación académica", desc: "Resultados tangibles de convenios, movilidad y redes de trabajo colaborativo." },
    { id: 27, title: "Habilidades comunicativas", desc: "Fomento de una segunda lengua y capacidades de comunicación intercultural." }
  ]},
  { id: 8, title: "Investigación e Innovación", description: "Aportes a la ciencia, tecnología y creación artística.", characteristics: [
    { id: 28, title: "Capacidades de investigación", desc: "Existencia y uso de grupos, semilleros, laboratorios y recursos financieros." },
    { id: 29, title: "Resultados e impacto", desc: "Producción científica o artística que enriquece el currículo y el entorno social." },
    { id: 30, title: "Formación para la investigación", desc: "Desarrollo del pensamiento crítico y habilidades investigativas en el estudiante." }
  ]},
  { id: 9, title: "Bienestar de la Comunidad", description: "Programas y servicios para el desarrollo humano.", characteristics: [
    { id: 31, title: "Políticas de bienestar", desc: "Atención a la diversidad e inclusión de la comunidad académica." },
    { id: 32, title: "Impacto en formación integral", desc: "Aporte del bienestar institucional a la calidad de vida y clima organizacional." }
  ]},
  { id: 10, title: "Recursos Físicos y Medios", description: "Infraestructura, bibliotecas y plataformas tecnológicas.", characteristics: [
    { id: 33, title: "Medios educativos", desc: "Recursos para el aprendizaje y la investigación, bases de datos y bibliotecas." },
    { id: 34, title: "Infraestructura física y tecnológica", desc: "Disponibilidad de aulas, laboratorios y conectividad para el programa." }
  ]},
  { id: 11, title: "Organización y Financiación", description: "Gestión administrativa y sostenibilidad financiera.", characteristics: [
    { id: 35, title: "Estructura organizacional", desc: "Liderazgo, participación y procesos administrativos claros." },
    { id: 36, title: "Sostenibilidad financiera", desc: "Recursos para funcionamiento e inversión a largo plazo." }
  ]},
  { id: 12, title: "Aseguramiento de la Calidad", description: "Procesos de autoevaluación y mejoramiento permanente.", characteristics: [
    { id: 37, title: "Cultura de la autoevaluación", desc: "Participación de la comunidad en la toma de decisiones y mejora continua." },
    { id: 38, title: "Planes de mejoramiento", desc: "Seguimiento y efectividad de las acciones de mejora resultantes de la autoevaluación." }
  ]}
];

const LEVEL_GUIDE = [
  { val: 0, label: "Inexistencia", desc: "No se cuenta con políticas ni evidencias documentadas." },
  { val: 1, label: "Existencia", desc: "Existe el documento oficial pero no hay implementación clara." },
  { val: 2, label: "Despliegue", desc: "Se aplica sistemáticamente en el programa." },
  { val: 3, label: "Impacto", desc: "Resultados medibles y positivos en la comunidad." },
  { val: 4, label: "Mejora Continua", desc: "Optimización constante basada en datos y referente externo." }
];

function App() {
  const [view, setView] = useState('setup');
  const [activeFIndex, setActiveFIndex] = useState(0);
  const [activeCIndex, setActiveCIndex] = useState(0);
  
  const [metadata, setMetadata] = useState({ 
    name: "", campus: "", regDate: "", committeeDate: "", 
    isAccredited: false, assessmentDate: new Date().toISOString().split('T')[0] 
  });
  
  const [weights, setWeights] = useState({ factors: {}, chars: {} });
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('maac_v9_consolidated');
    if (saved) {
      const p = JSON.parse(saved);
      setMetadata(p.metadata); setWeights(p.weights); setAssessments(p.assessments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v9_consolidated', JSON.stringify({ metadata, weights, assessments }));
  }, [metadata, weights, assessments]);

  const fSum = useMemo(() => Object.values(weights.factors).reduce((a, b) => a + (Number(b) || 0), 0), [weights.factors]);

  const calculation = useMemo(() => {
    let gScore = 0;
    const details = FACTORS.map(f => {
      let fQual = 0;
      f.characteristics.forEach(c => { fQual += Number(assessments[c.id]?.level || 0); });
      const avg = fQual / f.characteristics.length;
      const fW = Number(weights.factors[f.id] || 0);
      const score = avg * (fW / 100);
      gScore += score;
      return { id: f.id, title: f.title, avg, score, weight: fW };
    });
    return { gScore, details };
  }, [assessments, weights]);

  const activeF = FACTORS[activeFIndex], activeC = activeF.characteristics[activeCIndex];
  const current = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden text-sm font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-2xl">
        <h1 className="text-2xl font-black text-blue-500 italic border-b border-slate-800 pb-4 uppercase tracking-tighter">Auto-MAAC</h1>
        <nav className="flex-1 overflow-y-auto space-y-2 font-bold uppercase tracking-widest text-[10px]">
          <button onClick={()=>setView('setup')} className={`w-full p-4 rounded-2xl flex items-center ${view==='setup'?'bg-blue-600 shadow-lg':'text-slate-400 hover:bg-slate-800'}`}><Settings size={18} className="mr-3"/> 1. Configuración</button>
          <button onClick={()=>setView('assessment')} className={`w-full p-4 rounded-2xl flex items-center ${view==='assessment'?'bg-blue-600 shadow-lg':'text-slate-400 hover:bg-slate-800'}`}><FileText size={18} className="mr-3"/> 2. Evaluación</button>
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-2xl flex items-center ${view==='dashboard'?'bg-blue-600 shadow-lg':'text-slate-400 hover:bg-slate-800'}`}><BarChart2 size={18} className="mr-3"/> 3. Reporte Final</button>
          <button onClick={()=>setView('gap')} className={`w-full p-4 rounded-2xl flex items-center ${view==='gap'?'bg-blue-600 shadow-lg':'text-slate-400 hover:bg-slate-800'}`}><TrendingDown size={18} className="mr-3"/> 4. Análisis GAP</button>
          <div className="h-px bg-slate-800 my-4" />
          {FACTORS.map((f, i) => (
            <button key={f.id} onClick={()=>{setActiveFIndex(i); setActiveCIndex(0); setView('assessment');}} className={`w-full text-left p-3 rounded-xl transition-all ${activeFIndex===i && view==='assessment'?'text-blue-400 bg-slate-800 border-r-4 border-blue-500':'text-slate-500 hover:text-white'}`}>FACTOR {f.id}</button>
          ))}
        </nav>
        <button onClick={()=>{localStorage.clear(); window.location.reload();}} className="p-4 text-red-500 font-black text-[10px] uppercase flex items-center justify-center hover:bg-red-500/10 rounded-xl"><RotateCcw size={14} className="mr-2"/> Reiniciar App</button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        
        {/* VISTA 1: CONFIGURACIÓN */}
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-white">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Ficha Técnica y Ponderación</h2>
            <div className="grid grid-cols-2 gap-8 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <div className="space-y-4">
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Nombre del Programa</label><input type="text" className="p-4 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500" value={metadata.name} onChange={e=>setMetadata({...metadata, name: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Sede / Municipio</label><input type="text" className="p-4 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Registro Calificado</label><input type="date" className="p-4 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500" value={metadata.regDate} onChange={e=>setMetadata({...metadata, regDate: e.target.value})} /></div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Comité Ponderación</label><input type="date" className="p-4 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Autoevaluación</label><input type="date" className="p-4 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500" value={metadata.assessmentDate} onChange={e=>setMetadata({...metadata, assessmentDate: e.target.value})} /></div>
                <div className="p-5 bg-white rounded-2xl shadow-sm flex items-center mt-6"><input type="checkbox" id="acc" className="mr-3 h-5 w-5" checked={metadata.isAccredited} onChange={e=>setMetadata({...metadata, isAccredited: e.target.checked})} /><label htmlFor="acc" className="font-bold text-slate-500 uppercase text-[10px]">¿Acreditado?</label></div>
              </div>
            </div>
            <section className="space-y-8">
               <div className="flex justify-between items-center"><h3 className="text-2xl font-black">Asignación de Pesos de Factores (%)</h3><div className={`px-6 py-2 rounded-full font-black text-xs ${fSum === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>Suma Factores: {fSum}% / 100%</div></div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FACTORS.map(f => (
                  <div key={f.id} className="bg-slate-50 p-6 rounded-[2rem] border flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all">
                    <span className="font-black text-slate-500 uppercase text-[11px]">Factor {f.id}: {f.title}</span>
                    <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border"><input type="number" className="w-16 text-center font-black border-none" value={weights.factors[f.id] || ""} onChange={e=>setWeights({...weights, factors: {...weights.factors, [f.id]: e.target.value}})} /><span className="ml-2 font-bold text-slate-300">%</span></div>
                  </div>
                ))}
               </div>
            </section>
          </div>
        )}

        {/* VISTA 2: EVALUACIÓN */}
        {view === 'assessment' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            <header className="p-10 border-b flex justify-between items-end bg-white">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-[10px] uppercase block mb-2 tracking-[0.2em]">Factor {activeF.id} • {activeF.title}</span>
                <h2 className="text-4xl font-black text-slate-800 leading-tight">{activeC.title}</h2>
                <div className="bg-slate-100 text-slate-600 p-5 rounded-2xl mt-4 text-xs italic border-l-4 border-blue-500 font-medium">{activeC.desc}</div>
              </div>
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white text-center min-w-[140px] shadow-2xl">
                <p className="text-5xl font-black">{current.level}</p>
                <p className="text-[10px] uppercase font-black opacity-70 tracking-widest mt-2">Nota Calidad</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-12 space-y-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm border-slate-200">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center"><Info size={14} className="mr-2"/> Escala de Madurez</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {LEVEL_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...current, level: g.val}})} className={`p-4 rounded-2xl border-2 text-left transition-all ${current.level===g.val?'border-blue-600 bg-blue-50 scale-105 shadow-md':'border-slate-50 hover:bg-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase ${current.level===g.val?'text-blue-600':'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[8px] text-slate-400 leading-tight mt-2 font-medium">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm border-slate-200 space-y-4">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center"><LinkIcon size={14} className="mr-2"/> URL Repositorio Evidencia</h3>
                   <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-blue-600 font-bold text-xs" value={current.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, evidenceLink: e.target.value}})} placeholder="Link Drive/SharePoint de la evidencia..." />
                </div>
                <textarea className="w-full h-64 p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm text-sm font-medium text-slate-600 leading-relaxed outline-none focus:ring-2 focus:ring-blue-500" value={current.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...current, observations: e.target.value}})} placeholder="Escriba los hallazgos y análisis cualitativo del comité..." />
              </div>
            </div>
            <footer className="p-8 bg-white border-t flex justify-between px-12">
               <button onClick={()=>{ if(activeCIndex > 0) setActiveCIndex(activeCIndex - 1); else if(activeFIndex > 0) { setActiveFIndex(activeFIndex - 1); setActiveCIndex(FACTORS[activeFIndex - 1].characteristics.length - 1); }}} className="font-black text-slate-400 text-[10px] uppercase tracking-widest hover:text-slate-800">Anterior</button>
               <button onClick={()=>{
                 if(activeCIndex < activeF.characteristics.length - 1) setActiveCIndex(activeCIndex + 1);
                 else if(activeFIndex < FACTORS.length - 1) { setActiveFIndex(activeFIndex + 1); setActiveCIndex(0); }
                 else setView('dashboard');
               }} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-blue-700">Siguiente</button>
            </footer>
          </div>
        )}

        {/* VISTA 3: REPORTE FINAL */}
        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50">
            <header className="flex justify-between items-end border-b pb-8">
              <div><h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Reporte de Resultados</h2><p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-widest">{metadata.name} | Sede {metadata.campus} | Comité: {metadata.committeeDate}</p></div>
              <button onClick={() => window.print()} className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] tracking-widest uppercase shadow-xl">Imprimir PDF</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Puntaje Global Final</p>
                    <p className={`text-7xl font-black ${calculation.gScore >= 3.0 ? 'text-green-600' : 'text-orange-500'}`}>{calculation.gScore.toFixed(2)}</p>
                    <p className="text-xs font-bold text-slate-300 mt-2 italic uppercase">Sobre 4.00 máximos</p>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center">
                    <div className="flex items-center mb-4"><Award className="text-blue-400 mr-3" size={24}/><span className="font-bold uppercase tracking-widest text-[11px]">Estado de Calidad</span></div>
                    <p className="text-3xl font-black italic uppercase">{calculation.gScore >= 3.6 ? "Alta Calidad Excelente" : calculation.gScore >= 3.0 ? "Alta Calidad Cumplida" : "Cumplimiento Parcial"}</p>
                    <p className="text-slate-500 text-[9px] uppercase mt-4">Cálculo: (Promedio Calidad Factor × Peso Factor)</p>
                </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border space-y-4">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6">Puntaje por Factor Académico</h3>
                <div className="space-y-4">
                    {calculation.details.map(f => (
                        <div key={f.id} className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center border hover:bg-white hover:shadow-lg transition-all group">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">{f.id}</span>
                                <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{f.title}</span>
                            </div>
                            <div className="flex gap-12 items-center">
                                <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase">Calidad</p><p className="font-bold text-slate-600">{f.avg.toFixed(2)}</p></div>
                                <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase">Peso</p><p className="font-bold text-slate-600">{f.weight}%</p></div>
                                <div className="text-right min-w-[140px] border-l pl-10"><p className="text-[8px] font-black text-blue-400 uppercase">Puntaje Factor</p><p className="font-black text-blue-600 text-xl">{f.score.toFixed(2)}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* VISTA 4: ANÁLISIS GAP */}
        {view === 'gap' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10 animate-in slide-in-from-bottom-5">
            <header className="flex justify-between items-end border-b pb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Análisis GAP (Brechas)</h2>
                <p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-widest">Identificación de brechas frente al Nivel 4 (Excelencia)</p>
              </div>
            </header>
            <div className="space-y-12 pb-20">
              {FACTORS.map(f => (
                <div key={f.id} className="bg-white rounded-[3rem] shadow-sm border overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white flex justify-between items-center uppercase font-black tracking-widest text-[10px]">
                    <span>Factor {f.id}: {f.title}</span>
                    <span className="opacity-50">Peso: {weights.factors[f.id] || 0}%</span>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <th className="p-8 w-1/3">Característica / Aspectos</th>
                        <th className="p-8 text-center">Estado (0-4)</th>
                        <th className="p-8 text-center">Brecha (GAP)</th>
                        <th className="p-8 w-1/3">Sustentación del Comité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {f.characteristics.map(c => {
                        const level = assessments[c.id]?.level || 0;
                        const gap = 4 - level;
                        const obs = assessments[c.id]?.observations || "Sin análisis.";
                        return (
                          <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="p-8">
                              <p className="font-black text-slate-700 uppercase text-[11px]">{c.title}</p>
                              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">{c.desc}</p>
                            </td>
                            <td className="p-8 text-center">
                              <span className={`inline-block px-5 py-3 rounded-2xl font-black text-xl ${level >= 3 ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}>{level.toFixed(1)}</span>
                            </td>
                            <td className="p-8 text-center">
                              <div className="flex flex-col items-center">
                                <span className={`font-black text-2xl ${gap >= 2 ? 'text-red-500' : gap === 0 ? 'text-green-500' : 'text-orange-500'}`}>-{gap.toFixed(1)}</span>
                                <div className="w-16 bg-slate-100 h-2 rounded-full mt-3 overflow-hidden"><div className={`h-full ${gap >= 2 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${(gap/4)*100}%`}}></div></div>
                              </div>
                            </td>
                            <td className="p-8">
                                <div className="bg-slate-50 p-6 rounded-3xl text-[11px] text-slate-600 leading-relaxed font-medium border border-slate-100">{obs}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

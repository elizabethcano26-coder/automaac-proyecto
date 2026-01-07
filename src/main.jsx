import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, BarChart2, RotateCcw, Link as LinkIcon, Download, Award, AlertCircle, CheckCircle2, ChevronDown
} from 'lucide-react';

// --- BASE DE DATOS COMPLETA ACUERDO 01 DE 2025 ---
const FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", description: "Referentes filosóficos y organizacionales.", characteristics: [
    { id: 1, title: "Proyecto educativo del programa", desc: "Coherencia con la misión institucional, los campos de acción y la naturaleza jurídica de la institución." },
    { id: 2, title: "Relevancia académica y pertinencia social", desc: "Respuesta del programa a las necesidades de formación del contexto local, regional y global." }
  ]},
  { id: 2, title: "Comunidad de Estudiantes", description: "Desarrollo integral y permanencia.", characteristics: [
    { id: 3, title: "Actividades de formación integral", desc: "Participación de estudiantes en actividades de investigación, creación, cultura y deporte." },
    { id: 4, title: "Acompañamiento y seguimiento", desc: "Impacto en formación, permanencia y graduación." },
    { id: 5, title: "Autonomía y trabajo colaborativo", desc: "Fomento de la responsabilidad social y el aprendizaje autónomo en los estudiantes." },
    { id: 6, title: "Políticas académicas y cultura de paz", desc: "Aplicación de reglamentos en un marco de convivencia, inclusión y respeto mutuo." },
    { id: 7, title: "Estímulos y apoyos", desc: "Impacto de los incentivos académicos y apoyos socioeconómicos en la comunidad estudiantil." }
  ]},
  { id: 3, title: "Comunidad de Profesores", description: "Calidad y desarrollo docente.", characteristics: [
    { id: 8, title: "Selección, vinculación y permanencia", desc: "Criterios de transparencia, mérito y eficacia en la vinculación docente." },
    { id: 9, title: "Estatuto y trayectoria profesoral", desc: "Aplicación del escalafón y reconocimiento a la estabilidad y méritos de los profesores." },
    { id: 10, title: "Planta profesoral suficiente", desc: "Número y dedicación de los profesores acorde a las labores formativas y de investigación." },
    { id: 11, title: "Desarrollo profesoral", desc: "Estrategias de capacitación, actualización y fortalecimiento del perfil docente." },
    { id: 12, title: "Estímulos a la trayectoria", desc: "Reconocimientos a la excelencia docente y su impacto en la calidad del programa." },
    { id: 13, title: "Producción de material docente", desc: "Desarrollo de contenidos y recursos didácticos propios evaluados por pares." },
    { id: 14, title: "Evaluación integral de profesores", desc: "Resultados del desempeño docente utilizados para el mejoramiento continuo." }
  ]},
  { id: 4, title: "Comunidad de Egresados", description: "Seguimiento e impacto.", characteristics: [
    { id: 15, title: "Seguimiento y aportes de egresados", desc: "Ubicación, redes de contacto e impacto de los graduados en el programa académico." },
    { id: 16, title: "Reconocimientos de egresados", desc: "Logros y aportes destacados de los egresados a la sociedad y al ejercicio profesional." }
  ]},
  { id: 5, title: "Aspectos Académicos", description: "Currículo y pedagogía.", characteristics: [
    { id: 17, title: "Gestión curricular", desc: "Integralidad, flexibilidad e interdisciplinariedad en la organización del plan de estudios." },
    { id: 18, title: "Estrategias pedagógicas", desc: "Coherencia de los métodos de enseñanza con el modelo pedagógico y la naturaleza del programa." },
    { id: 19, title: "Sistema de evaluación de estudiantes", desc: "Políticas claras de evaluación de aprendizajes y retroalimentación oportuna." },
    { id: 20, title: "Mejoramiento curricular", desc: "Uso de resultados de evaluación para la actualización y pertinencia del currículo." },
    { id: 21, title: "Resultados académicos previstos", desc: "Grado de cumplimiento de las competencias y perfiles de egreso declarados." }
  ]},
  { id: 6, title: "Permanencia y Graduación", description: "Estrategias contra la deserción.", characteristics: [
    { id: 22, title: "Políticas de bienestar y permanencia", desc: "Efectividad de los procesos de inducción y acompañamiento integral." },
    { id: 23, title: "Sistemas de alertas tempranas", desc: "Detección y atención oportuna de estudiantes con riesgo de deserción." },
    { id: 24, title: "Ajustes por seguimiento", desc: "Mejoras en el programa basadas en las tasas de retención y tiempo de graduación." }
  ]},
  { id: 7, title: "Proyección e Interacción", description: "Relacionamiento externo.", characteristics: [
    { id: 25, title: "Inserción en contextos globales", desc: "Consideración de tendencias internacionales en el desarrollo del programa." },
    { id: 26, title: "Cooperación académica", desc: "Resultados tangibles de convenios, movilidad y redes de trabajo colaborativo." },
    { id: 27, title: "Habilidades comunicativas", desc: "Fomento de una segunda lengua y capacidades de comunicación intercultural." }
  ]},
  { id: 8, title: "Investigación e Innovación", description: "Ciencia y tecnología.", characteristics: [
    { id: 28, title: "Capacidades de investigación", desc: "Existencia y uso de grupos, semilleros, laboratorios y recursos financieros." },
    { id: 29, title: "Resultados e impacto", desc: "Producción científica o artística que enriquece el currículo y el entorno social." },
    { id: 30, title: "Formación para la investigación", desc: "Desarrollo del pensamiento crítico y habilidades investigativas en el estudiante." }
  ]},
  { id: 9, title: "Bienestar de la Comunidad", description: "Desarrollo humano.", characteristics: [
    { id: 31, title: "Políticas de bienestar", desc: "Programas de salud, cultura y recreación con enfoque de inclusión y diversidad." },
    { id: 32, title: "Impacto en formación integral", desc: "Aporte del bienestar institucional a la calidad de vida y clima organizacional." }
  ]},
  { id: 10, title: "Recursos Físicos", description: "Infraestructura.", characteristics: [
    { id: 33, title: "Medios educativos", desc: "Suficiencia de bibliotecas, bases de datos y recursos digitales de apoyo." },
    { id: 34, title: "Infraestructura física y tecnológica", desc: "Disponibilidad y mantenimiento de aulas, laboratorios y conectividad." }
  ]},
  { id: 11, title: "Organización y Finanzas", description: "Gestión y sostenibilidad.", characteristics: [
    { id: 35, title: "Estructura organizacional", desc: "Procesos de liderazgo, gobernanza y participación de la comunidad en la gestión." },
    { id: 36, title: "Sostenibilidad financiera", desc: "Asignación presupuestal que garantiza el funcionamiento y desarrollo del programa." }
  ]},
  { id: 12, title: "Aseguramiento Calidad", description: "Autoevaluación.", characteristics: [
    { id: 37, title: "Cultura de la autoevaluación", desc: "Ejercicio autónomo y participativo de revisión crítica de la calidad del programa." },
    { id: 38, title: "Planes de mejoramiento", desc: "Implementación y seguimiento de acciones para cerrar brechas identificadas." }
  ]}
];

const LEVEL_GUIDE = [
  { val: 0, label: "Inexistencia", desc: "Sin evidencias ni procesos." },
  { val: 1, label: "Existencia", desc: "Solo documento oficial." },
  { val: 2, label: "Despliegue", desc: "En aplicación sistemática." },
  { val: 3, label: "Impacto", desc: "Resultados probados." },
  { val: 4, label: "Mejora Continua", desc: "Cultura de optimización." }
];

function App() {
  const [view, setView] = useState('setup'); 
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  
  const [metadata, setMetadata] = useState({ name: "", campus: "", regDate: "", committeeDate: "", isAccredited: false, assessmentDate: new Date().toISOString().split('T')[0] });
  const [weights, setWeights] = useState({ factors: {}, chars: {} });
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('maac_v7_full_data');
    if (saved) {
      const p = JSON.parse(saved);
      if(p.metadata) setMetadata(p.metadata);
      if(p.weights) setWeights(p.weights);
      if(p.assessments) setAssessments(p.assessments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v7_full_data', JSON.stringify({ metadata, weights, assessments }));
  }, [metadata, weights, assessments]);

  const factorSum = useMemo(() => Object.values(weights.factors).reduce((a, b) => a + (Number(b) || 0), 0), [weights.factors]);

  const calculation = useMemo(() => {
    let globalScore = 0;
    const factorDetails = FACTORS.map(f => {
      let sumQuality = 0;
      f.characteristics.forEach(c => { sumQuality += Number(assessments[c.id]?.level || 0); });
      const avgQuality = sumQuality / f.characteristics.length;
      const fWeight = Number(weights.factors[f.id] || 0);
      const scoreInFactor = avgQuality * (fWeight / 100);
      globalScore += scoreInFactor;
      return { id: f.id, title: f.title, avgQuality, scoreInFactor, weight: fWeight };
    });
    return { globalScore, factorDetails };
  }, [assessments, weights]);

  const activeF = FACTORS[activeFactorIndex], activeC = activeF.characteristics[activeCharIndex];
  const currentAss = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden text-sm">
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-2xl">
        <div className="py-4 border-b border-slate-800 text-center uppercase">
          <h1 className="text-2xl font-black text-blue-500 italic">Auto-MAAC</h1>
        </div>
        <nav className="flex-1 overflow-y-auto space-y-2">
          <button onClick={()=>setView('setup')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'setup' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><Settings className="mr-3" size={18}/> 1. Configuración</button>
          <button onClick={()=>setView('assessment')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'assessment' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><FileText className="mr-3" size={18}/> 2. Evaluación</button>
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'dashboard' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart2 className="mr-3" size={18}/> 3. Reporte Final</button>
          <button onClick={()=>setView('gap')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'gap' ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}><TrendingDown className="mr-3" size={18}/> 4. Análisis GAP</button>
          <div className="h-px bg-slate-800 my-4" />
          {FACTORS.map((f, i) => (
            <button key={f.id} onClick={()=>{setActiveFactorIndex(i); setActiveCharIndex(0); setView('assessment');}} className={`w-full text-left p-3 rounded-xl text-[10px] font-black tracking-widest ${activeFactorIndex === i && view === 'assessment' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500 shadow-inner' : 'text-slate-500 hover:text-white'}`}>FACTOR {f.id}</button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 bg-white space-y-12">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Ficha Técnica y Ponderación</h2>
            <section className="bg-slate-50 p-10 rounded-[2.5rem] border grid grid-cols-2 gap-8 text-slate-600 font-bold">
               <div className="space-y-4">
                  <div className="flex flex-col"><label className="text-[10px] uppercase text-slate-400 mb-1">Programa</label><input type="text" className="p-4 rounded-2xl shadow-sm border-none" value={metadata.name} onChange={e=>setMetadata({...metadata, name: e.target.value})} /></div>
                  <div className="flex flex-col"><label className="text-[10px] uppercase text-slate-400 mb-1">Sede</label><input type="text" className="p-4 rounded-2xl shadow-sm border-none" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} /></div>
               </div>
               <div className="space-y-4">
                  <div className="flex flex-col"><label className="text-[10px] uppercase text-slate-400 mb-1">Fecha Registro</label><input type="date" className="p-4 rounded-2xl shadow-sm border-none" value={metadata.regDate} onChange={e=>setMetadata({...metadata, regDate: e.target.value})} /></div>
                  <div className="flex flex-col"><label className="text-[10px] uppercase text-slate-400 mb-1">Comité Ponderación</label><input type="date" className="p-4 rounded-2xl shadow-sm border-none" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} /></div>
               </div>
            </section>
            <section className="space-y-8">
               <div className="flex justify-between items-center"><h3 className="text-2xl font-black">Asignación de Pesos (%)</h3><div className={`px-6 py-2 rounded-full font-black text-xs ${factorSum === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>Suma: {factorSum}%</div></div>
               <div className="grid grid-cols-1 gap-6">
                {FACTORS.map(f => (
                  <div key={f.id} className="bg-slate-50 p-8 rounded-[2rem] border">
                    <div className="flex justify-between items-center mb-4 font-black uppercase text-slate-500"><span>F{f.id}: {f.title}</span><div className="flex items-center bg-white px-4 py-2 rounded-xl"><input type="number" className="w-16 text-center border-none" value={weights.factors[f.id] || ""} onChange={e=>setWeights({...weights, factors: {...weights.factors, [f.id]: e.target.value}})} /><span className="ml-2 text-slate-300">%</span></div></div>
                    <div className="grid grid-cols-3 gap-2">
                        {f.characteristics.map(c => (
                            <div key={c.id} className="flex justify-between items-center bg-white p-2 rounded-lg text-[9px] shadow-sm"><span className="font-bold truncate w-32 uppercase">{c.title}</span><input type="number" className="w-10 text-center bg-slate-50 rounded" value={weights.chars[c.id] || ""} onChange={e=>setWeights({...weights, chars: {...weights.chars, [c.id]: e.target.value}})} /></div>
                        ))}
                    </div>
                  </div>
                ))}
               </div>
            </section>
          </div>
        )}

        {view === 'assessment' && (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-[10px] uppercase block mb-2 tracking-widest">Factor {activeF.id} • {activeF.title}</span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">{activeC.title}</h2>
                <div className="bg-slate-100 text-slate-600 p-4 rounded-xl mt-4 text-xs italic border-l-4 border-blue-500 font-medium">{activeC.desc}</div>
              </div>
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-center min-w-[140px] text-white shadow-xl">
                <p className="text-5xl font-black">{currentAss.level}</p>
                <p className="text-[10px] font-black uppercase mt-2 opacity-70 tracking-widest">Nota Calidad</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Grado de Madurez (Escala 0-4)</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {LEVEL_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...currentAss, level: g.val}})} className={`p-4 rounded-2xl border-2 text-left transition-all ${currentAss.level === g.val ? 'border-blue-600 bg-blue-50 scale-105 shadow-md' : 'border-slate-50 hover:bg-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase ${currentAss.level === g.val ? 'text-blue-600' : 'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[8px] text-slate-400 mt-2 leading-tight font-medium">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Carpeta Evidencias</h3>
                  <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-blue-600 font-medium text-xs" value={currentAss.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, evidenceLink: e.target.value}})} placeholder="Link Drive..." />
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 font-black">Hallazgos y Sustentación</h3>
                  <textarea className="w-full h-64 p-8 bg-slate-50 rounded-[2.5rem] border-none text-sm font-medium text-slate-600 leading-relaxed" value={currentAss.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, observations: e.target.value}})} placeholder="Describa los hallazgos encontrados..." />
                </section>
              </div>
            </div>
            <footer className="p-8 bg-white border-t flex justify-between px-12">
               <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex - 1); }} className="font-black text-slate-400 text-[10px] uppercase tracking-widest">Anterior</button>
               <button onClick={()=>{
                 if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex + 1);
                 else if(activeFactorIndex < FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex + 1); setActiveCharIndex(0); }
                 else setView('dashboard');
               }} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-xl">Siguiente</button>
            </footer>
          </>
        )}

        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10">
            <header className="flex justify-between items-end border-b pb-8">
              <div><h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Reporte Final</h2><p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-widest">{metadata.name} | Sede {metadata.campus}</p></div>
              <button onClick={() => window.print()} className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] tracking-widest shadow-xl">PDF / Imprimir</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Puntaje Global</p><p className={`text-7xl font-black ${calculation.globalScore >= 3.0 ? 'text-green-600' : 'text-orange-500'}`}>{calculation.globalScore.toFixed(2)}</p></div>
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center"><p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 text-blue-400">Concepto Calidad</p><p className="text-2xl font-black italic uppercase">{calculation.globalScore >= 3.6 ? "Excelente" : calculation.globalScore >= 3.0 ? "Cumple" : "Requiere Mejora"}</p></div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">Puntaje por Factor</h3>
                {calculation.factorDetails.map(f => (
                    <div key={f.id} className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center border hover:shadow-lg transition-all">
                        <span className="font-black text-slate-700 uppercase text-xs truncate w-80">{f.id}. {f.title}</span>
                        <div className="flex gap-10 items-center">
                            <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase">Calidad</p><p className="font-bold text-slate-600">{f.avgQuality.toFixed(2)}</p></div>
                            <div className="text-right min-w-[140px] border-l pl-10"><p className="text-[8px] font-black text-blue-400 uppercase">Puntaje Factor</p><p className="font-black text-blue-600 text-xl">{f.scoreInFactor.toFixed(2)}</p></div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* --- VISTA ANÁLISIS GAP (NUEVA PANTALLA) --- */}
        {view === 'gap' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10 animate-in fade-in slide-in-from-bottom-5">
            <header className="flex justify-between items-end border-b pb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Análisis GAP (Brechas)</h2>
                <p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-widest">Identificación de puntos de mejora para alcanzar el Nivel 4</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-xs"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div> Prioridad Alta (Gap > 2.0)</div>
                <div className="flex items-center text-xs"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div> Cumplimiento Óptimo</div>
              </div>
            </header>

            <div className="space-y-12 pb-20">
              {FACTORS.map(f => (
                <div key={f.id} className="bg-white rounded-[3rem] shadow-sm border overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <h3 className="font-black uppercase tracking-widest text-sm">Factor {f.id}: {f.title}</h3>
                    <span className="text-[10px] font-bold opacity-50">Impacto Factor: {weights.factors[f.id] || 0}%</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 w-1/4">Característica</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-center">Estado (0-4)</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-center">Brecha (GAP)</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Análisis y Plan de Mejora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {f.characteristics.map(c => {
                          const level = assessments[c.id]?.level || 0;
                          const gap = 4 - level;
                          const obs = assessments[c.id]?.observations || "Sin análisis registrado.";
                          return (
                            <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="p-6">
                                <p className="font-bold text-slate-700 uppercase text-xs">{c.title}</p>
                                <p className="text-[9px] text-slate-400 mt-1 italic leading-tight">{c.desc}</p>
                              </td>
                              <td className="p-6 text-center">
                                <span className={`inline-block px-4 py-2 rounded-xl font-black text-lg ${level >= 3 ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}>
                                  {level.toFixed(1)}
                                </span>
                              </td>
                              <td className="p-6 text-center">
                                <div className="flex flex-col items-center">
                                  <span className={`font-black text-xl ${gap >= 2 ? 'text-red-500 animate-pulse' : gap === 0 ? 'text-green-500' : 'text-orange-400'}`}>
                                    -{gap.toFixed(1)}
                                  </span>
                                  <div className="w-16 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className={`h-full ${gap >= 2 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${(gap/4)*100}%`}}></div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-600 leading-relaxed border border-slate-100">
                                  {obs}
                                </div>
                                {gap > 0 && (
                                  <p className="text-[9px] font-black text-blue-500 mt-2 uppercase flex items-center">
                                    <AlertCircle size={10} className="mr-1"/> Requiere plan de fortalecimiento
                                  </p>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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

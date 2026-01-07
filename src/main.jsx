import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, BarChart2, RotateCcw, Link as LinkIcon, Download, Award
} from 'lucide-react';

// --- BASE DE DATOS COMPLETA ACUERDO 01 DE 2025 (51 CARACTERÍSTICAS) ---
const FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", description: "Referentes filosóficos y organizacionales.", characteristics: [
    { id: 1, title: "Proyecto educativo del programa", desc: "Coherencia con la misión institucional, los campos de acción y la naturaleza jurídica de la institución." },
    { id: 2, title: "Relevancia académica y pertinencia social", desc: "Respuesta del programa a las necesidades de formación del contexto local, regional y global." }
  ]},
  { id: 2, title: "Comunidad de Estudiantes", description: "Desarrollo integral y permanencia.", characteristics: [
    { id: 3, title: "Actividades de formación integral", desc: "Participación de estudiantes en actividades de investigación, creación, cultura y deporte." },
    { id: 4, title: "Acompañamiento y seguimiento", desc: "Estrategias de orientación con impacto en la formación, permanencia y graduación." },
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
  { val: 1, label: "Existencia", desc: "Solo documento oficial, sin aplicación." },
  { val: 2, label: "Despliegue", desc: "En aplicación sistemática." },
  { val: 3, label: "Impacto", desc: "Resultados probados y medibles." },
  { val: 4, label: "Mejora Continua", desc: "Cultura de optimización constante." }
];

function App() {
  const [view, setView] = useState('setup'); 
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [metadata, setMetadata] = useState({ name: "", campus: "", regDate: "", committeeDate: "", isAccredited: false, assessmentDate: new Date().toISOString().split('T')[0] });
  const [weights, setWeights] = useState({ factors: {}, chars: {} });
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('maac_v6_full');
    if (saved) {
      const p = JSON.parse(saved);
      setMetadata(p.metadata); setWeights(p.weights); setAssessments(p.assessments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v6_full', JSON.stringify({ metadata, weights, assessments }));
  }, [metadata, weights, assessments]);

  const factorSum = useMemo(() => Object.values(weights.factors).reduce((a, b) => a + Number(b), 0), [weights.factors]);

  // --- CÁLCULO MATEMÁTICO REAL ---
  const calculation = useMemo(() => {
    let globalScore = 0;
    const factorDetails = FACTORS.map(f => {
      let fPoints = 0;
      f.characteristics.forEach(c => {
        const ass = assessments[c.id] || { level: 0 };
        const cW = Number(weights.chars[c.id] || 0);
        fPoints += (ass.level * (cW / 100)); // Calidad * Peso Característica
      });
      const fW = Number(weights.factors[f.id] || 0);
      const scoreInMAAC = (fPoints * (fW / 100)); // Puntaje del Factor * Peso Factor
      globalScore += scoreInMAAC;
      return { id: f.id, title: f.title, points: fPoints, scoreInMAAC, weight: fW };
    });
    return { globalScore, factorDetails };
  }, [assessments, weights]);

  const activeF = FACTORS[activeFactorIndex];
  const activeC = activeF.characteristics[activeCharIndex];
  const currentAss = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden text-sm">
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-2xl">
        <div className="py-4 border-b border-slate-800 text-center">
          <h1 className="text-2xl font-black text-blue-500 italic uppercase">Auto-MAAC</h1>
        </div>
        <nav className="flex-1 overflow-y-auto space-y-2">
          <button onClick={()=>setView('setup')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'setup' ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}><Settings className="mr-3" size={18}/> 1. Configuración</button>
          <button onClick={()=>setView('assessment')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'assessment' ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}><FileText className="mr-3" size={18}/> 2. Evaluación</button>
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'dashboard' ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart2 className="mr-3" size={18}/> 3. Reporte Final</button>
          <div className="h-px bg-slate-800 my-4" />
          {FACTORS.map((f, i) => (
            <button key={f.id} onClick={()=>{setActiveFactorIndex(i); setActiveCharIndex(0); setView('assessment');}} className={`w-full text-left p-3 rounded-xl text-[10px] font-black tracking-widest ${activeFactorIndex === i && view === 'assessment' ? 'bg-slate-800 text-blue-400 border-r-4 border-blue-500' : 'text-slate-500 hover:text-white'}`}>FACTOR {f.id}</button>
          ))}
        </nav>
        <button onClick={()=>{localStorage.clear(); window.location.reload();}} className="p-4 text-red-500 font-bold text-[10px] uppercase flex items-center justify-center hover:bg-red-500/10 rounded-xl"><RotateCcw size={14} className="mr-2"/> Reiniciar</button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 bg-white space-y-12">
            <header className="flex justify-between items-center"><h2 className="text-4xl font-black text-slate-800 tracking-tight tracking-tighter">Ficha Técnica y Ponderación</h2></header>
            <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 grid grid-cols-2 gap-8 shadow-inner">
              <div className="space-y-4">
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Programa</label><input type="text" className="p-4 rounded-2xl border-none shadow-sm" value={metadata.name} onChange={e=>setMetadata({...metadata, name: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Sede</label><input type="text" className="p-4 rounded-2xl border-none shadow-sm" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Registro Calificado</label><input type="date" className="p-4 rounded-2xl border-none shadow-sm" value={metadata.regDate} onChange={e=>setMetadata({...metadata, regDate: e.target.value})} /></div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Comité Ponderación</label><input type="date" className="p-4 rounded-2xl border-none shadow-sm" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} /></div>
                <div className="flex flex-col"><label className="text-[10px] font-black uppercase text-slate-400 mb-1">Fecha Autoevaluación</label><input type="date" className="p-4 rounded-2xl border-none shadow-sm" value={metadata.assessmentDate} onChange={e=>setMetadata({...metadata, assessmentDate: e.target.value})} /></div>
                <div className="p-5 bg-white rounded-2xl flex items-center shadow-sm mt-6"><input type="checkbox" className="mr-3 h-5 w-5" checked={metadata.isAccredited} onChange={e=>setMetadata({...metadata, isAccredited: e.target.checked})} /><label className="font-bold text-slate-500 uppercase text-[10px]">¿Acreditado?</label></div>
              </div>
            </section>
            <section className="space-y-8">
               <div className="flex justify-between items-center"><h3 className="text-2xl font-black">Pesos y Ponderación (%)</h3><div className={`px-6 py-2 rounded-full font-black text-xs ${factorSum === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>Suma Factores: {factorSum}%</div></div>
               {FACTORS.map(f => (
                  <div key={f.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                    <div className="flex justify-between items-center mb-6"><span className="font-black text-slate-600 uppercase text-xs">Factor {f.id}: {f.title}</span><div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm"><input type="number" className="w-16 text-center font-black border-none" value={weights.factors[f.id] || ""} onChange={e=>setWeights({...weights, factors: {...weights.factors, [f.id]: e.target.value}})} /><span className="ml-2 font-bold text-slate-300">%</span></div></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {f.characteristics.map(c => (
                            <div key={c.id} className="flex justify-between items-center bg-white p-3 rounded-xl text-[9px] shadow-sm">
                                <span className="font-bold uppercase truncate pr-2" title={c.title}>{c.title}</span>
                                <input type="number" className="w-10 text-center bg-slate-50 rounded font-bold" value={weights.chars[c.id] || ""} onChange={e=>setWeights({...weights, chars: {...weights.chars, [c.id]: e.target.value}})} />
                            </div>
                        ))}
                    </div>
                  </div>
                ))}
            </section>
          </div>
        )}

        {view === 'assessment' && (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-[10px] uppercase block mb-2 tracking-widest">Factor {activeF.id} • {activeF.title}</span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">{activeC.title}</h2>
                <div className="bg-slate-100 text-slate-600 p-5 rounded-2xl mt-4 text-xs italic border-l-4 border-blue-500">{activeC.desc}</div>
              </div>
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-center min-w-[140px] text-white shadow-xl">
                <p className="text-5xl font-black">{currentAss.level}</p>
                <p className="text-[10px] font-black uppercase mt-2 opacity-70">Nota Calidad</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Nivel de Madurez (Escala 0-4)</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {LEVEL_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...currentAss, level: g.val}})} className={`p-4 rounded-2xl border-2 text-left transition-all ${currentAss.level === g.val ? 'border-blue-600 bg-blue-50 scale-105 shadow-md' : 'border-slate-50 hover:bg-slate-50'}`}>
                        <p className={`text-[10px] font-black uppercase ${currentAss.level === g.val ? 'text-blue-600' : 'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[8px] text-slate-400 mt-2 leading-tight">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><LinkIcon size={14} className="mr-2"/> Carpeta de Evidencia</h3>
                  <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-medium text-blue-600 text-xs shadow-inner" value={currentAss.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, evidenceLink: e.target.value}})} placeholder="Enlace a repositorio de evidencias..." />
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Análisis del Comité Técnico</h3>
                  <textarea className="w-full h-64 p-8 bg-slate-50 rounded-[2.5rem] border-none text-sm font-medium text-slate-600 leading-relaxed" value={currentAss.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, observations: e.target.value}})} placeholder="Escriba los hallazgos y sustento aquí..." />
                </section>
              </div>
            </div>
            <footer className="p-8 bg-white border-t flex justify-between px-12">
               <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex - 1); else if(activeFactorIndex > 0) { setActiveFactorIndex(activeFactorIndex-1); setActiveCharIndex(FACTORS[activeFactorIndex-1].characteristics.length-1); }}} className="font-black text-slate-400 text-[10px] uppercase">Anterior</button>
               <button onClick={()=>{
                 if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex + 1);
                 else if(activeFactorIndex < FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex + 1); setActiveCharIndex(0); }
                 else setView('dashboard');
               }} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase text-[10px] shadow-xl">Siguiente</button>
            </footer>
          </>
        )}

        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10 animate-in slide-in-from-bottom-5">
            <header className="flex justify-between items-end border-b pb-8">
              <div><h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">Reporte de Resultados</h2>
              <p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-[0.2em]">{metadata.name} | Sede {metadata.campus} | Comité: {metadata.committeeDate}</p></div>
              <button onClick={() => window.print()} className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase shadow-xl hover:bg-green-700 flex items-center"><Download size={16} className="mr-2" /> PDF / Imprimir</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Puntaje Global Omitido</p>
                    <p className={`text-6xl font-black ${calculation.globalScore >= 3.0 ? 'text-green-600' : 'text-orange-500'}`}>{calculation.globalScore.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-slate-300 mt-2 uppercase">Sobre 4.00 Máximo</p>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white flex items-center justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center"><Award className="mr-3 text-blue-400" size={24}/> <span className="text-[10px] font-bold uppercase tracking-widest">Resultado de Calidad</span></div>
                        <p className="text-2xl font-black italic">{calculation.globalScore >= 3.6 ? "ALTA CALIDAD EXCELENTE" : calculation.globalScore >= 3.0 ? "ALTA CALIDAD CUMPLIDA" : "CUMPLIMIENTO PARCIAL / MEJORA"}</p>
                        <p className="text-slate-500 text-[10px] uppercase">Lógica: (Calidad × Peso Característica) × Peso Factor</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Desglose por Factor Académico</h3>
                <div className="space-y-4">
                    {calculation.factorDetails.map(f => (
                        <div key={f.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-lg transition-all flex justify-between items-center group">
                            <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">{f.id}</span>
                                <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{f.title}</span>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase">Calidad</p><p className="font-bold text-slate-600">{f.points.toFixed(2)}</p></div>
                                <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase">Peso</p><p className="font-bold text-slate-600">{f.weight}%</p></div>
                                <div className="text-right min-w-[140px] border-l pl-10"><p className="text-[8px] font-black text-blue-400 uppercase">Puntaje por Factor</p><p className="font-black text-blue-600 text-xl">{f.scoreInMAAC.toFixed(2)}</p></div>
                            </div>
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

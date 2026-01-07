import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, ChevronRight, ChevronLeft, 
  BarChart2, X, Sparkles, Loader2, RotateCcw, Link as LinkIcon, FolderOpen, Download, Info, Calendar, MapPin, Award
} from 'lucide-react';

// --- DATA OFICIAL (FACTORES Y CARACTERISTICAS) ---
const INITIAL_FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", characteristics: [{ id: 1, title: "Proyecto educativo" }, { id: 2, title: "Relevancia académica" }] },
  { id: 2, title: "Comunidad de Estudiantes", characteristics: [{ id: 3, title: "Formación integral" }, { id: 4, title: "Acompañamiento" }, { id: 5, title: "Autonomía" }, { id: 6, title: "Políticas académicas" }, { id: 7, title: "Estímulos" }] },
  { id: 3, title: "Comunidad de Profesores", characteristics: [{ id: 8, title: "Selección" }, { id: 9, title: "Estatuto" }, { id: 10, title: "Planta" }, { id: 11, title: "Desarrollo" }, { id: 12, title: "Estímulos" }, { id: 13, title: "Material" }, { id: 14, title: "Evaluación" }] },
  { id: 4, title: "Comunidad de Egresados", characteristics: [{ id: 15, title: "Seguimiento" }, { id: 16, title: "Impacto" }] },
  { id: 5, title: "Aspectos Académicos", characteristics: [{ id: 17, title: "Currículo" }, { id: 18, title: "Pedagogía" }, { id: 19, title: "Evaluación" }, { id: 20, title: "Mejora" }, { id: 21, title: "Resultados" }] },
  { id: 6, title: "Permanencia y Graduación", characteristics: [{ id: 22, title: "Bienestar" }, { id: 23, title: "Alertas" }, { id: 24, title: "Evolución" }] },
  { id: 7, title: "Proyección e Interacción", characteristics: [{ id: 25, title: "Contextos" }, { id: 26, title: "Cooperación" }, { id: 27, title: "Habilidades" }] },
  { id: 8, title: "Investigación e Innovación", characteristics: [{ id: 28, title: "Capacidades" }, { id: 29, title: "Impacto" }, { id: 30, title: "Formación" }] },
  { id: 9, title: "Bienestar de la Comunidad", characteristics: [{ id: 31, title: "Políticas" }, { id: 32, title: "Impacto Integral" }] },
  { id: 10, title: "Recursos Físicos", characteristics: [{ id: 33, title: "Medios" }, { id: 34, title: "Infraestructura" }] },
  { id: 11, title: "Organización y Finanzas", characteristics: [{ id: 35, title: "Liderazgo" }, { id: 36, title: "Sostenibilidad" }] },
  { id: 12, title: "Aseguramiento Calidad", characteristics: [{ id: 37, title: "Autoevaluación" }, { id: 38, title: "Mejora" }] }
];

function App() {
  const [view, setView] = useState('setup'); // 'setup' | 'assessment' | 'dashboard'
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  
  // Datos Básicos
  const [metadata, setMetadata] = useState({
    programName: "", campus: "", registrationDate: "", 
    isAccredited: false, committeeDate: "", assessmentDate: new Date().toISOString().split('T')[0]
  });

  // Ponderaciones (FactorId: Weight)
  const [factorWeights, setFactorWeights] = useState({});
  const [charWeights, setCharWeights] = useState({}); // CharId: Weight
  
  // Evaluaciones
  const [assessments, setAssessments] = useState({});

  // Persistencia
  useEffect(() => {
    const saved = localStorage.getItem('maac_v4_full');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMetadata(parsed.metadata);
      setFactorWeights(parsed.factorWeights);
      setCharWeights(parsed.charWeights);
      setAssessments(parsed.assessments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v4_full', JSON.stringify({ metadata, factorWeights, charWeights, assessments }));
  }, [metadata, factorWeights, charWeights, assessments]);

  // Cálculos de Ponderación
  const sumFactorWeights = useMemo(() => Object.values(factorWeights).reduce((a, b) => a + Number(b), 0), [factorWeights]);

  const activeF = INITIAL_FACTORS[activeFactorIndex];
  const activeC = activeF.characteristics[activeCharIndex];
  const currentAss = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  const handleWeightChange = (id, val, type) => {
    if (type === 'factor') setFactorWeights(prev => ({ ...prev, [id]: val }));
    else setCharWeights(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* NAVEGACIÓN PRINCIPAL */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col p-6 space-y-4">
        <div className="py-4 border-b border-slate-800"><h1 className="text-xl font-black text-blue-500 italic">AUTO-MAAC PRO</h1></div>
        <nav className="flex-1 space-y-2 text-xs font-bold uppercase tracking-widest">
          <button onClick={()=>setView('setup')} className={`w-full p-4 rounded-xl flex items-center ${view === 'setup' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><Settings className="mr-3" size={16}/> Configuración</button>
          <button onClick={()=>setView('assessment')} className={`w-full p-4 rounded-xl flex items-center ${view === 'assessment' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><FileText className="mr-3" size={16}/> Evaluación</button>
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-xl flex items-center ${view === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><BarChart2 className="mr-3" size={16}/> Resultados</button>
        </nav>
        <button onClick={()=>{localStorage.clear(); window.location.reload();}} className="text-red-500 text-[10px] uppercase font-black hover:bg-red-500/10 p-2 rounded-lg">Borrar Todo</button>
      </aside>

      {/* ÁREA DE TRABAJO */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* VISTA 1: CONFIGURACIÓN INICIAL */}
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-white">
            <header>
              <h2 className="text-4xl font-black text-slate-800">Ficha Técnica y Ponderación</h2>
              <p className="text-slate-400 mt-2">Defina los pesos y datos básicos antes de iniciar la autoevaluación.</p>
            </header>

            <section className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center"><Award size={14} className="mr-2"/> Datos del Programa</label>
                <input type="text" placeholder="Nombre del Programa" className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" value={metadata.programName} onChange={e=>setMetadata({...metadata, programName: e.target.value})} />
                <div className="flex gap-4">
                  <input type="text" placeholder="Sede" className="flex-1 p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} />
                  <input type="date" className="flex-1 p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" value={metadata.registrationDate} onChange={e=>setMetadata({...metadata, registrationDate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center"><Calendar size={14} className="mr-2"/> Fechas de Comité</label>
                <input type="date" placeholder="Fecha Comité de Ponderación" className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} />
                <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm">
                   <input type="checkbox" id="acc" className="mr-4 h-5 w-5" checked={metadata.isAccredited} onChange={e=>setMetadata({...metadata, isAccredited: e.target.checked})} />
                   <label htmlFor="acc" className="text-sm font-bold text-slate-600">¿Programa con Acreditación Vigente?</label>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-black">Ponderación de Factores</h3>
                <div className={`px-4 py-2 rounded-full font-black text-xs ${sumFactorWeights === 100 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  Suma Total: {sumFactorWeights}% / 100%
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {INITIAL_FACTORS.map(f => (
                  <div key={f.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-500 truncate mr-2">F{f.id}. {f.title}</span>
                    <input type="number" className="w-20 p-2 rounded-xl text-center font-black bg-white border-none shadow-sm focus:ring-2 focus:ring-blue-500" value={factorWeights[f.id] || ""} onChange={e=>handleWeightChange(f.id, e.target.value, 'factor')} placeholder="%" />
                  </div>
                ))}
              </div>
            </section>

            <footer className="flex justify-end pt-10">
              <button 
                disabled={sumFactorWeights !== 100}
                onClick={()=>setView('assessment')}
                className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                Guardar y Empezar Autoevaluación
              </button>
            </footer>
          </div>
        )}

        {/* VISTA 2: EVALUACIÓN (Lo que ya teníamos mejorado) */}
        {view === 'assessment' && (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div>
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block">Evaluación Directa • Factor {activeF.id}</span>
                <h2 className="text-3xl font-black text-slate-800">{activeC.title}</h2>
              </div>
              <div className="flex gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-2xl border min-w-[100px]">
                  <p className="text-2xl font-black text-slate-800">{factorWeights[activeF.id] || 0}%</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase">Peso Factor</p>
                </div>
                <div className="text-center p-4 bg-blue-600 rounded-2xl text-white min-w-[100px]">
                  <p className="text-2xl font-black">{currentAss.level * 25}%</p>
                  <p className="text-[8px] font-black text-blue-200 uppercase">Calidad</p>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-12 space-y-8 bg-slate-50">
              <div className="max-w-4xl mx-auto space-y-8">
                 {/* Selector de Nivel */}
                 <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Grado de Cumplimiento (0-4)</h3>
                    <div className="flex gap-4">
                      {[0,1,2,3,4].map(n => (
                        <button key={n} onClick={()=>setAssessments({...assessments, [activeC.id]: {...currentAss, level: n}})} className={`flex-1 py-6 rounded-2xl border-2 font-black transition-all ${currentAss.level === n ? 'border-blue-600 bg-blue-50 text-blue-600 scale-105 shadow-md' : 'border-slate-50 text-slate-200 hover:border-slate-200'}`}>{n}</button>
                      ))}
                    </div>
                 </div>

                 {/* Link Evidencias */}
                 <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center"><LinkIcon size={14} className="mr-2"/> URL de Evidencia Específica</h3>
                    <input type="text" placeholder="Pegue el link del repositorio aquí..." className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-medium text-xs text-blue-600" value={currentAss.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, evidenceLink: e.target.value}})} />
                 </div>

                 {/* Hallazgos */}
                 <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Análisis Cualitativo del Comité</h3>
                    <textarea className="w-full h-64 p-8 bg-slate-50 rounded-[2rem] border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-600" placeholder="Escriba el sustento de la evaluación..." value={currentAss.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, observations: e.target.value}})} />
                 </div>
              </div>
            </div>

            <footer className="p-8 bg-white border-t flex justify-between">
               <button onClick={()=>setActiveCharIndex(Math.max(0, activeCharIndex-1))} className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-6 py-2 hover:text-slate-800">Anterior</button>
               <button onClick={()=>{
                 if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex + 1);
                 else if(activeFactorIndex < INITIAL_FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex + 1); setActiveCharIndex(0); }
                 else setView('dashboard');
               }} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-blue-700">Siguiente Característica</button>
            </footer>
          </>
        )}

        {/* VISTA 3: RESULTADOS (Ponderación x Calidad) */}
        {view === 'dashboard' && (
           <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50">
              <header className="flex justify-between items-center">
                 <div>
                   <h2 className="text-4xl font-black text-slate-800">Resultados Ponderados</h2>
                   <p className="text-slate-400 mt-2">{metadata.programName} • Comité: {metadata.committeeDate}</p>
                 </div>
                 <button onClick={()=>{}} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-green-700">Exportar Informe Técnico</button>
              </header>

              <div className="grid grid-cols-1 gap-4">
                 {INITIAL_FACTORS.map(f => {
                   let factorCalidadTotal = 0;
                   f.characteristics.forEach(c => {
                     const ass = assessments[c.id];
                     if(ass) factorCalidadTotal += (ass.level * 25);
                   });
                   const avgCalidad = factorCalidadTotal / f.characteristics.length;
                   const peso = Number(factorWeights[f.id] || 0);
                   const impactoReal = (avgCalidad * peso) / 100;

                   return (
                     <div key={f.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Factor {f.id}</span>
                          <h4 className="text-lg font-bold text-slate-700">{f.title}</h4>
                        </div>
                        <div className="flex gap-8 items-center">
                           <div className="text-center">
                              <p className="text-xs font-black text-slate-400 uppercase">Peso</p>
                              <p className="font-bold">{peso}%</p>
                           </div>
                           <div className="text-center">
                              <p className="text-xs font-black text-slate-400 uppercase">Calidad</p>
                              <p className="font-bold text-blue-600">{avgCalidad.toFixed(1)}%</p>
                           </div>
                           <div className="text-center bg-blue-50 p-4 rounded-2xl min-w-[100px]">
                              <p className="text-[10px] font-black text-blue-400 uppercase">Impacto Final</p>
                              <p className="text-xl font-black text-blue-600">{impactoReal.toFixed(2)} pts</p>
                           </div>
                        </div>
                     </div>
                   )
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

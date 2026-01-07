import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, ChevronRight, ChevronLeft, 
  BarChart2, X, Sparkles, Loader2, RotateCcw, Link as LinkIcon, FolderOpen, Download, Info, Calendar, MapPin, Award, CheckCircle2
} from 'lucide-react';

// --- BASE DE DATOS COMPLETA ---
const INITIAL_FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", description: "Referentes filosóficos y organizacionales.", characteristics: [{ id: 1, title: "Proyecto educativo", desc: "Coherencia con la misión." }, { id: 2, title: "Relevancia y pertinencia", desc: "Impacto social." }] },
  { id: 2, title: "Comunidad de Estudiantes", description: "Desarrollo integral y permanencia.", characteristics: [{ id: 3, title: "Formación integral" }, { id: 4, title: "Acompañamiento" }, { id: 5, title: "Autonomía" }, { id: 6, title: "Políticas académicas" }, { id: 7, title: "Estímulos" }] },
  { id: 3, title: "Comunidad de Profesores", description: "Calidad y desarrollo docente.", characteristics: [{ id: 8, title: "Selección" }, { id: 9, title: "Estatuto" }, { id: 10, title: "Planta" }, { id: 11, title: "Desarrollo" }, { id: 12, title: "Estímulos" }, { id: 13, title: "Material" }, { id: 14, title: "Evaluación" }] },
  { id: 4, title: "Comunidad de Egresados", description: "Seguimiento e impacto.", characteristics: [{ id: 15, title: "Seguimiento" }, { id: 16, title: "Impacto" }] },
  { id: 5, title: "Aspectos Académicos", description: "Currículo y pedagogía.", characteristics: [{ id: 17, title: "Gestión curricular" }, { id: 18, title: "Pedagogía" }, { id: 19, title: "Evaluación" }, { id: 20, title: "Mejora" }, { id: 21, title: "Resultados" }] },
  { id: 6, title: "Permanencia y Graduación", description: "Estrategias contra la deserción.", characteristics: [{ id: 22, title: "Bienestar" }, { id: 23, title: "Alertas" }, { id: 24, title: "Evolución" }] },
  { id: 7, title: "Proyección e Interacción", description: "Relacionamiento externo.", characteristics: [{ id: 25, title: "Contextos" }, { id: 26, title: "Cooperación" }, { id: 27, title: "Habilidades" }] },
  { id: 8, title: "Investigación e Innovación", description: "Ciencia y tecnología.", characteristics: [{ id: 28, title: "Capacidades" }, { id: 29, title: "Impacto" }, { id: 30, title: "Formación" }] },
  { id: 9, title: "Bienestar de la Comunidad", description: "Desarrollo humano.", characteristics: [{ id: 31, title: "Políticas" }, { id: 32, title: "Impacto Integral" }] },
  { id: 10, title: "Recursos Físicos", description: "Infraestructura.", characteristics: [{ id: 33, title: "Medios" }, { id: 34, title: "Infraestructura" }] },
  { id: 11, title: "Organización y Finanzas", description: "Gestión y sostenibilidad.", characteristics: [{ id: 35, title: "Liderazgo" }, { id: 36, title: "Sostenibilidad" }] },
  { id: 12, title: "Aseguramiento Calidad", description: "Autoevaluación.", characteristics: [{ id: 37, title: "Autoevaluación" }, { id: 38, title: "Mejora" }] }
];

const MATURITY_GUIDE = [
  { val: 0, label: "Inexistencia", color: "text-red-600", desc: "Sin evidencias." },
  { val: 1, label: "Existencia", color: "text-orange-600", desc: "Solo documento." },
  { val: 2, label: "Despliegue", color: "text-yellow-700", desc: "En aplicación." },
  { val: 3, label: "Impacto", color: "text-green-700", desc: "Resultados probados." },
  { val: 4, label: "Mejora Continua", color: "text-blue-700", desc: "Cultura de mejora." }
];

function App() {
  const [view, setView] = useState('setup'); 
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  // Ficha Técnica Ampliada
  const [metadata, setMetadata] = useState({
    programName: "", campus: "", regDate: "", committeeDate: "", 
    assessmentDate: new Date().toISOString().split('T')[0], isAccredited: false
  });

  // Ponderaciones
  const [weights, setWeights] = useState({ factors: {}, chars: {} });
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('maac_v5_pro');
    if (saved) {
      const p = JSON.parse(saved);
      setMetadata(p.metadata); setWeights(p.weights); setAssessments(p.assessments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v5_pro', JSON.stringify({ metadata, weights, assessments }));
  }, [metadata, weights, assessments]);

  // Validaciones de Ponderación
  const factorSum = useMemo(() => Object.values(weights.factors).reduce((a, b) => a + Number(b), 0), [weights.factors]);
  
  const checkCharSum = (fId) => {
    const chars = INITIAL_FACTORS.find(f => f.id === fId).characteristics;
    const sum = chars.reduce((acc, c) => acc + Number(weights.chars[c.id] || 0), 0);
    return sum === 100;
  };

  const allValid = factorSum === 100 && INITIAL_FACTORS.every(f => checkCharSum(f.id));

  const activeF = INITIAL_FACTORS[activeFactorIndex];
  const activeC = activeF.characteristics[activeCharIndex];
  const currentAss = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden text-sm">
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-2xl">
        <div className="py-4 border-b border-slate-800"><h1 className="text-2xl font-black text-blue-500 italic">AUTO-MAAC PRO</h1></div>
        <nav className="flex-1 overflow-y-auto space-y-2">
          <button onClick={()=>setView('setup')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'setup' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><Settings className="mr-3" size={18}/> 1. Configuración</button>
          <button onClick={()=>setView('assessment')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'assessment' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><FileText className="mr-3" size={18}/> 2. Evaluación</button>
          <button onClick={()=>setView('dashboard')} className={`w-full p-4 rounded-2xl flex items-center font-bold ${view === 'dashboard' ? 'bg-blue-600' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart2 className="mr-3" size={18}/> 3. Resultados</button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 bg-white space-y-12">
            <header><h2 className="text-4xl font-black text-slate-800">Ficha Técnica y Ponderación</h2></header>
            
            <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400">Información del Programa</label>
                <input type="text" placeholder="Nombre del Programa" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.programName} onChange={e=>setMetadata({...metadata, programName: e.target.value})} />
                <input type="text" placeholder="Sede / Municipio" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} />
                <input type="date" title="Fecha Registro Calificado" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.regDate} onChange={e=>setMetadata({...metadata, regDate: e.target.value})} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400">Fechas de Gestión</label>
                <input type="date" title="Fecha Comité Ponderación" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} />
                <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center"><input type="checkbox" id="ac" className="mr-3 h-5 w-5" checked={metadata.isAccredited} onChange={e=>setMetadata({...metadata, isAccredited: e.target.checked})} /><label htmlFor="ac" className="font-bold">Acreditado actualmente</label></div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black">Ponderaciones Obligatorias (Suma 100%)</h3><div className={`px-4 py-2 rounded-full font-black ${factorSum === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>Factores: {factorSum}%</div></div>
              
              {INITIAL_FACTORS.map(f => (
                <div key={f.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-black uppercase text-slate-500">Factor {f.id}: {f.title}</span>
                    <div className="flex items-center">
                      <input type="number" className="w-20 p-2 rounded-xl text-center font-black border-none shadow-inner" placeholder="%" value={weights.factors[f.id] || ""} onChange={e=>setWeights({...weights, factors: {...weights.factors, [f.id]: e.target.value}})} />
                      <span className="ml-2 font-bold">%</span>
                      {checkCharSum(f.id) ? <CheckCircle2 className="ml-4 text-green-500" size={20}/> : <AlertCircle className="ml-4 text-red-400" size={20}/>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {f.characteristics.map(c => (
                      <div key={c.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase truncate w-48">{c.title}</span>
                        <input type="number" className="w-16 p-1 text-center bg-slate-100 rounded-lg font-bold border-none" value={weights.chars[c.id] || ""} onChange={e=>setWeights({...weights, chars: {...weights.chars, [c.id]: e.target.value}})} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <footer className="flex justify-end pb-10"><button disabled={!allValid} onClick={()=>setView('assessment')} className="px-16 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl disabled:opacity-20 transition-all">Empezar Evaluación</button></footer>
          </div>
        )}

        {view === 'assessment' && (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-center">
              <div><h2 className="text-3xl font-black text-slate-800 tracking-tight">{activeC.title}</h2><p className="text-slate-400 font-medium italic mt-1">{activeF.title}</p></div>
              <div className="text-right bg-blue-50 p-6 rounded-3xl border-2 border-blue-100"><p className="text-4xl font-black text-blue-600">{currentAss.level * 25}%</p><p className="text-[10px] font-black uppercase text-blue-300">Calidad</p></div>
            </header>

            <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Grado de Madurez</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {MATURITY_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...currentAss, level: g.val}})} className={`p-4 rounded-2xl border-2 text-left transition-all ${currentAss.level === g.val ? 'border-blue-600 bg-blue-50 scale-105' : 'border-slate-50'}`}>
                        <p className={`text-[10px] font-black uppercase ${g.color}`}>{g.label}</p>
                        <p className="text-[9px] text-slate-400 mt-2">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center"><LinkIcon size={14} className="mr-2"/> Carpeta de Evidencia</h3>
                  <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-medium text-blue-600" value={currentAss.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, evidenceLink: e.target.value}})} placeholder="Link a evidencias..." />
                </section>
                <textarea className="w-full h-64 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" value={currentAss.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, observations: e.target.value}})} placeholder="Escriba los hallazgos aquí..." />
              </div>
            </div>

            <footer className="p-8 bg-white border-t flex justify-between">
              <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex-1); else if(activeFactorIndex > 0) { setActiveFactorIndex(activeFactorIndex-1); setActiveCharIndex(INITIAL_FACTORS[activeFactorIndex-1].characteristics.length-1); }}} className="font-black text-slate-400 uppercase tracking-widest text-xs px-10">Anterior</button>
              <button onClick={()=>{
                if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex+1);
                else if(activeFactorIndex < INITIAL_FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex+1); setActiveCharIndex(0); }
                else setView('dashboard');
              }} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg">Siguiente</button>
            </footer>
          </>
        )}

        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-8">
            <h2 className="text-4xl font-black text-slate-800">Cierre Ponderado</h2>
            {INITIAL_FACTORS.map(f => {
              let factorPoints = 0;
              f.characteristics.forEach(c => {
                const ass = assessments[c.id];
                const charWeight = Number(weights.chars[c.id] || 0);
                if(ass) factorPoints += (ass.level * 25) * (charWeight / 100);
              });
              const factorWeight = Number(weights.factors[f.id] || 0);
              const finalPoints = (factorPoints * factorWeight) / 100;

              return (
                <div key={f.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex justify-between items-center group hover:shadow-xl transition-all">
                  <div className="flex-1"><span className="text-[10px] font-black text-slate-300 uppercase">Factor {f.id}</span><h4 className="text-xl font-black text-slate-700 uppercase tracking-tight">{f.title}</h4></div>
                  <div className="flex gap-10 items-center">
                    <div className="text-center"><p className="text-[9px] font-black text-slate-400 uppercase">Peso Factor</p><p className="font-black">{factorWeight}%</p></div>
                    <div className="text-center bg-blue-50 px-8 py-4 rounded-3xl"><p className="text-[9px] font-black text-blue-400 uppercase">Puntos Finales</p><p className="text-2xl font-black text-blue-600">{finalPoints.toFixed(2)} pts</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

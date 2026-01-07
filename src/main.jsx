import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BookOpen, Users, UserCheck, GraduationCap, FileText, 
  TrendingUp, Globe, Lightbulb, Heart, Monitor, 
  Settings, ShieldCheck, ChevronRight, ChevronLeft, 
  BarChart2, X, Sparkles, Loader2, RotateCcw, Link as LinkIcon, FolderOpen, Download, Info, Calendar, MapPin, Award, CheckCircle2, AlertTriangle, TrendingDown
} from 'lucide-react';

// --- DATA OFICIAL (FACTORES Y CARACTERÍSTICAS) ---
const FACTORS = [
  { id: 1, title: "Proyecto Educativo e Identidad", icon: BookOpen, description: "Referentes filosóficos y organizacionales.", characteristics: [{ id: 1, title: "Proyecto educativo", desc: "Coherencia con la misión." }, { id: 2, title: "Relevancia y pertinencia", desc: "Impacto social." }] },
  { id: 2, title: "Comunidad de Estudiantes", icon: Users, description: "Desarrollo integral y permanencia.", characteristics: [{ id: 3, title: "Formación integral" }, { id: 4, title: "Acompañamiento" }, { id: 5, title: "Autonomía" }, { id: 6, title: "Políticas académicas" }, { id: 7, title: "Estímulos" }] },
  { id: 3, title: "Comunidad de Profesores", icon: UserCheck, description: "Calidad y desarrollo docente.", characteristics: [{ id: 8, title: "Selección" }, { id: 9, title: "Estatuto" }, { id: 10, title: "Planta" }, { id: 11, title: "Desarrollo" }, { id: 12, title: "Estímulos" }, { id: 13, title: "Material" }, { id: 14, title: "Evaluación" }] },
  { id: 4, title: "Comunidad de Egresados", icon: GraduationCap, description: "Seguimiento e impacto.", characteristics: [{ id: 15, title: "Seguimiento" }, { id: 16, title: "Impacto" }] },
  { id: 5, title: "Aspectos Académicos", icon: FileText, description: "Currículo y pedagogía.", characteristics: [{ id: 17, title: "Gestión curricular" }, { id: 18, title: "Pedagogía" }, { id: 19, title: "Evaluación" }, { id: 20, title: "Mejora" }, { id: 21, title: "Resultados" }] },
  { id: 6, title: "Permanencia y Graduación", icon: TrendingUp, description: "Estrategias contra la deserción.", characteristics: [{ id: 22, title: "Bienestar" }, { id: 23, title: "Alertas" }, { id: 24, title: "Evolución" }] },
  { id: 7, title: "Proyección e Interacción", icon: Globe, description: "Relacionamiento externo.", characteristics: [{ id: 25, title: "Contextos" }, { id: 26, title: "Cooperación" }, { id: 27, title: "Habilidades" }] },
  { id: 8, title: "Investigación e Innovación", icon: Lightbulb, description: "Ciencia y tecnología.", characteristics: [{ id: 28, title: "Capacidades" }, { id: 29, title: "Impacto" }, { id: 30, title: "Formación" }] },
  { id: 9, title: "Bienestar de la Comunidad", icon: Heart, description: "Desarrollo humano.", characteristics: [{ id: 31, title: "Políticas" }, { id: 32, title: "Impacto Integral" }] },
  { id: 10, title: "Recursos Físicos", icon: Monitor, description: "Infraestructura.", characteristics: [{ id: 33, title: "Medios" }, { id: 34, title: "Infraestructura" }] },
  { id: 11, title: "Organización y Finanzas", icon: Settings, description: "Gestión y sostenibilidad.", characteristics: [{ id: 35, title: "Liderazgo" }, { id: 36, title: "Sostenibilidad" }] },
  { id: 12, title: "Aseguramiento Calidad", icon: ShieldCheck, description: "Autoevaluación.", characteristics: [{ id: 37, title: "Autoevaluación" }, { id: 38, title: "Mejora" }] }
];

const LEVEL_GUIDE = [
  { val: 0, label: "Inexistencia", desc: "Sin evidencias." },
  { val: 1, label: "Existencia", desc: "Solo documento." },
  { val: 2, label: "Despliegue", desc: "En aplicación." },
  { val: 3, label: "Impacto", desc: "Resultados probados." },
  { val: 4, label: "Mejora Continua", desc: "Cultura de mejora." }
];

function App() {
  const [view, setView] = useState('setup'); 
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  const [metadata, setMetadata] = useState({
    name: "", campus: "", regDate: "", committeeDate: "", 
    isAccredited: false, assessmentDate: new Date().toISOString().split('T')[0]
  });

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

  const factorSum = useMemo(() => Object.values(weights.factors).reduce((a, b) => a + Number(b), 0), [weights.factors]);
  
  // Lógica de cálculo del Reporte Final
  const finalResults = useMemo(() => {
    let globalScore = 0;
    const details = FACTORS.map(f => {
      let fCalidadPoints = 0;
      let charsEvaluated = 0;
      f.characteristics.forEach(c => {
        const ass = assessments[c.id];
        const cW = Number(weights.chars[c.id] || 0);
        if (ass) {
          // Cada nivel vale 1 punto (0 a 4)
          fCalidadPoints += (ass.level * (cW / 100));
          charsEvaluated++;
        }
      });
      const fW = Number(weights.factors[f.id] || 0);
      const scoreFactor = (fCalidadPoints * fW) / 100;
      globalScore += scoreFactor;
      return { ...f, score: scoreFactor, maxPossible: (4 * fW) / 100, qualityAvg: fCalidadPoints };
    });
    return { globalScore, details };
  }, [assessments, weights]);

  const activeF = FACTORS[activeFactorIndex];
  const activeC = activeF.characteristics[activeCharIndex];
  const currentAss = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  const handleExport = () => {
    let report = `INFORME FINAL DE AUTOEVALUACIÓN MAAC\n`;
    report += `PROGRAMA: ${metadata.name.toUpperCase()}\n`;
    report += `PUNTAJE GLOBAL OBTENIDO: ${finalResults.globalScore.toFixed(2)} / 4.00\n`;
    report += `${"=".repeat(50)}\n\n`;
    finalResults.details.forEach(f => {
        report += `FACTOR ${f.id}: ${f.title}\n`;
        report += `  Puntaje: ${f.score.toFixed(2)} (Peso: ${weights.factors[f.id]}%)\n\n`;
    });
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Final_MAAC.txt`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden text-sm">
      {/* SIDEBAR */}
      <aside className="w-80 bg-slate-900 text-white flex flex-col p-6 space-y-4 shadow-2xl">
        <div className="py-4 border-b border-slate-800 text-center">
          <h1 className="text-2xl font-black text-blue-500 italic">AUTO-MAAC</h1>
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
      </aside>

      {/* ÁREA DE TRABAJO */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* VISTA 1: CONFIGURACIÓN (Ficha Técnica y Ponderación) */}
        {view === 'setup' && (
          <div className="flex-1 overflow-y-auto p-12 bg-white space-y-12 animate-in fade-in">
            <header className="flex justify-between items-center"><h2 className="text-4xl font-black text-slate-800 tracking-tight">Ficha Técnica y Ponderación</h2></header>
            <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <input type="text" placeholder="Nombre del Programa" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.name} onChange={e=>setMetadata({...metadata, name: e.target.value})} />
                <input type="text" placeholder="Sede" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.campus} onChange={e=>setMetadata({...metadata, campus: e.target.value})} />
                <input type="date" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.regDate} onChange={e=>setMetadata({...metadata, regDate: e.target.value})} title="Fecha Registro Calificado" />
              </div>
              <div className="space-y-4">
                <input type="date" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.committeeDate} onChange={e=>setMetadata({...metadata, committeeDate: e.target.value})} title="Fecha Comité de Ponderación" />
                <input type="date" className="w-full p-4 rounded-2xl border-none shadow-sm" value={metadata.assessmentDate} onChange={e=>setMetadata({...metadata, assessmentDate: e.target.value})} title="Fecha Autoevaluación" />
                <div className="p-5 bg-white rounded-2xl shadow-sm flex items-center mt-4"><input type="checkbox" id="ac" className="mr-3 h-5 w-5" checked={metadata.isAccredited} onChange={e=>setMetadata({...metadata, isAccredited: e.target.checked})} /><label htmlFor="ac" className="font-bold text-slate-500">¿Programa Acreditado?</label></div>
              </div>
            </section>
            <section className="space-y-8">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black">Pesos por Factor</h3><div className={`px-6 py-2 rounded-full font-black text-xs ${factorSum === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>Total: {factorSum}%</div></div>
              <div className="grid grid-cols-3 gap-4">
                {FACTORS.map(f => (
                  <div key={f.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                    <span className="font-black text-[10px] text-slate-500 uppercase">{f.title}</span>
                    <input type="number" className="w-full p-3 rounded-xl text-center font-black" value={weights.factors[f.id] || ""} onChange={e=>setWeights({...weights, factors: {...weights.factors, [f.id]: e.target.value}})} placeholder="%" />
                    <div className="grid grid-cols-1 gap-2">
                        {f.characteristics.map(c => (
                            <div key={c.id} className="flex justify-between items-center text-[9px] bg-white p-2 rounded-lg">
                                <span className="truncate w-32 uppercase font-bold">{c.title}</span>
                                <input type="number" className="w-10 text-center bg-slate-50 rounded" value={weights.chars[c.id] || ""} onChange={e=>setWeights({...weights, chars: {...weights.chars, [c.id]: e.target.value}})} />
                            </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VISTA 2: EVALUACIÓN (Se mantiene igual para no perder funcionalidad) */}
        {view === 'assessment' && (
          <>
            <header className="p-10 bg-white border-b flex justify-between items-end">
              <div className="max-w-xl">
                <span className="text-blue-600 font-black text-[10px] uppercase block mb-2 tracking-widest">Factor {activeF.id} • {activeF.title}</span>
                <h2 className="text-3xl font-black text-slate-800">{activeC.title}</h2>
                <p className="text-slate-400 italic mt-2">{activeC.desc}</p>
              </div>
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-center min-w-[140px] text-white shadow-xl">
                <p className="text-5xl font-black">{currentAss.level * 25}%</p>
                <p className="text-[10px] font-black uppercase mt-2 opacity-70 tracking-widest">Calidad</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Grado de Madurez</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {LEVEL_GUIDE.map(g => (
                      <button key={g.val} onClick={()=>setAssessments({...assessments, [activeC.id]: {...currentAss, level: g.val}})} className={`p-4 rounded-2xl border-2 text-left transition-all ${currentAss.level === g.val ? 'border-blue-600 bg-blue-50 scale-105 shadow-md' : 'border-slate-50'}`}>
                        <p className={`text-[10px] font-black uppercase ${currentAss.level === g.val ? 'text-blue-600' : 'text-slate-300'}`}>{g.label}</p>
                        <p className="text-[8px] text-slate-400 mt-2 leading-tight">{g.desc}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><LinkIcon size={14} className="mr-2"/> Carpeta de Evidencia</h3>
                  <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-medium text-blue-600 text-xs shadow-inner" value={currentAss.evidenceLink} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, evidenceLink: e.target.value}})} placeholder="Link Drive/SharePoint..." />
                </section>
                <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Análisis del Comité</h3>
                  <textarea className="w-full h-64 p-8 bg-slate-50 rounded-[2.5rem] border-none text-sm font-medium text-slate-600 leading-relaxed" value={currentAss.observations} onChange={e=>setAssessments({...assessments, [activeC.id]: {...currentAss, observations: e.target.value}})} placeholder="Escriba los hallazgos encontrados..." />
                </section>
              </div>
            </div>
            <footer className="p-8 bg-white border-t flex justify-between px-12">
               <button onClick={()=>{ if(activeCharIndex > 0) setActiveCharIndex(activeCharIndex - 1); }} className="font-black text-slate-400 text-[10px] uppercase tracking-widest hover:text-slate-800 transition-colors">Anterior</button>
               <button onClick={()=>{
                 if(activeCharIndex < activeF.characteristics.length - 1) setActiveCharIndex(activeCharIndex + 1);
                 else if(activeFactorIndex < FACTORS.length - 1) { setActiveFactorIndex(activeFactorIndex + 1); setActiveCharIndex(0); }
                 else setView('dashboard');
               }} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all">Siguiente Característica</button>
            </footer>
          </>
        )}

        {/* VISTA 3: REPORTE DE RESULTADOS (Nueva Interfaz) */}
        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10 animate-in slide-in-from-bottom-5">
            <header className="flex justify-between items-end border-b pb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Reporte de Resultados</h2>
                <p className="text-slate-400 font-bold uppercase text-[11px] mt-2 tracking-[0.2em]">{metadata.name} | Sede {metadata.campus} | Comité: {metadata.committeeDate}</p>
              </div>
              <button onClick={handleExport} className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-green-700 flex items-center">
                <Download size={16} className="mr-2" /> Descargar Acta Técnica
              </button>
            </header>

            {/* PUNTAJE GLOBAL CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cumplimiento Global</p>
                    <p className={`text-6xl font-black ${finalResults.globalScore >= 3.0 ? 'text-green-600' : 'text-orange-500'}`}>{finalResults.globalScore.toFixed(2)}</p>
                    <p className="text-xs font-bold text-slate-300 mt-2">Sobre un máximo de 4.00</p>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white flex items-center justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center"><TrendingUp className="mr-3 text-blue-400" size={24}/> <span className="text-sm font-bold uppercase tracking-widest">Estado del Programa</span></div>
                        <p className="text-2xl font-black">
                            {finalResults.globalScore >= 3.6 ? "ALTA CALIDAD EXCELENTE" : 
                             finalResults.globalScore >= 3.0 ? "ALTA CALIDAD CUMPLIDA" : "REQUIERE MEJORAS URGENTES"}
                        </p>
                        <p className="text-slate-400 text-xs italic">Basado en ponderación del comité técnico institucional.</p>
                    </div>
                    <div className="text-right">
                        <Award size={80} className="text-blue-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* TABLA DE DETALLES POR FACTOR */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center"><ShieldCheck className="mr-2 text-blue-600" /> Desglose por Factores Académicos</h3>
                <div className="space-y-4">
                    {finalResults.details.map(f => {
                        const scorePerc = (f.score / f.maxPossible) * 100;
                        return (
                            <div key={f.id} className="p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100 group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black mr-4">{f.id}</span>
                                        <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{f.title}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Aporte al MAAC</p>
                                            <p className="font-black text-blue-600">{f.score.toFixed(2)} pts</p>
                                        </div>
                                        {scorePerc >= 75 ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-orange-400" />}
                                    </div>
                                </div>
                                {/* BARRA DE PROGRESO INTERNA */}
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${scorePerc >= 75 ? 'bg-green-500' : scorePerc >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${scorePerc}%`}} />
                                </div>
                            </div>
                        )
                    })}
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

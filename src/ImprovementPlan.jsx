import React from 'react';
import { Download, Lightbulb } from 'lucide-react';

export const ImprovementPlanView = ({ metadata, calculation }) => {
  const exportToCSV = () => {
    let csv = "FACTOR;INICIATIVA DE MEJORA;ANO;RESULTADO ESPERADO;INDICADOR;TIPO INVERSION\n";
    calculation.details.forEach(f => {
      if(f.avg < 3.0) {
        f.steps.forEach(s => {
          csv += `${f.title};${f.improvement};${s.year};${s.res};${s.ind};${s.cost}\n`;
        });
      }
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Plan_Mejora_${metadata.name || 'Programa'}.csv`;
    link.click();
  };

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-slate-50 space-y-10 animate-in slide-in-from-bottom-5">
      <header className="flex justify-between items-center border-b pb-8">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800">Plan de Mejora Sugerido</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] mt-2">Propuesta estratégica basada en GAPs identificados</p>
        </div>
        <button onClick={exportToCSV} className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase shadow-xl flex items-center hover:bg-green-700">
          <Download size={14} className="mr-2"/> Exportar a Excel (Google Sheets)
        </button>
      </header>

      <div className="space-y-10">
        {calculation.details.filter(f => f.avg < 3.0).map(f => (
          <div key={f.id} className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase text-xs">Iniciativa: {f.improvement}</h3>
              <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full font-black text-[10px]">GAP: {(4-f.avg).toFixed(1)}</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              {f.steps.map(s => (
                <div key={s.year} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                  <p className="font-black text-blue-600 text-xs tracking-widest">AÑO {s.year}</p>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Resultado esperado</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight mt-1">{s.res}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Indicador de logro</p>
                    <p className="text-[10px] italic text-slate-500 mt-1">{s.ind}</p>
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{s.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

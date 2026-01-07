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

function App() {
  const [view, setView] = useState('assessment');
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  
  // Estados de datos
  const [assessments, setAssessments] = useState({});
  const [factorWeights, setFactorWeights] = useState({}); // Nuevo: Ponderaciones
  const [programConfig, setProgramConfig] = useState({ name: "", rootFolder: "" });

  // Persistencia de datos
  useEffect(() => {
    const d = localStorage.getItem('maac_v4_data');
    const c = localStorage.getItem('maac_v4_conf');
    const w = localStorage.getItem('maac_v4_weights');
    if (d) setAssessments(JSON.parse(d));
    if (c) setProgramConfig(JSON.parse(c));
    if (w) setFactorWeights(JSON.parse(w));
  }, []);

  useEffect(() => {
    localStorage.setItem('maac_v4_data', JSON.stringify(assessments));
    localStorage.setItem('maac_v4_conf', JSON.stringify(programConfig));
    localStorage.setItem('maac_v4_weights', JSON.stringify(factorWeights));
  }, [assessments, programConfig, factorWeights]);

  const activeF = FACTORS[activeFactorIndex], activeC = activeF.characteristics[activeCharIndex];
  const current = assessments[activeC.id] || { level: 0, observations: "", evidenceLink: "" };

  // Cálculo de suma de pesos para validación
  const totalWeight = useMemo(() => {
    return Object.values(factorWeights).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [factorWeights]);

  const handleReset = () => {
    if (window.confirm("¿Deseas reiniciar toda la evaluación?")) {
      setAssessments({});
      setProgramConfig({name:"", rootFolder:""});
      setFactorWeights({});
      localStorage.clear();
    }
  };

  const handleExport = () => {
    let report = `REPORTE MAAC - ${programConfig.name || "PROGRAMA NO DEFINIDO"}\n`;
    report += `Link Raíz: ${programConfig

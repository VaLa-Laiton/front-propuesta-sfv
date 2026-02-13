import React, { useState } from 'react';
import { solarService } from './api/solarService';

// Importación de Componentes
import InputForm from './components/form/InputForm';
import ScenarioSelector from './components/results/ScenarioSelector';
import ResultsDashboard from './components/results/ResultsDashboard';

// Iconos y Assets
import { LayoutDashboard, RefreshCcw, AlertCircle } from 'lucide-react';
// import logo from './assets/logo.png'; // Descomenta si tienes un logo real

function App() {
  // --- Estados de la Aplicación ---

  // 0: Formulario, 1: Selección (si aplica), 2: Resultados
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos
  const [inputs, setInputs] = useState(null); // Lo que escribió el usuario
  const [apiResponse, setApiResponse] = useState(null); // Lo que respondió el backend
  const [selectedScenario, setSelectedScenario] = useState(null); // El escenario "ganador"

  // --- Lógica del Negocio ---

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setInputs(formData);

    try {
      // 1. Llamada a la API
      const data = await solarService.calculateViability(formData);
      setApiResponse(data);

      // 2. Lógica de Decisión
      if (data.escenario_usuario) {
        // Si existe un escenario de usuario (tarifa forzada), vamos al paso de selección
        setCurrentStep(1);
        // Scrollear al inicio suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Si es automático, seleccionamos el automático y vamos directo al dashboard
        setSelectedScenario(data.escenario_automatico);
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioSelection = (selectionId) => {
    // selectionId puede ser 'auto' o 'user'
    if (selectionId === 'auto') {
      setSelectedScenario(apiResponse.escenario_automatico);
    } else {
      setSelectedScenario(apiResponse.escenario_usuario);
    }
    setCurrentStep(2); // Avanzar al Dashboard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    // Volver al estado inicial
    setInputs(null);
    setApiResponse(null);
    setSelectedScenario(null);
    setCurrentStep(0);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Renderizado de la Vista ---

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

      {/* Header Global */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <img src={logo} alt="Logo" className="h-8 w-auto" /> */}
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800 hidden sm:block">
              Solar<span className="text-blue-600">Viability</span>
            </h1>
          </div>

          {currentStep > 0 && (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Nueva Cotización
            </button>
          )}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Manejo de Errores Global */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-shake">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  Ups, ocurrió un error:
                </p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Paso 0: Formulario de Entrada */}
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Calculadora de Retorno Solar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Obtén un análisis financiero detallado y genera una propuesta profesional en PDF en segundos.
              </p>
            </div>
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}

        {/* Paso 1: Selección de Escenario (Solo si hay conflicto) */}
        {currentStep === 1 && apiResponse && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-8">Elige el Escenario para la Propuesta</h2>
            <ScenarioSelector
              autoScenario={apiResponse.escenario_automatico}
              userScenario={apiResponse.escenario_usuario}
              onSelect={handleScenarioSelection}
              selectedId={null} // Al inicio ninguno está seleccionado
            />
          </div>
        )}

        {/* Paso 2: Dashboard de Resultados y PDF */}
        {currentStep === 2 && selectedScenario && (() => {
          console.log("1. [APP] Data lista para enviar:", {
            specs: apiResponse?.especificaciones_tecnicas,
            scenario: selectedScenario
          });

          return (
            <ResultsDashboard
              scenario={selectedScenario}
              specs={apiResponse.especificaciones_tecnicas}
              inputs={inputs}
              clientName={inputs.nombre_cliente}
            />
          );
        })()}

      </main>

    </div>
  );
}

export default App;
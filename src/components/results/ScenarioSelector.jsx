import React from 'react';
import ScenarioCard from './ScenarioCard';
import { AlertTriangle } from 'lucide-react';

const ScenarioSelector = ({ autoScenario, userScenario, onSelect, selectedId }) => {
    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                            Comparación de Escenarios Requerida
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                Has forzado una tarifa manual. Por favor, selecciona cuál de los dos escenarios deseas utilizar para generar la propuesta final en PDF.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScenarioCard
                    title="Escenario Automático"
                    badge="Recomendado"
                    scenario={autoScenario}
                    isSelected={selectedId === 'auto'}
                    onSelect={() => onSelect('auto')}
                />

                <ScenarioCard
                    title="Escenario Usuario"
                    badge="Personalizado"
                    scenario={userScenario}
                    isSelected={selectedId === 'user'}
                    onSelect={() => onSelect('user')}
                />
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => document.getElementById('dashboard-view').scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4"
                >
                    Ver detalles completos abajo
                </button>
            </div>
        </div>
    );
};

export default ScenarioSelector;
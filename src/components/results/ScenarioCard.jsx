import React from 'react';
import { CheckCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercent, formatYearsToMonths } from '../../utils/formatters';

const ScenarioCard = ({ scenario, isSelected, onSelect, title, badge }) => {
    return (
        <div
            onClick={onSelect}
            className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md
        ${isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200 ring-offset-2'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }
      `}
        >
            {/* Badge Superior */}
            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center
        ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
      `}>
                <span>{badge}</span>
                {isSelected && <CheckCircle className="w-4 h-4" />}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{scenario.explicacion}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Inversión Total</p>
                        <p className="font-bold text-gray-800 text-sm sm:text-base">
                            {formatCurrency(scenario.costo_sistema_total)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">TIR (Rentabilidad)</p>
                        <p className="font-bold text-green-600 text-sm sm:text-base flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {formatPercent(scenario.tir)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Retorno (Payback)</p>
                        <p className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {/* AQUÍ SE APLICA EL CAMBIO DE FORMATO */}
                            {formatYearsToMonths(scenario.periodo_retorno_anos)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Ahorro Mensual</p>
                        <p className="font-bold text-blue-600 text-sm sm:text-base">
                            {formatCurrency(scenario.ahorro_mensual_promedio)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScenarioCard;
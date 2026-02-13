import React, { useState } from 'react';
import { Zap, DollarSign, Settings, User, AlertCircle, Target } from 'lucide-react'; // Importamos icono Target
import { DEFAULT_FORM_VALUES, TARIFF_OPTIONS } from '../../utils/constants';

const InputForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
    const [isTariffForced, setIsTariffForced] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' && value !== '' ? parseFloat(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleForceToggle = (e) => {
        const isChecked = e.target.checked;
        setIsTariffForced(isChecked);
        setFormData((prev) => ({
            ...prev,
            forzar_tipo_tarifa: isChecked ? 'comercial' : null,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Encabezado */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-300" />
                    Calculadora Solar
                </h2>
                <p className="text-blue-100 text-sm mt-1">Ingresa los datos para generar la propuesta.</p>
            </div>

            <div className="p-6 space-y-6">

                {/* Sección 1: Cliente */}
                <div className="space-y-4">
                    <h3 className="text-gray-800 font-semibold flex items-center gap-2 border-b pb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Información del Cliente
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Cliente / Proyecto</label>
                        <input
                            type="text"
                            name="nombre_cliente"
                            required
                            placeholder="Ej: Suncity SAS"
                            value={formData.nombre_cliente}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Sección 2: Consumo */}
                <div className="space-y-4">
                    <h3 className="text-gray-800 font-semibold flex items-center gap-2 border-b pb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        Consumo y Energía
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consumo Mensual (kWh)</label>
                            <input
                                type="number"
                                name="consumo_energia_kwh_mes"
                                required
                                min="1"
                                step="0.01"
                                inputMode="decimal"
                                value={formData.consumo_energia_kwh_mes}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Energía Base ($/kWh)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                                <input
                                    type="number"
                                    name="precio_energia_base"
                                    required
                                    min="1"
                                    step="0.01"
                                    inputMode="decimal"
                                    value={formData.precio_energia_base}
                                    onChange={handleChange}
                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Parámetros Financieros */}
                <div className="space-y-4">
                    <h3 className="text-gray-800 font-semibold flex items-center gap-2 border-b pb-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        Impuestos y Contribuciones
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contribución (%)</label>
                            <input
                                type="number"
                                name="contribucion_porcentaje"
                                required
                                min="0"
                                max="100"
                                value={formData.contribucion_porcentaje}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Impuesto AP (%)</label>
                            <input
                                type="number"
                                name="impuesto_ap_porcentaje"
                                required
                                min="0"
                                max="100"
                                value={formData.impuesto_ap_porcentaje}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* --- NUEVA SECCIÓN: Metas Técnicas (Los campos que faltaban) --- */}
                <div className="space-y-4">
                    <h3 className="text-gray-800 font-semibold flex items-center gap-2 border-b pb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Metas del Proyecto
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cobertura Objetivo (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="cobertura_objetivo_porcentaje"
                                    required
                                    min="1"
                                    max="100"
                                    value={formData.cobertura_objetivo_porcentaje}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400 text-sm">Target</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">¿Qué % del consumo quieres cubrir?</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tasa de Descuento (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="tasa_descuento_porcentaje"
                                    required
                                    min="0"
                                    step="0.1"
                                    value={formData.tasa_descuento_porcentaje}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400 text-sm">WACC</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Tasa financiera anual para el VPN.</p>
                        </div>
                    </div>
                </div>

                {/* Sección 4: Configuración Avanzada */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-600" />
                            <label htmlFor="force-tariff" className="text-sm font-medium text-gray-800 cursor-pointer select-none">
                                Forzar Tipo de Tarifa Manualmente
                            </label>
                        </div>

                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="force-tariff"
                                checked={isTariffForced}
                                onChange={handleForceToggle}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-blue-600"
                            />
                            <label
                                htmlFor="force-tariff"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${isTariffForced ? 'bg-blue-600' : 'bg-gray-300'}`}
                            ></label>
                        </div>
                    </div>

                    {isTariffForced && (
                        <div className="animate-fade-in-down mt-3">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                                <p className="text-xs text-blue-700 flex gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Compararás el escenario automático vs. esta tarifa.
                                </p>
                            </div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Tarifa</label>
                            <select
                                name="forzar_tipo_tarifa"
                                value={formData.forzar_tipo_tarifa || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {TARIFF_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-md transition-all transform active:scale-95 ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                        }`}
                >
                    {isLoading ? 'Calculando...' : 'Calcular Viabilidad'}
                </button>

            </div>
        </form>
    );
};

export default InputForm;
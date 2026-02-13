import React from 'react';
import { MonthlyComparisonChart, SavingsPieChart } from './Charts';
import { formatCurrency, formatPercent, formatYearsToMonths, formatNumber } from '../../utils/formatters';
import {
    Download, Sun, TrendingUp, Wallet, Zap, Maximize,
    Grid, Lightbulb, ClipboardList, BarChart3, Scale,
    ArrowRight, CheckCircle2
} from 'lucide-react';
import DownloadButton from '../pdf/DownloadButton';

const ResultsDashboard = ({ scenario, inputs, clientName, specs }) => {

    // Eliminamos el log para limpiar la consola
    if (!scenario) return null;

    return (
        <div id="dashboard-view" className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Análisis de Viabilidad Solar</h2>
                    <p className="text-gray-500 mt-1">
                        Proyecto: <span className="font-semibold text-gray-800 text-lg">{clientName}</span>
                    </p>
                </div>

                {/* Badge de Viabilidad Grande */}
                <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 shadow-sm
          ${scenario.viabilidad === 'VIABLE'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-orange-50 border-orange-200 text-orange-700'}
        `}>
                    <div className={`p-2 rounded-full ${scenario.viabilidad === 'VIABLE' ? 'bg-green-200' : 'bg-orange-200'}`}>
                        <Sun className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-80">Resultado</p>
                        <p className="text-xl font-black tracking-tight">{scenario.viabilidad}</p>
                    </div>
                </div>
            </div>

            {/* =================================================================================
          SECCIÓN 1: RECORDATORIO DE INPUTS (Lo que el usuario pidió)
         ================================================================================= */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-gray-500" />
                    <h3 className="font-bold text-gray-700">Datos de Entrada (Tu Configuración)</h3>
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Consumo Mes</p>
                        <p className="font-medium text-gray-900">{formatNumber(inputs.consumo_energia_kwh_mes)} kWh</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Precio Energía</p>
                        <p className="font-medium text-gray-900">{formatCurrency(inputs.precio_energia_base)} /kWh</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Meta Cobertura</p>
                        <p className="font-medium text-blue-600">{inputs.cobertura_objetivo_porcentaje}%</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Contribución</p>
                        <p className="font-medium text-gray-900">{inputs.contribucion_porcentaje}%</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Impuesto AP</p>
                        <p className="font-medium text-gray-900">{inputs.impuesto_ap_porcentaje}%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* =================================================================================
            SECCIÓN 2: FICHA TÉCNICA (Datos Físicos - No cambian por escenario)
           ================================================================================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                        <h3 className="font-bold text-blue-900 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-600" />
                            Ingeniería & Sistema
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Datos Físicos</span>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Bloque Principal */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Grid className="w-4 h-4 text-blue-500" />
                                    <p className="text-xs text-blue-600 font-bold uppercase">Paneles</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{specs?.numero_modulos}</p>
                                <p className="text-xs text-gray-500">Unidades necesarias</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Maximize className="w-4 h-4 text-blue-500" />
                                    <p className="text-xs text-blue-600 font-bold uppercase">Área</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{specs?.area_requerida_m2} <span className="text-sm">m²</span></p>
                                <p className="text-xs text-gray-500">Espacio en techo</p>
                            </div>
                        </div>

                        {/* Lista de Detalles Técnicos */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-gray-400" /> Capacidad Instalada
                                </span>
                                <span className="font-bold text-gray-900">{formatNumber(specs?.capacidad_instalada_kwp, 2)} kWp</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Sun className="w-4 h-4 text-gray-400" /> Producción Diaria Est.
                                </span>
                                <span className="font-bold text-gray-900">{specs?.produccion_diaria_sfv} kWh</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-gray-400" /> Consumo Promedio Diario
                                </span>
                                <span className="font-medium text-gray-700">{specs?.consumo_diario_kwh} kWh</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-gray-600 text-sm font-medium">Factura Mensual Actual</span>
                                <span className="font-bold text-red-500 text-lg">{formatCurrency(specs?.pago_mensual_actual)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================================================
            SECCIÓN 3: ANÁLISIS FINANCIERO (Datos del Escenario Elegido)
           ================================================================================= */}
                <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden relative">
                    {/* Cinta indicador de escenario */}
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                        {scenario.nombre_escenario}
                    </div>

                    <div className="bg-green-50/50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
                        <h3 className="font-bold text-green-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            Viabilidad Económica
                        </h3>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* KPIs Principales */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Inversión Total</p>
                                <p className="text-2xl font-bold text-gray-900 tracking-tight">{formatCurrency(scenario.costo_sistema_total)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Tasa Interna (TIR)</p>
                                <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                                    {formatPercent(scenario.tir)} <TrendingUp className="w-5 h-5" />
                                </p>
                            </div>
                        </div>

                        {/* Tabla Detallada Financiera */}
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Costo Unitario Aplicado</span>
                                <span className="text-sm font-medium text-gray-900">{formatCurrency(scenario.costo_kwp_aplicado)} /kWp</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Valor Actual Neto (VAN)</span>
                                <span className="text-sm font-bold text-green-700">+ {formatCurrency(scenario.van)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                    <Scale className="w-3 h-3" /> Relación Beneficio/Costo
                                </span>
                                <span className="text-sm font-bold text-gray-900">{scenario.relacion_beneficio_costo}x</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="text-sm font-bold text-gray-700">Tiempo de Retorno</span>
                                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {formatYearsToMonths(scenario.periodo_retorno_anos)}
                                </span>
                            </div>
                        </div>

                        {/* Resultado Final en Dinero */}
                        <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200">
                            <div>
                                <p className="text-xs text-green-800 font-bold uppercase mb-1">Nueva Factura Est.</p>
                                <p className="text-xl font-black text-green-700">{formatCurrency(scenario.pago_mensual_con_sfv)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-green-800 font-bold uppercase mb-1">Ahorro Mensual</p>
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-sm font-medium bg-white px-2 rounded text-green-600 shadow-sm">
                                        -{scenario.porcentaje_ahorro_factura}%
                                    </span>
                                    <p className="text-xl font-black text-green-700">{formatCurrency(scenario.ahorro_mensual_promedio)}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-center text-gray-400 italic">
                            * {scenario.explicacion}
                        </p>
                    </div>
                </div>

            </div>

            {/* =================================================================================
          SECCIÓN 4: GRÁFICAS VISUALES
         ================================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Comparativa de Flujo de Caja</h3>
                    {/* FIX: Altura fija de 300px para evitar warning de Recharts */}
                    <div className="w-full h-[300px]">
                        <MonthlyComparisonChart
                            currentPayment={specs?.pago_mensual_actual || 0}
                            solarPayment={scenario.pago_mensual_con_sfv}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Ahorro Porcentual</h3>
                    {/* FIX: Altura fija de 300px para evitar warning de Recharts */}
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <SavingsPieChart savingsPercentage={scenario.porcentaje_ahorro_factura} />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Reducción directa en factura</span>
                    </div>
                </div>

            </div>

            {/* =================================================================================
          SECCIÓN 5: DESCARGA
         ================================================================================= */}
            <div className="bg-gray-900 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden">
                {/* Efecto de fondo sutil */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute transform -rotate-45 -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute transform rotate-45 -bottom-20 -right-20 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Propuesta Formal Lista</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Descarga un documento PDF profesional con todos estos indicadores, tablas técnicas y análisis de flujo de caja para presentar a tu cliente.
                    </p>

                    <div className="flex justify-center">
                        <DownloadButton
                            scenario={scenario}
                            inputs={inputs}
                            clientName={clientName}
                            specs={specs}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResultsDashboard;
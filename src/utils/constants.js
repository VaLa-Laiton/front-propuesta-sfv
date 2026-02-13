// src/utils/constants.js

export const API_BASE_URL = 'http://localhost:8000/api/v1'; // Ajusta si tu API corre en otro puerto

export const TARIFF_OPTIONS = [
    { value: 'residencial', label: 'Residencial (3-10 kWp)' },
    { value: 'comercial', label: 'Comercial (10-40 kWp)' },
    { value: 'industrial', label: 'Industrial (>40 kWp)' },
];

export const DEFAULT_FORM_VALUES = {
    nombre_cliente: '',
    consumo_energia_kwh_mes: '', // Se usa string vacio para inputs controlados
    precio_energia_base: '',
    contribucion_porcentaje: 20, // Valor por defecto común en Colombia
    impuesto_ap_porcentaje: 1,   // Alumbrado Público aprox
    cobertura_objetivo_porcentaje: 100,
    tasa_descuento_porcentaje: 12, // Tasa de descuento anual típica
    forzar_tipo_tarifa: null,
};
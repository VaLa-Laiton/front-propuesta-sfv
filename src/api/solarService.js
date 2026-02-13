// src/api/solarService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const solarService = {
    /**
     * Envía los datos del formulario al backend para calcular la viabilidad.
     * @param {Object} formData - Objeto con la estructura de SolarRequest
     * @returns {Promise<Object>} - La respuesta del servidor (SolarProjectResponse)
     */
    calculateViability: async (formData) => {
        try {
            // Limpieza de datos: Asegurar que los números sean enviados como números, no strings
            const payload = {
                nombre_cliente: formData.nombre_cliente,
                consumo_energia_kwh_mes: Number(formData.consumo_energia_kwh_mes),
                precio_energia_base: Number(formData.precio_energia_base),
                contribucion_porcentaje: Number(formData.contribucion_porcentaje),
                impuesto_ap_porcentaje: Number(formData.impuesto_ap_porcentaje),
                cobertura_objetivo_porcentaje: Number(formData.cobertura_objetivo_porcentaje),
                tasa_descuento_porcentaje: Number(formData.tasa_descuento_porcentaje),
                // Si el usuario seleccionó una tarifa forzada, la enviamos; si no, null
                forzar_tipo_tarifa: formData.forzar_tipo_tarifa || null,
            };

            const response = await apiClient.post('/calcular-viabilidad', payload);
            return response.data;
        } catch (error) {
            console.error('Error calculando viabilidad:', error);
            // Lanzamos un error legible para mostrarlo en la UI
            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.data.detail || error.message}`);
            } else if (error.request) {
                throw new Error('No se pudo conectar con el servidor. Verifica que la API esté corriendo.');
            } else {
                throw new Error('Error inesperado al procesar la solicitud.');
            }
        }
    },
};
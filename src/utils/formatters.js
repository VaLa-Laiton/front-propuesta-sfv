// src/utils/formatters.js

/**
 * Formatea un número como moneda colombiana (COP).
 * Ejemplo: 3500000 -> "$ 3.500.000"
 */
export const formatCurrency = (value) => {
    if (value === undefined || value === null) return '$ 0';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Formatea un número decimal como porcentaje.
 * Ejemplo: 12.5 -> "12.50%"
 */
export const formatPercent = (value, decimals = 2) => {
    if (value === undefined || value === null) return '0%';
    return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Formatea números generales con separadores de miles.
 * Ejemplo: 1245.5 -> "1,245.5"
 */
export const formatNumber = (value, decimals = 1) => {
    if (value === undefined || value === null) return '0';
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

/**
 * Convierte un número de años en texto legible.
 * Ejemplo: 3.8 -> "3 años y 10 meses" aprox.
 */
export const formatYearsToMonths = (yearsFloat) => {
    if (!yearsFloat) return "0 años";
    const years = Math.floor(yearsFloat);
    const months = Math.round((yearsFloat - years) * 12);

    if (years === 0) return `${months} meses`;
    if (months === 0) return `${years} años`;
    return `${years} años y ${months} meses`;
};
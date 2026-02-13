import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import {
    formatCurrency,
    formatPercent,
    formatNumber,
    formatYearsToMonths
} from '../../utils/formatters';

const ProposalDocument = ({ scenario, inputs, clientName, specs }) => {
    const currentDate = new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const pagoActual = Number(specs?.pago_mensual_actual) || 0;
    const pagoSolar = Number(scenario?.pago_mensual_con_sfv) || 0;
    const maxPayment = Math.max(pagoActual, pagoSolar) || 1;
    const currentWidth = (pagoActual / maxPayment) * 100;
    const solarWidth = (pagoSolar / maxPayment) * 100;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2563EB' }}>SOLAR VIABILITY REPORT</Text>
                    <Text style={styles.companyName}>Proyecto: {clientName}</Text>
                </View>

                <View>
                    <Text style={styles.title}>Estudio Técnico-Financiero</Text>
                    <Text style={styles.subtitle}>Análisis de sistema fotovoltaico generado el {currentDate}</Text>
                </View>

                {/* SECCIÓN 1: INPUTS (4 Columnas) */}
                <Text style={styles.sectionTitle}>1. Parámetros de Entrada</Text>
                <View style={styles.gridContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Consumo</Text>
                        <Text style={styles.cardValue}>{formatNumber(inputs?.consumo_energia_kwh_mes)} kWh</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Precio KWh</Text>
                        <Text style={styles.cardValue}>{formatCurrency(inputs?.precio_energia_base)}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Cobertura</Text>
                        <Text style={styles.cardValue}>{inputs?.cobertura_objetivo_porcentaje}%</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Impuestos</Text>
                        <Text style={styles.cardValue}>{Number(inputs?.contribucion_porcentaje) + Number(inputs?.impuesto_ap_porcentaje)}%</Text>
                    </View>
                </View>

                {/* SECCIÓN 2: INGENIERÍA (4 Columnas) */}
                <Text style={styles.sectionTitle}>2. Especificaciones del Sistema</Text>
                <View style={styles.gridContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Potencia</Text>
                        <Text style={styles.cardValue}>{formatNumber(specs?.capacidad_instalada_kwp, 2)} kWp</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Módulos</Text>
                        <Text style={styles.cardValue}>{specs?.numero_modulos} Und</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Área</Text>
                        <Text style={styles.cardValue}>{specs?.area_requerida_m2} m²</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Gen. Diaria</Text>
                        <Text style={styles.cardValue}>{specs?.produccion_diaria_sfv} kWh</Text>
                    </View>
                </View>

                {/* SECCIÓN 3: FINANZAS (4 Columnas) */}
                <Text style={styles.sectionTitle}>3. Viabilidad Económica - {scenario?.nombre_escenario}</Text>
                <View style={styles.gridContainer}>
                    <View style={[styles.card, { backgroundColor: '#F0FDF4' }]}>
                        <Text style={styles.cardLabel}>Rentabilidad</Text>
                        <Text style={[styles.cardValue, { color: '#166534' }]}>{formatPercent(scenario?.tir)}</Text>
                    </View>
                    <View style={[styles.card, { backgroundColor: '#EFF6FF' }]}>
                        <Text style={styles.cardLabel}>Retorno</Text>
                        <Text style={[styles.cardValue, { color: '#1E40AF' }]}>{formatYearsToMonths(scenario?.periodo_retorno_anos)}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Inversión</Text>
                        <Text style={styles.cardValue}>{formatCurrency(scenario?.costo_sistema_total)}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>VAN</Text>
                        <Text style={styles.cardValue}>{formatCurrency(scenario?.van)}</Text>
                    </View>
                </View>

                {/* --- COMPARATIVA VISUAL --- */}
                <View style={styles.chartContainer}>
                    <View style={styles.barRow}>
                        <Text style={styles.barLabel}>Actual</Text>
                        <View style={styles.barWrapper}>
                            <View style={[styles.barFill, { width: `${currentWidth}%`, backgroundColor: '#EF4444' }]} />
                        </View>
                        <Text style={styles.barValue}>{formatCurrency(pagoActual)}</Text>
                    </View>

                    <View style={styles.barRow}>
                        <Text style={styles.barLabel}>Con Solar</Text>
                        <View style={styles.barWrapper}>
                            <View style={[styles.barFill, { width: `${solarWidth}%`, backgroundColor: '#10B981' }]} />
                        </View>
                        <Text style={styles.barValue}>{formatCurrency(pagoSolar)}</Text>
                    </View>

                    <View style={{ marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: '#D1D5DB', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#059669' }}>
                            Ahorro Mensual: {formatCurrency(scenario?.ahorro_mensual_promedio)}
                        </Text>
                        <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#2563EB' }}>
                            Reducción: {scenario?.porcentaje_ahorro_factura}%
                        </Text>
                    </View>
                </View>

                {/* --- NOTAS TÉCNICAS COMPACTAS --- */}
                <View style={{ marginTop: 5, padding: 6, backgroundColor: '#F9FAFB', borderRadius: 4 }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', lineHeight: 1.3 }}>
                        <Text style={{ fontWeight: 'bold' }}>Nota: </Text>
                        {scenario?.explicacion} Sistema: {scenario?.tipo_sistema_detectado}.
                    </Text>
                </View>

                <Text style={styles.footer}>
                    Simulación técnica y financiera generada por Solar Viability Engine.
                </Text>
            </Page>
        </Document>
    );
};

export default ProposalDocument;
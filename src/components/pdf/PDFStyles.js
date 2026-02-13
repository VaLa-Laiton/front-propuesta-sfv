import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 25, // Reducido para ganar espacio
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2563EB',
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyName: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 10,
        color: '#4B5563',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2563EB',
        marginTop: 10,
        marginBottom: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#F59E0B',
        paddingLeft: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 5,
    },
    card: {
        width: '23.5%', // 4 columnas para ahorrar altura
        backgroundColor: '#F9FAFB',
        padding: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cardLabel: {
        fontSize: 7,
        color: '#6B7280',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    cardValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    chartContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 6,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        width: '100%',
    },
    barLabel: {
        width: '15%',
        fontSize: 9,
        color: '#374151',
    },
    barWrapper: {
        flex: 1,
        height: 10,
        backgroundColor: '#E5E7EB',
        borderRadius: 5,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
    },
    barValue: {
        width: '22%',
        fontSize: 9,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        left: 25,
        right: 25,
        textAlign: 'center',
        fontSize: 7,
        color: '#9CA3AF',
        borderTopWidth: 0.5,
        borderTopColor: '#E5E7EB',
        paddingTop: 5,
    },
});
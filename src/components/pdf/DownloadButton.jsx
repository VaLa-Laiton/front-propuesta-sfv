import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import ProposalDocument from './ProposalDocument';

const DownloadButton = ({ scenario, inputs, clientName, specs }) => { // <--- Recibe specs aquí
    // AGREGAR ESTA LÍNEA AL INICIO:
    console.log("3. [BUTTON] Data para generar PDF:", { specs, scenario_valid: !!scenario });

    const fileName = `Propuesta_Solar_${clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

    return (
        <div className="mt-6">
            <PDFDownloadLink
                document={
                    <ProposalDocument
                        scenario={scenario}
                        inputs={inputs}
                        clientName={clientName}
                        specs={specs} // <--- ¡ESTO FALTABA! Se pasan las specs al documento
                    />
                }
                fileName={fileName}
            >
                {({ blob, url, loading, error }) => (
                    <button
                        disabled={loading}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-105 ${loading
                            ? 'bg-gray-500 cursor-wait'
                            : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {loading ? (
                            <>Generando PDF...</>
                        ) : (
                            <>
                                <Download className="w-5 h-5" />
                                Descargar Propuesta PDF
                            </>
                        )}
                    </button>
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default DownloadButton;
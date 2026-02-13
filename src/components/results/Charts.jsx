import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export const MonthlyComparisonChart = ({ currentPayment, solarPayment }) => {
    const data = [
        {
            name: 'Pago Mensual',
            'Sin Solar': currentPayment,
            'Con Solar': solarPayment,
        },
    ];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis
                        tickFormatter={(value) => `$${value / 1000}k`}
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="Sin Solar" fill="#EF4444" radius={[4, 4, 0, 0]} name="Pago Actual" />
                    <Bar dataKey="Con Solar" fill="#10B981" radius={[4, 4, 0, 0]} name="Con Paneles" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const SavingsPieChart = ({ savingsPercentage }) => {
    const data = [
        { name: 'Ahorro', value: savingsPercentage },
        { name: 'Pago Restante', value: 100 - savingsPercentage },
    ];

    const COLORS = ['#3B82F6', '#E5E7EB'];

    return (
        <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                </PieChart>
            </ResponsiveContainer>
            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-blue-600">{savingsPercentage.toFixed(0)}%</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Ahorro</span>
            </div>
        </div>
    );
};
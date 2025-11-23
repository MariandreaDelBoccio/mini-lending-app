import React from "react";
import { FinancialData } from "../types/common.types";

interface MetricCardProps {
  data: FinancialData[];
}

export const DataTable: React.FC<MetricCardProps> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Month</th>
          <th className="text-right py-3 px-4">Revenue</th>
          <th className="text-right py-3 px-4">Expenses</th>
          <th className="text-right py-3 px-4">Cashflow</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">{row.month}</td>
            <td className="text-right py-3 px-4">
              ${row.revenue.toLocaleString()}
            </td>
            <td className="text-right py-3 px-4">
              ${row.expenses.toLocaleString()}
            </td>
            <td
              className={`text-right py-3 px-4 ${
                row.cashflow >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${row.cashflow.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

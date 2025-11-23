import { MOCK_FINANCIAL_DATA } from "@/api/mockData";
import { Card, DataTable, MetricCard } from "@/shared/components";
import { OnboardingData } from "@/shared/types/common.types";
import { calculateMetrics } from "@/utils/financialCalculations";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Dashboard: React.FC<{
  data: OnboardingData;
}> = ({ data }) => {
  const financials = data.financials || MOCK_FINANCIAL_DATA;
  const metrics = calculateMetrics(financials);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          subtitle="Last 12 months"
          trend="up"
        />
        <MetricCard
          title="Gross Margin"
          value={`${metrics.grossMargin.toFixed(1)}%`}
          subtitle="Healthy margin"
        />
        <MetricCard
          title="Avg Cashflow"
          value={`$${metrics.avgCashflow.toLocaleString()}`}
          subtitle="Monthly average"
        />
        <MetricCard
          title="Credit Capacity"
          value={`$${metrics.creditCapacity.toLocaleString()}`}
          subtitle="Available credit"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue & Expenses Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={financials}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Cashflow">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={financials}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cashflow" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Financial Overview">
        <DataTable data={financials} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Net Margin"
          value={`${metrics.netMargin.toFixed(1)}%`}
        />
        <MetricCard
          title="Burn Rate"
          value={`$${metrics.burnRate.toLocaleString()}`}
          subtitle="Monthly"
        />
        <MetricCard
          title="Runway"
          value={`${metrics.runway.toFixed(1)} months`}
        />
      </div>
    </div>
  );
};

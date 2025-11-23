import { mockAPI } from "@/api/mockAPI";
import { MOCK_FINANCIAL_DATA } from "@/api/mockData";
import { Button, Card } from "@/shared/components";
import {
  CreditEvaluation as CreditEvaluationProps,
  OnboardingData,
} from "@/shared/types/common.types";
import { calculateMetrics } from "@/utils/financialCalculations";
import { useState } from "react";

export const CreditEvaluation: React.FC<{
  data: OnboardingData;
}> = ({ data }) => {
  const [evaluation, setEvaluation] = useState<CreditEvaluationProps | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
    const result = await mockAPI.evaluateCredit(data);
    setEvaluation(result);
    setLoading(false);
  };

  const financials = data.financials || MOCK_FINANCIAL_DATA;
  const metrics = calculateMetrics(financials);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Credit Evaluation</h1>

      <Card title="Input Parameters">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Annual Revenue</div>
            <div className="text-lg font-semibold">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Avg Monthly Cashflow</div>
            <div className="text-lg font-semibold">
              ${metrics.avgCashflow.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Debt Ratio</div>
            <div className="text-lg font-semibold">
              {((metrics.totalExpenses / metrics.totalRevenue) * 100).toFixed(
                1
              )}
              %
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Average Bank Balance</div>
            <div className="text-lg font-semibold">
              ${data.bankInfo?.averageBalance?.toLocaleString() || "0"}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleEvaluate} disabled={loading}>
            {loading ? "Evaluating..." : "Run Credit Evaluation"}
          </Button>
        </div>
      </Card>

      {evaluation && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Risk Level</div>
                <div
                  className={`text-3xl font-bold ${
                    evaluation.riskLevel === "low"
                      ? "text-green-600"
                      : evaluation.riskLevel === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {evaluation.riskLevel.toUpperCase()}
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Recommended Credit
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  ${(evaluation.recommendedAmount / 1000).toFixed(0)}K
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Default Probability
                </div>
                <div className="text-3xl font-bold text-gray-700">
                  {evaluation.defaultProbability}%
                </div>
              </div>
            </Card>
          </div>

          <Card title="Evaluation Summary">
            <p className="text-gray-700 leading-relaxed">
              {evaluation.explanation}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm text-gray-600">
                  Financial Health Score
                </span>
                <span className="font-semibold">
                  {metrics.riskScore.toFixed(0)}/100
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm text-gray-600">Gross Margin</span>
                <span className="font-semibold">
                  {metrics.grossMargin.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm text-gray-600">Monthly Runway</span>
                <span className="font-semibold">
                  {metrics.runway.toFixed(1)} months
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Credit Capacity</span>
                <span className="font-semibold">
                  ${metrics.creditCapacity.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card title="Risk Factors Analysis">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Revenue Stability</span>
                  <span className="text-sm font-semibold">
                    {metrics.riskScore > 70
                      ? "Excellent"
                      : metrics.riskScore > 50
                      ? "Good"
                      : "Moderate"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min(metrics.riskScore, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Cashflow Health</span>
                  <span className="text-sm font-semibold">
                    {metrics.avgCashflow > 50000 ? "Strong" : "Adequate"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (metrics.avgCashflow / 100000) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Debt Management</span>
                  <span className="text-sm font-semibold">
                    {metrics.totalExpenses / metrics.totalRevenue < 0.7
                      ? "Healthy"
                      : "Moderate"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{
                      width: `${
                        100 -
                        (metrics.totalExpenses / metrics.totalRevenue) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

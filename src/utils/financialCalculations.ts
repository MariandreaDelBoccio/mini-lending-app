import {
  FinancialData,
  FinancialMetrics,
  OnboardingData,
  CreditEvaluation,
} from "@shared/types/common.types";

export function calculateMetrics(
  financials: FinancialData[]
): FinancialMetrics {
  if (!financials || financials.length === 0) {
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      avgCashflow: 0,
      grossMargin: 0,
      netMargin: 0,
      burnRate: 0,
      runway: 0,
      creditCapacity: 0,
      riskScore: 0,
    };
  }

  const totalRevenue = financials.reduce((sum, f) => sum + f.revenue, 0);
  const totalExpenses = financials.reduce((sum, f) => sum + f.expenses, 0);
  const totalCashflow = financials.reduce((sum, f) => sum + f.cashflow, 0);
  const avgCashflow = totalCashflow / financials.length;

  const grossMargin = ((totalRevenue - totalExpenses) / totalRevenue) * 100;
  const netMargin = (totalCashflow / totalRevenue) * 100;

  const recentExpenses =
    financials.slice(-3).reduce((sum, f) => sum + f.expenses, 0) / 3;
  const burnRate = recentExpenses;

  const currentCash = financials[financials.length - 1]?.cashflow || 0;
  const runway = burnRate > 0 ? currentCash / burnRate : 0;

  const creditCapacity = totalRevenue * 0.15;

  const revenueGrowth =
    financials.length > 1
      ? ((financials[financials.length - 1].revenue - financials[0].revenue) /
          financials[0].revenue) *
        100
      : 0;
  const cashflowStability = avgCashflow / (totalRevenue / financials.length);
  const riskScore = Math.max(
    0,
    Math.min(
      100,
      50 + revenueGrowth * 0.5 + cashflowStability * 20 - burnRate / 1000
    )
  );

  return {
    totalRevenue,
    totalExpenses,
    avgCashflow,
    grossMargin,
    netMargin,
    burnRate,
    runway,
    creditCapacity,
    riskScore,
  };
}

export function calculateCreditEvaluation(
  data: OnboardingData
): CreditEvaluation {
  const financials = data.financials || [];
  const metrics = calculateMetrics(financials);

  const avgBalance = data.bankInfo?.averageBalance || 0;
  const debtRatio = metrics.totalExpenses / metrics.totalRevenue;

  let riskLevel: "low" | "medium" | "high" = "medium";
  let defaultProbability = 15;

  if (metrics.riskScore > 70 && debtRatio < 0.7 && avgBalance > 50000) {
    riskLevel = "low";
    defaultProbability = 5;
  } else if (metrics.riskScore < 40 || debtRatio > 0.85 || avgBalance < 20000) {
    riskLevel = "high";
    defaultProbability = 30;
  }

  const recommendedAmount = Math.min(
    metrics.creditCapacity,
    avgBalance * 2,
    metrics.avgCashflow * 6
  );

  const explanation = `Based on your $${metrics.totalRevenue.toLocaleString()} annual revenue, ${metrics.grossMargin.toFixed(
    1
  )}% gross margin, and ${riskLevel} risk profile, we recommend a credit line of $${recommendedAmount.toLocaleString()}. Your financial health score is ${metrics.riskScore.toFixed(
    0
  )}/100.`;

  return {
    riskLevel,
    recommendedAmount,
    defaultProbability,
    explanation,
  };
}

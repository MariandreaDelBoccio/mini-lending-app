import { OnboardingData } from "@shared/types/common.types";
import {
  calculateMetrics,
  calculateCreditEvaluation,
} from "@utils/financialCalculations";

export function generateAIResponse(
  question: string,
  data: OnboardingData
): string {
  const q = question.toLowerCase();
  const financials = data.financials || [];
  const metrics = calculateMetrics(financials);

  if (q.includes("loan") || q.includes("50k") || q.includes("credit")) {
    return `Based on your current financial profile, you can request up to $${metrics.creditCapacity.toLocaleString()} in credit. Your average monthly cashflow of $${metrics.avgCashflow.toLocaleString()} and ${metrics.riskScore.toFixed(
      0
    )}/100 health score support this amount.`;
  }

  if (q.includes("cashflow") && q.includes("may")) {
    return `Your cashflow dropped in May due to a revenue decrease to $148K (from $165K in April) while expenses continued rising to $112K. This created a temporary cashflow compression. However, June showed strong recovery with $175K revenue.`;
  }

  if (q.includes("health") || q.includes("score")) {
    return `Your financial health score is ${metrics.riskScore.toFixed(
      0
    )}/100, which is ${
      metrics.riskScore > 70
        ? "excellent"
        : metrics.riskScore > 50
        ? "good"
        : "moderate"
    }. This is based on your ${metrics.grossMargin.toFixed(
      1
    )}% gross margin, consistent revenue growth, and ${metrics.runway.toFixed(
      1
    )} months of runway.`;
  }

  if (q.includes("risk")) {
    const evaluation = calculateCreditEvaluation(data);
    return `Your risk level is classified as ${evaluation.riskLevel} with a ${evaluation.defaultProbability}% probability of default. This assessment considers your revenue stability, debt ratio, and cash reserves.`;
  }

  return `I can help you understand your financial metrics, credit capacity, and loan eligibility. Try asking about your cashflow, financial health score, or loan options.`;
}

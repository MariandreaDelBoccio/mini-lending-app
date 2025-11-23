import {
  OnboardingData,
  FinancialData,
  CreditEvaluation,
} from "@shared/types/common.types";
import { MOCK_FINANCIAL_DATA, STORAGE_KEY } from "./mockData";
import { calculateCreditEvaluation } from "@/utils/financialCalculations";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAPI = {
  async saveOnboarding(data: OnboardingData): Promise<void> {
    await delay(300);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  async getOnboarding(): Promise<OnboardingData> {
    await delay(200);
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  async submitOnboarding(data: OnboardingData): Promise<{ success: boolean }> {
    await delay(500);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  },

  async getFinancials(): Promise<FinancialData[]> {
    await delay(300);
    return MOCK_FINANCIAL_DATA;
  },

  async evaluateCredit(data: OnboardingData): Promise<CreditEvaluation> {
    await delay(400);
    return calculateCreditEvaluation(data);
  },
};

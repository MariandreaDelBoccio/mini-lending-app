export interface CompanyInfo {
  name: string;
  taxId: string;
  industry: string;
  foundedYear: number;
  employeeCount: number;
}

export interface LegalRepresentative {
  fullName: string;
  email: string;
  phone: string;
  identification: string;
}

export interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  cashflow: number;
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  country: string;
  averageBalance: number;
}

export interface OnboardingData {
  company?: CompanyInfo;
  representative?: LegalRepresentative;
  financials?: FinancialData[];
  bankInfo?: BankInfo;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  avgCashflow: number;
  grossMargin: number;
  netMargin: number;
  burnRate: number;
  runway: number;
  creditCapacity: number;
  riskScore: number;
}

export interface CreditEvaluation {
  riskLevel: "low" | "medium" | "high";
  recommendedAmount: number;
  defaultProbability: number;
  explanation: string;
}

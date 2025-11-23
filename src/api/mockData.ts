import { FinancialData } from "@shared/types/common.types";

export const MOCK_FINANCIAL_DATA: FinancialData[] = [
  { month: "Jan", revenue: 125000, expenses: 95000, cashflow: 30000 },
  { month: "Feb", revenue: 142000, expenses: 98000, cashflow: 44000 },
  { month: "Mar", revenue: 158000, expenses: 102000, cashflow: 56000 },
  { month: "Apr", revenue: 165000, expenses: 108000, cashflow: 57000 },
  { month: "May", revenue: 148000, expenses: 112000, cashflow: 36000 },
  { month: "Jun", revenue: 175000, expenses: 115000, cashflow: 60000 },
  { month: "Jul", revenue: 182000, expenses: 118000, cashflow: 64000 },
  { month: "Aug", revenue: 195000, expenses: 122000, cashflow: 73000 },
  { month: "Sep", revenue: 188000, expenses: 125000, cashflow: 63000 },
  { month: "Oct", revenue: 205000, expenses: 128000, cashflow: 77000 },
  { month: "Nov", revenue: 218000, expenses: 132000, cashflow: 86000 },
  { month: "Dec", revenue: 235000, expenses: 138000, cashflow: 97000 },
];

export const STORAGE_KEY = "mini_lending_app_onboarding";

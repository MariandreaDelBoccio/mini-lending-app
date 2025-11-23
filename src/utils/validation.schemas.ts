import { z } from 'zod';
import * as IBAN from 'iban';

// Company validation schema
export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  taxId: z.string().min(5, 'Tax ID must be at least 5 characters').regex(/^[A-Z0-9-]+$/i, 'Tax ID must contain only letters, numbers, and hyphens'),
  industry: z.string().min(1, 'Please select an industry'),
  foundedYear: z.number().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
  employeeCount: z.number().min(1, 'Must have at least 1 employee'),
});

// Legal representative validation schema
export const legalRepSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format'),
  identification: z.string().min(5, 'Identification must be at least 5 characters').regex(/^[A-Z0-9]+$/i, 'Identification must contain only letters and numbers'),
});

// Bank info validation schema with country-specific validation
export const bankInfoSchema = z.object({
  bankName: z.string().min(2, 'Bank name must be at least 2 characters'),
  accountNumber: z.string().min(8, 'Account number must be at least 8 characters'),
  country: z.string().min(2, 'Please select a country'),
  averageBalance: z.number().min(0, 'Average balance must be positive'),
}).refine((data) => {
  // Validate IBAN for European countries
  const europeanCountries = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'PT', 'IE', 'GR'];
  if (europeanCountries.includes(data.country)) {
    return IBAN.isValid(data.accountNumber);
  }
  // For US, validate routing + account format (simplified)
  if (data.country === 'US') {
    return /^\d{9,17}$/.test(data.accountNumber.replace(/\s/g, ''));
  }
  // For other countries, basic validation
  return data.accountNumber.length >= 8;
}, {
  message: 'Invalid account number format for selected country',
  path: ['accountNumber'],
});

// Financial data validation
export const financialDataSchema = z.array(z.object({
  month: z.string(),
  revenue: z.number(),
  expenses: z.number(),
  cashflow: z.number(),
})).min(1, 'At least one month of financial data is required');

export type CompanyFormData = z.infer<typeof companySchema>;
export type LegalRepFormData = z.infer<typeof legalRepSchema>;
export type BankInfoFormData = z.infer<typeof bankInfoSchema>;

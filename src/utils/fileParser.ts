import Papa from 'papaparse';
import { FinancialData } from '@/shared/types/common.types';

export const parseCSV = (file: File): Promise<FinancialData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data.map((row: any) => ({
            month: row.month || row.Month || row.date || row.Date,
            revenue: parseFloat(row.revenue || row.Revenue || 0),
            expenses: parseFloat(row.expenses || row.Expenses || 0),
            cashflow: parseFloat(row.cashflow || row.Cashflow || row.cash_flow || 0),
          }));
          resolve(data.filter(d => d.month && !isNaN(d.revenue)));
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const parsePDF = async (file: File): Promise<FinancialData[]> => {
  // For PDF parsing, we'll simulate AI extraction
  // In production, you'd use a service like AWS Textract, Google Document AI, or pdf.js
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Return mock data as if extracted from PDF
      const mockExtractedData: FinancialData[] = [
        { month: '2024-01', revenue: 125000, expenses: 95000, cashflow: 30000 },
        { month: '2024-02', revenue: 132000, expenses: 98000, cashflow: 34000 },
        { month: '2024-03', revenue: 145000, expenses: 102000, cashflow: 43000 },
      ];
      resolve(mockExtractedData);
    }, 2000);
  });
};

export const parseFinancialFile = async (file: File): Promise<FinancialData[]> => {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  
  if (fileType === 'csv') {
    return parseCSV(file);
  } else if (fileType === 'pdf') {
    return parsePDF(file);
  } else {
    throw new Error('Unsupported file type. Please upload CSV or PDF files.');
  }
};

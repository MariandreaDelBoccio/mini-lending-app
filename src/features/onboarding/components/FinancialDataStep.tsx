import { MOCK_FINANCIAL_DATA } from "@/api/mockData";
import { Button, DataTable } from "@/shared/components";
import { FinancialData } from "@/shared/types/common.types";

export const FinancialDataStep: React.FC<{
  data: FinancialData[];
  onChange: (data: FinancialData[]) => void;
}> = ({ data, onChange }) => {
  const loadSampleData = () => {
    onChange(MOCK_FINANCIAL_DATA);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Data</h2>
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Upload your financial data or use our sample dataset for
          demonstration.
        </p>
        <Button onClick={loadSampleData} variant="outline">
          Load Sample Data
        </Button>
      </div>
      {data && data.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Preview ({data.length} months)</h3>
          <DataTable data={data.slice(0, 6)} />
        </div>
      )}
    </div>
  );
};

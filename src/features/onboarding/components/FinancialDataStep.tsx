import { MOCK_FINANCIAL_DATA } from "@/api/mockData";
import { Button, DataTable } from "@/shared/components";
import { FinancialData } from "@/shared/types/common.types";
import { parseFinancialFile } from "@/utils/fileParser";
import { useState, useRef } from "react";

export const FinancialDataStep: React.FC<{
  data: FinancialData[];
  onChange: (data: FinancialData[]) => void;
}> = ({ data, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSampleData = () => {
    onChange(MOCK_FINANCIAL_DATA);
    setError("");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const parsedData = await parseFinancialFile(file);
      if (parsedData.length === 0) {
        throw new Error("No valid financial data found in file");
      }
      onChange(parsedData);
    } catch (err: any) {
      setError(err.message || "Failed to parse file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Data</h2>
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Upload your financial data (CSV or PDF) or use our sample dataset for demonstration.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={loadSampleData} variant="outline">
            Load Sample Data
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={uploading}
          >
            {uploading ? "Processing..." : "📄 Upload CSV/PDF"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
        {uploading && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
            🤖 AI is extracting financial data from your document...
          </div>
        )}
      </div>
      {data && data.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Preview ({data.length} months)</h3>
          <DataTable data={data.slice(0, 6)} />
          {data.length > 6 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing first 6 of {data.length} months
            </p>
          )}
        </div>
      )}
    </div>
  );
};

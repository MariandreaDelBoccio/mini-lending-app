import { Input, Select } from "@/shared/components";
import { CompanyInfo } from "@/shared/types/common.types";

export const CompanyInfoStep: React.FC<{
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}> = ({ data, onChange }) => {
  const industries = [
    { value: "", label: "Select an industry" },
    { value: "technology", label: "Technology" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "services", label: "Services" },
    { value: "healthcare", label: "Healthcare" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Company Information</h2>
      <Input
        label="Company Name"
        value={data.name || ""}
        onChange={(v) => onChange({ ...data, name: v })}
        placeholder="Enter company name"
        required
      />
      <Input
        label="Tax ID / EIN"
        value={data.taxId || ""}
        onChange={(v) => onChange({ ...data, taxId: v })}
        placeholder="e.g., 12-3456789"
        required
      />
      <Select
        label="Industry"
        value={data.industry || ""}
        onChange={(v) => onChange({ ...data, industry: v })}
        options={industries}
        required
      />
      <Input
        label="Founded Year"
        type="number"
        value={data.foundedYear || ""}
        onChange={(v) => onChange({ ...data, foundedYear: parseInt(v) || 0 })}
        placeholder="e.g., 2020"
        required
      />
      <Input
        label="Number of Employees"
        type="number"
        value={data.employeeCount || ""}
        onChange={(v) => onChange({ ...data, employeeCount: parseInt(v) || 0 })}
        placeholder="e.g., 50"
        required
      />
    </div>
  );
};

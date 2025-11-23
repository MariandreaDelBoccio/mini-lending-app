import { Input, Select } from "@/shared/components";
import { CompanyInfo } from "@/shared/types/common.types";
import { companySchema } from "@/utils/validation.schemas";
import { useState } from "react";

export const CompanyInfoStep: React.FC<{
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    { value: "", label: "Select an industry" },
    { value: "technology", label: "Technology" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "services", label: "Services" },
    { value: "healthcare", label: "Healthcare" },
  ];

  const validateField = (field: keyof CompanyInfo, value: any) => {
    try {
      companySchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: "" }));
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [field]: error.errors[0]?.message || "Invalid value" }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Company Information</h2>
      <Input
        label="Company Name"
        value={data.name || ""}
        onChange={(v) => {
          onChange({ ...data, name: v });
          validateField("name", v);
        }}
        error={errors.name}
        required
      />
      <Input
        label="Tax ID / EIN"
        value={data.taxId || ""}
        onChange={(v) => {
          onChange({ ...data, taxId: v });
          validateField("taxId", v);
        }}
        error={errors.taxId}
        placeholder="e.g., 12-3456789"
        required
      />
      <Select
        label="Industry"
        value={data.industry || ""}
        onChange={(v) => {
          onChange({ ...data, industry: v });
          validateField("industry", v);
        }}
        options={industries}
        error={errors.industry}
        required
      />
      <Input
        label="Founded Year"
        type="number"
        value={data.foundedYear || ""}
        onChange={(v) => {
          const year = parseInt(v) || 0;
          onChange({ ...data, foundedYear: year });
          validateField("foundedYear", year);
        }}
        error={errors.foundedYear}
        required
      />
      <Input
        label="Number of Employees"
        type="number"
        value={data.employeeCount || ""}
        onChange={(v) => {
          const count = parseInt(v) || 0;
          onChange({ ...data, employeeCount: count });
          validateField("employeeCount", count);
        }}
        error={errors.employeeCount}
        required
      />
    </div>
  );
};

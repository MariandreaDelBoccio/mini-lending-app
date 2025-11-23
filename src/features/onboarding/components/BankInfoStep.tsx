import { Input, Select } from "@/shared/components";
import { BankInfo } from "@/shared/types/common.types";
import { bankInfoSchema } from "@/utils/validation.schemas";
import { useState } from "react";

export const BankInfoStep: React.FC<{
  data: BankInfo;
  onChange: (data: BankInfo) => void;
}> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    { value: "", label: "Select a country" },
    { value: "US", label: "United States" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "ES", label: "Spain" },
    { value: "IT", label: "Italy" },
    { value: "NL", label: "Netherlands" },
    { value: "BE", label: "Belgium" },
    { value: "AT", label: "Austria" },
    { value: "PT", label: "Portugal" },
    { value: "IE", label: "Ireland" },
    { value: "GR", label: "Greece" },
    { value: "MX", label: "Mexico" },
    { value: "BR", label: "Brazil" },
  ];

  const validateAll = (updatedData: BankInfo) => {
    try {
      bankInfoSchema.parse(updatedData);
      setErrors({});
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const getAccountPlaceholder = () => {
    const europeanCountries = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'PT', 'IE', 'GR'];
    if (europeanCountries.includes(data.country || '')) {
      return 'IBAN: e.g., DE89370400440532013000';
    } else if (data.country === 'US') {
      return 'e.g., 123456789012345';
    }
    return 'Enter account number';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bank Information</h2>
      <Input
        label="Bank Name"
        value={data.bankName || ""}
        onChange={(v) => {
          const updated = { ...data, bankName: v };
          onChange(updated);
          validateAll(updated);
        }}
        error={errors.bankName}
        required
      />
      <Select
        label="Country"
        value={data.country || ""}
        onChange={(v) => {
          const updated = { ...data, country: v };
          onChange(updated);
          validateAll(updated);
        }}
        options={countries}
        error={errors.country}
        required
      />
      <Input
        label="Account Number"
        value={data.accountNumber || ""}
        onChange={(v) => {
          const updated = { ...data, accountNumber: v };
          onChange(updated);
          validateAll(updated);
        }}
        error={errors.accountNumber}
        placeholder={getAccountPlaceholder()}
        required
      />
      <Input
        label="Average Balance (Last 6 months)"
        type="number"
        value={data.averageBalance || ""}
        onChange={(v) => {
          const balance = parseFloat(v) || 0;
          const updated = { ...data, averageBalance: balance };
          onChange(updated);
          validateAll(updated);
        }}
        error={errors.averageBalance}
        required
      />
    </div>
  );
};

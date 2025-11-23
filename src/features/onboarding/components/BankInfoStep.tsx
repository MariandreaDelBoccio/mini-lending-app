import { Input, Select } from "@/shared/components";
import { BankInfo } from "@/shared/types/common.types";

export const BankInfoStep: React.FC<{
  data: BankInfo;
  onChange: (data: BankInfo) => void;
}> = ({ data, onChange }) => {
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
        onChange={(v) => onChange({ ...data, bankName: v })}
        placeholder="Enter bank name"
        required
      />
      <Select
        label="Country"
        value={data.country || ""}
        onChange={(v) => onChange({ ...data, country: v })}
        options={countries}
        required
      />
      <Input
        label="Account Number"
        value={data.accountNumber || ""}
        onChange={(v) => onChange({ ...data, accountNumber: v })}
        placeholder={getAccountPlaceholder()}
        required
      />
      <Input
        label="Average Balance (Last 6 months)"
        type="number"
        value={data.averageBalance || ""}
        onChange={(v) => onChange({ ...data, averageBalance: parseFloat(v) || 0 })}
        placeholder="e.g., 50000"
        required
      />
    </div>
  );
};

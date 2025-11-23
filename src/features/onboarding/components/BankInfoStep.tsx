import { Input } from "@/shared/components";
import { BankInfo } from "@/shared/types/common.types";

export const BankInfoStep: React.FC<{
  data: BankInfo;
  onChange: (data: BankInfo) => void;
}> = ({ data, onChange }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Bank Information</h2>
    <Input
      label="Bank Name"
      value={data.bankName || ""}
      onChange={(v) => onChange({ ...data, bankName: v })}
      required
    />
    <Input
      label="Account Number"
      value={data.accountNumber || ""}
      onChange={(v) => onChange({ ...data, accountNumber: v })}
      required
    />
    <Input
      label="Average Balance (Last 6 months)"
      type="number"
      value={data.averageBalance || ""}
      onChange={(v) =>
        onChange({ ...data, averageBalance: parseFloat(v) || 0 })
      }
      required
    />
  </div>
);

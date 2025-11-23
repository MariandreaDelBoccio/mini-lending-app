import { Input } from "@/shared/components";
import { LegalRepresentative } from "@/shared/types/common.types";

export const LegalRepStep: React.FC<{
  data: LegalRepresentative;
  onChange: (data: LegalRepresentative) => void;
}> = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Legal Representative</h2>
      <Input
        label="Full Name"
        value={data.fullName || ""}
        onChange={(v) => onChange({ ...data, fullName: v })}
        placeholder="Enter full name"
        required
      />
      <Input
        label="Email"
        type="email"
        value={data.email || ""}
        onChange={(v) => onChange({ ...data, email: v })}
        placeholder="email@example.com"
        required
      />
      <Input
        label="Phone"
        type="tel"
        value={data.phone || ""}
        onChange={(v) => onChange({ ...data, phone: v })}
        placeholder="+1 (555) 123-4567"
        required
      />
      <Input
        label="Identification (ID/Passport)"
        value={data.identification || ""}
        onChange={(v) => onChange({ ...data, identification: v })}
        placeholder="e.g., AB123456"
        required
      />
    </div>
  );
};

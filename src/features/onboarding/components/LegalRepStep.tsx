import { Input } from "@/shared/components";
import { LegalRepresentative } from "@/shared/types/common.types";
import { legalRepSchema } from "@/utils/validation.schemas";
import { useState } from "react";

export const LegalRepStep: React.FC<{
  data: LegalRepresentative;
  onChange: (data: LegalRepresentative) => void;
}> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: keyof LegalRepresentative, value: any) => {
    try {
      legalRepSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: "" }));
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [field]: error.errors[0]?.message || "Invalid value" }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Legal Representative</h2>
      <Input
        label="Full Name"
        value={data.fullName || ""}
        onChange={(v) => {
          onChange({ ...data, fullName: v });
          validateField("fullName", v);
        }}
        error={errors.fullName}
        required
      />
      <Input
        label="Email"
        type="email"
        value={data.email || ""}
        onChange={(v) => {
          onChange({ ...data, email: v });
          validateField("email", v);
        }}
        error={errors.email}
        required
      />
      <Input
        label="Phone"
        type="tel"
        value={data.phone || ""}
        onChange={(v) => {
          onChange({ ...data, phone: v });
          validateField("phone", v);
        }}
        error={errors.phone}
        placeholder="+1 (555) 123-4567"
        required
      />
      <Input
        label="Identification (ID/Passport)"
        value={data.identification || ""}
        onChange={(v) => {
          onChange({ ...data, identification: v });
          validateField("identification", v);
        }}
        error={errors.identification}
        placeholder="e.g., AB123456"
        required
      />
    </div>
  );
};

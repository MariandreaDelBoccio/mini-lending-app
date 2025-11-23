import { Card } from "@/shared/components";
import { OnboardingData } from "@/shared/types/common.types";

export const SummaryStep: React.FC<{
  data: OnboardingData;
}> = ({ data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Summary & Confirmation</h2>

    <Card title="Company" className="mb-4">
      <div className="space-y-2 text-sm">
        <div>
          <strong>Name:</strong> {data.company?.name}
        </div>
        <div>
          <strong>Tax ID:</strong> {data.company?.taxId}
        </div>
        <div>
          <strong>Industry:</strong> {data.company?.industry}
        </div>
        <div>
          <strong>Founded:</strong> {data.company?.foundedYear}
        </div>
      </div>
    </Card>

    <Card title="Representative" className="mb-4">
      <div className="space-y-2 text-sm">
        <div>
          <strong>Name:</strong> {data.representative?.fullName}
        </div>
        <div>
          <strong>Email:</strong> {data.representative?.email}
        </div>
        <div>
          <strong>Phone:</strong> {data.representative?.phone}
        </div>
      </div>
    </Card>

    <Card title="Financial Data" className="mb-4">
      <div className="text-sm">
        {data.financials?.length || 0} months of financial data uploaded
      </div>
    </Card>

    <Card title="Bank" className="mb-4">
      <div className="space-y-2 text-sm">
        <div>
          <strong>Bank:</strong> {data.bankInfo?.bankName}
        </div>
        <div>
          <strong>Avg Balance:</strong> $
          {data.bankInfo?.averageBalance?.toLocaleString()}
        </div>
      </div>
    </Card>
  </div>
);

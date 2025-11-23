import { mockAPI } from "@/api/mockAPI";
import { Button, Card, Stepper } from "@/shared/components";
import {
  BankInfo,
  CompanyInfo,
  LegalRepresentative,
  OnboardingData,
} from "@/shared/types/common.types";
import { useEffect, useState } from "react";
import { CompanyInfoStep } from "./components/CompanyInfoStep";
import { LegalRepStep } from "./components/LegalRepStep";
import { FinancialDataStep } from "./components/FinancialDataStep";
import { BankInfoStep } from "./components/BankInfoStep";
import { SummaryStep } from "./components/SummaryStep";

export const OnboardingWizard: React.FC<{
  onComplete: () => void;
  editMode?: boolean;
}> = ({ onComplete, editMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(false);

  const steps = ["Company", "Representative", "Financials", "Bank", "Summary"];

  useEffect(() => {
    const loadData = async () => {
      const saved = await mockAPI.getOnboarding();
      if (saved && Object.keys(saved).length > 0) {
        setData(saved);
        // If in edit mode and data exists, start at summary
        if (editMode && saved.company) {
          setCurrentStep(steps.length - 1);
        }
      }
    };
    loadData();
  }, [editMode]);

  const saveProgress = async () => {
    await mockAPI.saveOnboarding(data);
  };

  const handleNext = async () => {
    await saveProgress();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      await mockAPI.submitOnboarding(data);
      setLoading(false);
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          data.company?.name &&
          data.company?.taxId &&
          data.company?.industry &&
          data.company?.foundedYear &&
          data.company?.employeeCount
        );
      case 1:
        return (
          data.representative?.fullName &&
          data.representative?.email &&
          data.representative?.phone &&
          data.representative?.identification
        );
      case 2:
        return data.financials && data.financials.length > 0;
      case 3:
        return (
          data.bankInfo?.bankName &&
          data.bankInfo?.accountNumber &&
          data.bankInfo?.country &&
          data.bankInfo?.averageBalance !== undefined
        );
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="mb-8">
            {currentStep === 0 && (
              <CompanyInfoStep
                data={data.company || ({} as CompanyInfo)}
                onChange={(company) => setData({ ...data, company })}
              />
            )}
            {currentStep === 1 && (
              <LegalRepStep
                data={data.representative || ({} as LegalRepresentative)}
                onChange={(representative) =>
                  setData({ ...data, representative })
                }
              />
            )}
            {currentStep === 2 && (
              <FinancialDataStep
                data={data.financials || []}
                onChange={(financials) => setData({ ...data, financials })}
              />
            )}
            {currentStep === 3 && (
              <BankInfoStep
                data={data.bankInfo || ({} as BankInfo)}
                onChange={(bankInfo) => setData({ ...data, bankInfo })}
              />
            )}
            {currentStep === 4 && <SummaryStep data={data} />}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed() || loading}>
              {loading
                ? "Submitting..."
                : currentStep === steps.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

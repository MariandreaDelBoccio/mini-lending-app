import { useEffect, useState } from "react";
import { OnboardingData } from "./shared/types/common.types";
import { mockAPI } from "./api/mockAPI";
import { OnboardingWizard } from "./features/onboarding/OnboardingWizard";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import { CreditEvaluation } from "./features/credit-evaluation/components/CreditEvaluation";
import { Button, Card } from "./shared/components";
import { AIAssistant } from "./features/ai-assistant/components/AIAssistant";

const App: React.FC = () => {
  const [view, setView] = useState<"onboarding" | "dashboard" | "evaluation">(
    "onboarding"
  );
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [aiOpen, setAiOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const saved = await mockAPI.getOnboarding();
      if (saved && saved.company) {
        setOnboardingData(saved);
        setView("dashboard");
      }
    };
    loadData();
  }, []);

  const handleOnboardingComplete = async () => {
    const saved = await mockAPI.getOnboarding();
    setOnboardingData(saved);
    setView("dashboard");
  };

  if (view === "onboarding") {
    return (
      <OnboardingWizard
        onComplete={handleOnboardingComplete}
        editMode={!!onboardingData.company}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-white shadow-lg flex flex-col">
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-600">LendingPro</h2>
            <p className="text-xs text-gray-500 mt-1">SME Credit Platform</p>
          </div>

          <nav className="px-4 space-y-2 flex-1">
            <button
              onClick={() => setView("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                view === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setView("evaluation")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                view === "evaluation"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              🎯 Credit Evaluation
            </button>
            <button
              onClick={() => setView("onboarding")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              ⚙️ Settings
            </button>
          </nav>

          <div className="p-4 mt-auto">
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-sm">
                <div className="font-semibold mb-1">
                  {onboardingData.company?.name}
                </div>
                <div className="text-xs text-gray-600">
                  {onboardingData.representative?.email}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ☰
          </button>

          <div className="flex items-center gap-4">
            <Button onClick={() => setAiOpen(!aiOpen)} variant="outline">
              🤖 AI Assistant
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {view === "dashboard" && <Dashboard data={onboardingData} />}
          {view === "evaluation" && <CreditEvaluation data={onboardingData} />}
        </main>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistant
        data={onboardingData}
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />
    </div>
  );
};

export default App;

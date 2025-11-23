import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, idx) => (
      <div key={idx} className="flex items-center flex-1">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              idx <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {idx + 1}
          </div>
          <span className="text-xs mt-2 text-center">{step}</span>
        </div>
        {idx < steps.length - 1 && (
          <div
            className={`flex-1 h-1 mx-2 ${
              idx < currentStep ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

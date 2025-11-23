import React from "react";
import { Card } from "./Card";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
}) => (
  <Card className="flex flex-col">
    <div className="text-sm text-gray-600 mb-1">{title}</div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    {subtitle && (
      <div
        className={`text-sm ${
          trend === "up"
            ? "text-green-600"
            : trend === "down"
            ? "text-red-600"
            : "text-gray-500"
        }`}
      >
        {subtitle}
      </div>
    )}
  </Card>
);

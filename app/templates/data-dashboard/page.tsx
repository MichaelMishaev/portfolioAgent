import { DataDashboardTemplate } from "@/components/templates/data-dashboard/data-dashboard-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Data Visualization Dashboard - Portfolio Template",
  description: "Interactive data dashboard with charts, graphs, and real-time metrics visualization.",
};

export default function DataDashboardPage() {
  return (
    <TemplateLayout>
      <DataDashboardTemplate />
    </TemplateLayout>
  );}

import { VoiceFirstTemplate } from "@/components/templates/voice-first/voice-first-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Voice-First Conversational - Portfolio Template",
  description: "Voice-activated interface with conversational UI and speech interaction patterns.",
};

export default function VoiceFirstPage() {
  return (
    <TemplateLayout>
      <VoiceFirstTemplate />
    </TemplateLayout>
  );}

/**
 * Preview Registry
 *
 * Centralized mapping of template IDs to their custom preview components.
 * This makes it easy to manage preview assignments and add new custom previews.
 *
 * Usage:
 * - Add new custom preview components to this registry
 * - Templates not in the registry will use DefaultPreview
 * - Import and use getPreviewComponent() in your preview components
 */

import { ComponentType } from "react";
import { TemplateConfig } from "./template-registry";

// Import all preview components
import { DefaultPreview } from "@/components/style-preview/template-previews/default-preview";
import { MinimalistPreview } from "@/components/style-preview/template-previews/minimalist-preview";
import { DarkModePreview } from "@/components/style-preview/template-previews/dark-mode-preview";
import { ThreeDImmersivePreview } from "@/components/style-preview/template-previews/3d-immersive-preview";
import { NeoBrutalistPreview } from "@/components/style-preview/template-previews/neo-brutalist-preview";
import { KineticTypographyPreview } from "@/components/style-preview/template-previews/kinetic-typography-preview";
import { OrganicLiquidPreview } from "@/components/style-preview/template-previews/organic-liquid-preview";
import { CollageMaximalistPreview } from "@/components/style-preview/template-previews/collage-maximalist-preview";
import { Y2KRetroPreview } from "@/components/style-preview/template-previews/y2k-retro-preview";
import { VoiceFirstPreview } from "@/components/style-preview/template-previews/voice-first-preview";

/**
 * Preview component props interface
 */
export interface PreviewComponentProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

/**
 * Type for preview components
 */
export type PreviewComponent = ComponentType<PreviewComponentProps>;

/**
 * Registry mapping template IDs to their preview components
 *
 * Add new mappings here when creating custom previews:
 * "template-id": CustomPreviewComponent
 */
export const PREVIEW_REGISTRY: Record<string, PreviewComponent> = {
  // Original custom previews
  "minimalist": MinimalistPreview,
  "dark-mode": DarkModePreview,

  // Phase 1: Advanced interaction previews
  "3d-immersive": ThreeDImmersivePreview,
  "neo-brutalist": NeoBrutalistPreview,
  "kinetic-typography": KineticTypographyPreview,

  // Phase 2: Creative expression previews
  "organic-liquid": OrganicLiquidPreview,
  "collage-maximalist": CollageMaximalistPreview,
  "y2k-retro": Y2KRetroPreview,
  "voice-first": VoiceFirstPreview,

  // Add more custom previews here as needed
  // "template-id": PreviewComponent,
};

/**
 * Get the appropriate preview component for a template
 *
 * @param templateId - The ID of the template
 * @returns The preview component to use (custom or default)
 */
export function getPreviewComponent(templateId: string): PreviewComponent {
  return PREVIEW_REGISTRY[templateId] || DefaultPreview;
}

/**
 * Check if a template has a custom preview
 *
 * @param templateId - The ID of the template
 * @returns True if template has custom preview, false otherwise
 */
export function hasCustomPreview(templateId: string): boolean {
  return templateId in PREVIEW_REGISTRY;
}

/**
 * Get list of all template IDs with custom previews
 *
 * @returns Array of template IDs that have custom previews
 */
export function getCustomPreviewTemplateIds(): string[] {
  return Object.keys(PREVIEW_REGISTRY);
}

/**
 * Get count of templates with custom previews
 *
 * @returns Number of templates with custom previews
 */
export function getCustomPreviewCount(): number {
  return Object.keys(PREVIEW_REGISTRY).length;
}

/**
 * Preview Registry Statistics
 */
export const PREVIEW_STATS = {
  /**
   * Total number of custom previews registered
   */
  get totalCustomPreviews(): number {
    return getCustomPreviewCount();
  },

  /**
   * List of all template IDs with custom previews
   */
  get customPreviewIds(): string[] {
    return getCustomPreviewTemplateIds();
  },

  /**
   * Check if registry is properly initialized
   */
  get isInitialized(): boolean {
    return Object.keys(PREVIEW_REGISTRY).length > 0;
  },
};

// Export default preview for convenience
export { DefaultPreview };

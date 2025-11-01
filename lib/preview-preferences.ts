/**
 * Preview Preferences Management
 * Handles saving, loading, and exporting user customization preferences
 */

export interface PreviewPreferences {
  firstName: string;
  lastName: string;
  title: string;
  avatarImage: string | null;
  accentColor?: string;
  templateId: string;
  savedAt: string;
  name?: string; // User-defined name for the preset
}

const STORAGE_KEY = "portfolio_preview_preferences";
const PRESETS_KEY = "portfolio_preview_presets";

/**
 * Save current preferences to localStorage
 */
export function savePreferences(preferences: PreviewPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error("Failed to save preferences:", error);
    throw new Error("Could not save preferences to browser storage");
  }
}

/**
 * Load preferences from localStorage
 */
export function loadPreferences(): PreviewPreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const preferences = JSON.parse(stored);
    return preferences;
  } catch (error) {
    console.error("Failed to load preferences:", error);
    return null;
  }
}

/**
 * Clear saved preferences
 */
export function clearPreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear preferences:", error);
  }
}

/**
 * Save a named preset
 */
export function savePreset(preferences: PreviewPreferences, name: string): void {
  try {
    const presets = loadAllPresets();
    const newPreset = { ...preferences, name, savedAt: new Date().toISOString() };

    // Add or update preset
    const existingIndex = presets.findIndex(p => p.name === name);
    if (existingIndex >= 0) {
      presets[existingIndex] = newPreset;
    } else {
      presets.push(newPreset);
    }

    // Limit to 10 presets
    if (presets.length > 10) {
      presets.shift(); // Remove oldest
    }

    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error("Failed to save preset:", error);
    throw new Error("Could not save preset");
  }
}

/**
 * Load all saved presets
 */
export function loadAllPresets(): PreviewPreferences[] {
  try {
    const stored = localStorage.getItem(PRESETS_KEY);
    if (!stored) return [];

    const presets = JSON.parse(stored);
    return Array.isArray(presets) ? presets : [];
  } catch (error) {
    console.error("Failed to load presets:", error);
    return [];
  }
}

/**
 * Delete a named preset
 */
export function deletePreset(name: string): void {
  try {
    const presets = loadAllPresets();
    const filtered = presets.filter(p => p.name !== name);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete preset:", error);
  }
}

/**
 * Export preferences as JSON file
 */
export function exportPreferencesAsJSON(preferences: PreviewPreferences): void {
  try {
    const dataStr = JSON.stringify(preferences, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-preview-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export preferences:", error);
    throw new Error("Could not export preferences");
  }
}

/**
 * Import preferences from JSON file
 */
export function importPreferencesFromFile(file: File): Promise<PreviewPreferences> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const preferences = JSON.parse(text) as PreviewPreferences;

        // Validate the structure
        if (!preferences.templateId || typeof preferences.firstName !== "string") {
          throw new Error("Invalid preferences file format");
        }

        resolve(preferences);
      } catch (error) {
        reject(new Error("Failed to parse preferences file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
}

/**
 * Generate shareable URL with encoded preferences
 */
export function generateShareableURL(preferences: PreviewPreferences): string {
  try {
    const encoded = btoa(JSON.stringify(preferences));
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?preview=${encoded}`;
  } catch (error) {
    console.error("Failed to generate shareable URL:", error);
    throw new Error("Could not generate shareable URL");
  }
}

/**
 * Load preferences from URL query parameter
 */
export function loadPreferencesFromURL(): PreviewPreferences | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("preview");

    if (!encoded) return null;

    const decoded = atob(encoded);
    const preferences = JSON.parse(decoded) as PreviewPreferences;
    return preferences;
  } catch (error) {
    console.error("Failed to load preferences from URL:", error);
    return null;
  }
}

/**
 * Copy shareable URL to clipboard
 */
export async function copyShareableLinkToClipboard(preferences: PreviewPreferences): Promise<void> {
  try {
    const url = generateShareableURL(preferences);
    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw new Error("Could not copy link to clipboard");
  }
}

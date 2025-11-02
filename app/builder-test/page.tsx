"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Dynamic imports to avoid SSR issues with drag-and-drop libraries
const CraftJSPrototype = dynamic(
  () => import("@/components/builder-prototypes/craftjs-prototype"),
  { ssr: false, loading: () => <div className="p-8 text-center">Loading Craft.js...</div> }
);

const PuckPrototype = dynamic(
  () => import("@/components/builder-prototypes/puck-prototype"),
  { ssr: false, loading: () => <div className="p-8 text-center">Loading Puck...</div> }
);

export default function BuilderTestPage() {
  const [activeTab, setActiveTab] = useState("craftjs");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-lg font-semibold">Portfolio Builder - Prototype Comparison</h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4 py-3">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Test both prototypes:</strong> Drag sections to reorder, add/remove elements, customize layouts.
            Click "Download Configuration" to export your design.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="craftjs">Craft.js Prototype</TabsTrigger>
            <TabsTrigger value="puck">Puck Prototype</TabsTrigger>
          </TabsList>

          <TabsContent value="craftjs" className="space-y-4">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Craft.js - React Page Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Pros:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Full React integration with your existing components</li>
                    <li>Highly customizable UI and behavior</li>
                    <li>Fine-grained control over drag-and-drop</li>
                    <li>Good documentation and community support</li>
                  </ul>
                  <p className="mt-3"><strong>Try it:</strong> Drag sections from the sidebar to the canvas. Click elements to edit.</p>
                </div>
              </CardContent>
            </Card>
            <CraftJSPrototype />
          </TabsContent>

          <TabsContent value="puck" className="space-y-4">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Puck - Visual Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Pros:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Modern, clean interface out of the box</li>
                    <li>Next.js optimized</li>
                    <li>Minimal setup required</li>
                    <li>Built-in responsive preview</li>
                  </ul>
                  <p className="mt-3"><strong>Try it:</strong> Use the left panel to add components. Drag to reorder.</p>
                </div>
              </CardContent>
            </Card>
            <PuckPrototype />
          </TabsContent>
        </Tabs>

        {/* Comparison Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Feature</th>
                    <th className="text-left py-2 px-4">Craft.js</th>
                    <th className="text-left py-2 px-4">Puck</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Ease of Setup</td>
                    <td className="py-2 px-4">⭐⭐⭐</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Customization</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐⭐</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">UI Quality</td>
                    <td className="py-2 px-4">⭐⭐⭐ (DIY)</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Documentation</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐</td>
                    <td className="py-2 px-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Community</td>
                    <td className="py-2 px-4">⭐⭐⭐⭐</td>
                    <td className="py-2 px-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Bundle Size</td>
                    <td className="py-2 px-4">~20-30KB</td>
                    <td className="py-2 px-4">~40-50KB</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Next.js Support</td>
                    <td className="py-2 px-4">✅ Good</td>
                    <td className="py-2 px-4">✅ Excellent</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Best For</td>
                    <td className="py-2 px-4">Full control, custom UI</td>
                    <td className="py-2 px-4">Fast setup, beautiful defaults</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

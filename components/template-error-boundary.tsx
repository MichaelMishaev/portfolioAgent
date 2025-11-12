"use client";

import React, { Component, type ReactNode } from "react";
import { TemplateErrorFallback } from "./template-error-fallback";

interface Props {
  children: ReactNode;
  templateId?: string;
  templateName?: string;
  templateCategory?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class TemplateErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Console logging for debugging
    console.error("Template Error Boundary caught error:", {
      templateId: this.props.templateId,
      templateName: this.props.templateName,
      category: this.props.templateCategory,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    this.setState({
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <TemplateErrorFallback
          templateId={this.props.templateId}
          templateName={this.props.templateName}
          templateCategory={this.props.templateCategory}
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

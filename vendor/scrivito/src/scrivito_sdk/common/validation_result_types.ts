export type ValidationReport = {
  [severity in ValidationSeverityLevel]: ValidationReportSection;
} & {
  // older SDKs don't provide versions
  objVersion?: string;
};

export interface ValidationReportSection {
  obj: ValidationReportEntry[];
  widgets: WidgetValidationReport[];
}

export interface WidgetValidationReport {
  widgetId: string;
  entries: ValidationReportEntry[];
}

export type ValidationSeverityLevel = 'error' | 'warning' | 'info';

export type ValidationReportEntry =
  | ContentValidationReportEntry
  | AttributeValidationReportEntry;

export interface ContentValidationReportEntry {
  message: string;
  severity: ValidationSeverityLevel;
}

export interface AttributeValidationReportEntry {
  attributeName: string;
  message: string;
  severity: ValidationSeverityLevel;
}

export function isAttributeValidationReportEntry(
  validationReportEntry: ValidationReportEntry
): validationReportEntry is AttributeValidationReportEntry {
  return !!(validationReportEntry as AttributeValidationReportEntry)
    .attributeName;
}

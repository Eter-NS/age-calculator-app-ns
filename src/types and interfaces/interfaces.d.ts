export interface Data {
  days: string;
  months: string;
  years: string;
}

export interface SendFormat {
  day: number;
  month: number;
  year: number;
}

export interface IncomingFormData extends SendFormat {}

export interface ErrorFlags {
  year: boolean;
  month: boolean;
  day: boolean;
  notHistoricDate: boolean;
  emptyInput: boolean;
}

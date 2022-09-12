
  interface Datum {
  requestNationalCode: string;
  requestPhoneNumber: string;
  raw: string;
  response: number;
  requestId: string;
  result: string;
  comment: string;
}

export interface shahkarRes {
  data: Datum[];
  errorCode: number;
  succeeded: boolean;
  message?: any;
  modelState?: any;




}

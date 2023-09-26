// error handling helper to set errors and show errors
export default class ErrorProfiler {
  public errors: string[];
  constructor() {
    this.errors = [];
  }
  getError() {
    return this.errors;
  }
  catchError(message: string) {
    this.errors = [...this.errors, message];
  }
}

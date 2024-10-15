export default class APIError extends Error {
  response: any;
  body: any;
  constructor(response: any, body: any) {
    super();
    this.name = "APIError";
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status}-${response.statusText}`;
  }
}

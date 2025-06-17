declare module '@modelcontextprotocol/sdk/client/http.js' {
  export class HttpClientTransport {
    constructor(options: { url: string });
  }
}

declare module '@modelcontextprotocol/sdk/client/index.js' {
  export class Client {
    constructor(options: { name: string; version: string });
    connect(transport: any): Promise<void>;
  }
} 

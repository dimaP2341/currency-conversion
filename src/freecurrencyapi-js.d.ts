declare module "@everapi/freecurrencyapi-js" {
  interface LatestOptions {
    base_currency?: string | object;
    currencies?: string;
  }

  interface Freecurrencyapi {
    new (apiKey: string): {
      latest: (options?: LatestOptions) => Promise<any>;
      convert: (amount: number, from: string, to: string) => Promise<any>;
    };
  }

  const Freecurrencyapi: Freecurrencyapi;
  export default Freecurrencyapi;
}

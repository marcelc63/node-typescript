import fetch from "node-fetch";

export class TestClient {
  public async test(Params: any): Promise<any> {
    try {
      let url = new URL("https://localhost:8001/v1/shopee/volume");
      let params = {
        keyword: Params.keyword,
      };

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
      });
      return [response.json(), undefined];
    } catch (err) {
      return [undefined, err];
    }
  }
}

import { TokenService } from "../../services/TokenService";
import { makeRequest, RequestData } from "../../utils";

const tokenService = new TokenService();

const tokensURL = "https://lite-api.jup.ag/tokens/v1/all";

(async () => {
  console.log("FETCHING TOKENS...");

  const request: RequestData = {
    url: tokensURL,
    method: "GET"
  };
  const allTokens = await makeRequest(request);
  console.log("TOTAL tokens", allTokens.length);
  await tokenService.createMany(allTokens);
})();

import type { SpartanTokenProvider } from "halo-infinite-api";
import { authenticate, CredentialsAuthenticateInitialResponse } from "@xboxreplay/xboxlive-auth";
import { StaticXstsTicketTokenSpartanTokenProvider } from "halo-infinite-api";

export class XstsTokenProvider implements SpartanTokenProvider {
	constructor(readonly env: Env) {}

  async getSpartanToken(): Promise<string> {
		const credentialsResponse = (await authenticate(this.env.XBOX_USERNAME, this.env.XBOX_PASSWORD, {
      XSTSRelyingParty: "https://prod.xsts.halowaypoint.com/",
    })) as CredentialsAuthenticateInitialResponse;

    // the static xsts provider does some each stuff internally
    // so wrapping it here to make use of it
    return new StaticXstsTicketTokenSpartanTokenProvider(
      credentialsResponse.xsts_token,
    ).getSpartanToken();
  }

  async clearSpartanToken(): Promise<void> {
    return Promise.resolve();
  }
}

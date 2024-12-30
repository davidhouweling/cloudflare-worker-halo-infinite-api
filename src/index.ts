/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { HaloInfiniteClient } from 'halo-infinite-api';
import { XstsTokenProvider } from './token-provider';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const tokenProvider = new XstsTokenProvider(env);
		const client = new HaloInfiniteClient(tokenProvider);

		const user = await client.getUser('soundmanD');

		return new Response(`Hello ${user.xuid}!`);
	},
} satisfies ExportedHandler<Env>;

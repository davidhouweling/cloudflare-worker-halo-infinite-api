# Cloudflare worker + halo-infinite-api

This repo is a reproduction of the issue between [Cloudflare worker](https://developers.cloudflare.com/workers/) and [halo-infinite-api](https://github.com/GravlLift/halo-infinite-api). Specifically https://github.com/GravlLift/halo-infinite-api/issues/3.

## How has this been set up?

1. Following https://developers.cloudflare.com/workers/get-started/guide/ to generate the worker
2. Install `halo-infinite-api`
3. Update `src/index.ts` to import `halo-infinite-api`

## How to test [`halo-infinite-api#3`](https://github.com/GravlLift/halo-infinite-api/issues/3)

1. Create a `.dev.vars` file (basically the same as a `.env` file with the following contents, the actual values are not necessary for the sake of reproducing the issue)
	````
	XBOX_USERNAME=
	XBOX_PASSWORD=
	````
2. `npm install`
3. `npm start` (which will output something similar to...)
		```
		> halo-infinite-api-worker@0.0.0 start
		> wrangler dev


		⛅️ wrangler 3.99.0
		-------------------

		Using vars defined in .dev.vars
		Your worker has access to the following bindings:
		- Vars:
			- XBOX_USERNAME: "(hidden)"
			- XBOX_PASSWORD: "(hidden)"
		[wrangler:inf] Ready on http://127.0.0.1:8787
		⎔ Starting local server...
		X [ERROR] service core:user:halo-infinite-api-worker: Uncaught Error: Disallowed operation called within global scope. Asynchronous I/O (ex: fetch() or connect()), setting a timeout, and generating random values are not allowed within global scope. To fix this error, perform this operation within a handler. https://developers.cloudflare.com/workers/runtime-apis/handlers/

				at null.<anonymous> (index.js:11682:26)



		X [ERROR] The Workers runtime failed to start. There is likely additional logging output above.
		```
4. Whilst the command above is still executing in terminal, open up `.wrangler/tmp/dev-??????/index.js` and then attempt to navigate to line 11682 and you'll see a reference to `cockatiel`
5. In a separate terminal do `npm why cockatiel` and you can see that its being included due to `halo-infinite-api`


import { env } from "$env/dynamic/private";
import PocketBase from "pocketbase";



const initializePocketbase = async () => {
	const client = new PocketBase(env.PB_URL);
	client.autoCancellation(false);
	
	await client.collection("_superusers").authWithPassword(env.PB_EMAIL, env.PB_PW, {
		autoRefreshThreshold: 30 * 60,
	});
	
	return client;
};

const pocketbaseAdminClient = await initializePocketbase();

export { pocketbaseAdminClient };


import { PB_EMAIL, PB_PW, PB_URL } from "$env/static/private";
import PocketBase from "pocketbase";



const initializePocketbase = async () => {
	const client = new PocketBase(PB_URL);
	client.autoCancellation(false);
	
	await client.collection("_superusers").authWithPassword(PB_EMAIL, PB_PW, {
		autoRefreshThreshold: 30 * 60,
	});
	
	return client;
};

const pocketbaseAdminClient = await initializePocketbase();

export { pocketbaseAdminClient };


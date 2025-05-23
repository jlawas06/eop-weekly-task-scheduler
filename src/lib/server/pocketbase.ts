import { VITE_PB, VITE_PB_EMAIL, VITE_PB_PW } from "$env/static/private";
import PocketBase from "pocketbase";



const initializePocketbase = async () => {
	const client = new PocketBase(VITE_PB);
	client.autoCancellation(false);
	
	await client.collection("_superusers").authWithPassword(VITE_PB_EMAIL, VITE_PB_PW, {
		autoRefreshThreshold: 30 * 60,
	});
	
	return client;
};

const pocketbaseAdminClient = await initializePocketbase();

export { pocketbaseAdminClient };


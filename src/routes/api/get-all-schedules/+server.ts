import { getPocketbaseAdminClient } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const pocketbaseAdminClient = await getPocketbaseAdminClient();
		const allSchedules = await pocketbaseAdminClient
			.collection('weekly_schedules')
			.getFullList({
				sort: '-date_start' // Sort by date_start in descending order (newest first)
			});
		return json(allSchedules);
	} catch (error) {
		console.error('Failed to fetch all schedules:', error);
		return json({ error: 'Failed to fetch schedules' }, { status: 500 });
	}
}; 
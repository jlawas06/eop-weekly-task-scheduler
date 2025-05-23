import { pocketbaseAdminClient } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const currentDate = new Date();
    const currentDateFormatted = currentDate.toISOString().split('T')[0];
	const currentWeekSchedule = await pocketbaseAdminClient
		.collection('weekly_schedules')
		.getFirstListItem(`date_start <= '${currentDateFormatted}' && date_end >= '${currentDateFormatted}'`);
	return json(currentWeekSchedule);
};
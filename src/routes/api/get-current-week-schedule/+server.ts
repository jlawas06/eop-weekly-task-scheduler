import { getPocketbaseAdminClient } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const currentDate = new Date();
    const currentDateFormatted = currentDate.getFullYear() + '-' + 
        String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(currentDate.getDate()).padStart(2, '0') + ' ' +
        String(currentDate.getHours()).padStart(2, '0') + ':' +
        String(currentDate.getMinutes()).padStart(2, '0') + ':' +
        String(currentDate.getSeconds()).padStart(2, '0');
	const pocketbaseAdminClient = await getPocketbaseAdminClient();
	const currentWeekSchedule = await pocketbaseAdminClient
		.collection('weekly_schedules')
		.getFirstListItem(`date_start <= '${currentDateFormatted}' && date_end >= '${currentDateFormatted}'`);
	return json(currentWeekSchedule);
};
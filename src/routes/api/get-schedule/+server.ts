import { getPocketbaseAdminClient } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const pocketbaseAdminClient = await getPocketbaseAdminClient();
        const scheduleId = url.searchParams.get('id');
        
        if (scheduleId) {
            // Get specific schedule by ID
            const schedule = await pocketbaseAdminClient
                .collection('weekly_schedules')
                .getOne(scheduleId);
            return json(schedule);
        } else {
            // Get current week schedule
            const currentDate = new Date();
            const currentDateFormatted = currentDate.getFullYear() + '-' + 
                String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                String(currentDate.getDate()).padStart(2, '0') + ' ' +
                String(currentDate.getHours()).padStart(2, '0') + ':' +
                String(currentDate.getMinutes()).padStart(2, '0') + ':' +
                String(currentDate.getSeconds()).padStart(2, '0');
            
            const currentWeekSchedule = await pocketbaseAdminClient
                .collection('weekly_schedules')
                .getFirstListItem(`date_start <= '${currentDateFormatted}' && date_end >= '${currentDateFormatted}'`);
            return json(currentWeekSchedule);
        }
    } catch (error) {
        console.error('Failed to fetch schedule:', error);
        return json({ error: 'Failed to fetch schedule' }, { status: 500 });
    }
}; 
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
    const scheduleId = url.searchParams.get('id');
    
    try {
        let apiUrl = '/api/get-schedule';
        if (scheduleId) {
            apiUrl += `?id=${scheduleId}`;
        }
        
        const response = await fetch(apiUrl);
        const schedule = await response.json();
        
        if (!response.ok) {
            throw new Error(schedule.error || 'Failed to load schedule');
        }
        
        return {
            schedule,
            scheduleId
        };
    } catch (error) {
        console.error('Failed to load schedule:', error);
        return {
            schedule: null,
            scheduleId,
            error: error instanceof Error ? error.message : 'Failed to load schedule'
        };
    }
}; 
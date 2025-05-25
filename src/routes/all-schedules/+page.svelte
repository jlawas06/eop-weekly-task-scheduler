<script lang="ts">
    import { formatDate } from '$lib/utils/dateUtils';
    import { onMount } from 'svelte';
    
    interface DaySchedule {
        day: string;
        members_on_duty: Array<{ name: string; chore: string }>;
        members_off: string[];
    }
    
    interface WeeklySchedule {
        id: string;
        date_start: string;
        date_end: string;
        tasks: {
            week: DaySchedule[];
        };
    }
    
    type ScheduleStatus = 'current' | 'past' | 'future';
    
    let allSchedules: WeeklySchedule[] = [];
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/api/get-all-schedules');
            if (!response.ok) {
                throw new Error('Failed to fetch schedules');
            }
            const result = await response.json();
            allSchedules = result;
        } catch (err) {
            console.error('Failed to load schedules:', err);
            error = err instanceof Error ? err.message : 'Unknown error occurred';
        } finally {
            loading = false;
        }
    });

    function getScheduleStatus(startDate: string, endDate: string): ScheduleStatus {
        // Get current local date (just the date part, no time)
        const now = new Date();
        const currentLocalDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Extract date parts from the datetime strings
        let startDateOnly = startDate;
        let endDateOnly = endDate;
        
        if (startDate.includes('T')) {
            startDateOnly = startDate.split('T')[0];
        }
        if (startDate.includes(' ')) {
            startDateOnly = startDate.split(' ')[0];
        }
        if (endDate.includes('T')) {
            endDateOnly = endDate.split('T')[0];
        }
        if (endDate.includes(' ')) {
            endDateOnly = endDate.split(' ')[0];
        }
        
        // Parse UTC dates from PocketBase and convert to local date (just date part)
        const startUTC = new Date(startDateOnly);
        const endUTC = new Date(endDateOnly);
        
        // Convert UTC dates to local dates (just the date part, no time)
        const startLocalDate = new Date(startUTC.getFullYear(), startUTC.getMonth(), startUTC.getDate());
        const endLocalDate = new Date(endUTC.getFullYear(), endUTC.getMonth(), endUTC.getDate());
        
        if (currentLocalDate >= startLocalDate && currentLocalDate <= endLocalDate) {
            return 'current';
        } else if (currentLocalDate > endLocalDate) {
            return 'past';
        } else {
            return 'future';
        }
    }

    function getStatusBadge(status: ScheduleStatus): string {
        switch (status) {
            case 'current':
                return 'bg-green-100 text-green-800';
            case 'past':
                return 'bg-gray-100 text-gray-600';
            case 'future':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }

    function getStatusText(status: ScheduleStatus): string {
        switch (status) {
            case 'current':
                return 'Current';
            case 'past':
                return 'Past';
            case 'future':
                return 'Upcoming';
            default:
                return 'Unknown';
        }
    }

    function getTotalMembers(schedule: WeeklySchedule): number {
        if (!schedule.tasks?.week) return 0;
        
        const allMembers = new Set<string>();
        schedule.tasks.week.forEach(day => {
            day.members_on_duty?.forEach(member => allMembers.add(member.name));
            day.members_off?.forEach(member => allMembers.add(member));
        });
        
        return allMembers.size;
    }

    function getDaysCount(schedule: WeeklySchedule): number {
        return schedule.tasks?.week?.length || 0;
    }
</script>

<svelte:head>
    <title>All Schedules - EOP Task Scheduler</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">All Schedules</h1>
            <div class="text-sm text-gray-600">
                Total: {allSchedules.length} schedule{allSchedules.length !== 1 ? 's' : ''}
            </div>
        </div>
        
        {#if loading}
            <div class="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg p-6">
                <div class="flex space-x-2 mb-4">
                    <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-4 h-4 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <p class="text-xl text-gray-600 font-medium">Loading schedules</p>
            </div>
        {:else if error}
            <div class="flex justify-center items-center h-64">
                <div class="text-center">
                    <div class="text-xl text-red-600 mb-2">Failed to load schedules</div>
                    <div class="text-gray-500">{error}</div>
                </div>
            </div>
        {:else if allSchedules.length === 0}
            <div class="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
                <div class="text-center">
                    <div class="text-xl text-gray-600 mb-2">No schedules found</div>
                    <div class="text-gray-500">There are no schedules available at the moment.</div>
                </div>
            </div>
        {:else}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Schedule Period
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    End Date
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Days
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Members
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each allSchedules as schedule, index}
                                {@const status = getScheduleStatus(schedule.date_start, schedule.date_end)}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">
                                            Week {allSchedules.length - index}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {formatDate(schedule.date_start)} - {formatDate(schedule.date_end)}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(schedule.date_start)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(schedule.date_end)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {getDaysCount(schedule)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {getTotalMembers(schedule)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusBadge(status)}">
                                            {getStatusText(status)}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a 
                                            href="/schedule?id={schedule.id}" 
                                            class="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                        >
                                            View Details
                                        </a>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Custom animations for loading */
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0,-30px,0);
        }
        70% {
            transform: translate3d(0,-15px,0);
        }
        90% {
            transform: translate3d(0,-4px,0);
        }
    }
</style> 
<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const chores = ['Sweep the floor', 'Cook Dinner', 'Cook Rice', 'Clean the Table', 'Throw the garbage', 'Wash the dishes'];
    
    $: currentWeekSchedule = data.schedule?.tasks || null;
    $: loading = false; // Data is loaded server-side
    $: error = data.error;
    $: scheduleId = data.scheduleId;
</script>

<svelte:head>
    <title>Weekly Task Schedule</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen p-4 md:p-8">
    <div class="max-w-[95%] mx-auto">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Weekly Task Schedule</h1>
                {#if scheduleId}
                    <p class="text-sm text-gray-600 mt-1">Viewing specific schedule (ID: {scheduleId})</p>
                    <a href="/schedule" class="text-sm text-blue-600 hover:text-blue-800 underline">← Back to current schedule</a>
                {:else}
                    <p class="text-sm text-gray-600 mt-1">Viewing current week schedule</p>
                {/if}
            </div>
        </div>
        
        {#if loading}
            <div class="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg p-6">
                <div class="flex space-x-2 mb-4">
                    <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-4 h-4 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <p class="text-xl text-gray-600 font-medium">Loading your schedule</p>
                <div class="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse"></div>
                </div>
            </div>
        {:else if error}
            <div class="flex justify-center items-center h-64">
                <div class="text-xl text-red-600">{error}</div>
            </div>
        {:else if !currentWeekSchedule}
            <div class="flex justify-center items-center h-64">
                <div class="text-xl text-red-600">No schedule data available</div>
            </div>
        {:else}
            <!-- Desktop View -->
            <div id="schedule" class="hidden md:block bg-white rounded-xl shadow-lg p-6">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="min-w-[1200px] w-full border-collapse">
                        <thead>
                            <tr class="gradient-header">
                                <th class="p-4 text-left border-b border-gray-200 sticky left-0 z-10 bg-[#1e40af]">Task</th>
                                {#each currentWeekSchedule.week as day}
                                    <th class="p-4 text-left border-b border-gray-200 min-w-[200px] text-white">
                                        <div class="font-semibold">{day.day}</div>
                                        <div class="text-xs text-blue-100 mt-1">Off Duty: {day.members_off.join(', ')}</div>
                                    </th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            {#each chores as chore, rowIndex}
                                <tr class="hover:bg-gray-100 {rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                                    <td class="p-4 border-b border-gray-200 font-medium gradient-task sticky left-0 z-10">
                                        {chore}
                                    </td>
                                    {#each currentWeekSchedule.week as day, colIndex}
                                        {@const member = day.members_on_duty.find((m: any) => m.chore === chore)}
                                        <td class="p-4 border-b border-gray-200 {colIndex % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}">
                                            {#if member}
                                                <div class="font-medium text-gray-800">{member.name}</div>
                                            {/if}
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Mobile View -->
            <div class="md:hidden space-y-4">
                {#each currentWeekSchedule.week as day}
                    <div class="bg-white rounded-xl shadow-lg p-4">
                        <div class="gradient-header rounded-t-lg p-4 -mx-4 -mt-4 mb-4">
                            <div class="font-semibold text-white">{day.day}</div>
                            <div class="text-xs text-blue-100 mt-1">Off Duty: {day.members_off.join(', ')}</div>
                        </div>
                        <div class="space-y-3">
                            {#each chores as chore}
                                {@const member = day.members_on_duty.find((m: any) => m.chore === chore)}
                                <div class="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                                    <span class="font-medium text-gray-800">{chore}</span>
                                    {#if member}
                                        <span class="text-blue-600 font-medium">{member.name}</span>
                                    {:else}
                                        <span class="text-gray-400">-</span>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .gradient-header {
        background: linear-gradient(to right, #1e40af, #3b82f6);
        color: white;
    }
    .gradient-task {
        background: linear-gradient(to right, #3b82f6, #60a5fa);
        color: white;
    }

    /* Custom scrollbar styling */
    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #3b82f6 #f3f4f6;
    }

    .custom-scrollbar::-webkit-scrollbar {
        height: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #3b82f6;
        border-radius: 4px;
        border: 2px solid #f3f4f6;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #2563eb;
    }
</style> 
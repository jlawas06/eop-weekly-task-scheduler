<script lang="ts">
    import { WEEKLY_TASK_SCHEDULE } from '$lib/constants/tasks';
    
    // Get the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    // Find today's schedule
    const todaySchedule = WEEKLY_TASK_SCHEDULE.week.find(day => day.day === today);
</script>

<svelte:head>
    <title>Today's Tasks</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen p-4 md:p-8">
    <div class="max-w-5xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Today's Tasks ({today})</h1>
            <a href="/schedule" class="text-blue-600 hover:text-blue-800 font-medium">View Full Schedule →</a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            {#if todaySchedule}
                <div class="gradient-header rounded-t-lg p-3 sm:p-4 -mx-4 -mt-4 sm:-mt-6 mb-4 sm:mb-6">
                    <div class="font-semibold text-white text-lg sm:text-xl">{today}'s Assignments</div>
                    <div class="text-xs sm:text-sm text-blue-100 mt-1">
                        <span class="font-medium">Off Duty:</span> {todaySchedule.members_off.join(', ')}
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {#each todaySchedule.members_on_duty as assignment}
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 transition">
                            <div class="flex flex-col mb-2 sm:mb-0">
                                <span class="font-medium text-gray-800">{assignment.chore}</span>
                                <span class="text-xs sm:text-sm text-gray-500">Assigned Task</span>
                            </div>
                            <div class="self-end sm:self-auto sm:text-right">
                                <span class="text-blue-600 font-bold">{assignment.name}</span>
                                <div class="text-xs sm:text-sm text-gray-500">Assigned To</div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="p-4 sm:p-8 text-center">
                    <p class="text-lg text-gray-700">Schedule not found for {today}.</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .gradient-header {
        background: linear-gradient(to right, #1e40af, #3b82f6);
        color: white;
    }
</style> 
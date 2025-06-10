<script lang="ts">
    import { onMount } from 'svelte';
    
    interface Member {
        name: string;
        chore: string;
    }

    interface DaySchedule {
        day: string;
        members_off: string[];
        members_on_duty: Member[];
    }

    interface SpecialTask {
        name: string;
        task: string;
    }

    interface WeekSchedule {
        week: DaySchedule[];
        special_tasks?: SpecialTask[];
    }
    
    // Get the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    let currentWeekSchedule: WeekSchedule | null = null;
    let loading = true;
    let todaySchedule: DaySchedule | null = null;
    let specialTasks: SpecialTask[] | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/api/get-schedule');
            const result = await response.json();
            currentWeekSchedule = result.tasks;
            if (currentWeekSchedule) {
                todaySchedule = currentWeekSchedule.week.find((day: DaySchedule) => day.day === today) || null;
                specialTasks = currentWeekSchedule.special_tasks || null;
            }
        } catch (error) {
            console.error('Failed to load schedule:', error);
        } finally {
            loading = false;
        }
    });
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
        {:else if !currentWeekSchedule}
            <div class="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg p-6">
                <div class="text-xl text-red-600">Failed to load schedule data</div>
            </div>
        {:else}
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

                {#if today === 'Sunday' && specialTasks && specialTasks.length > 0}
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Special Tasks</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                            {#each specialTasks as specialTask}
                                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 transition">
                                    <div class="flex flex-col mb-2 sm:mb-0">
                                        <span class="font-medium text-gray-800">{specialTask.task}</span>
                                        <span class="text-xs sm:text-sm text-gray-500">Special Task</span>
                                    </div>
                                    <div class="self-end sm:self-auto sm:text-right">
                                        <span class="text-blue-600 font-bold">{specialTask.name}</span>
                                        <div class="text-xs sm:text-sm text-gray-500">Assigned To</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .gradient-header {
        background: linear-gradient(to right, #1e40af, #3b82f6);
        color: white;
    }
</style> 
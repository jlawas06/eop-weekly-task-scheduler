<script lang="ts">
    // Get the current day for display
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
</script>

<svelte:head>
    <title>EOP Task Scheduler</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen p-4 md:p-8">
    <div class="max-w-4xl mx-auto pt-4 sm:pt-8">
        <div class="text-center mb-8 sm:mb-12">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">EOP Task Scheduler</h1>
            <p class="text-base sm:text-lg text-gray-600">Manage your team's weekly chores and assignments</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <a href="/today" class="bg-white rounded-xl shadow-lg p-4 sm:p-6 transition hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Today's Tasks</h2>
                <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">View all assignments for {today}</p>
                <span class="text-blue-600 font-medium text-sm sm:text-base">View Today's Tasks →</span>
            </a>
            
            <a href="/schedule" class="bg-white rounded-xl shadow-lg p-4 sm:p-6 transition hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 sm:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Weekly Schedule</h2>
                <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">View the complete weekly chore schedule</p>
                <span class="text-green-600 font-medium text-sm sm:text-base">View Full Schedule →</span>
            </a>
        </div>
    </div>
</div>

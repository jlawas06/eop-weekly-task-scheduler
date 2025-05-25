<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
	
	// Current path is derived from the $page store
	let currentPath = $derived(page.url.pathname);

	// Mobile menu state
	let mobileMenuOpen = $state(false);
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<div class="min-h-screen bg-gray-100">
	<header class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-blue-600">EOP Task Scheduler</a>
					</div>
					<nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<a href="/" class="{currentPath === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
							Home
						</a>
						<a href="/today" class="{currentPath === '/today' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
							Today's Tasks
						</a>
						<a href="/schedule" class="{currentPath === '/schedule' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
							Weekly Schedule
						</a>
						<a href="/all-schedules" class="{currentPath === '/all-schedules' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
							All Schedules
						</a>
					</nav>
				</div>
				<!-- Mobile menu button -->
				<div class="flex items-center sm:hidden">
					<button onclick={toggleMobileMenu} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
						<span class="sr-only">Open main menu</span>
						<!-- Icon when menu is closed -->
						<svg class={!mobileMenuOpen ? 'block h-6 w-6' : 'hidden h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						<!-- Icon when menu is open -->
						<svg class={mobileMenuOpen ? 'block h-6 w-6' : 'hidden h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state -->
		{#if mobileMenuOpen}
			<div class="sm:hidden">
				<div class="pt-2 pb-3 space-y-1">
					<a href="/" onclick={() => mobileMenuOpen = false} class="{currentPath === '/' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
						Home
					</a>
					<a href="/today" onclick={() => mobileMenuOpen = false} class="{currentPath === '/today' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
						Today's Tasks
					</a>
					<a href="/schedule" onclick={() => mobileMenuOpen = false} class="{currentPath === '/schedule' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
						Weekly Schedule
					</a>
					<a href="/all-schedules" onclick={() => mobileMenuOpen = false} class="{currentPath === '/all-schedules' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
						All Schedules
					</a>
				</div>
			</div>
		{/if}
	</header>

	<main>
		{@render children()}
	</main>
</div>

<script lang="ts">
  let { name }: { name: string } = $props();
  let theme = $state('light');
  let showAlert = $state(false);
  let counter = $state(0);

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  function showNotification() {
    showAlert = true;
    setTimeout(() => showAlert = false, 3000);
  }

  function incrementCounter() {
    counter++;
  }
</script>

<svelte:head>
  <title>TailwindCSS + DaisyUI Demo</title>
</svelte:head>

<div data-theme={theme} class="min-h-screen bg-base-100">
  <!-- Hero Section -->
  <div class="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold text-primary-content">Hello {name}!</h1>
        <p class="py-6 text-primary-content">
          Welcome to your Svelte app with TailwindCSS and DaisyUI integration! 
          This demonstrates that both libraries are working properly.
        </p>
        <div class="flex gap-4 justify-center">
          <button class="btn btn-accent" onclick={toggleTheme}>
            Toggle Theme: {theme}
          </button>
          <button class="btn btn-secondary" onclick={showNotification}>
            Show Alert
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alert -->
  {#if showAlert}
    <div class="alert alert-success fixed top-4 right-4 w-auto z-50 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>DaisyUI Alert component is working!</span>
    </div>
  {/if}

  <!-- Main Content -->
  <div class="container mx-auto p-8">
    <h2 class="text-3xl font-bold text-center mb-8">DaisyUI Component Demo</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Card Component -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Card Component</h2>
          <p>This is a DaisyUI card component with TailwindCSS styling.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Action</button>
          </div>
        </div>
      </div>

      <!-- Stats Component -->
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Button Clicks</div>
          <div class="stat-value">{counter}</div>
          <div class="stat-desc">↗︎ Click the button below</div>
        </div>
      </div>

      <!-- Button Varieties -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Button Styles</h3>
          <div class="flex flex-wrap gap-2">
            <button class="btn btn-primary btn-sm" onclick={incrementCounter}>Primary</button>
            <button class="btn btn-secondary btn-sm">Secondary</button>
            <button class="btn btn-accent btn-sm">Accent</button>
            <button class="btn btn-ghost btn-sm">Ghost</button>
          </div>
        </div>
      </div>

      <!-- Badge Components -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Badges</h3>
          <div class="flex flex-wrap gap-2">
            <div class="badge badge-primary">Primary</div>
            <div class="badge badge-secondary">Secondary</div>
            <div class="badge badge-accent">Accent</div>
            <div class="badge badge-ghost">Ghost</div>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Progress</h3>
          <progress class="progress progress-primary w-full" value="70" max="100"></progress>
          <progress class="progress progress-secondary w-full" value="50" max="100"></progress>
        </div>
      </div>

      <!-- Toggle and Checkbox -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Form Controls</h3>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Toggle</span>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Checkbox</span>
              <input type="checkbox" class="checkbox checkbox-secondary" checked />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Info -->
    <div class="divider"></div>
    <div class="text-center">
      <p class="text-base-content/70">
        This demo shows TailwindCSS and DaisyUI working together in Svelte 5.
        Visit <a href="https://daisyui.com/" class="link link-primary">DaisyUI</a> 
        and <a href="https://tailwindcss.com/" class="link link-secondary">TailwindCSS</a> 
        for more information.
      </p>
    </div>
  </div>
</div>

<template>
  <div class="flex h-full items-center justify-center">
    <div class="text-center">
      <div class="mb-4 flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary">
        <span class="text-2xl font-bold text-text-inverse">H</span>
      </div>
      <h1 class="text-lg font-semibold text-text-primary">HotelOS</h1>
      <p class="mt-1 text-sm text-text-secondary">Redirecting to dashboard...</p>
    </div>
  </div>
</template>

<script setup>
// Redirect to dashboard on load
await navigateTo('/dashboard')
</script>

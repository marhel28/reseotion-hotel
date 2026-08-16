<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Mobile overlay -->
    <div
      v-if="uiStore.mobileDrawerOpen"
      class="fixed inset-0 z-30 bg-black/30 lg:hidden"
      @click="uiStore.closeMobileDrawer()"
    />

    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '~/stores/ui'

const uiStore = useUiStore()
</script>

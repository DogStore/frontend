<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Optional: User dashboard header -->
    <header class="bg-white shadow-sm py-4 px-6">
      <h1 class="text-2xl font-bold text-gray-800">My Account</h1>
    </header>

    <!-- Main content area -->
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// Nothing needed here unless you add logic
</script>

<template>
  <div
    class="text-slate-700 h-screen flex flex-col overflow-hidden bg-slate-100"
  >
    <div
      class="flex flex-col h-full max-w-md mx-auto w-full bg-white shadow-2xl relative sm:rounded-xl sm:my-4 sm:h-[95vh] sm:border-4 sm:border-slate-100"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

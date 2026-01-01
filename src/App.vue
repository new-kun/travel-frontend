<script setup lang="ts">

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
        body { font-family: 'Noto Sans TC', 'Noto Sans JP', sans-serif; background-color: #314a7c; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
        .fade-enter-from, .fade-leave-to { opacity: 0; }
        #map-container { z-index: 1; }
        .gps-pulse {
            width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%;
            background-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4);
            animation: pulse-blue 2s infinite;
        }
        @keyframes pulse-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; overflow: hidden; }
        .leaflet-popup-content { margin: 0; width: 200px !important; }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in-up 0.4s ease-out forwards; }
        
    </style>
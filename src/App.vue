<script lang="ts" setup>

import FakeChat from '@/components/FakeChat.vue';

</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col items-center pt-10">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl px-4">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Bienvenido a Fake Chat</h1>
      <p class="text-lg md:text-xl text-gray-400 mb-10">
        Obtén respuestas rápidas de sí o no utilizando nuestro servicio. ¡Perfecto para tus decisiones alocadas!
      </p>
    </div>

    <!-- Chat Component -->
    <div class="w-full flex-grow flex justify-center items-start px-4">
      <div class="w-full max-w-5xl">
        <FakeChat />
      </div>
    </div>
  </div>
</template>
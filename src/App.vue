<script lang="ts" setup>

import FakeChat from '@/componets/FakeChat.vue';

</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
    <!-- Hero Section -->
    <div class="text-center max-w-2xl">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">Bienvenido a Fake Chat</h1>
      <p class="text-lg md:text-xl text-gray-300 mb-8">
        Obtén respuestas rápidas de sí o no utilizando nuestro servicio. ¡Perfecto para tus decisiones alocadas!
      </p>
    </div>

    <!-- Chat Component -->
    <div class="mt-12 w-full max-w-4xl">
      <FakeChat></FakeChat>
    </div>
  </div>
</template>
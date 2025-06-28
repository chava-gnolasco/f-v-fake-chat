<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { useChat } from '@/composable/useChat';
import { getRandomResponse } from '@/services/yesNoService';

const chat = useChat();
const question = ref('');

/**
 * Lifecycle hook that is called when the component is mounted.
 * This function initializes the chat by invoking the `startChat` method
 * from the `chat` object. It ensures that the chat functionality is
 * started as soon as the component is rendered.
 *
 * Note: The `onMounted` hook is asynchronous, allowing for potential
 * asynchronous operations within the initialization process.
 */
onMounted(async () => {
  chat.startChat();
});

/**
 * Create a response by fetching a random answer from the service.
 * @async
 * @function createResponse
 * @description This function retrieves a random response from the `getRandomResponse` service.
 *              It then adds the response to the chat as an 'answer' message.
 * @returns {void} This function does not return a value, but it updates the chat with a new message.
 */
const createResponse = async () => {
  const response = await getRandomResponse();
  chat.addMessage(response ? response.answer : '' ,'answer', response?.image);
}

/**
 * Ask a question an adds a new message to the chat and triggers a response if the message ends with a question mark.
 * 
 * @async
 * @function addMessage
 * @description This function adds the user's input message to the chat as a 'question'. 
 *              If the message ends with a question mark ('?'), it calls the `createResponse` function 
 *              to generate a response. After processing, it clears the input field.
 * 
 * @example
 * // User types a question in the input field
 * question.value = "How are you?";
 * addMessage();
 * // The message is added to the chat and a response is generated.
 */
const askQuestion = async () => {
  chat.addMessage(question.value, 'question');
  if (question.value.charAt(question.value.length - 1) === '?') {
    createResponse();
  }
  question.value = '';
};

/**
 * A computed property that retrieves the chat history.
 * It dynamically reflects the current state of `chat.messages.value`.
 * 
 * @returns {Array} The array of chat messages.
 */
const history = computed(() => chat.messages.value);
const chatContainer = ref<HTMLElement | null>(null);

watch(history, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}, { deep: true });

</script>

<template>
  <div class="w-full max-w-5xl mx-auto p-4">
    <div class="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg h-[60vh] flex flex-col">
      <!-- Chat Title -->
      <div class="bg-gray-700 text-white p-4 rounded-t-2xl flex items-center shadow-md">
        <span class="material-icons text-3xl text-yellow-400 mr-3">support_agent</span>
        <h2 class="text-xl font-bold tracking-wider">Yes/No Robot</h2>
      </div>

      <!-- Chat Messages -->
      <div ref="chatContainer" class="flex-grow p-6 overflow-y-auto space-y-6">
        <div v-for="(message, index) in history" :key="index" class="flex"
              :class="{'justify-end': message.type === 'question', 'justify-start': message.type !== 'question'}">
          <div class="max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow"
              :class="{'bg-gray-500 text-white': message.type === 'question', 'bg-gray-600 text-gray-200': message.type !== 'question'}">
            <p class="text-base">{{ message.text }}</p>
            <img v-if="message.gif" :src="message.gif" alt="gif" class="mt-3 rounded-lg w-[150px] h-[100px] object-cover"/>
            <div class="text-xs text-gray-400 mt-2 text-right">{{ message.time }}</div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="bg-gray-700 p-4 rounded-b-2xl shadow-inner">
        <div class="flex items-center bg-gray-800 rounded-full px-4 py-2">
          <input type="text" placeholder="Ask your question to the wonder yes/no robot..."
                v-model="question" @keyup.enter="askQuestion"
                class="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"/>
          <button @click="askQuestion" :disabled="!question.trim()"
                  class="ml-4 p-2 rounded-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none">
            <span class="material-icons text-white">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


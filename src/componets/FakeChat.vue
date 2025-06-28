<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

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

</script>

<template>
  <div class="chat-view">
    <div class="chat-title">
      <span class="material-icons">support_agent</span>
      Yes/No Robot
    </div>
    <div class="chat-text overflow-y-scroll" v-for="input in history">
      {{ input.text }} - {{ input.time }} - {{ input.type }}
      <img :src="input.gif">
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Ask your question to the wonder yes/no robot" v-model="question" />
      <button type="button" @click="askQuestion">-></button>
    </div>
  </div>
</template>

<style lang="css" scoped src="./fake-chat.css"></style>
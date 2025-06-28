import type { Message } from '@/types/message';
import type { Ref } from 'vue';
import { ref } from 'vue';

/**
 * A composable function for managing a chat system.
 * Provides reactive state for chat messages and utility functions
 * to start a new chat session and add messages to the chat.
 *
 * @returns {Object} An object containing:
 * - `messages`: A reactive reference to the array of chat messages.
 * - `startChat`: A function to reset the chat by clearing all messages.
 * - `addMessage`: A function to add a new message to the chat.
 */
export const useChat = () => {
  const messages: Ref<Array<Message> | undefined> = ref();

  /**
   * Resets the chat by clearing all messages.
   * This function sets the `messages` reactive variable to an empty array,
   * effectively starting a new chat session.
   */
  const startChat = () => {
    messages.value = [];
  };

  /**
   * Adds a new message to the chat.
   *
   * @param text - The content of the message.
   * @param type - The type of the message, either 'question' or 'answer'.
   * @param gif - (Optional) A URL or identifier for a GIF associated with the message.
   * @returns void
   */
  const addMessage = (text: string, type: 'question' | 'answer', gif?: string): void => {
    messages.value?.push({
      time: new Date().toLocaleTimeString('es-MX'),
      text,
      gif,
      type
    });
  };

  return { messages, startChat, addMessage };
};

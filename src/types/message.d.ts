export interface Message {
  time: string;
  text: string;
  gif?: string;
  type: 'question' | 'answer';
}
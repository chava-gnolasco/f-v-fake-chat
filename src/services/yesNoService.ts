import axios from 'axios';

import type { YesNoResponse } from '@/types/yesNo';

/**
 * Axios client instance configured to interact with the YesNo API.
 * 
 * Base URL: `https://yesno.wtf`
 * Headers:
 * - `Content-Type`: `application/json`
 * - `Accept`: `application/json`
 * 
 * This client can be used to make HTTP requests to the YesNo API for fetching
 * yes/no responses.
 */
const axiosClient = axios.create({
  baseURL: 'https://yesno.wtf',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


/**
 * Fetches a random Yes/No response from the API.
 *
 * @returns {Promise<YesNoResponse | undefined>} A promise that resolves to a `YesNoResponse` object
 * or `undefined` if the response is not available.
 */
export const getRandomResponse = (): Promise<YesNoResponse | undefined> => {
  return axiosClient.get('/api').then((response) => response.data as YesNoResponse);
};

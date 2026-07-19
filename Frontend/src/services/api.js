import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

/**
 * Send a YouTube URL to the backend and get repurposed content.
 */
export async function generateContent(url) {
  try {
    const response = await apiClient.post('/generate', { url });
    return response.data;
  } catch (error) {
    if (error.response) {
      const detail = error.response.data?.detail;
      throw new Error(detail || `Server error (${error.response.status})`);
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please make sure the backend is running.');
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
}

import { API_ENDPOINTS } from './endpoints';
import type { DrawResponse, Pair } from '../../types';

interface DrawRequest {
  code: string;
  people: string[];
}

export async function sendFileToBackend(file: File, code: string): Promise<Pair[]> {
  try {
    const content = await file.text();
    const people = content.split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const payload: DrawRequest = {
      code,
      people
    };

    const response = await fetch(API_ENDPOINTS.DRAW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'cors',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Server error: ${errorText || response.statusText}`);
    }
    
    const data: DrawResponse = await response.json();
    return data.pairs; // Return just the pairs array
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process request: ${error.message}`);
    }
    throw error;
  }
}
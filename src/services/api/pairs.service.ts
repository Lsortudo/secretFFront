import { API_ENDPOINTS } from './endpoints';
import type { Pair } from '../../types';

export async function sendFileToBackend(file: File): Promise<Pair[]> {
  try {
    const content = await file.text();
    const names = content.split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const response = await fetch(API_ENDPOINTS.DRAW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(names),
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending file:', error);
    throw error;
  }
}
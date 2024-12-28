import { API_ENDPOINTS } from './endpoints';
import type { DrawResponse } from '../../types';

export async function verifyCode(code: string): Promise<DrawResponse> {
  const response = await fetch(`${API_ENDPOINTS.VERIFY}/${code}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Invalid code or server error');
  }

  return response.json();
}
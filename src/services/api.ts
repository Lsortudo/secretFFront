export async function sendFileToBackend(file: File) {
  try {
    const content = await file.text();
    // Split content by newlines and filter empty lines
    const names = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const response = await fetch('http://localhost:8080/draw', {
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
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending file:', error);
    throw error;
  }
}
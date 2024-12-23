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
        },
        body: JSON.stringify(names),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process file');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending file:', error);
      throw error;
    }
  }
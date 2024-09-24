const originalFetch = window.fetch;

window.fetch = async (url, options) => {
  try {
    const response = await originalFetch(url, options);

    // Manejo de respuestas que no sean OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Muestra un alert en caso de error
    alert(`Request Error: ${error.message}`);
    throw error; // Re-lanza el error para que pueda ser manejado en otro lugar si es necesario
  }
};
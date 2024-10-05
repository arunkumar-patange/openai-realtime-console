export const imageSearch = async (params: { query: string; searchType?: string }) => {
  const { query, searchType } = params;
  try {
    const response = await fetch(`https://api-dev.braininc.net/be/langchain/realtime/google/customsearch/v1?q=${encodeURIComponent(query)}&searchType=${searchType || 'image'}`, {
      method: 'GET',
      headers: {
        'Authorization': 'token a1c8d8acedb03aa810aa9c4ff053b90e10ddc985', // Use the same auth token
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Check if the response contains items
    if (data && data.items) {
      return { images: data.items, error: null }; // Return images and no error
    } else {
      console.error('No images found in the response');
      return { images: [], error: 'No images found' }; // Return empty array and error message
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return { images: [], error: 'Failed to fetch images' }; // Return empty array and error message
  }
};

// Tool metadata for imageSearch
export const imageSearchTool = {
  name: 'image_search',
  description: 'Searches for images based on a query using the Google Custom Search API.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for images.',
      },
      searchType: {
        type: 'string',
        description: 'Type of search to perform (e.g., "image").',
        enum: ['image'], // You can add more types if needed
      },
    },
    required: ['query'],
  },
};

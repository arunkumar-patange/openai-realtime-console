export const generalSearch = async (params: { query: string; search_depth: string; max_results: number }) => {
  const { query, search_depth, max_results } = params;
  try {
    const response = await fetch('https://api-dev.braininc.net/be/tavily/search', {
      method: 'POST',
      headers: {
        'Authorization': 'token a1c8d8acedb03aa810aa9c4ff053b90e10ddc985', // Replace with your actual API token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        search_depth,
        include_answer: false,
        include_images: false,
        include_raw_content: false,
        max_results,
        include_domains: [],
        exclude_domains: [],
      }),
    });

    const data = await response.json();

    // Check if the response contains results
    if (data && data.results) {
      return data.results; // Return the search results
    } else {
      console.error('No results found in the response');
      throw new Error('No results found'); // Throw an error if no results are found
    }
  } catch (error) {
    console.error('Error performing search:', error);
    throw new Error('Failed to perform search'); // Throw an error on fetch failure
  }
};

// Tool metadata for generalSearch
export const generalSearchTool = {
  name: 'general_search',
  description: 'Performs a general search based on the provided query.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The query for the search.',
      },
      search_depth: {
        type: 'string',
        description: 'The depth of the search.',
      },
      max_results: {
        type: 'number',
        description: 'Maximum number of results to return.',
      },
    },
    required: ['query', 'search_depth', 'max_results'],
  },
};

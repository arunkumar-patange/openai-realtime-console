export const searchRestaurants = async (params: { term: string; location: string }) => {
  const { term, location } = params;
  try {
    const response = await fetch(
      `https://api-dev.braininc.net/be/svc-adapter/yelp/businesses/search?categories=restaurants&categories=food&limit=10&location=${encodeURIComponent(location)}&offset=0&term=${encodeURIComponent(term)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'token a1c8d8acedb03aa810aa9c4ff053b90e10ddc985',
          'Content-Type': 'application/json'
        },
      }
    );

    const data = await response.json();

    // Check if the response contains businesses
    if (data && data.data && data.data.businesses) {
      return { businesses: data.data.businesses, error: null }; // Return businesses and no error
    } else {
      console.error('No businesses found in the response');
      return { businesses: [], error: 'No businesses found' }; // Return empty array and error message
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return { businesses: [], error: 'Failed to fetch restaurants' }; // Return empty array and error message
  }
};

// Tool metadata
export const searchRestaurantsTool = {
  name: 'search_restaurants',
  description: 'Searches for restaurants based on a term and location.',
  parameters: {
    type: 'object',
    properties: {
      term: {
        type: 'string',
        description: 'Search term for the restaurant.',
      },
      location: {
        type: 'string',
        description: 'Location to search for restaurants.',
      },
    },
    required: ['term', 'location'],
  },
};

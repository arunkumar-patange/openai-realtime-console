export const searchFlights = async (params: { from: string; to: string; date: string; returnDate?: string; adults: number; cabinClass: string; trip: string; is_code?: boolean }) => {
  const { from, to, date, returnDate, adults, cabinClass, trip, is_code } = params;
  try {
    const response = await fetch(`https://api-dev.braininc.net/be/svc-adapter/flights/search?from=${from}&to=${to}&adults=${adults}&cabinClass=${cabinClass}&trip=${trip}&date=${date}&is_code=${is_code}`, {
      method: 'GET',
      headers: {
        'Authorization': 'token 343f9ba48f6e326b5f59c1a2f9f50716a2a8b3fd', // Use the same auth token as for image search
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Check if the response contains flight results
    if (data && data.data && data.data.items) {
      return { flights: data.data.items, error: null }; // Return flights and no error
    } else {
      console.error('No flights found in the response');
      throw new Error('No flights found'); // Throw an error if no flights are found
    }
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw new Error('Failed to fetch flights'); // Throw an error on fetch failure
  }
};

// Tool metadata for searchFlights
export const searchFlightsTool = {
  name: 'search_flights',
  description: 'Searches for flights based on origin, destination, and travel dates.',
  parameters: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'The origin airport code.',
      },
      to: {
        type: 'string',
        description: 'The destination airport code.',
      },
      date: {
        type: 'string',
        description: 'The departure date in YYYY-MM-DD format.',
      },
      returnDate: {
        type: 'string',
        description: 'The return date in YYYY-MM-DD format (optional).',
      },
      adults: {
        type: 'number',
        description: 'The number of adult passengers.',
      },
      cabinClass: {
        type: 'string',
        description: 'The cabin class (e.g., economy, business).',
      },
      trip: {
        type: 'string',
        description: 'Type of trip (e.g., ONE_WAY, ROUND_TRIP)',
      },
      is_code: {
        type: 'boolean',
        description: 'Indicates if the search should use airport codes.',
      },
    },
    required: ['from', 'to', 'date', 'adults', 'cabinClass', 'trip'],
  },
};

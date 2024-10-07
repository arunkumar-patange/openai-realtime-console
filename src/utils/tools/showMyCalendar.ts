export const showMyCalendar = async (params: { max_results: number }) => {
  const { max_results } = params;
  try {
    if (!window.gapi || !window.gapi.client || !window.gapi.client.calendar) {
      throw new Error('Google API client is not loaded.');
    }

    const response = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: max_results,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const fetchedEvents = response.result.items;

    // Check if the response contains events
    if (fetchedEvents && fetchedEvents.length > 0) {
      return fetchedEvents; // Return the fetched calendar events
    } else {
      console.error('No events found in the response');
      throw new Error('No events found'); // Throw an error if no events are found
    }
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw new Error('Failed to fetch calendar events'); // Throw an error on fetch failure
  }
};

// Tool metadata for showMyCalendar
export const showMyCalendarTool = {
  "name": "get_calendar_events",
  "description": "Get or show calendar events from the users Google Calendar and should always be called anytime user references the calendar",
  parameters: {
    type: 'object',
    properties: {
      max_results: {
        type: 'number',
        description: 'Maximum number of calendar events to return.',
      },
    },
    required: ['max_results'],
  },
};

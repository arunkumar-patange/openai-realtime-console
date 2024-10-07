import { useEffect, useState } from 'react';

const CalendarPage = () => {
  const [events, setEvents] = useState<any[]>([]); // State to hold calendar events
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    const fetchCalendarEvents = () => {
      if (window.gapi && window.gapi.client && window.gapi.client.calendar) {
        window.gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        }).then((response: any) => {
          const fetchedEvents = response.result.items;
          setEvents(fetchedEvents); // Set the fetched events to state
          setLoading(false); // Set loading to false
        }).catch((error: any) => {
          console.error('Error fetching calendar events:', error);
          setError('Error fetching calendar events.'); // Set error message
          setLoading(false); // Set loading to false
        });
      } else {
        console.error('gapi.client.calendar is not loaded.');
        setError('Google API client is not loaded.'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    // Ensure gapi is loaded before calling fetchCalendarEvents
    const checkGapiLoaded = () => {
      if (window.gapi) {
        fetchCalendarEvents();
      } else {
        console.error('gapi is not loaded.');
        setError('Google API is not loaded.'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    checkGapiLoaded(); // Call the function to check gapi loading
  }, []);

  return (
    <div>
      <h2>Calendar Events</h2>
      {loading && <p>Loading events...</p>} {/* Loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
      {events.length > 0 ? (
        <ul>
          {events.map((event: any) => {
            const when = event.start.dateTime || event.start.date;
            return (
              <li key={event.id}>
                <strong>{event.summary}</strong> ({when})
              </li>
            );
          })}
        </ul>
      ) : (
        !loading && <p>No upcoming events found.</p> // Message when no events are found
      )}
    </div>
  );
};

export default CalendarPage;

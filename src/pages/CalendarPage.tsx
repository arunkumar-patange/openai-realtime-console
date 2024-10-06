import { useEffect } from 'react';

const CalendarPage = () => {
  useEffect(() => {
    const fetchCalendarEvents = () => {
      if (window.gapi.client.calendar) {
        window.gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        }).then((response: any) => {
          const events = response.result.items;
          if (events && events.length) {
            console.log('Upcoming events:');
            events.forEach((event: any) => {
              const when = event.start.dateTime || event.start.date;
              console.log(`${event.summary} (${when})`);
            });
          } else {
            console.log('No upcoming events found.');
          }
        }).catch((error: any) => {
          console.error('Error fetching calendar events:', error);
        });
      } else {
        console.error('Calendar API is not loaded on gapi.client.');
      }
    };

    fetchCalendarEvents(); // Call the function to fetch events
  }, []);

  return (
    <div>
      <h2>Calendar Events</h2>
      {/* Additional UI for displaying events can be added here */}
    </div>
  );
};

export default CalendarPage;

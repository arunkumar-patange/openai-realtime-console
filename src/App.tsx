import { useEffect } from 'react';
import { ConsolePage } from './pages/ConsolePage';
import './App.scss';

function App() {
  useEffect(() => {
    const loadGapi = () => {
      window.gapi.load('client:auth2', initClient);
    };

    const initClient = () => {
      window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      }).then(() => {
        console.log('GAPI client initialized.');
        // Optionally, you can check if the user is already signed in
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch((error) => {
        console.error('Error initializing GAPI client:', error);
      });
    };

    const updateSigninStatus = (isSignedIn: boolean) => {
      if (isSignedIn) {
        console.log('User is signed in.');
        // Fetch calendar events or perform other actions
        fetchCalendarEvents();
      } else {
        console.log('User is not signed in.');
        // Optionally, prompt the user to sign in
        handleAuthClick();
      }
    };

    const handleAuthClick = () => {
      window.gapi.auth2.getAuthInstance().signIn();
    };

    const fetchCalendarEvents = () => {
      window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }).then((response: any) => {
        const events = response.result.items;
        if (events.length) {
          console.log('Upcoming events:');
          events.forEach((event: any) => {
            const when = event.start.dateTime || event.start.date;
            console.log(`${event.summary} (${when})`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      }).catch((error) => {
        console.error('Error fetching calendar events:', error);
      });
    };

    loadGapi();
  }, []);

  return (
    <div data-component="App">
      <ConsolePage />
    </div>
  );
}

export default App;

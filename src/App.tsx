import { useEffect, useState } from 'react';
import { ConsolePage } from './pages/ConsolePage';
import './App.scss';

function App() {
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGapiLoaded(true);
        initializeGapiClient();
      };
      document.body.appendChild(script);
    };

    const initializeGapiClient = () => {
      if (!window.gapi) {
        console.error('GAPI not loaded yet.');
        return;
      }

      window.gapi.load('client', () => {
        window.gapi.client.init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        }).then(() => {
          console.log('GAPI client initialized.');
        }).catch((error: any) => {
          console.error('Error initializing GAPI client:', error);
        });
      });
    };

    loadGapi();
  }, []);

  // Sign in using Google Identity Services
  const handleAuthClick = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('REACT_APP_GOOGLE_CLIENT_ID is not defined. Please set it in the environment variables.');
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: (response: any) => {
        if (response.error) {
          console.error('Error during sign-in:', response.error);
          return;
        }
        console.log('Token response:', response);
        // After successful sign-in, you can now fetch calendar events
        fetchCalendarEvents();
      },
    });

    tokenClient.requestAccessToken();
  };

  // Fetch Calendar Events
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

  return (
    <div data-component="App">
      <ConsolePage />
      <button onClick={handleAuthClick}>Sign In with Google</button>
    </div>
  );
}

export default App;

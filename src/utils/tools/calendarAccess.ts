import { google } from 'googleapis';

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  process.env.REACT_APP_REDIRECT_URL,
);

// Generate a URL for the user to authorize access
export const getAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
};

// Exchange the authorization code for tokens
export const getAccessToken = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

// Fetch calendar events
export const fetchCalendarEvents = async () => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return res.data.items;
};

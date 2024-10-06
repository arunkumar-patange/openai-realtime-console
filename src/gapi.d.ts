declare global {
    interface Window {
      gapi: any;
      google: {
        accounts: {
          oauth2: {
            initTokenClient: (config: {
              client_id: string;
              scope: string;
              callback: (tokenResponse: any) => void;
            }) => {
              requestAccessToken: () => void;
            };
          };
        };
      };
    }
  }

export {};

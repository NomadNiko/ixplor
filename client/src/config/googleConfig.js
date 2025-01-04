const googleConfig = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  cookie_policy: 'single_host_origin',
  scope: 'email profile',
  ux_mode: 'redirect',
  redirect_uri: window.location.origin,
  allowed_parent_origin: window.location.origin,
};

export const initializeGoogleSignIn = () => {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
          try {
              window.google.accounts.id.initialize({
                  ...googleConfig,
                  callback: (response) => resolve(response),
              });
              resolve(window.google);
          } catch (error) {
              reject(error);
          }
      };
      script.onerror = reject;
      document.body.appendChild(script);
  });
};

export default googleConfig;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceworker.js') // Path to your service worker
      .then(() => {
        console.log('Service Worker Registered Successfully');
      })
      .catch((error) => {
        console.error('Service Worker Registration Failed:', error);
      });
  }
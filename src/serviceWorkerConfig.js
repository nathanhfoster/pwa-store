import { storeFactory } from 'resurrection';
import { SetServiceWorkerRegistration, PushAlert } from 'store/reducers/App/actions';
const { PUBLIC_URL } = process.env;

const receivePushNotification = (event, registration) => {
  console.log('[Service Worker] Push Received.');

  alert(JSON.stringify(event));

  // const { image, tag, url, title, text } = event.data.json()

  const image = 'https://via.placeholder.com/128/ff0000';
  const tag = 'tag';
  const url = PUBLIC_URL;
  const title = 'title';
  const text = 'text';

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag,
    image,
    badge: 'https://spyna.it/icons/favicon.ico',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000'
      }
    ]
  };
  event.waitUntil(registration.showNotification(title, options));
};

const openPushNotification = (event) => {
  console.log('[Service Worker] Notification click Received.', event.notification.data);

  event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data))
};

const config = () => ({
  // onUpdate: (registration) => {
  //   registration.unregister().then(() => {
  //     window.location.reload()
  //   })
  // },
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if (event.target.state === 'activated') {
          const store = storeFactory.getStore();
          const handleReloadWindow = () => {
            window.location.reload();
          };
          if (store?.dispatch) {
            const alertPayload = {
              title: 'App update',
              message: 'There is a new version of the app. Click to reload.',
              onClick: handleReloadWindow,
              props: { severity: 'info' }
            };
            store.dispatch(PushAlert(alertPayload));
            store.dispatch(SetServiceWorkerRegistration(registration));
          } else {
            handleReloadWindow();
            alert('Update Available! Please refresh your browser.');
          }
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: (registration) => {
    const store = storeFactory.getStore();

    if (store?.dispatch) {
      const alertPayload = {
        title: 'Offline mode enabled',
        message: 'App is cached for offline use'
      };
      store.dispatch(PushAlert(alertPayload));
    }

    window.addEventListener('push', (e) => receivePushNotification(e, registration));
    window.addEventListener('notificationclick', openPushNotification);
  }
});

export default config;

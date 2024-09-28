const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: "http://2af286052d1247a99831324be903338a@localhost:8080/3",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


setInterval(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  }
}, 99);

const axios = require('axios');
const crypto = require('crypto')
const uuid = require('short-uuid');

const baseUrl = "http://localhost:8080";
const projectId = 3;
const sentryKey = "2af286052d1247a99831324be903338a";

const endpoint = `${baseUrl}/api/${projectId}/envelope/?sentry_key=${sentryKey}&sentry_version=7&sentry_client=sentry.javascript.browser%2F7.57.0`;

// Example recorded payload, which looks like "newline JSON".
// '{"event_id":"67817ce13647450d959bb987f0a43671","sent_at":"2024-09-28T08:44:54.677Z","sdk":{"name":"sentry.javascript.browser","version":"7.57.0"}}\n{"type":"event"}\n{"exception":{"values":[{"type":"ReferenceError","value":"somethingWrong is not defined","stacktrace":{"frames":[{"filename":"http://localhost:8081/","function":"HTMLButtonElement.onclick","in_app":true,"lineno":25,"colno":33},{"filename":"http://localhost:8081/","function":"clicked","in_app":true,"lineno":30,"colno":13}]},"mechanism":{"type":"onerror","handled":false}}]},"level":"error","platform":"javascript","event_id":"67817ce13647450d959bb987f0a43670","timestamp":1727513094.677,"environment":"production","sdk":{"integrations":["InboundFilters","FunctionToString","TryCatch","Breadcrumbs","GlobalHandlers","LinkedErrors","Dedupe","HttpContext","BrowserTracing","Replay"],"name":"sentry.javascript.browser","version":"7.57.0","packages":[{"name":"npm:@sentry/browser","version":"7.57.0"}]},"breadcrumbs":[{"timestamp":1727513087.188,"category":"sentry.transaction","event_id":"92ae24fa9726482590495f357511ccf3","message":"92ae24fa9726482590495f357511ccf3"},{"timestamp":1727513087.617,"category":"ui.click","message":"body"},{"timestamp":1727513094.673,"category":"ui.click","message":"body > button"},{"timestamp":1727513094.674,"category":"console","data":{"arguments":["clicked"],"logger":"console"},"level":"log","message":"clicked"}],"request":{"url":"http://localhost:8081/","headers":{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"}},"tags":{"replayId":"80202a98ee834169a376c40f68df0824"}}'
// EVENT_ID: 32 bytes hash, looks like md5?
// SENT_AT: ISO-8601
// ERROR_MESSAGE: any str
// TIMESTAMP: SENT_AT converted to epoch timestamp.
// REPLAY_ID: 32 bytes hash, looks like md5?
const examplePayload = '{"event_id":"EVENT_ID","sent_at":"SENT_AT","sdk":{"name":"sentry.javascript.browser","version":"7.57.0"}}\n{"type":"event"}\n{"exception":{"values":[{"type":"ReferenceError","value":"ERROR_MESSAGE","stacktrace":{"frames":[{"filename":"http://localhost:8081/","function":"HTMLButtonElement.onclick","in_app":true,"lineno":25,"colno":33},{"filename":"http://localhost:8081/","function":"clicked","in_app":true,"lineno":30,"colno":13}]},"mechanism":{"type":"onerror","handled":false}}]},"level":"error","platform":"javascript","event_id":"EVENT_ID","timestamp":TIMESTAMP,"environment":"production","sdk":{"integrations":["InboundFilters","FunctionToString","TryCatch","Breadcrumbs","GlobalHandlers","LinkedErrors","Dedupe","HttpContext","BrowserTracing","Replay"],"name":"sentry.javascript.browser","version":"7.57.0","packages":[{"name":"npm:@sentry/browser","version":"7.57.0"}]},"breadcrumbs":[{"timestamp":TIMESTAMP,"category":"sentry.transaction","event_id":"EVENT_ID","message":"92ae24fa9726482590495f357511ccf3"},{"timestamp":TIMESTAMP,"category":"ui.click","message":"body"},{"timestamp":TIMESTAMP,"category":"ui.click","message":"body > button"},{"timestamp":TIMESTAMP,"category":"console","data":{"arguments":["clicked"],"logger":"console"},"level":"log","message":"clicked"}],"request":{"url":"http://localhost:8081/","headers":{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"}},"tags":{"replayId":"REPLAY_ID"}}';

async function send(payload) {
  const resp = await axios.post(endpoint, payload);
  console.log(resp.status);
}

setInterval(() => {
  const now = new Date();
  const payload = examplePayload.replaceAll('EVENT_ID', crypto.createHash('md5').update(uuid.generate(32)).digest("hex"))
  .replaceAll('SENT_AT', now.toISOString())
  .replaceAll('ERROR_MESSAGE', 'This is a pen')
  .replaceAll('TIMESTAMP', now.getTime()/1000)
  .replaceAll('REPLAY_ID', crypto.createHash('md5').update(uuid.generate(32)).digest("hex"));
  send(payload);
}, 10);


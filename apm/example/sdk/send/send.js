
// https://web.dev/navigation-and-resource-timing/#phoning-home

// Caution: If you have lots of performance entries, don't
// do this. This is an example for illustrative purposes.
const data = JSON.stringify(performance.getEntries()));

// The endpoint to transmit the encoded data to
const endpoint = '/analytics';

// Check for fetch keepalive support
if ('keepalive' in Request.prototype) {
  fetch(endpoint, {
    method: 'POST',
    body: data,
    keepalive: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} else if ('sendBeacon' in navigator) {
  // Use sendBeacon as a fallback
  navigator.sendBeacon(endpoint, data);
}

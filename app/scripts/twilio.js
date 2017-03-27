var twilio = require('twilio');

require('./twilio_keys.js');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Send the text message.
client.sendMessage({
  to: 'YOUR_NUMBER',
  from: '+19802081323',
  body: 'Hello from Twilio!'
});

import request from 'request'; // Import modul request

//mengirim pesan ke Slack menggunakan webhook
export const callSlackApi = (message) => {
  var options = {
    'method': 'POST',
    'url': 'https://hooks.slack.com/services/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', // URL webhook
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "text": message
    })
  };

  request(options, function (error, response, body) { 
    if (error) {
      console.error('Error sending message to Slack:', error);
    } else {
      //console.log('Message sent to Slack:', body);
    }
  });
};

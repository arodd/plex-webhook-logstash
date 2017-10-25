In order to run this app:
 
- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.

Then run the app as follows:

```
$ LOGHOST=logstash-plex node index.js
```

Finally, add the webhook to https://app.plex.tv/web/app#!/account/webhooks (it'll be http://localhost:10000).

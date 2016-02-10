# nopenload
OpenLoad.co node wrapper

## Install
```
npm install nopenload
```

## Usage
```js
var nol = require('nopenload');

var api = new nol('fdef57504268c1b4','kdDQrTxA');

//Account Info

api.accountInfo(function(err, body) {
  console.log("--- ACCOUNT INFO ---");
  if(err) {
    console.log("ERROR N: "+err+" Msg: "+body);
  } else {
    console.log(body);
  }
});

//Upload a file

api.getUploadUrl(function(err, body) {
  if(err) {
    console.log("ERROR N: "+err+" Msg: "+body);
  } else {
    api.upload(body.result.url, "FILEPATH", function(err, body) {
      if(err) {
        console.log("ERROR N: "+err+" Msg: "+body);
      }
      console.log(body);
    });
  }
});
```

## TODO
- [X] Upload
- [X] Remote Upload
- [X] Check Remote Upload Status
- [ ] Tests

## Author
Domenico Luciani

## License
MIT

# nopenload
OpenLoad.co node wrapper

## Install
```
npm install nopenload
``

## Usage
```js
var nol = require('nopenload');

var api = new nol('fdef57504268c1b4','kdDQrTxA');

api.accountInfo(function(err, body) {
  console.log("--- ACCOUNT INFO ---");
  if(err) {
    console.log("ERROR N: "+err+" Msg: "+body);
  } else {
    console.log(body);
  }
});
```

## TODO
-[] Upload
-[] Remote Upload
-[] Check Remote Upload Status
-[] Tests

## Author
Domenico Luciani

## License
MIT

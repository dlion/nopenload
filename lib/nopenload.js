var request = require("request"),
    fs = require('fs');

/**
 * OpenLoad API Wrapper.
 *
 * @param login "The login key"
 * @param key "The api key"
 */

function nOl(login, key) {
  this.version = '1';
  this.baseUrl = 'https://api.openload.co/'+this.version;
  if(!login) {
    throw new Error('You have to provide your login API key!\nSee: https://openload.co/api');
  }
  this.login = login;
  if(!key) {
    throw new Error('You have to provide your API key!\nSee: https://openload.co/api');
  }
  this.key = key;
}

nOl.prototype.req = function(route, method, params, cb) {
  var url = this.baseUrl+route+'?';

  if(typeof params == "function") {
    cb = params;
  } else {
    for(var param in params) {
      if(url != this.baseUrl+route+'?') {
        url += '&';
      }
      url += param + "=" + encodeURIComponent(params[param]);
    }
  }

  var reqObj = { uri: url, json: true, method: method };

  request(reqObj, function(err, res, body) {
    if(!err && res.statusCode === 200 && body.status === 200) {
      cb(null, body);
    } else {
      cb(body.status, body.msg);
    }
  });
};


/**
 * Account Info - Everything account related (total used storage, reward, ...)
 * @param login "API-Login" Required
 * @param key "API-Key/Password" Required
 */
nOl.prototype.accountInfo = function(cb) {
  this.req('/account/info', 'GET', {
    login: this.login,
    key: this.key
  }, cb);
};

/**
 * Download Ticket - preparing a Download
 * @param file "File-ID" Required
 * @param login "API-Login" Required
 * @param key "API-Key/Password" Required
 */
nOl.prototype.downloadTicket = function(idFile, cb) {
  this.req('/file/dlticket', 'GET', {
    file: idFile,
    login: this.login,
    key: this.key
  }, cb);
};

/**
 * Download Link - get a download link by using download ticket
 * @param file "File-ID" Required
 * @param ticket "previously generated download ticket" Required
 * @param captcha_response "result of the captcha, if any" NoRequired
 */
nOl.prototype.downloadLink = function(idFile, ticket, captcha, cb) {
  this.req('/file/dl', 'GET', {
    file: idFile,
    ticket: ticket,
    captcha_response: captcha
  }, cb);
};

/**
 * File Info - check the status of a file, e.g. if the file exists
 * @param file "File-ID(s), single file or comma-separated (max. 50)" Required
 * @param login "API-Login" NoRequired
 * @param key "API-Key / API-Password" NoRequired
 */
nOl.prototype.fileInfo = function(idFile, cb) {
  this.req('/file/info', 'GET', {
    file: idFile,
    login: this.login,
    key: this.key
  }, cb);
};

/**
 * Get Upload URL - Get an Upload URL
 * @param login "API-Login" NoRequired
 * @param key "API-Key/API-Password" NoRequired
 * @param folder "Folder-ID to upload to" NoRequired
 * @param sha1 "Expected sha1. If sha1 of uploaded file doesn't match this value, upload fails" NoRequired
 * @param httponly "If this is set to true, use only http upload links" NoRequired
 */
nOl.prototype.getUploadUrl = function(cb) {
  this.req('/file/ul', 'GET', {
    login: this.login,
    key: this.key
  }, cb);
};

/**
 * Upload - Upload a file
 * @param url "Url retrieved from getUploadUrl function" Required
 * @param path "The file to upload" Required
 */
nOl.prototype.upload = function(url, path, cb) {
  request.post({
    uri: url,
    formData: { file1: fs.createReadStream(path) },
    json: true
  }, function(err, res, body) {
    if(!err && res.statusCode === 200 && body.status === 200) {
      cb(null, body);
    } else {
      cb(body.status, body.msg);
    }
  });
};

/**
 * Add Remote Upload - Remote Uploading a file
 * @param login "API-Login" Required
 * @param key "API-Key/ API-Password"
 * @param url "Remote URL"
 */
nOl.prototype.remoteUpload = function(url, cb) {
  this.req('/remotedl/add', 'GET', {
    login: this.login,
    key: this.key,
    url: url
  }, cb);
};

//TODO: Check Remote Upload Status - Check Status of Remote Upload

/**
 * List Folder - Shows the content of your folders
 * @param login "API-Login" Required
 * @param key "API-Key / API-Password" Required
 * @param folder "Folder-ID" NoRequired
 */
nOl.prototype.listFolder = function(idFolder, cb) {
  this.req('/file/listfolder', 'GET', {
    login: this.login,
    key: this.key,
    folder: idFolder
  }, cb);
};

/**
 * Converting Files - Convert previously uploaded files to a browser-streamable format (mp4/h.264)
 * @param login "API-Login" Required
 * @param key "API-Key / API-Password" Required
 * @param file "File-ID" Required
 */
nOl.prototype.convertFile = function(idFile, cb) {
  this.req('/file/convert', 'GET', {
    login: this.login,
    key: this.key,
    file: idFile
  }, cb);
};

/**
 * Show running file converts - Shows running file converts by folder
 * @param login "API-Login" Required
 * @param key "API-Key / API-Password" Required
 * @param folder "Folder-ID" NoRequired
 */
nOl.prototype.showConversion = function(idFolder, cb) {
  this.req('/file/runningconverts', 'GET', {
    login: this.login,
    key: this.key,
    folder: idFolder
  }, cb);
};

/**
 * Get splash image - Shows the video splash image (thumbnail)
 * @param login "API-Login" Required
 * @param key "API-Key / API-Password" Required
 * @param file "File-ID" Required
 */
nOl.prototype.getThumbnail = function(idFile, cb) {
  this.req('/file/getsplash', 'GET', {
    login: this.login,
    key: this.key,
    file: idFile
  }, cb);
};

module.exports = nOl;

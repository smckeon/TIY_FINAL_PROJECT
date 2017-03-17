var $ = require('jquery');


var parse = {
  BASE_API_URL: '',
  setup: function(config){
    if(config.BASE_API_URL){
      this.BASE_API_URL = config.BASE_API_URL;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiy-final-project");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "notsure");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", config.sessionId);
        }
      }
    });
  }
}

module.exports = parse;

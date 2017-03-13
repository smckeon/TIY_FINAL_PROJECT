var $ = require('jquery');

function setupAjax(loggedInUser){
  $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiy-final-project");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "notsure");
        if(loggedInUser){
          xhr.setRequestHeader("X-Parse-Session-Token", loggedInUser.sessionToken);
        }
      }
  });
}

setupAjax();

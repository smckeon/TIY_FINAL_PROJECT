var Backbone = require('backbone');

var parse = require('../parse').parse;
// var User = require('./user').User;

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',

  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  addAttendee: function(attendeeId) {
    var match = this;
    match.set({'attendees' : {
      "__op":"AddRelation",
      "objects":[
        {"__type":"Pointer", "className":"_User", "objectId": attendeeId}
      ]}
    });
    this.unset('owner');
    this.save();
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  },
  parseRelation: function() {
    var relationObject = {

    }
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {}, relationClause: {}, includeClause: '', keyClause: '',
  parseWhere: function(field, value, objectId){
    if(objectId){
      value = {
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }
    this.whereClause[field] = value;

    return this;
  },
  //realatedTo', 'Matches', matchId, 'attendees'
  parseRelation: function(field, value, objectId, key) {
    console.log('stuff', field, value, objectId, key);
    if(objectId){
      value = {
        '__type': 'Pointer',
        className: value,
        objectId: objectId
      };
    };
    this.relationClause[field] = value;
    this.keyClause = key

    return this;
  },
  parseInclude: function(key) {
    this.includeClause = key;
    return this;
  },
  url: function(){
      var url = this.baseUrl;

      if(Object.keys(this.whereClause).length > 0 && this.includeClause.length > 0) {
      url += '?where=' + JSON.stringify(this.whereClause) + '&include=' + this.includeClause;
      this.whereClause = {};
      this.includeClause = '';
    } else if (Object.keys(this.whereClause).length > 0) {
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    } else if (this.includeClause.length != 0) {
      url += '?include=' + this.includeClause;
      this.includeClause = '';
    } else if (Object.keys(this.relationClause).length > 0) {
      // testing
      url += '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"Matches","objectId":"VtDZEhgU2i"},"key":"attendees"}}'
    }
      console.log('url', url);
      return url;
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  ParseModel,
  ParseCollection
}

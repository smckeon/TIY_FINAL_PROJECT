var Backbone = require('backbone');

var parse = require('../parse').parse;

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',

  save: function(key, val, options){
    console.log('this model save', this);
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {}, includeClause: '',
  parseWhere: function(field, value, objectId){
    if(objectId){
      value = {
        field: field,
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }
    this.whereClause[field] = value;

    return this;
  },
  parseInclude: function(string) {
    this.includeClause = string;
    return this;
  },
  url: function(){
      var url = this.baseUrl;

      if(Object.keys(this.whereClause).length > 0 && this.includeClause.length > 0) {
      url += '?where=' + JSON.stringify(this.whereClause) + '&include=' + this.includeClause;
      this.whereClause = {};
      this.includeClause = 0;
    } else if (Object.keys(this.whereClause).length > 0) {
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    } else if (this.includeClause.length != 0) {
      url += '?include=' + this.includeClause;
      this.includeClause = '';
    }

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

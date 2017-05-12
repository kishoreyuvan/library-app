import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend({
  name:DS.attr('string'),
  department:DS.attr('string'),
  year:DS.attr('number'),
  email:DS.attr('string'),
  password:DS.attr('string'),
  confirmpassword:DS.attr('string'),
  books:DS.hasMany('booking'),
  returns:DS.hasMany('returned')
});

import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr('string'),
  releasedyear:DS.attr('number'),
  author:DS.attr('string'),
  ontime:DS.attr('string'),
  offtime:DS.attr('string'),
  buyer:DS.attr('string')
});

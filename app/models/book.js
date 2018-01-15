import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend({
name:DS.attr('string'),
releasedyear:DS.attr('number'),
author:DS.attr('string'),
noofbooks:DS.attr('number'),
check:Ember.computed('noofbooks',function(){
  return this.get('noofbooks')===0;
})
});

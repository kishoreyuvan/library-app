import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend({
email:DS.attr('string'),
message:DS.attr('string'),
check1:Ember.computed.notEmpty('email'),
check2:Ember.computed.notEmpty('message'),
check3:Ember.computed.and('check1','check2'),
check:Ember.computed.not('check3')
});

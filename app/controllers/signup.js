import Ember from 'ember';

export default Ember.Controller.extend({
  progress:'',
  validequal:Ember.computed('password','confirmpassword',function(){
    return this.get('password') === this.get('confirmpassword');
  }),
  validempty:Ember.computed.notEmpty('password'),
    valids:Ember.computed.and('validempty','validequal'),
  valid:Ember.computed.not('valids'),
});

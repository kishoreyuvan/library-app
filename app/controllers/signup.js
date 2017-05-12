import Ember from 'ember';

export default Ember.Controller.extend({
  validequal:Ember.computed('password','confirmpassword',function(){
    return this.get('password') === this.get('confirmpassword');
  }),
  validempty:Ember.computed.notEmpty('password'),
  validlength:Ember.computed.gte('password',8),
    valids:Ember.computed.and('validempty','validequal','validlength'),
  valid:Ember.computed.not('valids'),
});

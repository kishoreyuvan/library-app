import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if(this.get('session.isAuthenticated')) {
     this.transitionTo('account');
   }
 },
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          email: '', password: '', error: ''
        });
      }
    }
});

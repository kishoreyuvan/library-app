import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
      var controller = this.get('controller');
      var email = controller.get('userEmail');
      var password = controller.get('userPassword');
        this.get('session').open('firebase', {
             provider: 'password',
             email: email,
             password: password
        }).then(function() {
            this.get('controller').set('userEmail','');
            this.get('controller').set('userPassword','');
            this.transitionTo('account');
        }.bind(this));
    }
  }
});

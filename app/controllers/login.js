import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  actions: {
    login() {
      this.set('progress','Loading');
      this.get('session').open('firebase', {
        provider: 'password',
        email: this.get('email'),
        password: this.get('password')
      }).then(() => {
        this.set('progress', '');
        this.transitionToRoute('account');
      }).catch((error) => {
        this.get('notifications').error(`${error}`, {
          autoClear: true,
          clearDuration: 3000
        });
        this.set('progress', false);
      });
    }
  }
});

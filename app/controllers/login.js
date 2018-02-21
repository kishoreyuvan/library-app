import Ember from 'ember';

export default Ember.Controller.extend({
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
        this.setProperties({
          error, progress: ''
        });
      });
    }
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(()=>{});
  },
  actions: {
    logout() {
      this.get('session').close().then(() => {
        this.transitionTo('application');
      });
    }
  }
});

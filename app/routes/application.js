import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(()=>{});
  },
  actions: {
       logout: function() {
           this.get('session').close().then(function() {
               this.transitionTo('application');
           }.bind(this));
       }
   }
});

import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){

   if(!this.get('session.isAuthenticated')){
     this.transitionTo('application');
   }
 },
  model: function(params){
    return this.store.findRecord('user', params.user_id);
  }
});

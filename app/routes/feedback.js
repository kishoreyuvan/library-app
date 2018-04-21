import Ember from 'ember';

export default Ember.Route.extend({
  notifications: Ember.inject.service('notification-messages'),
  beforeModel() {
    if(!this.get('session.isAuthenticated')) {
     this.transitionTo('login');
   }
 },
  model(){
    return this.store.createRecord('feeds');
  },
  actions:{
    save(feed){
      feed.save().then(()=>{
        this.get('notifications').info('Thanks For Your Feedback!', {
          autoClear: true,
          clearDuration: 1200
        });
        this.controller.setProperties({
          'model.email': '',
          'model.message': ''
        });
      });
    }
  }
});

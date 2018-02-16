import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.createRecord('feeds');
  },
  actions:{
    save(feed){
      feed.save().then(()=>{
        this.get('controller').set('response','Thank you For your Feedback');
      });
    },
    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});

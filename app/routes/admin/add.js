import Ember from 'ember';

export default Ember.Route.extend({
  notifications: Ember.inject.service('notification-messages'),
  beforeModel: function(){

   if(!this.get('session.isAuthenticated')){
     this.transitionTo('application');
   }
  },
  model() {
    return this.store.createRecord('book');
  },

  actions: {

    saveLibrary(newLibrary) {
      let UserId = this.get('session.uid');
      let post=this.store.peekRecord('user', UserId);
      let mail=post.get('email');
      if(mail==='eeekishoredon555@gmail.com'){
      newLibrary.save().then(() => {
        this.transitionTo('admin.books');
        this.get('notifications').success('Added successfully!', {
          autoClear: true,
          clearDuration: 1200
        });
      });
     }
      else{
        this.get('notifications').success('You Are Not An Admin! <br> Please Contact your Admin.', {
          autoClear: true,
          clearDuration: 1200,
          htmlContent: true
        });
      }
    },

    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});

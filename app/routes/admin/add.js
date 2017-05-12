import Ember from 'ember';

export default Ember.Route.extend({
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
      let post=this.store.peekRecord('user',this.get('session.uid'));
      let mail=post.get('email');
      if(mail==='eeekishoredon555@gmail.com'){
      newLibrary.save().then(() => this.transitionTo('admin.books'));}
      else{
        alert('You Are Not An Admin');
      }
    },

    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});

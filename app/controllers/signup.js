import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  firebaseApp: Ember.inject.service(),
  progress: false,
  success: false,
  isPasswordsEqual: Ember.computed('password','confirmpassword',function() {
     if(this.get('password') === this.get('confirmpassword')) {
       return (this.get('password').length !== 0);
     }
     return false;
  }),

  actions: {
    signup() {
      if (!this.get('isPasswordsEqual')) {
        this.get('notifications').warning('Passwords Should be Equal', {
          autoClear: true,
          clearDuration: 3000
        });
      } else {
        var ref = this.get('firebaseApp').auth();
        var Data = this.getProperties(['email', 'password', 'name', 'department', 'year']);
        this.set('progress', true);
        ref.createUserWithEmailAndPassword(Data.email, Data.password).then((userData) => {
         var user = this.get('store').createRecord('user', {
           id: userData.uid,
           name: Data.name,
           department: Data.department,
           year: Data.year,
           email:Data.email
         });
         user.save().then(() => {
           this.setProperties({
             progress: false,
             success: true,
             name: '',
             department: '',
             year: '',
             email: '',
             password: '',
             confirmpassword: ''
           });
           this.get('notifications').success('Account Created successfully!', {
             autoClear: true,
             clearDuration: 1200
           });
           this.transitionToRoute('login');
         });
       }).catch((error) => {
         this.get('notifications').error(`${error}`, {
           autoClear: true,
           clearDuration: 3000
         });
         this.set('progress', false);
       });
     }
   }
 }
});

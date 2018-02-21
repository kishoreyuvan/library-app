import Ember from 'ember';

export default Ember.Controller.extend({
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
        this.set('error', 'Password Should be Equal')
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
           Ember.run.later(() => {
             this.transitionToRoute('login');
           }, 500);
         });
       }).catch((error) => {
         this.setProperties({
           progress: false,
           error,
         });
       });
     }
   }
 }
});

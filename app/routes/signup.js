import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

actions: {
signup(){
var controller = this.get('controller');
var name = controller.name;
var department = controller.department;
var year=controller.year;
var email = controller.email;
var password = controller.password;
var ref = this.get('firebaseApp').auth();
  controller.set('progress', true);
ref.createUserWithEmailAndPassword(email, password).then((userData) => {
var user = this.get('store').createRecord('user', {
                                                   id: userData.uid,
                                                   name: name,
                                                   department: department,
                                                   year: year,
                                                   email:email
                                                  });
user.save().then(() =>{
            this.get('controller').set('name','');
            this.get('controller').set('department','');
            this.get('controller').set('year','');
            this.get('controller').set('email','');
            this.get('controller').set('password','');
            this.get('controller').set('confirmpassword','');
            controller.set('progress', false);
            controller.set('success', true);
            Ember.run.later(() => {
              this.transitionTo('login');
            }, 500);
           });
}).catch(function(error) {
  controller.set('error', error);
  controller.set('progress', false);
  controller.set('email','');
  controller.set('password','');
  controller.set('confirmpassword','');
});
}

}
});

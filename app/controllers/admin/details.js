import Ember from 'ember';

export default Ember.Controller.extend({
  Users: Ember.computed.oneWay('model'),
  actions: {
    filterUser() {
      var filtername = this.get('filtername');
      var users = this.get('model');
      users = users.content.filter((obj) => {
        return obj._data.buyer.indexOf(filtername) !== -1;
      });
      this.set('Users.content', users);
    }
  }
});

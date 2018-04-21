import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  actions: {
    returns(book){
      let post = this.store.peekRecord('user', this.get('session.uid'));
      post.get('books').removeObject(book);
      let returns = this.store.createRecord('returned');
      let time=new Date();
      returns.setProperties({
        name: book.get('name'),
        releasedyear: book.get('releasedyear'),
        author: book.get('author'),
        ontime: book.get('time'),
        buyer: post.get('name'),
        offtime: time.toDateString()
      });
      returns.save();
      post.get('returns').pushObject(returns);
      post.save().then(() => {
        this.get('notifications').success('Returned successfully!', {
          autoClear: true,
          clearDuration: 1200
        });
      }).catch((error) => {
        this.get('notifications').error(`${error.message}`, {
          autoClear: true,
          clearDuration: 1200
        });
      })

      let x = this.store.peekRecord('book',book.get('idno'));
      let y = x.get('noofbooks');
      x.set('noofbooks', y+1);
      x.save();
    }
  }
});

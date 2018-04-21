import Ember from 'ember';

export default Ember.Controller.extend({
  notifications: Ember.inject.service('notification-messages'),
  actions: {
    book(book) {
      let post=this.store.peekRecord('user',this.get('session.uid'));
      let booking=this.store.createRecord('booking');
      this.set('isloading', true);
      let time=new Date();
      booking.setProperties({
        name: book.get('name'),
        releasedyear: book.get('releasedyear'),
        author: book.get('author'),
        time: time.toDateString(),
        idno: book.get('id')
      });
      booking.save().then(() => {
        this.get('notifications').success('Booked successfully!', {
          autoClear: true,
          clearDuration: 1200
        });
      }).catch((error) => {
        this.get('notifications').error(`${error.message}`, {
          autoClear: true,
          clearDuration: 1200
        });
      });
      post.get('books').pushObject(booking);
      post.save().then(()=>{
        let x = book.get('noofbooks') - 1;
        book.set('noofbooks', x);
        book.save().then(() => {
          this.set('isloading', false);
        });
      });
    }
  }
});

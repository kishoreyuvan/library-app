import Ember from 'ember';

export default Ember.Controller.extend({
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
      booking.save();
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

import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('book');
  },
  actions:{
    book(book) {
    let post=this.store.peekRecord('user',this.get('session.uid'));
    let booking=this.store.createRecord('booking');
    booking.set('name',book.get('name'));
    booking.set('releasedyear',book.get('releasedyear'));
    booking.set('author',book.get('author'));
    let time=new Date();
    booking.set('time',time);
    booking.set('idno',book.get('id'));
    booking.save();
    post.get('books').pushObject(booking);
    post.save().then(()=>{
      let x=book.get('noofbooks')-1;
      book.set('noofbooks',x);
      book.save();
    });

    }
  }
});

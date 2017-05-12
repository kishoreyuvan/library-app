import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findRecord('user',this.get('session.uid'),{include: 'books'});
  },
  actions:{
    returns(book){
      let post=this.store.peekRecord('user',this.get('session.uid'));
       post.get('books').removeObject(book);
       let returns=this.store.createRecord('returned');
       returns.set('name',book.get('name'));
       returns.set('releasedyear',book.get('releasedyear'));
       returns.set('author',book.get('author'));
       returns.set('ontime',book.get('time'));
       returns.set('buyer',post.get('name'));
       let time=new Date();
       returns.set('offtime',time);
       returns.save();
       post.get('returns').pushObject(returns);
       post.save();
       let x=this.store.peekRecord('book',book.get('idno'));
       let y=x.get('noofbooks');
       x.set('noofbooks',y+1);
       x.save();
  }
}
});

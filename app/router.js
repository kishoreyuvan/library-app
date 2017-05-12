import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('feedback');
  this.route('login');
  this.route('signup');
  this.route('account');
  this.route('secure', {path:'/:user_id'},function(){
    this.route('list');
    this.route('reserved');
    this.route('returned');
  });
  this.route('admin', function() {
    this.route('users');
    this.route('books');
    this.route('details');
    this.route('feeds');
    this.route('add');
  });
  this.route('about');
});

export default Router;

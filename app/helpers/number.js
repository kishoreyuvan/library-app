import Ember from 'ember';

export function number(params/*, hash*/) {
  return Number(params)+1;
}

export default Ember.Helper.helper(number);

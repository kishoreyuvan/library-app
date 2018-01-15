import DS from 'ember-data';

export default DS.Model.extend({
name:DS.attr('string'),
releasedyear:DS.attr('number'),
author:DS.attr('string'),
time:DS.attr('string'),
idno:DS.attr()
});

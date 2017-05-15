import Ember from 'ember';
import data from './index.data';

export default Ember.Route.extend({
  model: function() {
    return data;
  },
});

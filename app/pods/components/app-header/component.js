import Ember from 'ember';
import user from '../../../routes/user.data';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['app-header'],

  user: user,
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['like-button'],
  classNameBindings: ['favorited:favorited'],
});

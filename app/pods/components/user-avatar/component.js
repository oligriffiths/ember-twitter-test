import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-avatar'],
  tagName: 'a',

  src: Ember.computed('user.profile_image_url_https', function() {
    const profile_image_url_https = this.get('user.profile_image_url_https');
    return profile_image_url_https.replace(/_normal\./, '_bigger.');
  }),

  bgStyle: Ember.computed('src', function() {
    const src = this.get('src');
    return new Ember.String.htmlSafe(`background-image: url("${src}")`);
  }),
});

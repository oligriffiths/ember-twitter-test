import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ol',

  tweetItems: Ember.computed('tweets', function() {
    let tweets = this.get('tweets');
    tweets = Object.values(tweets);
    tweets = tweets.sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);

      if (aDate.getTime() === bDate.getTime()) {
        return 0;
      }

      return aDate.getTime() < bDate.getTime() ? 1 : -1;
    });

    return tweets;
  }),
});

import Ember from 'ember';
import momentFromNow from 'ember-moment/computeds/from-now';
import momentFormat from 'ember-moment/computeds/format';

export default Ember.Component.extend({
  user: Ember.computed.alias('tweet.user'),

  text: Ember.computed('tweet.text', 'tweet.entities', function() {
    const text = this.get('tweet.full_text');
    if (!text) {
      return '';
    }
    const hashtags = this.get('tweet.entities.hashtags') || [];
    const urls = this.get('tweet.entities.urls') || [];
    const users = this.get('tweet.entities.user_mentions') || [];
    let replacements = [];

    for (const tag of hashtags) {
      replacements.push({
        url: `https://mobile.twitter.com/hashtag/${tag.text}?src=hash`,
        text: '#' + tag.text,
        indices: tag.indices,
      });
    }

    for (const url of urls) {
      replacements.push({
        text: url.display_url,
        url: url.url,
        indices: url.indices,
      });
    }

    for (const user of users) {
      replacements.push({
        text: '@' + user.screen_name,
        url: `https://mobile.twitter.com/${user.screen_name}`,
        indices: user.indices,
      });
    }

    if (!replacements.length) {
      return new Ember.String.htmlSafe(text);
    }

    replacements = replacements.sort((a, b) => {
      if (a.indices[0] === b.indices[0]) {
        return 0;
      }

      return a.indices[0] < b.indices[0] ? -1 : 1;
    });

    const parts = [];
    let offset = 0;
    for (const replacement of replacements) {
      const start = replacement.indices[0];
      const end = replacement.indices[1];

      parts.push(text.slice(offset, start));
      parts.push(`<a href="${replacement.url}">${replacement.text}</a>`);

      offset = end;
    }

    return new Ember.String.htmlSafe(parts.join(''));
  }),

  date: Ember.computed('tweet.created_at', function() {
    return new Date(this.get('tweet.created_at'));
  }),

  timestamp: Ember.computed('date', function() {
    return this.get('date').getTime();
  }),

  dateFromNow: momentFromNow('timestamp'),
  dateDay: momentFormat('timestamp', 'MM-DD-YYYY'),

  formattedDate: Ember.computed('timestamp', 'dateFromNow', 'dateDay', function() {
    const timestamp = this.get('timestamp');
    const nowTimestamp = (new Date()).getTime();
    const days6 = 1000 * 60 * 60 * 24;

    if (timestamp > nowTimestamp - days6) {
      return this.get('dateFromNow');
    }

    return this.get('dateDay');
  }),
});

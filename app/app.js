import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import moment from 'moment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s",
    s:  "s",
    m:  "m",
    mm: "%dm",
    h:  "anh",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
  },
});

export default App;

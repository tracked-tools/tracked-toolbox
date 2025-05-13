import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'test-app/config/environment';
import {
  dependencySatisfies,
  importSync,
  isDevelopingApp,
  macroCondition,
} from '@embroider/macros';

if (macroCondition(isDevelopingApp())) {
  if (
    macroCondition(
      dependencySatisfies('ember-cli-deprecation-workflow', '>=3.0.0'),
    )
  ) {
    importSync('./deprecation-workflow');
  }
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

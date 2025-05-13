'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    packageManager: 'pnpm',
    scenarios: [
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            '@ember/test-helpers': '^2.9.3',
            'ember-cli': '^4.0.0',
            'ember-cli-deprecation-workflow': '^2.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-modifier': '^3.2.7',
            'ember-qunit': '^5.1.5',
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.20.5',
          },
        },
      },
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            '@ember/test-helpers': '^2.9.3',
            'ember-cli': '^4.0.0',
            'ember-cli-deprecation-workflow': '^2.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-qunit': '^5.1.5',
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.24.3',
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            '@ember/test-helpers': '^2.9.3',
            'ember-cli': '^4.0.0',
            'ember-cli-deprecation-workflow': '^2.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.28.9',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-qunit': '^7.0.0',
            'ember-resolver': '^8.0.0',
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-resolver': '^10.0.0',
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-load-initializers': '^2.0.0',
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~5.8.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.0.0',
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};

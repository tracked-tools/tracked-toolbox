# Changelog

## Release (2025-05-15)

* tracked-toolbox 2.0.1 (patch)

#### :bug: Bug Fix
* `tracked-toolbox`
  * [#211](https://github.com/tracked-tools/tracked-toolbox/pull/211) Remove unneeded peers ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* Other
  * [#88](https://github.com/tracked-tools/tracked-toolbox/pull/88) Remove engines from addon package.json ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* Other
  * [#213](https://github.com/tracked-tools/tracked-toolbox/pull/213) Setup release-plan ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#100](https://github.com/tracked-tools/tracked-toolbox/pull/100) run `npx ember-cli-update --to=4.8.0` in test-app ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#94](https://github.com/tracked-tools/tracked-toolbox/pull/94) Add dependabot.yml config file ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#89](https://github.com/tracked-tools/tracked-toolbox/pull/89) Add 4.4 and 4.8 LTS ember-try scenarios ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#82](https://github.com/tracked-tools/tracked-toolbox/pull/82) bump release-it from 14.14.3 to 15.5.0 and update release plugins ([@SergeAstapov](https://github.com/SergeAstapov))
* `tracked-toolbox`
  * [#212](https://github.com/tracked-tools/tracked-toolbox/pull/212) Update to latest blueprint setup ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#106](https://github.com/tracked-tools/tracked-toolbox/pull/106) Bump rollup from 2.70.2 to 3.20.2 ([@SergeAstapov](https://github.com/SergeAstapov))
  * [#90](https://github.com/tracked-tools/tracked-toolbox/pull/90) Rename addon folder to tracked-toolbox ([@SergeAstapov](https://github.com/SergeAstapov))

#### Committers: 2
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.3.0 (2022-06-13)

**Note:** these are backports from [v2.0.0](#v200-2022-05-17) below.

#### :rocket: Enhancement
* [#75](https://github.com/tracked-tools/tracked-toolbox/pull/75) backport: Move `ember-cli-htmlbars` to `devDependencies` ([@chriskrycho](https://github.com/chriskrycho))
* [#74](https://github.com/tracked-tools/tracked-toolbox/pull/74) backport: Add ability to pass a custom comparator to `dedupe-tracked` ([@chriskrycho](https://github.com/chriskrycho))
* [#73](https://github.com/tracked-tools/tracked-toolbox/pull/73) Backport: support Ember v4 ([@chriskrycho](https://github.com/chriskrycho))

#### :house: Internal
* [#72](https://github.com/tracked-tools/tracked-toolbox/pull/72) Add v1.x branch to CI config ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 1
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))


## v2.0.0 (2022-05-17)

#### :boom: Breaking Change
* [#68](https://github.com/tracked-tools/tracked-toolbox/pull/68) Remove deprecated localCopy memo function variant ([@chriskrycho](https://github.com/chriskrycho))
* [#67](https://github.com/tracked-tools/tracked-toolbox/pull/67) Drop support for Node 12 from `engines` ([@SergeAstapov](https://github.com/SergeAstapov))
* [#66](https://github.com/tracked-tools/tracked-toolbox/pull/66) Drop support for Node 12 ([@chriskrycho](https://github.com/chriskrycho))
* [#64](https://github.com/tracked-tools/tracked-toolbox/pull/64) Convert to v2 addon ([@SergeAstapov](https://github.com/SergeAstapov))
* [#44](https://github.com/tracked-tools/tracked-toolbox/pull/44) Drop Node.js 8, 10, 11, 13, 15 support ([@SergeAstapov](https://github.com/SergeAstapov))

#### :rocket: Enhancement
* [#57](https://github.com/tracked-tools/tracked-toolbox/pull/57) Move `ember-cli-htmlbars` to `devDependencies` ([@SergeAstapov](https://github.com/SergeAstapov))
* [#53](https://github.com/tracked-tools/tracked-toolbox/pull/53) Add ability to pass a custom comparator to `dedupe-tracked` ([@boris-petrov](https://github.com/boris-petrov))
* [#48](https://github.com/tracked-tools/tracked-toolbox/pull/48) Support Ember 4 and make CI pass ([@SergeAstapov](https://github.com/SergeAstapov))

#### :bug: Bug Fix
* [#47](https://github.com/tracked-tools/tracked-toolbox/pull/47) Fix missing `since` option for `local-copy-memo-fn` deprecation ([@SergeAstapov](https://github.com/SergeAstapov))

#### :memo: Documentation
* [#51](https://github.com/tracked-tools/tracked-toolbox/pull/51) Update repository url in package.json ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* [#71](https://github.com/tracked-tools/tracked-toolbox/pull/71) Add `repository` to `package.json` ([@chriskrycho](https://github.com/chriskrycho))
* [#59](https://github.com/tracked-tools/tracked-toolbox/pull/59) Run ember-cli-update to v4.2 to align with the latest addon blueprint ([@SergeAstapov](https://github.com/SergeAstapov))
* [#46](https://github.com/tracked-tools/tracked-toolbox/pull/46) Add prettier per latest addon blueprint ([@SergeAstapov](https://github.com/SergeAstapov))
* [#50](https://github.com/tracked-tools/tracked-toolbox/pull/50) Run ember-cli-update to v3.28.3 to align with the latest addon blueprint ([@SergeAstapov](https://github.com/SergeAstapov))
* [#43](https://github.com/tracked-tools/tracked-toolbox/pull/43) Update npmignore file ([@SergeAstapov](https://github.com/SergeAstapov))

#### Committers: 3
- Boris Petrov ([@boris-petrov](https://github.com/boris-petrov))
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))

## v1.2.3 (2021-04-01)

#### :bug: Bug Fix
* [#27](https://github.com/pzuraq/tracked-toolbox/pull/27) Deprecate @localCopy memo function ([@pzuraq](https://github.com/pzuraq))

#### :house: Internal
* [#28](https://github.com/pzuraq/tracked-toolbox/pull/28) convert to GH actions ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

## v1.2.2 (2021-03-23)

#### :bug: Bug Fix
* [#25](https://github.com/pzuraq/tracked-toolbox/pull/25) [BUGFIX] initialize meta on the first local set ([@jackson-dean](https://github.com/jackson-dean))

#### Committers: 3
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Jackson Dean ([@jackson-dean](https://github.com/jackson-dean))
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))

## v1.2.1 (2020-08-21)

#### :bug: Bug Fix
* [#15](https://github.com/pzuraq/tracked-toolbox/pull/15) add failing test for @dedupedTracked without an initializer ([@miguelcobain](https://github.com/miguelcobain))

#### Committers: 1
- Miguel Andrade ([@miguelcobain](https://github.com/miguelcobain))

## v1.2.0 (2020-07-20)

#### :rocket: Enhancement
* [#12](https://github.com/pzuraq/tracked-toolbox/pull/12) [FEAT] Adds @trackedReset ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

## v1.1.0 (2020-06-23)

#### :rocket: Enhancement
* [#10](https://github.com/pzuraq/tracked-toolbox/pull/10) [FEAT] Adds @dedupeTracked ([@pzuraq](https://github.com/pzuraq))
* [#9](https://github.com/pzuraq/tracked-toolbox/pull/9) [FEAT] Adds @cached decorator ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))



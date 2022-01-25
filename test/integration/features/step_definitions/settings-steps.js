import {fileExists} from '@form8ion/core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the settings app is configured', async function () {
  assert.isTrue(await fileExists(`${process.cwd()}/.github/settings.yml`));
});

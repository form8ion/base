import {promises as fs} from 'fs';
import jsYaml from 'js-yaml';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import scaffoldSettingsConfig from './scaffolder';

suite('repository settings', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(jsYaml, 'dump');
    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the account-level base config for the settings app is defined', async () => {
    const pathToGithubDirectory = any.string();
    const dumpedYaml = any.string();
    jsYaml.dump.withArgs({}).returns(dumpedYaml);

    await scaffoldSettingsConfig({pathToGithubDirectory});

    assert.calledWith(fs.writeFile, `${pathToGithubDirectory}/settings.yml`, dumpedYaml);
  });
});

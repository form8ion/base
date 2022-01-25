import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as mkdir from '../thirdparty-wrappers/make-dir';
import * as settingsScaffolder from './settings/scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;
  const pathToCreatedGithubDirectory = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(mkdir, 'default');
    sandbox.stub(settingsScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the account-level details are initialized', async () => {
    const projectRoot = any.string();
    mkdir.default.withArgs(`${projectRoot}/.github`).resolves(pathToCreatedGithubDirectory);

    const results = await scaffold({projectRoot});

    assert.deepEqual(results, {});
    assert.calledWith(settingsScaffolder.default, {pathToGithubDirectory: pathToCreatedGithubDirectory});
  });
});

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
    jsYaml.dump
      .withArgs({
        repository: {
          has_wiki: false,
          has_projects: false,
          has_downloads: false,
          allow_squash_merge: false,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          delete_branch_on_merge: true
        },
        branches: [{
          name: 'master',
          protection: {
            required_pull_request_reviews: null,
            required_status_checks: null,
            restrictions: null,
            enforce_admins: true
          }
        }],
        teams: [{
          name: 'maintainers',
          permission: 'push'
        }]
      })
      .returns(dumpedYaml);

    await scaffoldSettingsConfig({pathToGithubDirectory});

    assert.calledWith(fs.writeFile, `${pathToGithubDirectory}/settings.yml`, dumpedYaml);
  });
});

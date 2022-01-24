import mkdir from '../thirdparty-wrappers/make-dir';
import {scaffolder as scaffoldSettings} from './settings';

export default async function ({projectRoot}) {
  const pathToCreatedGithubDirectory = await mkdir(`${projectRoot}/.github`);

  await scaffoldSettings({pathToGithubDirectory: pathToCreatedGithubDirectory});

  return {};
}

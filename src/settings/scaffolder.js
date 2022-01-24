import {promises as fs} from 'fs';
import {dump} from 'js-yaml';

export default async function ({pathToGithubDirectory}) {
  await fs.writeFile(`${pathToGithubDirectory}/settings.yml`, dump({}));
}

import {promises as fs} from 'fs';
import {dump} from 'js-yaml';

export default async function ({projectRoot}) {
  await fs.writeFile(`${projectRoot}/.github/settings.yml`, dump({}));
}

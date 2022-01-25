import {promises as fs} from 'fs';
import {dump} from 'js-yaml';

export default async function ({pathToGithubDirectory}) {
  await fs.writeFile(
    `${pathToGithubDirectory}/settings.yml`,
    dump({
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
  );
}

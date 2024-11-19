export interface ContributorType {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  contributions: number;
}

export interface ReleasesType {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: Asset[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface Asset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: string;
  uploader: Author;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: Date;
  updated_at: Date;
  browser_download_url: string;
}

export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export class GithubApi {
  public async getAppLicense(): Promise<string | undefined> {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/Muhammed-Rahif/Notpad/refs/heads/main/LICENSE'
      );
      if (!res.ok) {
        throw new Error('Failed to fetch license');
      }
      const data = await res.text();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getContributors(): Promise<ContributorType[] | undefined> {
    try {
      const res = await fetch('https://api.github.com/repos/Muhammed-Rahif/Notpad/contributors');
      if (!res.ok) {
        throw new Error('Failed to fetch contributors');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getReleases(): Promise<ReleasesType[] | undefined> {
    try {
      const res = await fetch('https://api.github.com/repos/Muhammed-Rahif/Notpad/releases');
      if (!res.ok) {
        throw new Error('Failed to fetch releases');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

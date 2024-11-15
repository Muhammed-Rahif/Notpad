export interface ContributorType {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  contributions: number;
}

export interface ReleasesType {
  assets: Asset[];
}

export interface Asset {
  name: string;
  url: string;
  content_type: string;
  size: number;
  download_count: number;
  created_at: Date;
  updated_at: Date;
  browser_download_url: string;
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
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

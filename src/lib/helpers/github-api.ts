export interface ContributorType {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  contributions: number;
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
}

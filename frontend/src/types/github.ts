export interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  defaultBranch: string;
}

export interface GitHubFile {
  path: string;
  content: string;
  size: number;
}

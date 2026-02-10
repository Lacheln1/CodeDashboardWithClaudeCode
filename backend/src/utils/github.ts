import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const parseRepoUrl = (url: string): { owner: string; repo: string } => {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  return { owner: match[1], repo: match[2].replace('.git', '') };
};

export const getRepoFiles = async (
  owner: string,
  repo: string,
  path = ''
): Promise<{ path: string; content: string }[]> => {
  const { data } = await octokit.repos.getContent({ owner, repo, path });
  const files: { path: string; content: string }[] = [];

  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.type === 'file' && isAnalyzableFile(item.name)) {
        const fileData = await octokit.repos.getContent({ owner, repo, path: item.path });
        if (!Array.isArray(fileData.data) && 'content' in fileData.data) {
          files.push({
            path: item.path,
            content: Buffer.from(fileData.data.content, 'base64').toString('utf-8'),
          });
        }
      }
    }
  }

  return files;
};

const ANALYZABLE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rs'];

const isAnalyzableFile = (filename: string): boolean => {
  return ANALYZABLE_EXTENSIONS.some((ext) => filename.endsWith(ext));
};

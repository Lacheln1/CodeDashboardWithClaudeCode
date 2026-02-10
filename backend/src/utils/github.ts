import { Octokit } from '@octokit/rest';
import type { GitHubRepo, GitHubFile } from '../types/github';
import type { FileContent } from '../types/agent';

/** 분석 가능한 파일 확장자 목록 */
const ANALYZABLE_EXTENSIONS: readonly string[] = [
  '.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rs',
];

/** 무시할 디렉토리 목록 */
const IGNORED_DIRS: readonly string[] = [
  'node_modules', 'dist', 'build', '.git', '.next', 'vendor', '__pycache__',
];

/** 단일 파일 최대 크기 (bytes) — 이보다 큰 파일은 건너뜀 */
const MAX_FILE_SIZE = 100_000;

/** 최대 수집 파일 수 */
const MAX_FILES = 50;

/** 인증된 Octokit 인스턴스를 생성 */
const createOctokit = (): Octokit => {
  return new Octokit({ auth: process.env.GITHUB_TOKEN });
};

/**
 * GitHub 저장소 URL을 owner/repo로 파싱
 * @throws URL 형식이 올바르지 않을 경우
 */
export const parseRepoUrl = (url: string): { owner: string; repo: string } => {
  const match = url.match(/github\.com\/([^/]+)\/([^/\s?#]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }
  return { owner: match[1], repo: match[2].replace('.git', '') };
};

/** 파일명이 분석 가능한 확장자인지 판별 */
const isAnalyzableFile = (filename: string): boolean => {
  return ANALYZABLE_EXTENSIONS.some((ext) => filename.endsWith(ext));
};

/** 디렉토리가 무시 대상인지 판별 */
const isIgnoredDir = (dirname: string): boolean => {
  return IGNORED_DIRS.includes(dirname);
};

/** GitHub 저장소 메타 정보를 조회 */
export const getRepoInfo = async (owner: string, repo: string): Promise<GitHubRepo> => {
  const octokit = createOctokit();
  const { data } = await octokit.repos.get({ owner, repo });

  return {
    owner: data.owner.login,
    name: data.name,
    fullName: data.full_name,
    description: data.description ?? '',
    language: data.language ?? '',
    stars: data.stargazers_count,
    forks: data.forks_count,
    defaultBranch: data.default_branch,
  };
};

/**
 * 저장소의 분석 가능한 파일들을 재귀적으로 수집
 *
 * - `ANALYZABLE_EXTENSIONS`에 해당하는 파일만 수집
 * - `IGNORED_DIRS`에 해당하는 디렉토리는 건너뜀
 * - `MAX_FILE_SIZE`를 초과하는 파일은 건너뜀
 * - 최대 `MAX_FILES`개까지 수집
 */
export const getRepoFiles = async (
  owner: string,
  repo: string,
  path = '',
): Promise<FileContent[]> => {
  const octokit = createOctokit();
  const files: FileContent[] = [];

  const collect = async (currentPath: string): Promise<void> => {
    if (files.length >= MAX_FILES) return;

    const { data } = await octokit.repos.getContent({ owner, repo, path: currentPath });

    if (!Array.isArray(data)) return;

    for (const item of data) {
      if (files.length >= MAX_FILES) break;

      if (item.type === 'dir' && !isIgnoredDir(item.name)) {
        await collect(item.path);
      }

      if (item.type === 'file' && isAnalyzableFile(item.name) && (item.size ?? 0) <= MAX_FILE_SIZE) {
        const fileData = await octokit.repos.getContent({ owner, repo, path: item.path });

        if (!Array.isArray(fileData.data) && 'content' in fileData.data && fileData.data.content) {
          files.push({
            path: item.path,
            content: Buffer.from(fileData.data.content, 'base64').toString('utf-8'),
          });
        }
      }
    }
  };

  await collect(path);
  return files;
};

/** 단일 파일의 내용을 조회 */
export const getFileContent = async (
  owner: string,
  repo: string,
  path: string,
): Promise<GitHubFile | null> => {
  const octokit = createOctokit();

  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path });

    if (Array.isArray(data) || !('content' in data) || !data.content) {
      return null;
    }

    return {
      path: data.path,
      content: Buffer.from(data.content, 'base64').toString('utf-8'),
      size: data.size,
    };
  } catch {
    return null;
  }
};

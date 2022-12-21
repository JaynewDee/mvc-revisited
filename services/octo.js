import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.OCTO_KEY
});

const getRepos = async (user) =>
  await octokit.request("GET /users/{username}/repos", {
    username: user
  });

const GitService = (octo) => (user) => ({
  octo,
  user,
  getRepos: () => getRepos(owner)
});

export const gitService = GitService(octokit);

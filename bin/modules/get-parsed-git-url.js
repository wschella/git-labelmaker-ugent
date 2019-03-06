const gitUrl = require('github-url-from-git');

module.exports = (config, remote, error) => {
    const url = config[remote].url;
    const parsedGitUrl = gitUrl(url, { extraBaseUrls: ['github.ugent.be'] });
    const rootGithubUrl = 'https://github.ugent.be/';
    if (!parsedGitUrl || parsedGitUrl.indexOf(rootGithubUrl) === -1) return error();
    return parsedGitUrl
        .split(rootGithubUrl) // -> ['', 'user/repo']
        .reduce((a, b) => b.length ? b : a); // eslint-disable-line no-confusing-arrow
};

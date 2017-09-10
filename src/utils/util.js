const handleErrors = (response) => {
    if (!response.ok) {
        throw Error('User can not found');
    }
    return response;
}

const getFilteredRepositories = ({ hasOpenIssues, hasTopics, starredTimes, updatedAfter, repoType, language }, repos) => {
    return repos.filter(repo => {
        return (hasOpenIssues ? !!repo.open_issues_count : true)
            && (hasTopics ? !!repo.topics.length : true)
            && repo.stargazers_count >= starredTimes
            && (updatedAfter
                ? new Date(repo.pushed_at) > new Date(updatedAfter)
                : true)
            && (repoType && repoType !== 'All'
                ? (repoType === 'Fork' ? repo.fork : !repo.fork)
                : true)
            && (language && language !== 'All'
                ? repo.language === language
                : true)
    });
}

const getSortedRepositories = (repos, sorting) => {
    let {by, order} = sorting;
    const sorted = [...repos];

    switch (by) {
        case 'name':
            sorted.sort((a, b) => a[by].localeCompare(b[by]));
            break;
        case 'pushed_at':
            sorted.sort((a, b) => new Date(a[by]) - new Date(b[by]));
            break;
        default:
            sorted.sort((a, b) => a[by] - b[by]);
            break;
    }

    order === 'desc' && sorted.reverse();

    return sorted;
}

export {handleErrors, getFilteredRepositories, getSortedRepositories}
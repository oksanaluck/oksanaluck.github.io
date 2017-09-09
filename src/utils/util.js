const handleErrors = (response) => {
    if (!response.ok) {
        throw Error('User can not found');
    }
    return response;
}

export {handleErrors}
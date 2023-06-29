const BACKEND_URL = 'http://demo6378504.mockable.io/user';

export const getUsers = async () => {
    const response = await fetch(BACKEND_URL, {
        method: 'GET'
    })
    return await response.json();
}

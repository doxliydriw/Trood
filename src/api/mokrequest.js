export const saveUserTostorage = (data) =>
{
    localStorage.clear();
    localStorage.setItem("userData", JSON.stringify(data));
}

export const getUserFromStorage = () =>
{
    const userData = localStorage.getItem("userData");
    if (userData) {
        const userObject = JSON.parse(userData);
        return userObject;
    } else {
        return null;
    }
}
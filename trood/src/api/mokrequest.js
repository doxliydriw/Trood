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
        console.log("User Data:", userObject);
        return userObject;
    } else {
        console.log("No user data found in localStorage.");
        return null;
    }
}
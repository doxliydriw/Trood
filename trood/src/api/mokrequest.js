export const saveUserTostorage = (data) =>
{
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(data));
}

export const getUserFromStorage = () =>
{
    const userData = localStorage.getItem("user");

    if (userData) {
        const userObject = JSON.parse(userData);
        console.log("User Data:", userObject);
    } else {
        console.log("No user data found in localStorage.");
    }
}
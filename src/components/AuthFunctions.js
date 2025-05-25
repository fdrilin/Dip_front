export default function getToken() 
{
    let currentUser = getCurrentUser();
    console.log(currentUser);
    let auth = "";
    if (currentUser)
    {
        auth = `Bearer ${currentUser.token}`
        console.log(auth);
    }
    return auth;
}

export function isAdmin()
{
    let currentUser = getCurrentUser();
    return currentUser && currentUser.admin == 1;
}

function getCurrentUser()
{
    let currentUser = sessionStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);

    return currentUser;
}

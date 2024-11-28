const loggedInUser = () => {
    const storedUser = sessionStorage.getItem('loggedInUser');

    if (storedUser) {
        return JSON.parse(storedUser);
    } else {
        alert('No user found!')
    }
};

const user = loggedInUser();

console.log(user.email);
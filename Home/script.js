const loggedInUser = () => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    console.log(storedUser);

    if (storedUser) {
        return JSON.parse(storedUser);

    } else {
        alert('No user found!')
    }
};

const user = loggedInUser();

console.log(user.email);
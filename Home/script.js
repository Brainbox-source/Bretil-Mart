// import button from "../components/button.js";


// const buttonCon = document.getElementById('buttonCon');
// const buttonCon2 = document.getElementById('buttonCon2');

// buttonCon.appendChild(button("Learn more", '#ff8c00', 'white'));
// buttonCon2.appendChild(button("Sales", 'green', 'white', 'yes'));


// const loggedInUser = () => {
//     // Retrieve the stored user from sessionStorage
//     const storedUser = sessionStorage.getItem('loggedInUser');
//     console.log(storedUser);

//     // Check if there's a stored user, and parse the JSON data if found
//     if (storedUser) {
//         try {
//             // Parse and return the parsed user object
//             return JSON.parse(storedUser);
//         } catch (error) {
//             // Handle any errors that occur during parsing
//             alert('Error parsing user data!');
//             console.error('Error parsing user data:', error);
//         }
//     } else {
//         // If no user is found in sessionStorage, alert the user
//         alert('No user found!');
//     }
//     return null; // Return null if no user found or error occurred
// };

// const user = loggedInUser();

// if (user) {
//     // If a valid user object is returned, log the user details
//     console.log('User details:', user);
// } else {
//     // Handle the case where no user is found
//     console.log('No user logged in');
// }



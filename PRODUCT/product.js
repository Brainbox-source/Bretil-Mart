// Select the main image and all thumbnails
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

// Add click event listeners to each thumbnail
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    // Update the main image source with the clicked thumbnail's source
    mainImage.src = thumbnail.src;

    // Optional: Add a border to the selected thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active-thumbnail'));
    thumbnail.classList.add('active-thumbnail');
  });
});

<?php include "header.php" ?>

<?php
// Load and decode the JSON data
$json_data = file_get_contents('profile.json');
$data = json_decode($json_data, true);

// Access data from the JSON file
$profiles = $data['profiles'];
?>

<!-- Main container with sidebar -->
<div class="container-fluid" style="display: flex; min-height: 100vh; padding: 0;">
    <!-- Sidebar (left) -->
    <div style="width: 250px; background-color: #f8f9fa; padding: 20px; box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);">
        <!-- Profile Section -->
        <div class="text-center mb-4">
            <img src="<?php echo $profiles[0]['image']; ?>" alt="Profile Image" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
            <h5 class="mt-3"><?php echo $profiles[0]['name']; ?></h5>
            <p class="text-muted" style="font-size: 14px;">Software Developer</p>
        </div>

        <!-- Create Post Button -->
        <a href="createpost.php" class="btn btn-primary w-100 mb-3">Create Post</a>

        <!-- List of options for different sports posts -->
        <ul class="list-unstyled">
            <li><a href="createpost.php?type=cricket" class="d-block py-2 text-dark">Add Cricket Post</a></li>
            <li><a href="createpost.php?type=badminton" class="d-block py-2 text-dark">Add Badminton Post</a></li>
            <li><a href="createpost.php?type=volleyball" class="d-block py-2 text-dark">Add Volleyball Post</a></li>
            <li><a href="createpost.php?type=basketball" class="d-block py-2 text-dark">Add Basketball Post</a></li>
            <li><a href="createpost.php?type=tennis" class="d-block py-2 text-dark">Add Tennis Post</a></li>
            <li><a href="createpost.php?type=football" class="d-block py-2 text-dark">Create Football Post</a></li>
        </ul>
    </div>

    <!-- Main Content Area (to the right of the sidebar) -->
    <div id="profile-container" class="container d-flex justify-content-center flex-column align-items-center" style="flex-grow: 1; padding: 0;">
        <!-- Profile Cards will be loaded here dynamically -->
    </div>
</div>

<!-- Footer -->
<?php include "footer.php" ?>

<script>
// JavaScript to implement Infinite Scroll
let currentPage = 0;
const profilesPerPage = 1; // Number of profiles to load at a time

function loadProfiles() {
    // Make sure we don't load beyond the available profiles
    const profiles = <?php echo json_encode($profiles); ?>;
    const totalProfiles = profiles.length;
    
    // Determine the slice of profiles to load
    const start = currentPage * profilesPerPage;
    const end = start + profilesPerPage;

    if (start >= totalProfiles) {
        return; // No more profiles to load
    }

    // Create HTML content for the profiles to be loaded
    const profilesToLoad = profiles.slice(start, end);
    let profileHTML = '';
    
    profilesToLoad.forEach(profile => {
        profileHTML += `
            <div class="card" style="width: 30rem; height: 500px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); margin-bottom: 20px;">
                <img src="${profile.image}" alt="Profile Image" class="card-img-top" style="width: 150px; height: 150px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                <div class="card-body" style="padding: 1rem;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="mb-0" style="margin-left: 5px;">Name:</h5>
                        <span class="fw-bold" style="font-size: 24px; margin-left: -150px;">${profile.name}</span>
                        <span class="fs-4">❤️</span>
                    </div>
                    <p class="mb-0 text-muted" style="font-size: 14px;">
                        ${profile.description}
                    </p>
                </div>
            </div>
        `;
    });

    // Append the new profiles to the container
    document.getElementById('profile-container').insertAdjacentHTML('beforeend', profileHTML);

    // Increment the page counter to load the next set of profiles when scrolling
    currentPage++;
}

// Listen for scroll events to trigger the next load of profiles
window.addEventListener('scroll', function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadProfiles();
    }
});

// Load initial set of profiles
loadProfiles();
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Post</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Custom Styles */
        #imagePreview {
            max-width: 100%;
            max-height: 300px;
            display: none;
            margin-top: 10px;
        }
    </style>
</head>
<body>

    <div class="container mt-5">
        <h2 class="text-center">Add a New Post</h2>
        
        <!-- Form to Add Post -->
        <form id="postForm" action="post.php" method="POST" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="image" class="form-label">Upload Image</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*" onchange="previewImage(event)" required>
            </div>
            
            <!-- Image Preview -->
            <img id="imagePreview" src="" alt="Image Preview" class="img-fluid">

            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="description" rows="4" placeholder="Enter post description..." required></textarea>
            </div>

            <button type="submit" class="btn btn-success w-100">Add Post</button>
        </form>
    </div>

    <!-- Bootstrap JS and dependencies (Popper.js, Bootstrap JS) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js"></script>

    <script>
        // Function to preview the uploaded image
        function previewImage(event) {
            const imagePreview = document.getElementById('imagePreview');
            const file = event.target.files[0];

            // Check if a file is selected
            if (file) {
                const reader = new FileReader();

                // Set up the reader to load the image and display it
                reader.onload = function() {
                    imagePreview.src = reader.result;
                    imagePreview.style.display = "block";  // Show the image preview
                };

                // Read the file as a data URL
                reader.readAsDataURL(file);
            } else {
                imagePreview.style.display = "none";  // Hide the image preview if no file is selected
            }
        }
    </script>

</body>
</html>

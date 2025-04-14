<?php include "header.php" ?>
<?php 

    if(isset($_REQUEST['create'])){
        extract($_POST);
        $image;
        $file_name = $_FILES['postImage']['name'];
        if($file_name){
            move_uploaded_file($_FILES['postImage']['tmp_name'],"upload/$file_name");
            $image = $file_name;
        }
        $id = $_SESSION['user_id'];
        $q = "insert into posts(title,image,description,category,user_id) values('$title','$image','$description','$category','$id')";
        mysqli_query($connect,$q);

        ?>
<script>
alert("Post Create successfully !");
window.location.href = 'user.php';
</script>
<?php
    }

?>
<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg w-75">
        <div class="card-body">
            <h2 id="form-title" class="text-center mb-4">Add Post</h2>

            <!-- Signup Form -->
            <form id="signup-form" method='post' class='row' enctype="multipart/form-data">
                <div class="col-6">
                    <div class="mb-3">
                        <label for="signup-title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="signup-title" placeholder="Enter your title"
                            name='title' required>
                    </div>
                </div>
                <div class="col-6">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-control" id="category" name="category" required>
                        <option value="Cricket">Select sports</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Hockey">Hockey</option>
                        <option value="Kabaddi">Kabaddi</option>
                        <option value="Football">Football</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Table Tennis">Table Tennis</option>
                    </select>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="signup-image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="signup-image" placeholder="Enter your image"
                            name='postImage' required>
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="signup-description" class="form-label">Description</label>
                        <textarea class="form-control" id="signup-description" placeholder="Enter your description"
                            name='description' required></textarea>
                    </div>
                </div>
                <div class="col-12 ">
                    <button type="submit" class="btn btn-primary w-25" name='create'>Create</button>
                </div>
            </form>

        </div>
    </div>
</div>
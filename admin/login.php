<?php
error_reporting(0);
    session_start();
    if($_SESSION['admin']) {
        header("location:index.php");
    }
    if(isset($_REQUEST['admin'])){
        extract($_POST);
        if($email=='admin@gmail.com' && $password=='admin123'){
            header("location:index.php");
            $_SESSION['admin'] = true;
        }else{
            ?>
<script>
alert("Email or Password went wrong !")
</script>
<?php 
        }
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <!-- Link to Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
    /* Set the background image and ensure it covers the entire page */
    body {
        background-image: url("./img/ball-bat-black-and-white-close-up.jpg");
        background-size: cover;
        background-position: center;
        height: 100vh;
    }

    /* Center the login form */
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .login-form {
        background-color: rgba(255,
                255,
                255,
                0.696);
        /* Light background for form */
        padding: 30px;
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
    }
    </style>
</head>

<body>
    <div class="login-container">
        <div class="login-form">
            <h3 class="text-center">Login</h3>
            <form method="post">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter email"
                        required />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password"
                        placeholder="Enter password" required />
                </div>
                <button type="submit" name="admin" class="btn btn-primary w-100">Log In</button>
            </form>
        </div>
    </div>

    <!-- Link to Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>

</html>
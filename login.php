<?php
session_start();
error_reporting(0);
include("connection.php");
if(isset($_REQUEST['login'])){
  extract($_POST);
  $q = "select * from users where email='$email' and password='$password'";
  $row = mysqli_query($connect,$q);
  $user = mysqli_fetch_array($row);
  if($user){
    $_SESSION['user_id'] = $user['id'];
    header("location:index.php");
  }else{
    ?>
<script>
alert("Email or Password went wrong !")
</script>
<?php 
  }
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SportsEra</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css">
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link rel="stylesheet" href="./assets/css/style.css">
</head>

<body data-bs-spy="scroll" data-bs-target=".navbar">
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-lg" style="width: 400px;">
            <div class="card-body">
                <h2 id="form-title" class="text-center mb-4">Login</h2>

                <!-- Signup Form -->
                <form id="signup-form" method='post'>
                    <div class="mb-3">
                        <label for="signup-email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="signup-email" placeholder="Enter your email"
                            name='email' required>
                    </div>
                    <div class="mb-3">
                        <label for="signup-password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="signup-password"
                            placeholder="Enter your password" name='password' required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mb-3" name='login'>Sign In</button>
                    <p class="text-center">
                        Create new account
                        <a href="register.php" class="text-primary text-decoration-none">Register</a>
                    </p>
                </form>



            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    </script>
</body>

</html>
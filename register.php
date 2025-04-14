<?php
include("connection.php");
session_start();
if(isset($_REQUEST['register'])){
    extract($_POST);
    if($password !== $comPassword){
        ?>
<script>
alert("Password and Confirm Password must be same !");
</script>
<?php
    }else{
        $image;
        $file_name = $_FILES['profilePicture']['name'];
        if($file_name){
            move_uploaded_file($_FILES['profilePicture']['tmp_name'],"upload/$file_name");
            $image = $file_name;
        }

        $activeDaysString = implode(",",$activeDays);
        $favoriteSportString =  implode(",",$favoriteSports);

        $q = "INSERT INTO users (fullName, email, password, dob, gender, contactNumber, address, profilePicture, primarySport, skillLevel, favoriteSports, activeDays, achievements) 
        VALUES ('$fullName', '$email', '$password', '$dob', '$gender', '$contactNumber', '$address', '$image', '$primarySport', '$skillLevel', '$favoriteSportString', '$activeDaysString', '$achievements')";

        mysqli_query($connect,$q);

        $new_id = mysqli_insert_id($connect);


        $_SESSION['user_id'] = $new_id;
        header("location:index.php");
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
    <div class="container d-flex justify-content-center align-items-center my-5">
        <div class="card shadow-lg" style="width: 650px;">
            <div class="card-body">
                <h2 id="form-title" class="text-center mb-4">Register</h2>

                <!-- Signup Form -->
                <form id="signup-form" method='post' enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="fullName" placeholder="Enter your full name"
                                    name="fullName" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email"
                                    name="email" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password"
                                    placeholder="Enter your password" name="password" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="comPassword" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="comPassword"
                                    placeholder="Confirm your password" name="comPassword" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="dob" class="form-label">DOB</label>
                                <input type="date" class="form-control" id="dob" placeholder="Enter your DOB" name="dob"
                                    required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="gender" class="form-label">Gender</label>
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="male" name="gender" value="male" checked="checked"
                                            required>
                                        <label for="male">Male</label>
                                    </div>
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="female" name="gender" value="female" required>
                                        <label for="female">Female</label>
                                    </div>
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="none" name="gender" value="none" required>
                                        <label for="none">None</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="contactNumber" class="form-label">Contact Number</label>
                                <input type="text" class="form-control" id="contactNumber"
                                    placeholder="Enter your contact number" maxlength='10'
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                    name="contactNumber" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="profilePicture" class="form-label">Profile Picture</label>
                                <input type="file" class="form-control" id="profilePicture" name="profilePicture"
                                    accept="image/*" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <textarea type="text" class="form-control" id="address" placeholder="Enter your address"
                                    name="address" required></textarea>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="primarySport" class="form-label">Primary Sport</label>
                                <select class="form-control" id="primarySport" name="primarySport" required>
                                    <option value="">Select sports</option>
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
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="skillLevel" class="form-label">Skill Level</label>
                                <select class="form-control" id="skillLevel" name="skillLevel" required>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="favoriteSport" class="form-label">Favorite Sports</label>
                                <div class="d-flex flex-wrap gap-2">
                                    <div>
                                        <input type="checkbox" id="cricket" name="favoriteSports[]" value="Cricket">
                                        <label for="cricket">Cricket</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="hockey" name="favoriteSports[]" value="Hockey">
                                        <label for="hockey">Hockey</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="kabaddi" name="favoriteSports[]" value="Kabaddi">
                                        <label for="kabaddi">Kabaddi</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="football" name="favoriteSports[]" value="Football">
                                        <label for="football">Football</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tennis" name="favoriteSports[]" value="Tennis">
                                        <label for="tennis">Tennis</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="badminton" name="favoriteSports[]" value="Badminton">
                                        <label for="badminton">Badminton</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="basketball" name="favoriteSports[]"
                                            value="Basketball">
                                        <label for="basketball">Basketball</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tabletennis" name="favoriteSports[]"
                                            value="Table Tennis">
                                        <label for="tabletennis">Table Tennis</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label class="form-label">Active Days</label>
                                <div class="d-flex flex-wrap gap-2">
                                    <div>
                                        <input type="checkbox" id="monday" name="activeDays[]" value="Monday">
                                        <label for="monday">Monday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tuesday" name="activeDays[]" value="Tuesday">
                                        <label for="tuesday">Tuesday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="wednesday" name="activeDays[]" value="Wednesday">
                                        <label for="wednesday">Wednesday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="thursday" name="activeDays[]" value="Thursday">
                                        <label for="thursday">Thursday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="friday" name="activeDays[]" value="Friday">
                                        <label for="friday">Friday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="saturday" name="activeDays[]" value="Saturday">
                                        <label for="saturday">Saturday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="sunday" name="activeDays[]" value="Sunday">
                                        <label for="sunday">Sunday</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="achievements" class="form-label">Achievements</label>
                                <textarea class="form-control" id="achievements" placeholder="Enter your achievements"
                                    name="achievements" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mb-3" name='register'>Signup</button>
                    <p class="text-center">
                        Already have an account?
                        <a href="login.php" class="text-primary text-decoration-none">Login</a>
                    </p>
                </form>


                <!-- Logout Button -->
                <button id="logout-btn" class="btn btn-danger w-100 mt-3" style="display: none;"
                    onclick="logout()">Logout</button>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    </script>
</body>

</html>
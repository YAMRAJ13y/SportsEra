<?php include "header.php"; ?>
<?php 
     $userQuery = "SELECT * FROM users WHERE id=$id";

     $row = mysqli_query($connect,$userQuery);

     $data = mysqli_fetch_array($row);

    include "connection.php";
    if(isset($_REQUEST['update'])){
            extract($_POST);
            $image;
            $file_name = $_FILES['profilePicture']['name'];
            if($file_name){
                move_uploaded_file($_FILES['profilePicture']['tmp_name'],"upload/$file_name");
                $image = $file_name;
            }else{
                $image = $data['profilePicture'];
            }

            $activeDaysString = implode(",",$activeDays);
            $favoriteSportString =  implode(",",$favoriteSports);

            $q = "UPDATE users set fullName='$fullName', email='$email', dob='$dob', gender='$gender', contactNumber='$contactNumber', address='$address', profilePicture='$image', primarySport='$primarySport', skillLevel='$skillLevel', favoriteSports='$favoriteSportString', activeDays='$activeDaysString', achievements='$achievements' WHERE id=$id";

            mysqli_query($connect,$q);

            header("location:user.php");
    }

?>
<div>
    <div class="continer mx-5 mt-3">
        <h2 class="mx-4 mb-4 ">Update User</h2>
        <div class="row">


            <div class='col-6 mx-auto '>
                <form id="signup-form" method='post' enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" value="<?php echo $data['fullName']; ?>"
                                    id="fullName" placeholder="Enter your full name" name="fullName" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" value="<?php echo $data['email']; ?>"
                                    id="email" placeholder="Enter your email" name="email" required>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="mb-3">
                                <label for="dob" class="form-label">DOB</label>
                                <input type="date" class="form-control" id="dob" placeholder=" Enter your DOB"
                                    name="dob" required value='<?php echo $data['dob']; ?>'>
                            </div>

                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="gender" class="form-label">Gender</label>
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="male" name="gender" value="male" required
                                            <?php if($data['gender']=='male') { ?>checked="checked" <?php  } ?>>
                                        <label for="male">Male</label>
                                    </div>
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="female" name="gender" value="female"
                                            <?php if($data['gender']=='female') { ?>checked="checked" <?php  } ?>
                                            required>
                                        <label for="female">Female</label>
                                    </div>
                                    <div class="d-flex gap-1">
                                        <input type="radio" id="none" name="gender" value="none"
                                            <?php if($data['gender']=='none') { ?>checked="checked" <?php  } ?>
                                            required>
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
                                    name="contactNumber" required value='<?php echo $data['contactNumber']; ?>'>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="profilePicture" class="form-label">Profile Picture</label>
                                <input type="file" class="form-control" id="profilePicture" name="profilePicture"
                                    accept="image/*">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <textarea type="text" class="form-control" id="address" placeholder="Enter your address"
                                    name="address" required
                                    value='<?php echo $data['address']; ?>'><?php echo $data['address']; ?></textarea>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="primarySport" class="form-label">Primary Sport</label>
                                <select class="form-control" id="primarySport" name="primarySport" required>
                                    <option value="">
                                        Select sports</option>
                                    <option value="Cricket" <?php if($data['primarySport'] =='Cricket') { ?> selected
                                        <?php } ?>>Cricket</option>
                                    <option value="Hockey" <?php if($data['primarySport'] =='Hockey') { ?>
                                        selected<?php } ?>>Hockey</option>
                                    <option value="Kabaddi" <?php if($data['primarySport'] =='Kabaddi') { ?>
                                        selected<?php } ?>>Kabaddi</option>
                                    <option value="Football" <?php if($data['primarySport'] =='Football') { ?>
                                        selected<?php } ?>>Football</option>
                                    <option value="Tennis" <?php if($data['primarySport'] =='Tennis') { ?>
                                        selected<?php } ?>>Tennis</option>
                                    <option value="Badminton" <?php if($data['primarySport'] =='Badminton') { ?>
                                        selected<?php } ?>>Badminton</option>
                                    <option value="Basketball" <?php if($data['primarySport'] =='Basketball') { ?>
                                        selected<?php } ?>>Basketball</option>
                                    <option value="Table Tennis" <?php if($data['primarySport'] =='Table Tennis') { ?>
                                        selected<?php } ?>>Table Tennis</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="skillLevel" class="form-label">Skill Level</label>
                                <select class="form-control" id="skillLevel" name="skillLevel" required>
                                    <option value="Beginner" <?php if($data['skillLevel'] =='Beginner') { ?>
                                        selected<?php } ?>>Beginner</option>
                                    <option value="Intermediate" <?php if($data['skillLevel'] =='Intermediate') { ?>
                                        selected<?php } ?>>Intermediate</option>
                                    <option value="Advanced" <?php if($data['skillLevel'] =='Advanced') { ?>
                                        selected<?php } ?>>Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="favoriteSport" class="form-label">Favorite Sports</label>
                                <div class="d-flex flex-wrap gap-2">
                                    <div>
                                        <input type="checkbox" id="cricket" name="favoriteSports[]" value="Cricket"
                                            <?php if(str_contains($data['favoriteSports'], "Cricket")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="cricket">Cricket</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="hockey" name="favoriteSports[]" value="Hockey"
                                            <?php if(str_contains($data['favoriteSports'], "Hockey")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="hockey">Hockey</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="kabaddi" name="favoriteSports[]" value="Kabaddi"
                                            <?php if(str_contains($data['favoriteSports'], "Kabaddi")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="kabaddi">Kabaddi</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="football" name="favoriteSports[]" value="Football"
                                            <?php if(str_contains($data['favoriteSports'], "Football")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="football">Football</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tennis" name="favoriteSports[]" value="Tennis"
                                            <?php if(str_contains($data['favoriteSports'], "Tennis")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="tennis">Tennis</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="badminton" name="favoriteSports[]" value="Badminton"
                                            <?php if(str_contains($data['favoriteSports'], "Badminton")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="badminton">Badminton</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="basketball" name="favoriteSports[]"
                                            value="Basketball"
                                            <?php if(str_contains($data['favoriteSports'], "Basketball")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="basketball">Basketball</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tabletennis" name="favoriteSports[]"
                                            value="Table Tennis"
                                            <?php if(str_contains($data['favoriteSports'], "Table Tennis")){?>
                                            checked="checked" <?php }  ?>>
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
                                        <input type="checkbox" id="monday" name="activeDays[]" value="Monday"
                                            <?php if(str_contains($data['activeDays'], "Monday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="monday">Monday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="tuesday" name="activeDays[]" value="Tuesday"
                                            <?php if(str_contains($data['activeDays'], "Tuesday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="tuesday">Tuesday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="wednesday" name="activeDays[]" value="Wednesday"
                                            <?php if(str_contains($data['activeDays'], "Wednesday")){?>
                                            checked="checked" <?php }  ?>>
                                        <label for="wednesday">Wednesday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="thursday" name="activeDays[]" value="Thursday"
                                            <?php if(str_contains($data['activeDays'], "Thursday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="thursday">Thursday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="friday" name="activeDays[]" value="Friday"
                                            <?php if(str_contains($data['activeDays'], "Friday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="friday">Friday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="saturday" name="activeDays[]" value="Saturday"
                                            <?php if(str_contains($data['activeDays'], "Saturday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="saturday">Saturday</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="sunday" name="activeDays[]" value="Sunday"
                                            <?php if(str_contains($data['activeDays'], "Sunday")){?> checked="checked"
                                            <?php }  ?>>
                                        <label for="sunday">Sunday</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="achievements" class="form-label">Achievements</label>
                                <textarea class="form-control" id="achievements" placeholder="Enter your achievements"
                                    name="achievements" rows="3"
                                    value='<?php echo $data['achievements']; ?>'><?php echo $data['achievements']; ?></textarea>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mb-3" name='update'>Update User</button>

                </form>
            </div>

        </div>
    </div>
</div>
<?php include "footer.php"; ?>
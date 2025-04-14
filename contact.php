<?php include "header.php"?>
<?php
  include "connection.php";
  if(isset($_REQUEST['contact'])){
      extract($_POST);
      $contectQuery = "insert into contact_user(name,email,subject,message,user_id) values('$name','$email','$subject','$message','$id')";
      mysqli_query($connect,$contectQuery);
      ?>
<script>
alert("Thankyou for contact us...!")
</script>
<?php
header('Location: ' . $_SERVER['REQUEST_URI']);
exit();
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | SportsEra</title>
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <!-- Header (Assumed to be included with navbar) -->

    <div class="container my-5">
        <h1 class="text-center mb-4">Contact Us</h1>
        <p class="lead text-center">
            We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, feel free to
            reach out to us.
        </p>

        <section class="my-5">
            <div class="row">
                <div class="col-md-6">
                    <h4>Contact Information</h4>
                    <p>If you have any questions or need assistance, don’t hesitate to contact us through any of the
                        following ways:</p>
                    <ul class="list-unstyled">
                        <li><strong>Email:</strong> support@sportsera.com</li>
                        <li><strong>Phone:</strong> +91 9865475632</li>
                        <li><strong>Address:</strong> ahmedabad 380008</li>
                    </ul>
                    <p>Follow us on social media:</p>
                    <a href="#" class="btn btn-primary btn-sm mr-2">Facebook</a>
                    <a href="#" class="btn btn-info btn-sm mr-2">Twitter</a>
                    <a href="#" class="btn btn-danger btn-sm">Instagram</a>
                </div>

                <div class="col-md-6">
                    <h4>Send Us a Message</h4>
                    <form method='post'>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name='name' placeholder="Enter your name"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name='email'
                                placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" class="form-control" id="subject" name='subject' placeholder="Subject"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea class="form-control" id="message" rows="5" name='message'
                                placeholder="Type your message here..." required></textarea>
                        </div>
                        <button type="submit" name='contact' class="btn btn-success">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    </div>

    <!-- Footer (Assumed to be included) -->

    <!-- Bootstrap JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
<?php include "footer.php"?>
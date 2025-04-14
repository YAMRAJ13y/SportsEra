<?php  

    include("../connection.php");

    if(isset($_REQUEST['create'])){
        extract($_POST);
        $image;
        $file_name = $_FILES['eventImage']['name'];
        if($file_name){
            move_uploaded_file($_FILES['eventImage']['tmp_name'],"../upload/$file_name");
            $image = $file_name;
        }
        $eventCreate = "insert into events(event_name,event_category,event_venues,total_player,price,win_price,start_date,start_time,image) values('$eventName','$eventCategory','$eventVenues','$totalPlayer','$eventPrice','$winPrice','$startDate','$startTime','$image')";
        mysqli_query($connect,$eventCreate);
        header('location: event.php');
    }

 ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />

    <title>Sport Admin</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet" />

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet" />
</head>

<body id="page-top">
    <div id="wrapper">
        <!-- Page Wrapper -->
        <?php include("header.php"); ?>
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content" class='mt-5'>

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Create Event</h1>
                    </div>


                    <form class='row' enctype="multipart/form-data" method='post'>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-event" class="form-label">Event Name</label>
                                <input type="text" class="form-control" id="signup-event"
                                    placeholder="Enter your event name" name='eventName' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-category" class="form-label">Event Category</label>
                                <select class="form-control" id="category" name="eventCategory" required>
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
                                <label for="signup-venues" class="form-label">Event Venues</label>
                                <input type="text" class="form-control" id="signup-venues"
                                    placeholder="Enter your event venues" name='eventVenues' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-winPrice" class="form-label">Event Win Price</label>
                                <input type="number" class="form-control" id="signup-winPrice"
                                    placeholder="Enter your win price" name='winPrice' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-total-player" class="form-label">Entry Total Player </label>
                                <input type="number" class="form-control" id="signup-total-player"
                                    placeholder="Enter your total player" name='totalPlayer' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-price" class="form-label">Entry Price</label>
                                <input type="number" class="form-control" id="signup-price"
                                    placeholder="Enter your event price" name='eventPrice' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-startDate" class="form-label">Start Date</label>
                                <input type="date" class="form-control" id="signup-startDate"
                                    placeholder="Enter your startDate" name='startDate' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-startTime" class="form-label">Start Time</label>
                                <input type="time" class="form-control" id="signup-startTime"
                                    placeholder="Enter your startDate" name='startTime' required>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="signup-image" class="form-label">Event Image</label>
                                <input type="file" class="form-control" id="signup-image" placeholder="Enter your image"
                                    name='eventImage' required>
                            </div>
                        </div>
                        <div class='col-12 d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary w-25" name='create'>Create Event</button>
                        </div>
                    </form>

                </div>
            </div>
            <!-- End of Main Content -->
            <div>
                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Sport 2024</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->
            </div>
        </div>

        <!-- Bootstrap core JavaScript-->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="js/sb-admin-2.min.js"></script>

        <!-- Page level plugins -->
        <script src="vendor/chart.js/Chart.min.js"></script>

        <!-- Page level custom scripts -->
        <script src="js/demo/chart-area-demo.js"></script>
        <script src="js/demo/chart-pie-demo.js"></script>
</body>

</html>
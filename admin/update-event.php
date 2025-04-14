<?php  

    include("../connection.php");

    
    $requestId = $_REQUEST['id'];
    $selectEvent = "select * from events where id=$requestId";
    $row = mysqli_query($connect,$selectEvent);
    $data = mysqli_fetch_array($row);

    if(isset($_REQUEST['update'])){
        extract($_POST);
        $image;
        $file_name = $_FILES['eventImage']['name'];
        
        if($file_name){
            move_uploaded_file($_FILES['eventImage']['tmp_name'],"../upload/$file_name");
            $image = $file_name;
        }else{
            $image = $data['image'];
        }
        $eventUpdate = "update events set event_name='$eventName',event_category='$eventCategory',event_venues='$eventVenues',price='$eventPrice',win_price='$winPrice',start_date='$startDate',start_time='$startTime',image='$image' where id=$requestId";
        mysqli_query($connect,$eventUpdate);
        header('location:event.php');

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
                                    placeholder="Enter your event name" name='eventName'
                                    value='<?php echo $data['event_name']; ?>' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-category" class="form-label">Event Category</label>
                                <select class="form-control" id="category" name="eventCategory" required>
                                    <option value="">Select sports</option>
                                    <option value="Cricket" <?php if($data['event_category'] == 'Cricket'){?> selected
                                        <?php } ?>>
                                        Cricket</option>
                                    <option value="Hockey" <?php if($data['event_category'] == 'Hockey'){?> selected
                                        <?php } ?>>Hockey</option>
                                    <option value="Kabaddi" <?php if($data['event_category'] == 'Kabaddi'){?> selected
                                        <?php } ?>>Kabaddi</option>
                                    <option value="Football" <?php if($data['event_category'] == 'Football'){?> selected
                                        <?php } ?>>Football</option>
                                    <option value="Tennis" <?php if($data['event_category'] == 'Tennis'){?> selected
                                        <?php } ?>>Tennis</option>
                                    <option value="Badminton" <?php if($data['event_category'] == 'Badminton'){?>
                                        selected <?php } ?>>Badminton</option>
                                    <option value="Basketball" <?php if($data['event_category'] == 'Basketball'){?>
                                        selected <?php } ?>>Basketball</option>
                                    <option value="Table Tennis" <?php if($data['event_category'] == 'Table Tennis'){?>
                                        selected <?php } ?>>Table Tennis</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-venues" class="form-label">Event Venues</label>
                                <input type="text" class="form-control" id="signup-venues"
                                    placeholder="Enter your event venues" name='eventVenues' required
                                    value='<?php echo $data['event_venues']; ?>'>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-winPrice" class="form-label">Event Win Price</label>
                                <input type="number" class="form-control" id="signup-winPrice"
                                    placeholder="Enter your win price" name='winPrice'
                                    value='<?php echo $data['win_price']; ?>' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-total-player" class="form-label">Entry Total Player </label>
                                <input type="number" class="form-control" id="signup-total-player"
                                    placeholder="Enter your total player" name='totalPlayer'
                                    value='<?php echo $data['total_player']; ?>' required disabled>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-price" class="form-label">Entry Price</label>
                                <input type="number" class="form-control" id="signup-price"
                                    placeholder="Enter your event price" value='<?php echo $data['price']; ?>'
                                    name='eventPrice' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-startDate" class="form-label">Start Date</label>
                                <input type="date" class="form-control" id="signup-startDate"
                                    placeholder="Enter your startDate" name='startDate'
                                    value='<?php echo $data['start_date']; ?>' required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="signup-startTime" class="form-label">Start Time</label>
                                <input type="time" class="form-control" id="signup-startTime"
                                    placeholder="Enter your startDate" value='<?php echo $data['start_time']; ?>'
                                    name='startTime' required>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="signup-image" class="form-label">Event Image</label>
                                <input type="file" class="form-control" id="signup-image" placeholder="Enter your image"
                                    name='eventImage'>
                            </div>
                        </div>
                        <div class='col-12 d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary w-25" name='update'>Update Event</button>
                        </div>
                    </form>

                </div>
            </div>
            <!-- End of Main Content -->
            <div>

            </div>
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
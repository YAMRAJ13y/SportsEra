<?php  

    include("../connection.php");

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
            <div id="content" class='mt-5' style='overflow-y: auto;'>

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">SportEra Dashboard</h1>
                    </div>

                    <div>
                        <div class="row d-flex justify-content-around">
                            <!-- Users Card -->
                            <div class="col-xl-4 col-md-6 mb-4">
                                <div class="card bg-gradient-primary text-white shadow h-100 py-3"
                                    style="border-radius: 15px">
                                    <?php
                                      $userQuery = 'SELECT COUNT(*) AS totalUser FROM users';
                                      $row1 = mysqli_query($connect,$userQuery);
                                      $data1 = mysqli_fetch_array($row1);
                                    ?>
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <div class="text-uppercase font-weight-bold mb-2"
                                                    style="font-size: 0.9rem">
                                                    Users
                                                </div>
                                                <div class="h4 font-weight-bold">
                                                    <?php echo $data1['totalUser'] == '' ? 0:$data1['totalUser'] ; ?>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-user-circle fa-3x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact Users Card -->
                            <div class="col-xl-4 col-md-6 mb-4">
                                <div class="card bg-gradient-success text-white shadow h-100 py-3"
                                    style="border-radius: 15px">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <?php
                                              $contactQuery = 'SELECT COUNT(*) AS totalContact FROM contact_user';
                                              $row2 = mysqli_query($connect,$contactQuery);
                                              $data2 = mysqli_fetch_array($row2);
                                            ?>
                                            <div class="col">
                                                <div class="text-uppercase font-weight-bold mb-2"
                                                    style="font-size: 0.9rem">
                                                    Contact Users
                                                </div>
                                                <div class="h4 font-weight-bold">
                                                    <?php echo $data2['totalContact'] == '' ? 0 : $data2['totalContact'] ; ?>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-address-book fa-3x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Comments Card -->
                            <div class="col-xl-4 col-md-6 mb-4">
                                <div class="card bg-gradient-info text-white shadow h-100 py-3"
                                    style="border-radius: 15px">
                                    <div class="card-body">
                                        <?php
                                              $commentQuery = 'SELECT COUNT(*) AS totalComment FROM posts_comment';
                                              $row3 = mysqli_query($connect,$contactQuery);
                                              $data3 = mysqli_fetch_array($row3);
                                            ?>
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <div class="text-uppercase font-weight-bold mb-2"
                                                    style="font-size: 0.9rem">
                                                    Comments
                                                </div>
                                                <div class="h4 font-weight-bold">
                                                    <?php echo $data3['totalComment'] == '' ? 0 : $data3['totalComment'] ; ?>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-comments fa-3x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-md-6 mb-4">
                                <div class="card bg-gradient-secondary text-white shadow h-100 py-3"
                                    style="border-radius: 15px">
                                    <div class="card-body">
                                        <?php
                                              $commentQuery = 'SELECT COUNT(*) AS totalEvent FROM events';
                                              $row4 = mysqli_query($connect,$commentQuery);
                                              $data4 = mysqli_fetch_array($row4);
                                            ?>
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <div class="text-uppercase font-weight-bold mb-2"
                                                    style="font-size: 0.9rem">
                                                    Events
                                                </div>
                                                <div class="h4 font-weight-bold">
                                                    <?php echo $data4['totalEvent'] == '' ? 0 : $data4['totalEvent'] ; ?>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-3x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

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
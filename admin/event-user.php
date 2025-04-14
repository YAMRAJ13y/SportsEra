<?php  

    include("../connection.php");
    if(isset($_REQUEST['approved'])){
        extract($_POST);
        mysqli_query($connect,"update event_users set status='approved' where id=$eventUId");
        header("location:approvedMail.php?id=$eventUId");
        exit();
    }
    if(isset($_REQUEST['reject'])){
        extract($_POST);
        mysqli_query($connect,"update event_users set status='reject' where id=$eventUId");
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit();
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
    <style>
    .backgroudLoader {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
    }

    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid #FFF;
        border-bottom-color: #375dcd00;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
    </style>
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
                        <h1 class="h3 mb-0 text-gray-800">Events Users</h1>
                    </div>

                    <div>
                        <div class="mt-5">
                            <table class="table table-bordered table-striped table-hover">
                                <thead class="bg-primary text-white">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Event Image</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Event Date & Time</th>
                                        <th scope="col">User Image</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                      include "../connection.php";
                                      $eventQuery = "SELECT eu.id,ev.event_name,ev.start_date,ev.start_time,ev.image as event_image,u.fullName as user_name, u.profilePicture as user_image , eu.status as status FROM event_users eu LEFT JOIN events ev on eu.event_id = ev.id LEFT JOIN users u ON eu.user_id = u.id ORDER BY eu.id DESC";
                                      $row = mysqli_query($connect,$eventQuery);
                                      $no = 0;
                                      while($data = mysqli_fetch_array($row)){
                                        $no++;
                                        $badge;
                                        switch($data['status']){
                                            case 'approved':
                                                $badge = 'badge badge-success';
                                                break;
                                            case 'reject':
                                                $badge = 'badge badge-danger';
                                                break;
                                            default:
                                                $badge = 'badge badge-warning';
                                                break;
                                                
                                        }
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $no; ?></th>
                                        <td><img src='../upload/<?php echo $data['event_image']; ?>'
                                                style="width:75px;" />
                                        </td>
                                        <td><?php echo $data['event_name']; ?></td>
                                        <td>
                                            <?php echo $data['start_date'].' '.$data['start_time']; ?>
                                        </td>
                                        <td><img src='../upload/<?php echo $data['user_image']; ?>'
                                                style="width:75px;" />
                                        </td>
                                        <td><?php echo $data['user_name']; ?></td>
                                        <td><span class="<?php echo $badge; ?>"><?php echo $data['status']; ?></span>
                                        </td>
                                        <td>
                                            <?php
                                            
                                            if($data['status'] == 'approved' || $data['status'] == 'reject'){
                                                ?>
                                            <a href='delete-event-user.php?id=<?php echo $data['id']; ?>'>
                                                <button class="btn btn-danger btn-sm" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </a>
                                        </td>
                                        <?php
                                            }
                                            else{
                                            ?>
                                        <form method='post'>
                                            <input type='text' value='<?php echo $data['id']; ?>' style='display:none;'
                                                name="eventUId" />
                                            <button class="btn btn-danger btn-sm " type='submit' name="reject">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-x">
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                            <button class="btn btn-success btn-sm" type='submit' name="approved">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </form>
                                        <?php } ?>
                                        </td>
                                    </tr>
                                    <?php } ?>
                                    <!-- Add more rows as needed -->
                                </tbody>
                            </table>
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
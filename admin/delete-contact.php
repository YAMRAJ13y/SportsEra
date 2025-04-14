<?php
    include "../connection.php";
    $requestId = $_REQUEST['id'];
    $deleteQuery = "delete from contact_user where id=$requestId";
    mysqli_query($connect,$deleteQuery);
    header("location:contact-user.php");
?>
<?php
    include "../connection.php";
    $requestId = $_REQUEST['id'];
    $deleteQuery = "delete from event_users where id=$requestId";
    mysqli_query($connect,$deleteQuery);
    header("location:event-user.php");
?>
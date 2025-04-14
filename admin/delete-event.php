<?php
    include "../connection.php";
    $requestId = $_REQUEST['id'];
    $deleteQuery = "delete from events where id=$requestId";
    mysqli_query($connect,$deleteQuery);
    header("location:event.php");
?>
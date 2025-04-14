<?php
    error_reporting(0); 
    session_start(); // Starts the session

    if (!isset($_SESSION['user_id']) || $_SESSION['user_id'] == '') {
            header("Location: login.php"); 
        exit; 
    }
?>

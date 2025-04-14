<?php

$requestId = $_REQUEST['id'];
include("../connection.php");
include("../Mail.php");

// // Fetch data for the user and event
$queryForApproved = "SELECT * FROM event_users eu  
                     LEFT JOIN events ev ON eu.event_id = ev.id 
                     LEFT JOIN users u ON eu.user_id = u.id 
                     WHERE eu.id = $requestId";
$rowUser = mysqli_query($connect, $queryForApproved);
print_r($rowUser);
$data = mysqli_fetch_array($rowUser);

// Assign variables for email content
$userName = $data['fullName'];
$emailAddress = $data['email'];
$eventName = $data['event_name'];
$eventVenus = $data['event_venues'];
$startDate = $data['start_date'];
$startTime = $data['start_time'];

// // Create email message
$message = <<<EOD
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Approval</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #007BFF;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>You're Approved for Admin! 🎉</h1>
        <p>Dear $userName,</p>
        <p>We are thrilled to inform you that your participation in <strong>$eventName</strong> has been <strong>approved by the admin</strong>!</p>
        <p>Here are the event details:</p>
        <ul> 
            <li><strong>Event Name:</strong> $eventName</li>
            <li><strong>Event Date:</strong> $startDate</li>
            <li><strong>Event Location:</strong> $eventVenus</li>
            <li><strong>Start Time:</strong> $startTime</li>
        </ul>
        <p>Please ensure you arrive on time and bring any necessary items for the event. If you have any questions or need further assistance, feel free to reach out to us.</p>
        <p class="footer">Thank you for your enthusiasm, and we look forward to seeing you at the event!</p>
        <p class="footer">Best regards,<br>Sumit Solanki<br>Admin<br>SportEra<br></p>
    </div>
</body>
</html>
EOD;

// Send email
MailSend($emailAddress, "You're Approved for $eventName!", $message);

// Redirect to the event user page
header("location:event-user.php");
exit();

?>
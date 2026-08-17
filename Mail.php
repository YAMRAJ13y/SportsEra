<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// SMTP credentials are read from the environment — never commit them.
// Set SMTP_USER and SMTP_PASS in your server config or a .env file that is
// listed in .gitignore.

function MailSend($email, $sub, $body)
{

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $smtpUser = getenv('SMTP_USER');
    $smtpPass = getenv('SMTP_PASS');
    $smtpHost = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpPort = getenv('SMTP_PORT') ?: 465;

    if (!$smtpUser || !$smtpPass) {
        error_log('MailSend: SMTP_USER / SMTP_PASS are not configured.');
        return false;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Passing true enables exceptions

    try {
        //Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = $smtpHost; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = $smtpUser; // SMTP username
        $mail->Password = $smtpPass; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = $smtpPort; // TCP port to connect to

        //Recipients
        $mail->setFrom($smtpUser, 'SportsEra');
        $mail->addAddress($email); // Add a recipient

        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $sub;
        $mail->Body = $body;

        $mail->send();
        echo 'Message has been sent';
        return true;
    } catch (Exception $e) {
        // Log the detail, don't echo it to the visitor.
        error_log("MailSend failed: {$mail->ErrorInfo}");
        echo 'Message could not be sent.';
        return false;
    }
}
?>

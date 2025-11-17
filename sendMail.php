<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $phone   = $_POST['phone'];
    $message = $_POST['message'];

    $to = "antonyrajgabrieal@gmail.com";   // your email
    $subject = "New Contact Form Message";
    
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "fail";
    }
}
?>

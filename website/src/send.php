<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST["name"];
    $email = $_POST["email"];
    if (isset($_POST['youDomain']) && strlen($_POST['youDomain']) > 0) {
        $domain = $_POST["youDomain"];
    } else {
        $domain = "Coming Soon Page";
    }    
    $message = "New subscriber from " . $domain;

    $EmailTo = $_POST["whereToSend"];

    if (isset($_POST['subjectForYou']) && strlen($_POST['subjectForYou']) > 0) {
        $Subject = $_POST["subjectForYou"];
    } else {
        $Subject = "You received a new subscriber";
    }    

$Body = "$message
    
Name: $name

Email: $email";

    $headers  = "From: " . $EmailTo . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";    

    $result = mail($EmailTo, $Subject, $Body, $headers);

    if ($result) {
        $data['success'] = true;
        $data['message'] = 'Congratulations. You have just subscribed to our newsletter.';
    } else {
        $data['success'] = false;
        $data['message'] = 'Error. Sorry, subscription is temporarily unavailable.';
    }

    echo json_encode($data);
}
?>
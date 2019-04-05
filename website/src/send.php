<?php
$to       = '';
$sender_email = '';
$subject = 'You received a new subscriber';

$errors = array();
$data   = array();
$body    = '';

$email = '';
$name = '';
$domain = '';

$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $arr = $_POST['values'];
    
    if (isset($_POST['youDomain']) && strlen($_POST['youDomain']) > 0)  $domain = $_POST['youDomain'];
    if (isset($_POST['whereToSend']) && strlen($_POST['whereToSend']) > 0)  $to = $_POST['whereToSend'];
    if (isset($_POST['email']) && strlen($_POST['email']) > 0)  $sender_email = $_POST['email'];
    if (isset($_POST['subjectForYou']) && strlen($_POST['subjectForYou']) > 0) $subject = $_POST['subjectForYou'];
    else $subject = '[' . $domain . '] ' . $subject;

    foreach ($arr as $key => $value ) {
        $val =  stripslashes(trim($value[0]));
        if (!empty($val)) {
            $body .= ucfirst($key) . ': ' . $val . PHP_EOL . PHP_EOL;
            if ($key == "email"||$key == "Email"||$key == "E-mail"||$key == "e-mail") $email = $val;
            if ($key == "name"||$key == "nome"||$key == "Name") $name = $val;
        }
    }
    $body .= "-------------------------------------------------------------------------------------------" . PHP_EOL . PHP_EOL;
    $body .= "New subscriber from " . $domain;
    if ($name == '') $name = $subject;

    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $headers  = "From: " . $to . "\r\n";
        $headers .= "Reply-To: " . $sender_email . "\r\n";

        $result = mail($to, $subject, $body, $headers);

        if ($result) {
            $data['success'] = true;
            $data['message'] = 'Congratulations. You have just subscribed to our newsletter.';
        } else {
            $data['success'] = false;
            $data['message'] = 'Error. Sorry, subscription is temporarily unavailable.';
        }
    }
    // return all our data to an AJAX call
    echo json_encode($data);
}

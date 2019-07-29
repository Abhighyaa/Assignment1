<?php
if($_SERVER["REQUEST_METHOD"]=="POST")
{
require 'connectdb.php';

$email = $_POST['email'];
$password = $_POST['password'];

$check = "SELECT * FROM users where email = '$email'  and password = '$password'";
$result = $conn->query($check);
if ($result->num_rows > 0) {
		
    while($row = $result->fetch_assoc()) {
        echo 'Correct login and password';
    }
}
else {
        $error = 'Invalid email or password';
        echo $error;
}
}
?>
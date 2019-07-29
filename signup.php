<?php
if($_SERVER["REQUEST_METHOD"]=="POST")
{
require 'connectdb.php';

$email = $_POST['email'];
$password = $_POST['password'];

$check = "SELECT * FROM users where email = '$email'";
$result = $conn->query($check);
if ($result->num_rows > 0) {
    $error= "User already exists";
    echo $error;
}
else{
$sql = "INSERT INTO users (email,password) VALUES ('$email','$password')";
if ($conn->query($sql) === TRUE) {
    echo "Added successfully";
} 
else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
}
$conn->close();
}
?>
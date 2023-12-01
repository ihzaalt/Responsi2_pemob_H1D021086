<?php
// Header untuk menangani CORS policy
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Set the content type
header('Content-Type: application/json; charset=utf-8');

// Membuat variable koneksi ke MySQL
$koneksi = mysqli_connect('localhost', 'root', '', 'resmob2') or die('koneksi gagal');
?>

<?php
require 'koneksi.php';

$data = [];
$id = $_GET['id'];
$query = mysqli_query($koneksi, "SELECT * FROM inventaris WHERE id ='$id'");
$jumlah = mysqli_num_rows($query);

if ($jumlah == 1) {
    $row = mysqli_fetch_object($query);
    $data = $row;
} else {
    http_response_code(404); // Not Found
    $data['status'] = 'not found';
}

echo json_encode($data);
?>

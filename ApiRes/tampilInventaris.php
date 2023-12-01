<?php
require 'koneksi.php';

$data = [];
$query = mysqli_query($koneksi, "SELECT * FROM inventaris");

while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
}

// Tampilkan data dalam bentuk JSON
echo json_encode($data);
?>

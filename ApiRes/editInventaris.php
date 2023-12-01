<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Terima data dari mobile
$id = trim($data['id']);
$item = trim($data['item']);
$stok = trim($data['stok']);

http_response_code(201);

if ($item != '' && $stok != '') {
    $query = mysqli_query($koneksi, "UPDATE inventaris SET item='$item', stok='$stok' WHERE id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}

// Set the correct Content-Type header for JSON
header('Content-Type: application/json');

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>

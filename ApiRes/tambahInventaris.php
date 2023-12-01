<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$item = trim($data['item']);
$stok = trim($data['stok']);

http_response_code(201);

if ($item != '' && $stok != '') {
    
    $query = mysqli_query($koneksi, "INSERT INTO inventaris (item, stok) VALUES ('$item', '$stok')");

    $pesan = true;
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>

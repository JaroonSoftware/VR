<?php
ob_start();
include_once(dirname(__FILE__, 2)."/onload.php");
// Specify the path to your JSON file
$jsonFilePath = './source/country-list-th.json';

// Read the JSON file
$jsonData = file_get_contents($jsonFilePath);

// Decode the JSON data into a PHP array
$decodedData = json_decode($jsonData, true);

// Check if decoding was successful
if ($decodedData === null && json_last_error() !== JSON_ERROR_NONE) {
    die('Error decoding JSON: ' . json_last_error_msg());
}

$res = array_map(function($entry) {
    return [
        // 'value' => $entry['enName'], //for Eng
        'value' => $entry['name'],
        // 'enName' => $entry['enName'],
        // 'code' => $entry['alpha2']
    ];
}, $decodedData);

http_response_code(200);
echo json_encode(array("data"=>$res));
ob_end_flush();
exit;
?>
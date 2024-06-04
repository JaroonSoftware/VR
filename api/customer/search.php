<?php
ob_start(); 
include_once(dirname(__FILE__, 2)."/onload.php");
include_once(dirname(__FILE__, 2)."/common/table-param.php");
http_response_code(400);
$db = new DbConnect;
$conn = $db->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    extract($_POST, EXTR_OVERWRITE, "_");   
    
    try {    
        $condition = "";
        
        // $criteria = $criteria;
        if( !empty($criteria) ){ 

            extract($criteria, EXTR_OVERWRITE, "_");   
            $cuscode = !empty($cuscode) ? "and cuscode like '%$cuscode%'" : "";
            $cusname = !empty($cusname) ? "and (firstname like '%$cusname%' or lastname like '%$cusname%')" : "";
            $tel = !empty($tel) ? "and tel like '%$tel%'" : "";
    
            
            $condition = "
            $cuscode
            $cusname
            $tel
            ";
        }

        $sql_query = "SELECT a.* FROM `customer` a
           where 1 = 1 $condition ";

        $parm = (object)param_building($conn, $sql_query, $tbparams, "a");

        $paging = $parm->query["paging"];  
        $order = $parm->query["order"]; 

        $sql = "$sql_query $order $paging"; 

        // var_dump($sql); exit;

        $stmt = $conn->prepare($sql);   
        if(!$stmt->execute()) {
            $error = $conn->errorInfo();
            throw new PDOException("Insert data error => $error");
            die;
        } 
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);   
        http_response_code(200);
        echo json_encode(array("data"=> array( 
            "source" => $res, 
            "tbparams" => $parm->parm,
            // "sql" => $sql,
        )));
    } catch (mysqli_sql_exception $e) { 
        http_response_code(400);
        echo json_encode(array('status' => '0', 'message' => $e->getMessage()));
        //throw $exception;
    } catch (Exception $e) { 
        http_response_code(400);
        echo json_encode(array('status' => '0', 'message' => $e->getMessage()));
    } finally{
        $conn = null;
        
    }    
} else {
    http_response_code(400);
    echo json_encode(array('status' => '0', 'message' => 'request method fail.'));
}
ob_end_flush(); 
exit;
?>
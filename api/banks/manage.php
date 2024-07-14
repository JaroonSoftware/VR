<?php 
ob_start(); 
include_once(dirname(__FILE__, 2)."/onload.php");

$db = new DbConnect;
$conn = $db->connect();
$conn->beginTransaction();
http_response_code(400);
try {
    $action_datetime = date("Y-m-d H:i:s");
    $action_username = $token->userid; 
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true); 
        extract($_POST, EXTR_OVERWRITE, "_");

        $sql = "select 1 r from banks where account_number = :v";
        $stmt = $conn->prepare($sql); 
        if (!$stmt->execute([ 'v' => $account_number ])) throw new PDOException("Banks data error => {$conn->errorInfo()}");
        
        if ($stmt->rowCount() > 0) throw new PDOException("Account Number is duplicate");
        
        // var_dump($_POST);
        $sql = "insert banks (
            bank,bank_name,bank_name_th,bank_nickname,account_number,account_name,created_by,updated_by
        )values (
            :bank, :bank_name, :bank_name_th, :bank_nickname, :account_number, :account_name, :action_username, :action_username
        )";

        $stmt = $conn->prepare($sql);
        if(!$stmt) throw new PDOException("Insert data error => {$conn->errorInfo()}"); 
 
        $stmt->bindParam(":bank", $bank, PDO::PARAM_STR);
        $stmt->bindParam(":bank_name", $bank_name, PDO::PARAM_STR);
        $stmt->bindParam(":bank_name_th", $bank_name_th, PDO::PARAM_STR);
        $stmt->bindParam(":bank_nickname", $bank_nickname, PDO::PARAM_STR);
        $stmt->bindParam(":account_number", $account_number, PDO::PARAM_STR);
        $stmt->bindParam(":account_name", $account_name, PDO::PARAM_STR);
        $stmt->bindValue(":action_username", $action_username, PDO::PARAM_INT);
        $stmt->bindValue(":action_username", $action_username, PDO::PARAM_INT);
        if(!$stmt->execute()) {
            $error = $conn->errorInfo();
            throw new PDOException("Insert data error => $error"); 
        }

        $conn->commit();
        http_response_code(200);
        echo json_encode(array("data"=> array("bank_id" => $master->srcode)));

    } else  if($_SERVER["REQUEST_METHOD"] == "PUT"){
        $rest_json = file_get_contents("php://input");
        $_PUT = json_decode($rest_json, true); 
        extract($_PUT, EXTR_OVERWRITE, "_");

        $sql = "select 1 r from banks where account_number = :v and bank_id <> :bank_id";
        $stmt = $conn->prepare($sql); 
        if (!$stmt->execute([ 'v' => $account_number, 'bank_id' => $bank_id ])) throw new PDOException("Banks data error => {$conn->errorInfo()}");
        
        if ($stmt->rowCount() > 0) throw new PDOException("Account Number is duplicate");
        // var_dump($_POST);
        $sql = "
        update banks
        set
        bank = :bank, 
        bank_name = :bank_name, 
        bank_name_th = :bank_name_th, 
        bank_nickname = :bank_nickname, 
        account_number = :account_number, 
        account_name = :account_name,
        updated_date = CURRENT_TIMESTAMP(), 
        updated_by = :action_username
        where bank_id = :bank_id";

        $stmt = $conn->prepare($sql);
        if(!$stmt) throw new PDOException("Insert data error => {$conn->errorInfo()}"); 

        // $master->srstatus = "Y"; 
        $stmt->bindParam(":bank", $bank, PDO::PARAM_STR);
        $stmt->bindParam(":bank_name", $bank_name, PDO::PARAM_STR);
        $stmt->bindParam(":bank_name_th", $bank_name_th, PDO::PARAM_STR);
        $stmt->bindParam(":bank_nickname", $bank_nickname, PDO::PARAM_STR);
        $stmt->bindParam(":account_number", $account_number, PDO::PARAM_STR);
        $stmt->bindParam(":account_name", $account_name, PDO::PARAM_STR);
        $stmt->bindValue(":action_username", $action_username, PDO::PARAM_INT);
        $stmt->bindValue(":bank_id", $bank_id, PDO::PARAM_INT);

        if(!$stmt->execute()) {
            $error = $conn->errorInfo();
            throw new PDOException("Insert data error => $error");
            die;
        }
        
        $conn->commit();
        http_response_code(200);
        echo json_encode(array("data"=> array("bank_id" => $_PUT)));

    } else if($_SERVER["REQUEST_METHOD"] == "DELETE"){ 
        // $code = $_DELETE["code"];
        $code = $_GET["code"];
        
        // $sql = "delete from banks where bank_id = :bank_id";
        $sql = "update banks set status = 'N' where bank_id = :bank_id";
        $stmt = $conn->prepare($sql);
        if (!$stmt->execute([ 'bank_id' => $code ])){
            $error = $conn->errorInfo();
            throw new PDOException("Remove data error => $error");
        }

        $conn->commit();
        http_response_code(200);
        echo json_encode(array("status"=> 1));
    } else  if($_SERVER["REQUEST_METHOD"] == "GET"){
        $code = $_GET["code"];
        
        $sql = "select * from banks where bank_id = :bank_id";
        $stmt = $conn->prepare($sql);  
        if (!$stmt->execute([ 'bank_id' => $code ])){
            $error = $conn->errorInfo();
            throw new PDOException("Data error => $error");
        }
        $res = $stmt->fetch(PDO::FETCH_ASSOC);  

        $conn->commit();
        http_response_code(200);
        echo json_encode(array("data"=> $res));
    }

} catch (PDOException $e) { 
    $conn->rollback();
    http_response_code(400);
    echo json_encode(array('status' => '0', 'message' => $e->getMessage()));
} catch (Exception $e) { 
    $conn->rollback();
    http_response_code(400);
    echo json_encode(array('status' => '0', 'message' => $e->getMessage()));
} finally{
    $conn = null;
}  
ob_end_flush(); 
exit;
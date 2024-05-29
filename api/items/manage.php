<?php 
ob_start(); 
include_once(dirname(__FILE__, 2)."/onload.php");
include_once(dirname(__FILE__, 2)."/common/fnc-code.php");

$db = new DbConnect;
$conn = $db->connect();
$conn->beginTransaction();
http_response_code(400);
try {
    $action_date = date("Y-m-d H:i:s"); 
    $action_user = $token->userid;

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true); 
        extract($_POST, EXTR_OVERWRITE, "_");

        // var_dump($_POST);
        
        $sql = "INSERT INTO items (stcode, stname,material_code,typecode,categorycode, count_stock,stname_vat, brand,stname_per,stfront,
        stseries, stborder,stload, stspeed,sttw, stweight,min,
        stwidth, price,stlong, sthigh,stcar_brand, stock_by_product,stchange_round,
        stchange_time, stcar_model,remark, price_A,price_B, price_online,created_by,created_date) 
        values (:stcode,:stname,:material_code,:typecode,:categorycode,:count_stock,:stname_vat,:brand,:stname_per,:stfront,
        :stseries,:stborder,:stload,:stspeed,:sttw,:stweight,:min,
        :stwidth,:price,:stlong,:sthigh,:stcar_brand,:stock_by_product,:stchange_round,
        :stchange_time,:stcar_model,:remark,:price_A,:price_B,:price_online,:action_user,:action_date)";

        $stmt = $conn->prepare($sql);
        if(!$stmt) throw new PDOException("Insert data error => {$conn->errorInfo()}"); 

        
        $stmt->bindParam(":stcode", $stcode, PDO::PARAM_STR);
        $stmt->bindParam(":stname", $stname, PDO::PARAM_STR);
        $stmt->bindParam(":material_code", $material_code, PDO::PARAM_STR);
        $stmt->bindParam(":typecode", $typecode, PDO::PARAM_STR);      
        $stmt->bindParam(":categorycode", $categorycode, PDO::PARAM_STR);      
        $stmt->bindParam(":count_stock", $count_stock, PDO::PARAM_STR);
        $stmt->bindParam(":stname_vat", $stname_vat, PDO::PARAM_STR);
        $stmt->bindParam(":brand", $brand, PDO::PARAM_STR);
        $stmt->bindParam(":stname_per", $stname_per, PDO::PARAM_STR);        
        $stmt->bindParam(":stfront", $stfront, PDO::PARAM_STR);
        $stmt->bindParam(":stseries", $stseries, PDO::PARAM_STR);
        $stmt->bindParam(":stborder", $stborder, PDO::PARAM_STR);
        $stmt->bindParam(":stload", $stload, PDO::PARAM_STR);
        $stmt->bindParam(":stspeed", $stspeed, PDO::PARAM_STR);
        $stmt->bindParam(":sttw", $sttw, PDO::PARAM_STR);
        $stmt->bindParam(":stweight", $stweight, PDO::PARAM_STR);
        $stmt->bindParam(":min", $min, PDO::PARAM_STR);
        $stmt->bindParam(":stwidth", $stwidth, PDO::PARAM_STR);
        $stmt->bindParam(":price", $price, PDO::PARAM_STR);
        $stmt->bindParam(":stlong", $stlong, PDO::PARAM_STR);
        $stmt->bindParam(":sthigh", $sthigh, PDO::PARAM_STR);
        $stmt->bindParam(":stcar_brand", $stcar_brand, PDO::PARAM_STR);
        $stmt->bindParam(":stock_by_product", $stock_by_product, PDO::PARAM_STR);
        $stmt->bindParam(":stchange_round", $stchange_round, PDO::PARAM_STR);
        $stmt->bindParam(":stchange_time", $stchange_time, PDO::PARAM_STR);
        $stmt->bindParam(":stcar_model", $stcar_model, PDO::PARAM_STR);
        $stmt->bindParam(":remark", $remark, PDO::PARAM_STR);
        $stmt->bindParam(":price_A", $price_A, PDO::PARAM_STR);
        $stmt->bindParam(":price_B", $price_B, PDO::PARAM_STR);
        $stmt->bindParam(":price_online", $price_online, PDO::PARAM_STR);
        $stmt->bindParam(":action_date", $action_date, PDO::PARAM_STR); 
        $stmt->bindParam(":action_user", $action_user, PDO::PARAM_INT); 

        if(!$stmt->execute()) {
            $error = $conn->errorInfo();
            throw new PDOException("Insert data error => $error");
            die;
        }

        $conn->commit();
        http_response_code(200);
        echo json_encode(array("data"=> array("id" => "ok")));

    } else  if($_SERVER["REQUEST_METHOD"] == "PUT"){
        $rest_json = file_get_contents("php://input");
        $_PUT = json_decode($rest_json, true); 
        extract($_PUT, EXTR_OVERWRITE, "_");
        // var_dump($_POST);

        $sql = "
        update items 
        set
        stname = :stname,
        material_code = :material_code,
        typecode = :typecode,
        categorycode = :categorycode,
        count_stock = :count_stock,
        stname_vat = :stname_vat,
        brand = :brand,
        stname_per = :stname_per,
        stfront = :stfront,
        stseries = :stseries,
        stborder = :stborder,
        stload = :stload,
        stspeed = :stspeed,
        sttw = :sttw,
        stweight = :stweight,
        min = :min,
        stwidth = :stwidth,
        price = :price,
        stlong = :stlong,        
        sthigh = :sthigh,
        stcar_brand = :stcar_brand,
        stock_by_product = :stock_by_product,
        stchange_round = :stchange_round,
        stchange_time = :stchange_time,
        stcar_model = :stcar_model,
        remark = :remark,
        price_A = :price_A,
        price_B = :price_B,
        price_online = :price_online,
        active_status = :active_status,
        updated_date = CURRENT_TIMESTAMP(),
        updated_by = :action_user
        where stcode = :stcode";
        
        $stmt = $conn->prepare($sql);
        if(!$stmt) throw new PDOException("Insert data error => {$conn->errorInfo()}"); 


        $stmt->bindParam(":stname", $stname, PDO::PARAM_STR);
        $stmt->bindParam(":material_code", $material_code, PDO::PARAM_STR);
        $stmt->bindParam(":typecode", $typecode, PDO::PARAM_STR);
        $stmt->bindParam(":categorycode", $categorycode, PDO::PARAM_STR);
        $stmt->bindParam(":count_stock", $count_stock, PDO::PARAM_STR);
        $stmt->bindParam(":stname_vat", $stname_vat, PDO::PARAM_STR);
        $stmt->bindParam(":brand", $brand, PDO::PARAM_STR);
        $stmt->bindParam(":stname_per", $stname_per, PDO::PARAM_STR);
        $stmt->bindParam(":stfront", $stfront, PDO::PARAM_STR);
        $stmt->bindParam(":stseries", $stseries, PDO::PARAM_STR);
        $stmt->bindParam(":stborder", $stborder, PDO::PARAM_STR);
        $stmt->bindParam(":stload", $stload, PDO::PARAM_STR);   
        $stmt->bindParam(":stspeed", $stspeed, PDO::PARAM_STR);
        $stmt->bindParam(":sttw", $sttw, PDO::PARAM_STR);
        $stmt->bindParam(":stweight", $stweight, PDO::PARAM_STR);
        $stmt->bindParam(":min", $min, PDO::PARAM_STR);
        $stmt->bindParam(":stwidth", $stwidth, PDO::PARAM_STR); 
        $stmt->bindParam(":price", $price, PDO::PARAM_STR);
        $stmt->bindParam(":stlong", $stlong, PDO::PARAM_STR);        
        $stmt->bindParam(":sthigh", $sthigh, PDO::PARAM_STR);
        $stmt->bindParam(":stcar_brand", $stcar_brand, PDO::PARAM_STR);
        $stmt->bindParam(":stock_by_product", $stock_by_product, PDO::PARAM_STR);
        $stmt->bindParam(":stchange_round", $stchange_round, PDO::PARAM_STR); 
        $stmt->bindParam(":stchange_time", $stchange_time, PDO::PARAM_STR);
        $stmt->bindParam(":stcar_model", $stcar_model, PDO::PARAM_STR);
        $stmt->bindParam(":remark", $remark, PDO::PARAM_STR);
        $stmt->bindParam(":price_A", $price_A, PDO::PARAM_STR);
        $stmt->bindParam(":price_B", $price_B, PDO::PARAM_STR);
        $stmt->bindParam(":price_online", $price_online, PDO::PARAM_STR);
        $stmt->bindParam(":active_status", $active_status, PDO::PARAM_STR);   
        $stmt->bindParam(":action_user", $action_user, PDO::PARAM_INT);  
        $stmt->bindParam(":stcode", $stcode, PDO::PARAM_STR); 

        if(!$stmt->execute()) {
            $error = $conn->errorInfo();
            throw new PDOException("Insert data error => $error");
            die;
        } 
        
        $conn->commit();
        http_response_code(200);
        echo json_encode(array("data"=> array("id" => $_PUT)));
    } else  if($_SERVER["REQUEST_METHOD"] == "GET"){
        $stcode = $_GET["stcode"]; 
        $sql = " SELECT a.* ";
        $sql .= " FROM `items` as a ";
        $sql .= " where stcode = :stcode";
        
        $stmt = $conn->prepare($sql); 
        if (!$stmt->execute([ 'stcode' => $stcode ])){
            $error = $conn->errorInfo(); 
            http_response_code(404);
            throw new PDOException("Geting data error => $error");
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
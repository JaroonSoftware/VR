<?php
#region Update Code
function update_srcode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set srcode = srcode + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}

function update_spcode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set spcode = spcode + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}

function update_dncode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set dncode = dncode + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}

function update_pilotscale_code($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set pilotscale_code = pilotscale_code + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}  

function update_estcode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set estcode = estcode + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}

function update_qtcode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set quotcode = quotcode + 1 where year = :y and month = :m";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
} 

function update_purcode($pdo){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set maxpocode = maxpocode + 1 where year = :y";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year])){
        $error = $pdo->errorInfo(); 
        http_response_code(401);
        throw new PDOException("Update code error => $error");
    }
}

#endregion
 
#region Request Code
function request_supcode($pdo){ 
    $sql = "select max(cast(replace( supcode, 'SUPP-', '') as SIGNED )) m from supplier;";
    $stmt = $pdo->prepare($sql); 
    if (!$stmt->execute()){ 
        http_response_code(400);
        throw new PDOException("Geting code error => {$pdo->errorInfo()}");
    } 
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
 
    //SUPP-0000
    $res = $result["m"];
    $number = intval($res);
    $format = "SUPP-%04s";
    $code = sprintf($format, ( $number + 1) );
    return $code;
}

function request_purcode($pdo){
    $prefix="PO";
    $year = date("Y");
    $month = date("m");

    $sql = "select maxpocode code from options where year = :y";
    $stmt = $pdo->prepare($sql); 
    if (!$stmt->execute([ 'y' => $year])) conn_error($pdo,"Geting code error", true);

    $result = $stmt->fetch(PDO::FETCH_ASSOC); 
    if (empty($result)) {
        create_options($pdo, $year);
        return 0;
    } 
    //PO24010001
    $res = $result["code"];
    $y = date("y");
    $m = date("m");
    $number = intval($res);
    $prefix = "$prefix$y$m";
    while(true){
        $code = sprintf("%04s", ( $number + 1) );
        $format = $prefix.$code;
        $sql = "SELECT 1 r FROM purcorder where purcode = '$format'"; 
        $stmt = $pdo->prepare($sql); 
        $stmt->execute(); 
        if ($stmt->rowCount() > 0){
            $number += 1;
            update_option($pdo, "maxpocode");
            continue;
        } else break;
    } 
    return $prefix.sprintf("%04s", ( $number + 1) );   
}


function request_estcode($pdo ){
    $year = date("Y");
    $month = date("m");

    $sql = "select estcode code from options where year = :y and month = :m";
    $stmt = $pdo->prepare($sql); 
    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo();
        http_response_code(401);
        throw new PDOException("Geting code error => $error");
    }

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($result)) {
        create_options($pdo, $year, $month);
        return 0;
    } 
    //EST24010001
    $res = $result["code"];
    $y = date("y");
    $m = date("m");
    $number = intval($res);
    $prefix = "EST$y$m";
    while(true){
        $code = sprintf("%05s", ( $number + 1) );
        $format = $prefix.$code;
        $sql = "SELECT 1 r FROM estimation where estcode = '$format'"; 
        $stmt = $pdo->prepare($sql); 
        $stmt->execute(); 
        if ($stmt->rowCount() > 0){
            $number += 1;
            update_estcode($pdo);
            continue;
        } else break;
    } 
    return $prefix.sprintf("%05s", ( $number + 1) );   
}

function request_quotcode($pdo){
    $year = date("Y");
    $month = date("m");

    $sql = "select quotcode code from options where year = :y and month = :m";
    $stmt = $pdo->prepare($sql); 
    if (!$stmt->execute([ 'y' => $year, 'm' => $month ])){
        $error = $pdo->errorInfo();
        http_response_code(401);
        throw new PDOException("Geting code error => $error");
    }

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($result)) {
        create_options($pdo, $year, $month);
        return 0;
    } 
    //QU240100001
    $res = $result["code"];
    $y = date("y");
    $m = date("m");
    $number = intval($res);
    $prefix = "QU$y$m";
    while(true){
        $code = sprintf("%05s", ( $number + 1) );
        $format = $prefix.$code;
        $sql = "SELECT 1 r FROM qtmaster where qtcode = '$format'"; 
        $stmt = $pdo->prepare($sql); 
        $stmt->execute(); 
        if ($stmt->rowCount() > 0){
            $number += 1;
            update_qtcode($pdo);
            continue;
        } else break;
    } 
    return $prefix.sprintf("%05s", ( $number + 1) );   
}

#endregion

function create_options($pdo, $year, $month = null){
    $sql = "insert into options (year, month) values ( :y )";
    $stmt = $pdo->prepare($sql); 
    if (!$stmt->execute([ 'y' => $year])) conn_error($pdo, "เกิดข้อผิดพลาดจากการสร้าง รหัส", true);
}


function update_option($pdo, $option){
    $year = date("Y");
    $month = date("m");
    $sql = "update options set $option = $option + 1 where year = :y";
    $stmt = $pdo->prepare($sql);

    if (!$stmt->execute([ 'y' => $year])) conn_error($pdo, "Update code error", true); 
}

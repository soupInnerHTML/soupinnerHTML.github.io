<?php
    header("Access-Control-Allow-Origin: *");
    
    $caesar_mailing   = $_GET['caesar_mailing'];
    $inp              = $_GET['inp'];
    $inp2             = $_GET['inp2'];
    $inp3             = $_GET['inp3'];
    $inp4             = $_GET['inp4'];
    
    
    if( $caesar_mailing ) {
        echo "$inp\n $inp2\n $inp3\n $inp4";
        $to       = "andrey.da.scrim@gmail.com"; 
        $tema     = "Форма обратной связи с лендинга caesar`s legion"; 
        $message  = "Ваше имя: $inp <br>";
        $message .= "Ваш населенный пункт: $inp2 <br>"; 
        $message .= "Род деятельности: $inp3 <br>"; 
        $message .= "Пол: $inp4 <br>";
        $message .= "Ave! True to Caesar!"; 
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; 
        mail($to, $tema, $message, $headers);
    }
?>
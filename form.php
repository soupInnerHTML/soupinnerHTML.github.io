$name = $_POST['user_name']; 
$mail_to = 'andrey.da.scrim@gmail.com' 
$header = 'Тест'; 
$mes = "Имя: $name";
mail($mail_to, $header, $mes, "Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
<?php 

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$message = $_POST['user_text'];
$phone = $_POST['user_phone'];
$city = $_POST['user_city'];
$payment = $_POST['user_payment'];
$location = $_POST['user_location'];
$products = $_POST['user_products'];
$price = $_POST['user_price'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'unikosend@gmail.com';                 // Наш логин
$mail->Password = 'tqwecfrjmhtlduns';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('unikosend@gmail.com', 'Uniko');   // От кого письмо 
$mail->addAddress('unikoget@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
	if ($payment) {
		$mail->Body    = '
			Пользователь оставил данные <br> 
			<strong>Имя:</strong> ' . $name . ' <br>
			<strong>E-mail:</strong> ' . $email . '<br>
			<strong>Телефон:</strong> ' . $phone . '<br>
			<strong>Сообщение:</strong> '. $message .'<br>
			<strong>Город и отделение:</strong> '. $city .', '. $location . '<br>
			<strong>Способ оплаты:</strong> '. $payment. '<br>
			<strong>Товары:</strong> '. $products . '<br>
			<strong>Цена:</strong> '. $price . '';
	} else {
		$mail->Body    = '
			Пользователь оставил данные <br> 
			<strong>Имя:</strong> ' . $name . ' <br>
			<strong>E-mail:</strong> ' . $email . '<br>
			<strong>Сообщение:</strong> '. $message . '';
	}

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>
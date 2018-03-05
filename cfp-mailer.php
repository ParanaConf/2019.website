<?php session_start();
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
	
	$residencia = strip_tags(trim($_POST["residencia"]));
				$residencia = str_replace(array("\r","\n"),array(" "," "),$residencia);

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

	$titulo = strip_tags(trim($_POST["titulo"]));
				$titulo = str_replace(array("\r","\n"),array(" "," "),$titulo);

        // $cont_subject = trim($_POST["subject"]);
        $descripcion = trim($_POST["descripcion"]);

	$tematica = strip_tags(trim($_POST["tematica"]));
				$tematica = str_replace(array("\r","\n"),array(" "," "),$tematica);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($descripcion) OR empty($residencia) OR empty($titulo) OR empty($tematica) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! Hubo un problema con tu envío. Por favor, recarga la página y prueba de nuevo.";
            exit;
        }

	include_once $_SERVER['DOCUMENT_ROOT'] . '/assets/securimage/securimage.php';
	$securimage = new Securimage();

	if ($securimage->check($_POST['captcha_code']) == false) {
	// the code was incorrect you should handle the error so that the form processor doesn't continue
	// or you can use the following code if there is no validation or you do not know how
	http_response_code(429);
	echo "El código captcha ingresado es incorrecto";
	exit;
	}

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "charlas@paranaconf.org";

        // Set the email subject.
        $subject = "[PARANACONF][CallForCharlas] De $name";


//name residencia email titulo descripcion tematica viaje alojamiento


        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content = "Residencia: $residencia\n";
        $email_content .= "Email: $email\n\n";
	$email_content .= "Titulo: $titulo\n";
	$email_content .= "Temática: $tematica\n";
        $email_content .= "Descripcion:\n$descripcion\n\n";

	if(isset($_POST['viaje']) && $_POST['viaje'] == 'Yes')
	{
	        $email_content .= "Puede costear pasaje\n\n";
	}

	if(isset($_POST['alojamiento']) && $_POST['alojamiento'] == 'Yes')
	{
	        $email_content .= "Puede costear alojamiento\n\n";
	}

        // Build the email headers.
        //$email_headers = "From: $name <$email>";
	$email_headers = "From: $name <$email>\nContent-Type: text/plain;charset=utf-8";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Gracias! Tu mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Algo salió mal y no pudimos enviar tu mensaje";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con tu envío, por favor, intentalo de nuevo";
    }

?>

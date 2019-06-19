<?php 
/* 	
If you see this text in your browser, PHP is not configured correctly on this hosting provider. 
Contact your hosting provider regarding PHP configuration for your site.

PHP file generated by Adobe Muse CC 2018.1.0.386
*/

require_once('form_process.php');

$form = array(
	'subject' => 'DeinProjekt Formular Übermittlung',
	'heading' => 'Neue Formularübermittlung',
	'success_redirect' => '',
	'resources' => array(
		'checkbox_checked' => 'Aktiviert',
		'checkbox_unchecked' => 'Nicht aktiviert',
		'submitted_from' => 'Von Website übermitteltes Formular: %s',
		'submitted_by' => 'Besucher-IP-Adresse: %s',
		'too_many_submissions' => 'Zu viele Sendungen in letzter Zeit von dieser IP',
		'failed_to_send_email' => 'E-Mail konnte nicht gesendet werden',
		'invalid_reCAPTCHA_private_key' => 'Ungültiger privater reCAPTCHA-Schlüssel.',
		'invalid_reCAPTCHA2_private_key' => 'Ungültiger privater reCAPTCHA 2.0-Schlüssel.',
		'invalid_reCAPTCHA2_server_response' => 'Ungültige private reCAPTCHA 2.0-Server-Reaktionszeit.',
		'invalid_field_type' => 'Unbekannter Feldtyp „%s“.',
		'invalid_form_config' => 'Die Konfiguration im Feld „%s“ ist ungültig.',
		'unknown_method' => 'Unbekannte Serveranfragemethode'
	),
	'email' => array(
		'from' => 'adresse@einfügen.de',
		'to' => 'adresse@einfügen.de'
	),
	'fields' => array(
		'custom_U1858' => array(
			'order' => 2,
			'type' => 'string',
			'label' => 'Wie soll deine Idee heißen',
			'required' => true,
			'errors' => array(
				'required' => 'Feld „Wie soll deine Idee heißen“ ist erforderlich.'
			)
		),
		'custom_U1907' => array(
			'order' => 3,
			'type' => 'string',
			'label' => 'Wie viel Geld brauchst du?',
			'required' => true,
			'errors' => array(
				'required' => 'Feld „Wie viel Geld brauchst du?“ ist erforderlich.'
			)
		),
		'custom_U1919' => array(
			'order' => 4,
			'type' => 'string',
			'label' => 'Beschreibe dein Projekt/ Idee',
			'required' => true,
			'errors' => array(
				'required' => 'Feld „Beschreibe dein Projekt/ Idee“ ist erforderlich.'
			)
		),
		'custom_U2201' => array(
			'order' => 5,
			'type' => 'string',
			'label' => 'Wie lautet deine Bild-URL?',
			'required' => true,
			'errors' => array(
				'required' => 'Feld „Wie lautet deine Bild-URL?“ ist erforderlich.'
			)
		),
		'custom_U2250' => array(
			'order' => 6,
			'type' => 'string',
			'label' => 'Bis wann soll dein Funding laufen?',
			'required' => true,
			'errors' => array(
				'required' => 'Feld „Bis wann soll dein Funding laufen?“ ist erforderlich.'
			)
		),
		'custom_U1955' => array(
			'order' => 1,
			'type' => 'radiogroup',
			'label' => 'In welcher Sparte möchtest du gründen?',
			'required' => true,
			'optionItems' => array(
				'Kultur',
				'Sport'
			),
			'errors' => array(
				'required' => 'Feld „In welcher Sparte möchtest du gründen?“ ist erforderlich.',
				'format' => 'Der Wert im Feld „In welcher Sparte möchtest du gründen?“ ist ungültig.'
			)
		)
	)
);

process_form($form);
?>

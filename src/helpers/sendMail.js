// Loading helper class that will send mail
const sendMail = require('../controllers/sendMail');

exports.sendMailer = function (req, res, next) {
	let to = req.body.to;
	let from = req.body.from;
	let cc = req.body.cc || "";
	let bcc = req.body.bcc || "";
	let subject = req.body.subject;
	let message = req.body.message;
	let altText = req.body.altText || "";
	let html = req.body.html || "";

	sendMail.sendEmail({
		to,
		from,
		cc,
		bcc,
		subject,
		message,
		altText,
		html,
		'response': res
	});
};
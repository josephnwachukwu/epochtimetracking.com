'use strict';

import * as functions from 'firebase-functions';

const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


export const testEmail = functions.firestore.document('clients/{uid}')
.onUpdate((change, context) => {

	const newValue = change.after.data();
	const previousValue = change.before.data();
	const managerEmail = newValue!.managerEmail as string;
	const managerName = newValue!.managerName as string;
	const clientName = newValue!.clientName as string;
	const userName = newValue!.userName as string;
	const clientId = newValue!.uid as string;


	const mailOptions = {
	    from: '"Epochtimetracking" <noreply@firebase.com>',
	    to: managerEmail,
	    subject: `You have been added as a manager at ${clientName}`,
	    html: `<h1>Hi ${managerName}</h1>
	    <br>
	    <p>You have been listed on epochtimetracking as a mananger for ${userName} at ${clientName}.</p>
	    <p>Epoch Time Tracking is an application built for better time management and seamless integrations for making contracting easier.</p>
	    <p>If you are joseph's manager click <a href="https://epochtimetracking.com/manager/onboarding?clientID=${clientId}">here</a> to be onboarded as a manager</p>
	    <p>Thank You</p>` 
	};
	if(newValue!.managerEmail !== previousValue!.managerEmail) {
		console.log('managers email as changed', managerEmail);
		try {
			return mailTransport.sendMail(mailOptions);
			//console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, val.email);
		} catch(error) {
			console.error('There was an error while sending the email:', error);
		}
	}
	else {
		console.log('manangers email has not changed');
	}
	console.log('me', managerEmail);
	return null
})
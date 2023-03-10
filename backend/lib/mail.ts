import { createTransport, getTestMessageUrl} from "nodemailer";

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function makeANiceEmail(text: string): string {
	return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>😘, Andy Farmer</p>
    </div>
	`
}

/**
 *
 * Generated by taking Object from log to
 * https://jvilk.com/MakeTypes/
 * copy(JSON.stringify(Object))
 *
 */
export interface MailResponse {
	accepted?: (string)[] | null;
	rejected?: (null)[] | null;
	envelopeTime: number;
	messageTime: number;
	messageSize: number;
	response: string;
	envelope: Envelope;
	messageId: string;
}
export interface Envelope {
	from: string;
	to?: (string)[] | null;
}


export async function sendPasswordResetEmail(token: string, to: string): Promise<void>{
	// email the user a token
	const info = await transporter.sendMail({
		to,
		from: "admin@farmer.gq",
		subject: 'Your Password Reset token',
		html: makeANiceEmail(`Your Password Reset Token is here!
		<a href="${process.env.FRONTEND_URL}/reset?token=${token}">Click Here to reset</a>
		`)
	}) as MailResponse

	if(process.env.MAIL_USER.includes('ethereal.email')) {
		// console.log(info)
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
	}
}

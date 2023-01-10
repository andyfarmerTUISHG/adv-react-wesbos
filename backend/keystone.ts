import 'dotenv/config'
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import {withItemData,statelessSessions} from '@keystone-next/keystone/session'
const databaseURL = process.env.DATABASE_URL || 'local'

const sessionConfig ={
	maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in
	secret: process.env.COOKIE_SECRET,
}

const { withAuth} = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		//TODO: Add Initial Roles here
	}
})

export default withAuth(
	config({
		// @ts-ignore
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			}
		},
		db:{
			adapter: 'mongoose',
			url: databaseURL,
			//TODO: Add data seeding here
		},
		lists: createSchema({
			// Schema items go in here
			User,
		}),
		ui: {
			//TODO: Change this for roles
			//Only show the UI only for people who past this test
			isAccessAllowed: ({ session }) => {
				// console.log(session)
				return !!session?.data
			},
		},
		// TODO: Add session values here
		session: withItemData(statelessSessions(sessionConfig), {
			User: 'id name email',
		})

	}
));

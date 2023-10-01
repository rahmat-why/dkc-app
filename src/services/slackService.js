import connection from "../config/db.config.js";

import Slack from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

//FUNCTION TO READ ALL DATA OTOPEDS
export const callSlackApi = (message) => {
    try {
        const app = new Slack.App({
          signingSecret: process.env.SLACK_SIGNING_SECRET,
          token: process.env.SLACK_BOT_TOKEN
        });
        
        app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: process.env.SLACK_CHANNEL,
          text: message
        });
        
    }
    catch (error) {
        throw new Error(`Failed to read data potensi saka: ${error.message}`);
    }
}
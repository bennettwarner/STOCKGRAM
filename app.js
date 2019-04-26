// Author: Bennett Warner
// Last update: 4/25/2019

// Imports
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const alpha = require('alphavantage')({ key: process.env.ALPHA_VANTAGE_KEY });

// Load config
dotenv.config({ path: '.env' });

// Initialize the telegram API
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
 
// Get stock quote and return to user
function getQuote(ticker){
    alpha.data.intraday(ticker).then(data => {
        bot.sendMessage(chatId, '$'+(Object.entries(data['Time Series (1min)'])[0][1]['4. close']) + ' as of ' + (Object.entries(data['Time Series (1min)'])[0][0]).slice(5));
    }).catch((err) => console.log('Error: '));
    console.log('num', num);
}

// Parse user input
bot.onText(/\$(.+)/, (msg, match) => { 
  chatId = msg.chat.id;
  console.log(Object.entries(msg)[4][1])
  const resp = '$'+getQuote(Object.entries(msg)[4][1].slice(1)); 
});


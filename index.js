require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { handleMainMenu } = require('./menu/mainMenu');
const { handleSiteIdMenu } = require('./menu/siteIdMenu');
const { handleReportHarian } = require('./menu/reportHarian');
const { handleWeCareMenu } = require('./menu/wecareMenu');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// State user
const userState = {};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();
  const state = userState[chatId];

  // Routing ke masing-masing handler sesuai menu/state
  if (text === '🔍 Pencarian Site ID') return handleSiteIdMenu(bot, chatId, userState);
  if (text === '📝 Report Harian') return handleReportHarian(bot, chatId, userState);
  if (text === '❤️ WeCare') return handleWeCareMenu(bot, chatId, userState);
  if (text === '⬅ Kembali ke Menu Utama' || !state) return handleMainMenu(bot, chatId, userState);

  // Routing input sesuai state menu
  if (state === 'siteId') return handleSiteIdMenu(bot, chatId, userState, text);
  if (state === 'reportHarian') return handleReportHarian(bot, chatId, userState, text);
  if (state === 'wecare') return handleWeCareMenu(bot, chatId, userState, text);

  // Default: tampilkan menu utama
  handleMainMenu(bot, chatId, userState);
});

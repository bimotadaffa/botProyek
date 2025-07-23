function handleWeCareMenu(bot, chatId, userState) {
  userState[chatId] = 'wecare';
  bot.sendMessage(chatId, '❤️ Telah masuk ke menu WeCare', {
    reply_markup: { keyboard: [['⬅ Kembali ke Menu Utama']], resize_keyboard: true }
  });
}
module.exports = { handleWeCareMenu };

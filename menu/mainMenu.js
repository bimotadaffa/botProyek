function handleMainMenu(bot, chatId, userState) {
  userState[chatId] = 'mainMenu';
  bot.sendMessage(chatId, 'Silakan pilih menu:', {
    reply_markup: {
      keyboard: [
        ['🔍 Pencarian Site ID'],
        ['📝 Report Harian'],
        ['❤️ WeCare']
      ],
      resize_keyboard: true
    }
  });
}
module.exports = { handleMainMenu };

const { findSiteId } = require('../helpers/sheetUtils');

function handleSiteIdMenu(bot, chatId, userState, inputText) {
  if (!inputText) {
    userState[chatId] = 'siteId';
    return bot.sendMessage(chatId, 'Silakan masukkan Site ID:', {
      reply_markup: {
        keyboard: [['⬅ Kembali ke Menu Utama']],
        resize_keyboard: true
      }
    });
  }
  // Jika sudah input, proses cari data
  const result = findSiteId(inputText);
  return bot.sendMessage(chatId, result, {
    parse_mode: 'HTML',
    reply_markup: { keyboard: [['⬅ Kembali ke Menu Utama']], resize_keyboard: true }
  });
}

module.exports = { handleSiteIdMenu };

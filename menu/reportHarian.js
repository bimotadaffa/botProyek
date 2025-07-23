const { getReportHarian } = require('../helpers/sheetUtils');

function handleReportHarian(bot, chatId, userState) {
  userState[chatId] = 'reportHarian';
  // Generate isi report harian
  const rep = getReportHarian();
  const msg = `
*A NEW INFRA (Real/Target/%)*
1. Progres OA Nasional All *(A1/A2/A3%)*  : ${rep.a1} / ${rep.a2} / ${rep.a3}%
2. Progres OA Juli'25 *(A4/A5/A6%)*       : ${rep.a4} / ${rep.a5} / ${rep.a6}%
3. Progres OA Today: ${rep.a7}
4. L0/RFS Ready: ${rep.a8}
  `;
  bot.sendMessage(chatId, msg, {
    parse_mode: 'Markdown',
    reply_markup: { keyboard: [['⬅ Kembali ke Menu Utama']], resize_keyboard: true }
  });
}

module.exports = { handleReportHarian };

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const XLSX = require('xlsx');
const fs = require('fs');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// In-memory user state
const userState = {};

// Load workbook once
const workbook = XLSX.readFile('Daily Report.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Fungsi kirim menu utama
function sendMainMenu(chatId) {
  userState[chatId] = 'main';
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

// Fungsi cari data berdasarkan site ID
function searchSiteId(siteId) {
  const site = siteId.toUpperCase();
  const result = jsonData.find(row => String(row['Site ID']).toUpperCase() === site);
  if (!result) return '❌ Site ID tidak ditemukan.';

  return `
📡 <b>Data Site ID: ${site}</b>
- Mitra: ${result['Mitra'] || '-'}
- Real Deploy: ${result['Real Deploy'] || '-'}
- Milestone: ${result['Milestone'] || '-'}
- Inhand Date: ${result['Inhand Date'] || '-'}
- L0-Ready Date: ${result['L0-Ready Date'] || '-'}
- OA Date: ${result['OA Date'] || '-'}
- Status SLA: ${result['Status SLA'] || '-'}
  `;
}

// Saat menerima pesan
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  // === Cek state user ===
  const state = userState[chatId];

  // === Proses menu utama ===
  if (text === '🔍 Pencarian Site ID') {
    userState[chatId] = 'search';
    return bot.sendMessage(chatId, 'Silakan masukkan Site ID yang ingin dicari.', {
      reply_markup: {
        keyboard: [['⬅ Kembali ke Menu Utama']],
        resize_keyboard: true
      }
    });
  }

  if (text === '📝 Report Harian') {
    userState[chatId] = 'report';
    return bot.sendMessage(chatId, '📝 Telah masuk ke menu Report Harian', {
      reply_markup: {
        keyboard: [['⬅ Kembali ke Menu Utama']],
        resize_keyboard: true
      }
    });
  }

  if (text === '❤️ WeCare') {
    userState[chatId] = 'wecare';
    return bot.sendMessage(chatId, '❤️ Telah masuk ke menu WeCare', {
      reply_markup: {
        keyboard: [['⬅ Kembali ke Menu Utama']],
        resize_keyboard: true
      }
    });
  }

  if (text === '⬅ Kembali ke Menu Utama') {
    return sendMainMenu(chatId);
  }

  // === Proses input Site ID di menu search ===
  if (state === 'search') {
    const result = searchSiteId(text);
    return bot.sendMessage(chatId, result, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [['⬅ Kembali ke Menu Utama']],
        resize_keyboard: true
      }
    });
  }

  // Default fallback
  sendMainMenu(chatId);
});

const XLSX = require('xlsx');
const workbook = XLSX.readFile('Daily Report.xlsx');
const sheet = workbook.Sheets['All Order'];
const jsonData = XLSX.utils.sheet_to_json(sheet);

// --- Fungsi pencarian Site ID
function findSiteId(siteId) {
  const site = siteId.toUpperCase();
  const row = jsonData.find(row => String(row['Site ID']).toUpperCase() === site);
  if (!row) return '❌ Site ID tidak ditemukan.';
  return `
📡 <b>Data Site ID: ${site}</b>
- Mitra: ${row['Mitra'] || '-'}
- Real Deploy: ${row['Real Deploy'] || '-'}
- Milestone: ${row['Milestone'] || '-'}
- Inhand Date: ${row['Inhand Date'] || '-'}
- L0-Ready Date: ${row['L0-Ready Date'] || '-'}
- OA Date: ${row['OA Date'] || '-'}
- Status SLA: ${row['Status SLA'] || '-'}
  `;
}

// --- Fungsi report harian (ambil dari jawaban sebelumnya)
function getReportHarian() {
  // (copy paste fungsi getReportHarian dari jawaban sebelumnya)
  // return { a1, a2, a3, a4, a5, a6, a7, a8 }
}

module.exports = { findSiteId, getReportHarian };

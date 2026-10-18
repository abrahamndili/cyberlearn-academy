const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

function init() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE,
      lessonId TEXT,
      email TEXT,
      amount INTEGER,
      status TEXT,
      paystack TEXT,
      created_at TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      certificate_id TEXT UNIQUE,
      reference TEXT,
      file_name TEXT,
      issued_at TEXT
    )`);
  });
}

function savePurchase({ reference, lessonId, email, amount }) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT OR IGNORE INTO purchases (reference, lessonId, email, amount, status, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))`);
    stmt.run(reference, lessonId, email, amount, 'pending', function (err) {
      stmt.finalize();
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

function getPurchaseByReference(reference) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM purchases WHERE reference = ?`, [reference], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function markPurchasePaid(reference, paystackData) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(paystackData);
    db.run(`UPDATE purchases SET status = 'paid', paystack = ? WHERE reference = ?`, [json, reference], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function createCertificateRecord({ certificateId, reference, fileName }) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO certificates (certificate_id, reference, file_name, issued_at) VALUES (?, ?, ?, datetime('now'))`);
    stmt.run(certificateId, reference, fileName, function (err) {
      stmt.finalize();
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

function getCertificateById(certificateId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT c.*, p.email, p.lessonId FROM certificates c LEFT JOIN purchases p ON p.reference = c.reference WHERE c.certificate_id = ?`, [certificateId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = {
  init,
  savePurchase,
  getPurchaseByReference,
  markPurchasePaid,
  createCertificateRecord,
  getCertificateById,
  dbPath: DB_PATH
};

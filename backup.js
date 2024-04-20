require('dotenv').config();
const cron = require('node-cron');
const fs = require('fs');
const { pool } = require('./db');  // Veritabanı bağlantı yapılandırmanız
const { sendBackupEmail } = require('./email');  // E-posta gönderim servisi

const weeklyReport= async function(){
     cron.schedule(process.env.BACKUP_PERIOD, async () => {
      try {
        const allStudents = await pool.query('SELECT * FROM Student');
        const jsonData = JSON.stringify(allStudents.rows);
        fs.writeFileSync('students_backup.json', jsonData);
    
        // E-posta gönderimi
        sendBackupEmail('students_backup.json');
      } catch (err) {
        console.error("Hata oluştu: ", err);
      }
    });
}


module.exports={weeklyReport}
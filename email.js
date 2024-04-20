const nodemailer = require('nodemailer');

async function sendBackupEmail(attachmentPath) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service:'gmail',
    auth: {
      user: 'nodej9551@gmail.com',
      pass: "cxch stge mzdz vfma",
    },
  });

  let info = await transporter.sendMail({
    from: 'developerburakgul@gmail.com',
    to: "emir.baran255@gmail.com",
    subject: "Haftalık Öğrenci Yedeği",
    text: "Bu haftaki öğrenci yedeği ekte bulunmaktadır.",
    attachments: [
      {
        filename: 'students_backup.json',
        path: attachmentPath
      }
    ]
  });

  console.log("E-posta gönderildi: %s", info.messageId);
}


exports.sendBackupEmail = sendBackupEmail;

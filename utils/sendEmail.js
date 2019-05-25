const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '947860982@qq.com',
    pass: 'xylmzfjbgdxubbah' //授权码,通过QQ获取
  }
});

const sendMail = (recipient, subject, text) => {
  const mailOptions = {
    from: '947860982@qq.com', // 发送者
    to: recipient, // 接受者,可以同时发送多个,以逗号隔开
    subject, // 标题
    text // 文本
  }
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}

module.exports = sendMail;

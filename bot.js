const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'enderglider.falixsrv.me',
    username: 'hoss_2013gg',   // اسم جديد للبوت
    auth: 'offline',
    version: '1.20.1'           // زي ما كان
  });

  bot.on('spawn', () => {
    console.log('✅ StormBreaker متصل');
    // مفيش حركة علشان ما يتطردش
  });

  bot.on('end', () => {
    console.log('❌ تم فصل StormBreaker... إعادة الاتصال بعد 10 ثواني');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 10000);
  });
}

startBot();

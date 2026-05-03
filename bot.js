const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me', // عنوان السيرفر
    username: 'StormBreaker',        // الاسم الجديد للبوت
    auth: 'offline',
    version: '1.20.1'                // زي ما كان قبل كده
  });

  bot.on('spawn', () => {
    console.log('✅ StormBreaker متصل');
    // مفيش حركة غير طبيعية علشان ما يتطردش
  });

  bot.on('end', () => {
    console.log('❌ تم فصل StormBreaker... إعادة الاتصال بعد 10 ثواني');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 10000);
  });

  process.on('SIGINT', () => {
    console.log('⏹️ إيقاف StormBreaker...');
    bot.quit();
    process.exit();
  });
}

startBot();

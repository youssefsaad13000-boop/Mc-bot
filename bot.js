const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me',
    username: 'ShadowBot',   // اسم ثابت
    auth: 'offline',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('✅ ShadowBot متصل');
    // مفيش حركة أو شات
  });

  // تجاهل أي رسائل في الشات
  bot.on('message', (message) => {
    // مش هيعمل أي رد أو خروج
  });

  bot.on('end', () => {
    console.log('❌ تم فصل ShadowBot... إعادة الاتصال بعد 10 ثواني');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 10000);
  });

  process.on('SIGINT', () => {
    console.log('⏹️ إيقاف ShadowBot...');
    bot.quit();
    process.exit();
  });
}

startBot();

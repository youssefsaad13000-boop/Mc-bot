const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me',
    username: 'ShadowBot',   // اسم ثابت اخترته
    auth: 'offline',         // للسيرفرات الـ cracked
    version: '1.20.1'        // زي ما كانت
  });

  bot.on('spawn', () => {
    console.log('✅ ShadowBot متصل');
    // مفيش حركة أو مشي
  });

  bot.on('message', (message) => {
    console.log('💬 شات:', message.toAnsi());
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

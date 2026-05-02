const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me',
    username: 'higg',       // اسم البوت
    auth: 'offline',        // للسيرفرات الـ cracked
    version: false          // يتعرف تلقائيًا على نسخة السيرفر
  });

  bot.on('spawn', () => {
    console.log('✅ البوت متصل');

    // يمشي للأمام بعد ثانيتين
    setTimeout(() => {
      bot.setControlState('forward', true);
      console.log('🚶 البوت بدأ يمشي للأمام');
    }, 2000);
  });

  bot.on('message', (message) => {
    console.log('💬 شات:', message.toAnsi());
  });

  bot.on('end', () => {
    console.log('❌ تم فصل البوت... إعادة الاتصال بعد 5 ثواني');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 5000);
  });

  process.on('SIGINT', () => {
    console.log('⏹️ إيقاف البوت...');
    bot.quit();
    process.exit();
  });
}

startBot();

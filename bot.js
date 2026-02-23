const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'ihossam_noob', // اسم مختلف عن حسابك الأساسي
    auth: 'offline',          // للسيرفرات الـ cracked
    version: '1.20.1'         // حدّد نسخة السيرفر لو محتاج
  });

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // حلقة حركات AFK متنوعة
    setInterval(() => {
      bot.look(Math.random() * 360, 0);

      bot.setControlState('jump', true);
      bot.setControlState('sneak', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
        bot.setControlState('sneak', false);
      }, 500);
    }, 30000);
  });

  bot.on('message', (message) => {
    // تجاهل رسائل الشات
  });

  bot.on('end', () => {
    console.log('تم فصل البوت... إعادة الاتصال بعد 5 ثواني');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('خطأ:', err.message);
    setTimeout(startBot, 5000);
  });

  process.on('SIGINT', () => {
    console.log('إيقاف البوت...');
    bot.quit();
    process.exit();
  });
}

startBot();

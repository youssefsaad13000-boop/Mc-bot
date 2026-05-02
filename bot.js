const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me',
    username: 'higg' + Math.floor(Math.random() * 1000), // اسم عشوائي كل مرة
    auth: 'offline',          // للسيرفرات الـ cracked
    version: false            // يتعرف تلقائيًا على نسخة السيرفر
  });

  bot.on('spawn', () => {
    console.log('البوت متصل (AFK)');

    // تسجيل أو تسجيل دخول
    setTimeout(() => {
      bot.chat('/login 123456'); // غيّر الباسورد حسب اللي سجلت بيه
      // لو أول مرة تدخل: bot.chat('/register 123456 123456');
    }, 1000);

    // يمشي للأمام بعد شوية
    setTimeout(() => {
      bot.setControlState('forward', true);
    }, 3000);
  });

  bot.on('message', (message) => {
    console.log('شات:', message.toAnsi());
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

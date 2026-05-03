const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me',
    username: 'IronGuard',   // اسم ثابت جديد
    auth: 'offline',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('✅ IronGuard متصل');

    // نط دائم (قفزة كل ثانية)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 1000);
  });

  bot.on('end', () => {
    console.log('❌ تم فصل IronGuard... إعادة الاتصال بعد 10 ثواني');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 10000);
  });

  process.on('SIGINT', () => {
    console.log('⏹️ إيقاف IronGuard...');
    bot.quit();
    process.exit();
  });
}

startBot();

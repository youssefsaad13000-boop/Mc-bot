const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'pvptrainlol.falixsrv.me', // هنا غيّر للـ IP أو الدومين الجديد
    port: 25565,                     // البورت الافتراضي، غيّره لو السيرفر مختلف
    username: 'SkyRunner',
    auth: 'offline',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ SkyRunner متصل');
  });

  bot.on('end', () => {
    console.log('❌ تم فصل SkyRunner... إعادة الاتصال بعد 10 ثواني');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ خطأ:', err.message);
    setTimeout(startBot, 10000);
  });
}

startBot();

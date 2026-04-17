const mineflayer = require('mineflayer');

let botCount = 0;

function startBot() {
  botCount++;
  const username = `ommm${botCount}`; // اسم مختلف لكل بوت

  const bot = mineflayer.createBot({
    host: 'roniedition.aternos.me', // السيرفر
    username: username,
    auth: 'offline',                // للسيرفرات الـ cracked
    version: '1.20.1'               // أو false لو عايز يتعرف تلقائيًا
  });

  bot.on('spawn', () => {
    console.log(`✅ البوت ${username} متصل`);

    // حركة مستمرة للأمام
    setTimeout(() => {
      bot.setControlState('forward', true);
      console.log(`🚶 البوت ${username} بدأ يمشي للأمام`);
    }, 2000);
  });

  bot.on('end', () => {
    console.log(`❌ البوت ${username} فصل... إعادة الاتصال بعد 5 ثواني`);
    setTimeout(() => startBot(), 5000);
  });

  bot.on('error', err => {
    console.log(`⚠️ خطأ في ${username}:`, err.message);
    setTimeout(() => startBot(), 5000);
  });
}

// كل 5 ثواني يتولد بوت جديد
setInterval(startBot, 5000);

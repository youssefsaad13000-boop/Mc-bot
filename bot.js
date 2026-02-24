const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'wwe', // اسم مختلف عن حسابك الأساسي
    auth: 'offline',          // للسيرفرات الـ cracked
    version: '1.20.1'         // أو false لو عايز يتعرف تلقائيًا
  });

  bot.once('spawn', () => {
    console.log('البوت متصل (AI)');

    // تسجيل الدخول بعد ثانيتين
    setTimeout(() => bot.chat('/login 123yyyuuu'), 2000);

    // حركة عشوائية كل فترة
    setInterval(() => {
      const actions = ['jump', 'sneak', 'left', 'right'];
      const action = actions[Math.floor(Math.random() * actions.length)];

      bot.setControlState(action, true);
      setTimeout(() => bot.setControlState(action, false), 500);
    }, 10000); // كل 10 ثواني
  });

  // ردود بسيطة على الشات
  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // تجاهل نفسه

    if (message.includes('مرحبا')) {
      bot.chat(`أهلاً ${username}!`);
    } else if (message.includes('كيفك')) {
      bot.chat('تمام الحمد لله، وانت؟');
    }
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

const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin;

const bot = mineflayer.createBot({
  host: 'play.ashpvp.xyz',
  username: 'wwe',
  auth: 'offline',
  version: '1.20.1'
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);

bot.once('spawn', () => {
  console.log('✅ البوت دخل السيرفر');
  bot.chat('/login 123yyyuuu'); // تسجيل الدخول التلقائي
});

// البوت يهاجم أي لاعب قريب بشكل مستمر
bot.on('physicTick', () => {
  const target = bot.nearestEntity(entity => entity.type === 'player');
  if (target) {
    bot.pvp.attack(target);
  }
});

// إعادة الاتصال لو حصل disconnect
bot.on('end', () => {
  console.log('❌ تم فصل البوت، جاري إعادة الاتصال...');
  setTimeout(() => {
    process.exit(1); // إعادة تشغيل عبر GitHub Actions أو أي خدمة تشغيل تلقائي
  }, 5000);
});

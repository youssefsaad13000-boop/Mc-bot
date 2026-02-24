const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin;

const bot = mineflayer.createBot({
  host: 'play.ashpvp.xyz',
  username: 'wwe',       // اسم مختلف عن حسابك الأساسي
  auth: 'offline',       // للسيرفرات الـ cracked
  version: '1.20.1'      // أو false لو عايز يتعرف تلقائيًا
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);

bot.once('spawn', () => {
  console.log('✅ البوت دخل السيرفر وجاهز للـ PVP');
  
  // تسجيل الدخول التلقائي
  bot.chat('/login 123yyyuuu');
});

// مثال: البوت يهاجم أي لاعب قريب
bot.on('physicTick', () => {
  const target = bot.nearestEntity(entity => entity.type === 'player');
  if (target) {
    bot.pvp.attack(target);
  }
});

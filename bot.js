const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'wwe',
    auth: 'offline',
    version: '1.20.1'
  });

  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log('البوت متصل (AI)');
    setTimeout(() => bot.chat('/login 123yyyuuu'), 2000);

    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message.includes('اتبعني')) {
      const player = bot.players[username]?.entity;
      if (!player) {
        bot.chat('مش شايفك!');
        return;
      }
      bot.chat(`تمام ${username}, جاي وراك!`);
      bot.pathfinder.setGoal(new goals.GoalFollow(player, 2), true);
    }

    if (message.includes('قف')) {
      bot.chat('هقف هنا.');
      bot.pathfinder.stop();
    }
  });
}

startBot();

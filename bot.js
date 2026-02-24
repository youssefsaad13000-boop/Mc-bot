const mineflayer = require('mineflayer');
const pvp = require('mineflayer-pvp').plugin;
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY // ضع مفتاحك هنا
});
const openai = new OpenAIApi(configuration);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.ashpvp.xyz',
    username: 'wwe',
    auth: 'offline',
    version: '1.20.1'
  });

  bot.loadPlugin(pvp);

  bot.once('spawn', () => {
    console.log('البوت متصل (PvP AI)');
    setTimeout(() => bot.chat('/login 123yyyuuu'), 2000);
  });

  bot.on('chat', async (username, message) => {
    if (username === bot.username) return;

    if (message.includes('قاتلني')) {
      const player = bot.players[username]?.entity;
      if (!player) return bot.chat('مش شايفك!');

      // وصف الحالة
      const situation = `Player ${username} طلب قتال. المسافة: ${player.position.distanceTo(bot.entity.position)}.`;

      // استشارة OpenAI
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: "أنت مساعد للقتال في Minecraft." },
          { role: "user", content: situation }
        ]
      });

      const decision = response.data.choices[0].message.content;

      bot.chat(`قرار الذكاء الاصطناعي: ${decision}`);

      // تنفيذ القرار
      if (decision.includes('هاجم')) {
        bot.pvp.attack(player);
      } else if (decision.includes('اهرب')) {
        bot.chat('هحاول أهرب...');
        // ممكن تضيف pathfinder هنا للهروب
      }
    }
  });
}

startBot();

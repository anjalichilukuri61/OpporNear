const { Telegraf } = require('telegraf');
const Opportunity = require('./models/Opportunity');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log("⚠️ Telegram Bot Token not provided. Skipping Telegram Bot startup.");
} else {
  const bot = new Telegraf(token);

  console.log("🤖 Telegram Radar Bot is running and listening for local opportunities...");

  bot.start((ctx) => {
    ctx.reply("Welcome to the OpporNear Radar! 🚀\n\nForward or type any local opportunity here, and I will instantly scan it and push it to the main website for students to see!");
  });

  bot.on('text', async (ctx) => {
    const text = ctx.message.text;

    // Ignore empty messages or commands
    if (!text || text.startsWith('/')) return;

    try {
      // Smarter extraction for the MVP demonstration
      let category = "Other"; // Valid enum default
      const textLower = text.toLowerCase();
      
      if (textLower.includes('hackathon')) category = 'Hackathon';
      else if (textLower.includes('internship')) category = 'Internship';
      else if (textLower.includes('scholarship')) category = 'Scholarship';
      else if (textLower.includes('workshop')) category = 'Workshop';
      else if (textLower.includes('training')) category = 'Training';
      else if (textLower.includes('job') || textLower.includes('hiring') || textLower.includes('vacancy') || textLower.includes('technician')) category = 'Job';

      let city = "Unknown Location"; // Better default
      if (textLower.includes('delhi')) city = "Delhi";
      else if (textLower.includes('bangalore') || textLower.includes('bengaluru')) city = "Bangalore";
      else if (textLower.includes('mumbai')) city = "Mumbai";
      else if (textLower.includes('chennai')) city = "Chennai";
      else if (textLower.includes('hyderabad')) city = "Hyderabad";
      else if (textLower.includes('visakhapatnam') || textLower.includes('vizag')) city = "Visakhapatnam";
      else if (textLower.includes('pune')) city = "Pune";

      const shortTitle = text.length > 30 ? text.substring(0, 30) + "..." : text;

      // Extract the first URL found in the message
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = text.match(urlRegex);
      const extractedUrl = urls && urls.length > 0 ? urls[0] : "";

      const newOpp = new Opportunity({
        title: shortTitle,
        category: category,
        mode: "Offline",
        location: { city: city, state: "India" },
        organizerName: "Spotted via Telegram Radar",
        description: text,
        prize: "Check Details",
        skills: ["Community"],
        url: extractedUrl
      });

      await newOpp.save();
      
      ctx.reply(`✅ Successfully captured!\n\nI added this as an **Offline ${category}** located in **${city}** to the OpporNear database. Refresh the website to see it!`, { parse_mode: "Markdown" });
      
    } catch (error) {
      console.error("Error saving Telegram opportunity:", error);
      ctx.reply("❌ Sorry, I had trouble saving that opportunity to the database.");
    }
  });

  bot.launch();
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

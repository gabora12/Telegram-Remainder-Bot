const { Telegraf } = require("telegraf");
const axios = require("axios");
const Calendar = require("telegraf-calendar-telegram");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const calendar = new Calendar(bot);
console.log(calendar.getCalendar());

const UrlBase =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://events-buddy-bot.herokuapp.com";

async function Bot() {
  bot.start((ctx) => ctx.reply("Welcome!"));
  bot.help((ctx) => ctx.reply("Schedule an event..!"));
  bot.command("Create", (ctx) => {
    ctx.reply("Heyya..! Back again..What do you want to schedule ? ");

    var Name = ctx.message.text;
    if (Name.length != 0) {
      ctx.reply("When do you want to me to schedule ?", calendar.getCalendar());
      calendar.setDateListener((context, date) => console.log(date));
    }
  });
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { bot, UrlBase, Bot };

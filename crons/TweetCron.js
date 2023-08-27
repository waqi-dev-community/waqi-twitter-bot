import cron from "node-cron"
import { SingleCityTweetMain } from "../workers/SingeCitytweet.js";

const runSingleCityTweet = cron.schedule('*/15 * * * *', async () => {
    console.log("running runSingleCityTweet cron")
    await SingleCityTweetMain();
});


export const startTweetCron = () => {
    runSingleCityTweet.start();
}
import { TweetsReply } from "./tweetsReply";

export class Tweets {
    tweetId?: string
    userName?: string
    tweetBody?: string
    datetime?: Date
    likedBy?: string[]
    replies?: TweetsReply[]

    // constructor(
    //     datetime?: Date,
    // ) {
    //     this.datetime = datetime || new Date();
    // }
}
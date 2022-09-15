import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Tweets } from '../model/tweets';
import { TweetsReply } from '../model/tweetsReply';
import { Users } from '../model/users';
import { TweetsService } from '../service/tweets.service';
import { UsersService } from '../service/users.service';
import { AppConstant } from '../shared/constant/app.constant';

@Component({
  selector: 'app-tweet-home',
  templateUrl: './tweet-home.component.html',
  styleUrls: ['./tweet-home.component.css'],
  providers: [MessageService]
})
export class TweetHomeComponent implements OnInit {

  allTweets: Tweets[] = []
  myTweets: Tweets[] = []
  tweets: Tweets
  user: Users
  activeState: boolean[] = [true, false]
  commentBox: boolean = false
  editBox: boolean = false
  tweetsReply: TweetsReply
  usersList: Users[] = []
  fullName: string = ""
  selectedUser: Users;
  usersTweets: Tweets[] = []

  constructor(private tweetsService: TweetsService,
    private usersService: UsersService,
    private cookieService: CookieService,
    private messageService: MessageService) {
    this.tweets = new Tweets()
    this.user = new Users()
    this.tweetsReply = new TweetsReply()
    this.selectedUser = new Users()
  }

  ngOnInit(): void {
    this.tweets.userName = this.cookieService.get(AppConstant.cookieUserKey)
    this.tweets.tweetBody = ""
    this.initialize()
    this.mandatory()
  }

  initialize() {
    this.usersService.getUser(this.tweets.userName).subscribe((result: Users) => {
      if (!!result) {
        this.user = result
      }
    })
    this.mandatory()
  }

  mandatory() {
    this.getAllTweets()
    this.getMyTweets()
    this.getAllUsers()
  }

  postTweets() {
    this.tweets.datetime = new Date();
    this.tweetsService.postTweet(this.tweets).subscribe((result: Tweets) => {
      if (!!result) {
        this.mandatory()
        this.tweetSuccess()
      }
    });
  }

  ClearFields() {
    this.tweets.tweetBody = "";
    this.tweetsReply.tweetReplyBody = ""
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  getAllTweets() {
    this.tweetsService.getAllTweets().subscribe((results: Tweets[]) => {
      if (!!results) {
        this.allTweets = results.sort((a: any, b: any) => <any>new Date(b.datetime) - <any>new Date(a.datetime));
      }
    });
  }

  getMyTweets() {
    this.tweetsService.getMyTweets(this.tweets.userName).subscribe((results: Tweets[]) => {
      if (!!results) {
        this.myTweets = results.sort((a: any, b: any) => <any>new Date(b.datetime) - <any>new Date(a.datetime));
      }
    });
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((results: Users[]) => {
      if (!!results) {
        this.usersList = results
      }
    });
  }

  editTweet(tweetObj: Tweets) {
    this.tweetsReply.datetime = new Date()
    this.tweetsService.tweetEdit(tweetObj, tweetObj.tweetId).subscribe((result: Tweets) => {
      if (!!result) {
        this.mandatory()
        this.handleUpdate(tweetObj.tweetId)
        this.tweetEditSuccess()
      }
    })
  }

  handleLike(tweetId: any) {
    this.tweetsService.likeTweet(this.tweets.userName, tweetId).subscribe((results: any) => {
      if (!!results) {
        this.mandatory()
        this.likeSuccess()
      }
    });
  }

  handleComment() {
    this.commentBox = !this.commentBox
  }

  handleUpdate(tweetId: any) {
    this.editBox = !this.editBox
  }

  handleDelete(tweetId: any) {
    this.showConfirm(tweetId)
  }

  postTweetsReply(tweetId: any) {
    this.tweetsReply.datetime = new Date()
    this.tweetsReply.repliedBy = this.tweets.userName
    this.tweetsService.postTweetsReply(this.tweets.userName, this.tweetsReply, tweetId).subscribe((result: Tweets) => {
      if (!!result) {

        this.mandatory()
        this.handleComment()
        this.commentSuccess()
      }
    });
  }

  tweetByUser() {
    this.tweetsService.getMyTweets(this.selectedUser).subscribe((result: Tweets[]) => {
      if (!!result) {
        this.usersTweets = result
      }
    })
  }

  // For showing toast for any activity

  tweetSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tweet added Successfully' });
  }

  tweetEditSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tweet edited Successfully' });
  }

  likeSuccess() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Liked Successfully' });
  }

  commentSuccess() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Commented Successfully' });
  }

  deleteSuccess() {
    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted Successfully' });
  }

  showConfirm(tweetId: any) {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', data: tweetId });
  }

  onConfirm(tweetId: any) {
    this.tweetsService.tweetDelete(tweetId)
    this.tweetsService.tweetDelete(tweetId).subscribe((result: any) => {
      if (result == null) {
        this.mandatory()
        this.deleteSuccess()
      }
    });
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweets } from '../model/tweets';
import { TweetsReply } from '../model/tweetsReply';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  postTweet(tweets: Tweets) {
    return this.http.post(this.baseUrl + '/tweets/add', tweets);
  }

  getAllTweets(): Observable<Tweets[]> {
    return this.http.get<Tweets[]>(this.baseUrl + '/tweets/all');
  }

  getMyTweets(userName: any): Observable<Tweets[]> {
    return this.http.get<Tweets[]>(this.baseUrl + '/tweets/' + userName);
  }

  tweetEdit(tweetObj: any, tweetId: any): Observable<any> {
    return this.http.put(this.baseUrl + '/tweets/update/' + tweetId, tweetObj)
  }

  likeTweet(userName: any, tweetId: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/tweets/' + userName + '/like/' + tweetId, tweetId);
  }

  postTweetsReply(userName: any, tweetsReply: TweetsReply, tweetId: any) {
    return this.http.post(this.baseUrl + '/tweets/' + userName + '/reply/' + tweetId, tweetsReply);
  }

  tweetDelete(tweetId: any) {
    return this.http.delete(this.baseUrl + '/tweets/delete/' + tweetId)
  }
}

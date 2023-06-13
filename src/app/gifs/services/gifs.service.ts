import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  public  gifList : Gif[] = []

  private _tagsHistory: string[] = [];

  private apiKey: string = 'u7vlP0wc4KwxjPZR13II2YzXjqjBKZ7f'
  private url: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http:HttpClient) {
    // load data at first render
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory]; // Spread operator to create a copy of array. Value not altered
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); // to get the value in lower case

    // delete value if previously exist
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    // put the value at the beginning of list
    this._tagsHistory.unshift(tag);

    // admit only ten values to show
    this._tagsHistory = this._tagsHistory.splice(0, 10)

    this.saveLocalStorage();
  }

  // save data on localStorage
  private saveLocalStorage() : void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory))
  }

  // get data from localStorage
  private loadLocalStorage(): void {
    if(!localStorage.getItem('tagsHistory')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!);

    if(this.tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0])
  }

  // To search on input
  searchTag( tag: string): void {
      if(tag.length === 0) return

      this.organizeHistory(tag)

      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10')

      this.http.get<SearchResponse>(`${this.url}/search`, {params})
      .subscribe( resp => {

        this.gifList = resp.data
      })
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') // Reference of HTML element from template
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService:GifsService) {}


  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag)

    this.tagInput.nativeElement.value = '';
  }
}

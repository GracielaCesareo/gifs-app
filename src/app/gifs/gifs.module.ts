import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { SearchComponent } from './search/search.component';
import { GifListComponent } from './gif-list/gif-list.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    SearchComponent,
    GifListComponent
  ],
  exports: [
    GifsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }

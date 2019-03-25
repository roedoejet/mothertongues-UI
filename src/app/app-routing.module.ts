import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'browse',
    loadChildren: '../pages/browse/browse.module#BrowsePageModule'
  },
  {
    path: 'bookmarks',
    loadChildren: '../pages/bookmarks/bookmarks.module#BookmarksPageModule'
  },
  {
    path: 'flashcards',
    loadChildren: '../pages/flashcards/flashcards.module#FlashcardsPageModule'
  },
  {
    path: 'random',
    loadChildren: '../pages/random/random.module#RandomPageModule'
  },
  {
    path: 'search',
    loadChildren: '../pages/search/search.module#SearchPageModule'
  },
  {
    path: 'about',
    loadChildren: '../pages/about/about.module#AboutPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

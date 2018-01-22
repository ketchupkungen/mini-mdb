import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// admin-components
import { AdminPanelComponent } from './admin-components/admin-panel/admin-panel.component';
import { AdminAddFilmComponent } from './admin-components/admin-add-film/admin-add-film.component';
import { AdminAllActivityComponent } from './admin-components/admin-all-activity/admin-all-activity.component';
import { AdminListUsersComponent } from './admin-components/admin-list-users/admin-list-users.component';

// lists-components
import { ListAllFilmsComponent } from './lists-components/list-all-films/list-all-films.component';
import { ListAllActorsComponent } from './lists-components/list-all-actors/list-all-actors.component';
import { ListAllDirectorsComponent } from './lists-components/list-all-directors/list-all-directors.component';
import { ListTop10Component } from './lists-components/list-top-10/list-top-10.component';
import { ListLatestReviewsComponent } from './lists-components/list-latest-reviews/list-latest-reviews.component';

// main-components
import { FilmPageComponent } from './main-components/film-page/film-page.component';
import { FrontPageComponent } from './main-components/front-page/front-page.component';
import { LoginComponent } from './main-components/login/login.component';
import { PersonPageComponent } from './main-components/person-page/person-page.component';
import { RegisterComponent } from './main-components/register/register.component';
import { AddPersonComponent } from './main-components/add-person/add-person.component';
import { UserPanelComponent } from './main-components/user-panel/user-panel.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent
  },
  {
    path: 'film-page/:id',
    component: FilmPageComponent
  },
  {
    path: 'person-page/:id',
    component: PersonPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'add-person/:occupationType/:filmId',
    component: AddPersonComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-panel',
    component: UserPanelComponent
  },
  {
    path: 'lists/list-all-films',
    component: ListAllFilmsComponent
  },
  {
    path: 'lists/list-all-actors',
    component: ListAllActorsComponent
  },
  {
    path: 'lists/list-all-directors',
    component: ListAllDirectorsComponent
  },
  {
    path: 'lists/list-top-10',
    component: ListTop10Component
  },
  {
    path: 'lists/list-latest-reviews',
    component: ListLatestReviewsComponent
  },
  {
    path: 'admin/admin-panel',
    component: AdminPanelComponent
  },
  {
    path: 'admin/admin-add-film',
    component: AdminAddFilmComponent
  },
  {
    path: 'admin/admin-all-activity',
    component: AdminAllActivityComponent
  },
  {
    path: 'admin/admin-list-users',
    component: AdminListUsersComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

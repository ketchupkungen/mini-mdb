import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { AppRoutingModule } from './app-routing.module';

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
import { AddPersonComponent } from './main-components/add-person/add-person.component';
import { FilmPageComponent } from './main-components/film-page/film-page.component';
import { FrontPageComponent } from './main-components/front-page/front-page.component';
import { LoginComponent } from './main-components/login/login.component';
import { PersonPageComponent } from './main-components/person-page/person-page.component';
import { RegisterComponent } from './main-components/register/register.component';
import { UserPanelComponent } from './main-components/user-panel/user-panel.component';
import { ReturnToTop } from './main-components/return-to-top/return-to-top.component';
import { FooterComponent } from './main-components/footer/footer.component';

// reusable-components
import { StarRatingComponent } from './reusable-components/star-rating/star-rating.component';
import { UploadPictureComponent } from './reusable-components/upload-picture/upload-picture.component';

// top-components
import { HeaderComponent } from './top-components/header/header.component';
import { SearchComponent } from './top-components/search/search.component';
import { SidebarComponent } from './top-components/sidebar/sidebar.component';
import { StatusbarComponent } from './top-components/statusbar/statusbar.component';

// pipes
import { SafeurlPipe } from './pipes/safeurl.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

// services
import { GlobalService } from './services/global.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    FrontPageComponent,
    SidebarComponent,
    StarRatingComponent,
    UploadPictureComponent,
    FilmPageComponent,
    PersonPageComponent,
    SearchComponent,
    ListAllFilmsComponent,
    ListAllActorsComponent,
    ListAllDirectorsComponent,
    ListTop10Component,
    ListLatestReviewsComponent,
    AddPersonComponent,
    RegisterComponent,
    LoginComponent,
    UserPanelComponent,
    StatusbarComponent,
    ReturnToTop,
    AdminPanelComponent,
    AdminAddFilmComponent,
    AdminAllActivityComponent,
    AdminListUsersComponent,
    SafeurlPipe,
    TruncatePipe
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    InlineEditorModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

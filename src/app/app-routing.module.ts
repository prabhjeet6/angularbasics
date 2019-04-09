import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
/*Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar.
A typical Angular Route has two properties:
path: a string that matches the URL in the browser address bar.
component: the component that the router should create when navigating to this route. */
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'detail/:id', component:HeroDetailComponent},
  //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
];

@NgModule({
  /*Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by calling RouterModule.forRoot() 
 within the imports array, like this.The forRoot() method supplies the service providers and directives needed for routing,
  and performs the initial navigation based on the current browser URL.*/
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //Exporting RouterModule makes router directives available for use in the AppModule components that will need them
})

export class AppRoutingModule {



}


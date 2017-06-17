import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//Components
import { AppComponent }  from './app.component';
import { HeroesComponent }  from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';

//Services
import { HeroService }         from './hero.service';

//Routes
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule,AppRoutingModule,HttpModule],
  declarations: [ AppComponent,HeroDetailComponent ,HeroesComponent,DashboardComponent,HeroSearchComponent],
  bootstrap:    [ AppComponent ],
  providers:    [HeroService]
})
export class AppModule 
{}


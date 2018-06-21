import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { CommonModule } from '@angular/common';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { RouterModule,Routes } from '@angular/router';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { FramelayoutComponent } from './framelayout/framelayout.component';
import { BackendService } from './backend.service';

import { jqxLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlayout';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';

import { jqxPanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpanel';
import { jqxResponsivePanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxresponsivepanel';

import { jqxDockPanelComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockpanel';
import { HomeComponent } from './home/home.component';
import { jqxPopoverComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpopover';



const appRoutes: Routes=[
  {
    path : 'framelayout',
    component:FramelayoutComponent,   
    //outlet:'frameoutlet' 

  },
  {
    path : 'home',
    component:HomeComponent,
    //outlet:'homepath'
    
  }
]


@NgModule({
  declarations: [
    AppComponent,
    jqxBarGaugeComponent,
    jqxGridComponent,
    jqxMenuComponent,
    jqxButtonComponent,
    FramelayoutComponent,
    jqxLayoutComponent,
    jqxTreeComponent,
    jqxComboBoxComponent,
    jqxPanelComponent,
    jqxResponsivePanelComponent,
    jqxDockPanelComponent,
    HomeComponent,
    jqxPopoverComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

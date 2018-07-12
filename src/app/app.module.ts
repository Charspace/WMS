import { LstmenugroupComponent } from './lstmenugroup/lstmenugroup.component';
import { FormsModule } from '@angular/forms';
import { LstuserComponent } from './lstuser/lstuser.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { RouterModule,Routes } from '@angular/router';
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
import { LoginComponent } from './login/login.component';
import { jqxInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LstuploadexcelplanreceiveComponent } from './lstuploadexcelplanreceive/lstuploadexcelplanreceive.component';
import { LstplanreceiveforexportComponent } from './lstplanreceiveforexport/lstplanreceiveforexport.component';
import { LsttallycheckComponent } from './lsttallycheck/lsttallycheck.component';
import { LstimportcheckerComponent } from './lstimportchecker/lstimportchecker.component';
import { LstbarcodemappingComponent } from './lstbarcodemapping/lstbarcodemapping.component';
import { LstpicklistcreateComponent } from './lstpicklistcreate/lstpicklistcreate.component';
import { LsttallycheckforexportComponent } from './lsttallycheckforexport/lsttallycheckforexport.component';
import { LstexportcheckerComponent } from './lstexportchecker/lstexportchecker.component';
import { LstbarcodemappingforexportComponent } from './lstbarcodemappingforexport/lstbarcodemappingforexport.component';
import { LstpicklistcreateforexportComponent } from './lstpicklistcreateforexport/lstpicklistcreateforexport.component';
import { LstlstbarcodemappingforexportWComponent } from './lstlstbarcodemappingforexport-w/lstlstbarcodemappingforexport-w.component';
import { LstexportcheckerWComponent } from './lstexportchecker-w/lstexportchecker-w.component';
import { LstpicklistcreateWComponent } from './lstpicklistcreate-w/lstpicklistcreate-w.component';
import { LstplanreceiveforexportWComponent } from './lstplanreceiveforexport-w/lstplanreceiveforexport-w.component';
import { LsttallycheckforexportWComponent } from './lsttallycheckforexport-w/lsttallycheckforexport-w.component';
import { LstplanreceiveforimportComponent } from './lstplanreceiveforimport/lstplanreceiveforimport.component';
import { SetuserComponent } from './setuser/setuser.component';
import { SetplanreceiveforexportComponent } from './setplanreceiveforexport/setplanreceiveforexport.component';
import { SetplanreceiveforexportWComponent } from './setplanreceiveforexport-w/setplanreceiveforexport-w.component';
import { LstallocationforexportWComponent } from './lstallocationforexport-w/lstallocationforexport-w.component';

import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxTextAreaComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtextarea';
import { SettallycheckforexportWComponent } from './settallycheckforexport-w/settallycheckforexport-w.component';
import { getLocalization } from 'jqwidgets-scripts/localization';



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
    
  },
  {
    path : 'login',
    component:LoginComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'changepw',
    component:ChangepasswordComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstbarcodemapping',
    component:LstbarcodemappingComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstbarcodemappingforexport',
    component:LstbarcodemappingforexportComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstexportchecker',
    component:LstexportcheckerComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstexportchecker-w',
    component:LstexportcheckerWComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstimportchecker',
    component:LstimportcheckerComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstlstbarcodemappingforexport-w',
    component:LstlstbarcodemappingforexportWComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstmenugroup',
    component:LstmenugroupComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstpicklistcreate',
    component:LstpicklistcreateComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstpicklistcreate-w',
    component:LstpicklistcreateWComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstpicklistcreateforexport',
    component:LstpicklistcreateforexportComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstplanreceiveforexport',
    component:LstplanreceiveforexportComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstplanreceiveforexport-w',
    component:LstplanreceiveforexportWComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lsttallycheck',
    component:LsttallycheckComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lsttallycheckforexport',
    component:LsttallycheckforexportComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lsttallycheckforexport-w',
    component:LsttallycheckforexportWComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstuploadexcelplanreceive',
    component:LstuploadexcelplanreceiveComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstuser',
    component:LstuserComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'lstplanreceiveforimport',
    component:LstplanreceiveforimportComponent,
    //outlet:'homepath'
    
  },
  {
    path : 'setuser',
    component:SetuserComponent,
    outlet: 'userPopup'
    //outlet:'homepath'
    
  },
  {
    path : 'setplanreceiveforexport-w',
    component:SetplanreceiveforexportWComponent    
    //outlet:'homepath'
    
  },
  {
    path : 'settallycheckforexport-w',
    component:SettallycheckforexportWComponent    
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
    jqxPopoverComponent,
    LoginComponent,
    jqxInputComponent,
    jqxDateTimeInputComponent,
    jqxTextAreaComponent,
    ChangepasswordComponent,
    LstuploadexcelplanreceiveComponent,
    LstplanreceiveforexportComponent,
    LsttallycheckComponent,
    LstimportcheckerComponent,
    LstbarcodemappingComponent,
    LstpicklistcreateComponent,
    LsttallycheckforexportComponent,
    LstexportcheckerComponent,
    LstbarcodemappingforexportComponent,
    LstpicklistcreateforexportComponent,
    LstlstbarcodemappingforexportWComponent,
    LstexportcheckerWComponent,
    LstpicklistcreateWComponent,
    LstplanreceiveforexportWComponent,
    LsttallycheckforexportWComponent,
    LstmenugroupComponent,
    LstuserComponent,
    LstplanreceiveforimportComponent,
    SetuserComponent,
    SetplanreceiveforexportComponent,
    SetplanreceiveforexportWComponent,
    SettallycheckforexportWComponent 
   
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
    MatInputModule,
    BrowserModule,
    FormsModule ,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

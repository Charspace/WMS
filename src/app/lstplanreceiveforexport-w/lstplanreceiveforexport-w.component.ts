import { ViewChild,AfterViewInit, ElementRef,Component, OnInit,NgModule, ANALYZE_FOR_ENTRY_COMPONENTS  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Http,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';  
import {Router} from '@angular/router';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-lstplanreceiveforexport-w',
  templateUrl: './lstplanreceiveforexport-w.component.html',
  styleUrls: ['./lstplanreceiveforexport-w.component.css']
})
export class LstplanreceiveforexportWComponent implements OnInit {

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  {

  }

  ngOnInit() {
  }

  btnEdit()
  {
    this.router.navigate(['setplanreceiveforexport-w']);
  }

}

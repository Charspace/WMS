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
  selector: 'app-framelayout',
  templateUrl: './framelayout.component.html',
  styleUrls: ['./framelayout.component.css']
})
export class FramelayoutComponent implements OnInit {
  @ViewChild('employees') employees: ElementRef;

  top: number = 0;
    left: number = -50;
  
  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  {      
  }

  ngAfterViewInit() {

    let data = new Array();
    let firstNames = ['POS', 'HR', 'Payroll', 'Attendance', 'Supply Chain', 'Hospital', 'Hotel'];
 
    for (let i = 0; i < firstNames.length; i++) {
        let row = {};
        row['firstname'] = firstNames[i];
        // row['lastname'] = lastNames[i];
        //row['title'] = titles[i];
        let imgurl = '../images/' + firstNames[i].toLowerCase() + '.png';
        let img = '<img height="50" width="45" src="' + imgurl + '"/>';
        let table = '<table style="min-width: 150px;"><tr><td style="width: 55px;" rowspan="2">' + img + '</td><td>' + firstNames[i] + '</td></tr><tr><td>' + '</td></tr></table>';
        this.employees.nativeElement.innerHTML += table;
    }
}

  btnnewclick()
  {
    
  }
  Routeform(formname)
  {
    this.router.navigate([formname]);
  }

  ngOnInit() {
  }

}

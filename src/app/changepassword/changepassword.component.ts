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
import { NgForm } from '@angular/forms/src/directives/ng_form';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

 
  showinvalidoldpassword : any = false;
  showinvalidnewpassword : any = false;
  showinvalidconfirmpassword : any = false;
  ischangepasswordfailed : any = false;
  

  constructor() { }

  ngOnInit() {
  }

  ChangePassword(form:NgForm)
  {
    this.ischangepasswordfailed = false;
    this.showinvalidoldpassword = false;
    this.showinvalidnewpassword = false;
    this.showinvalidconfirmpassword = false;
     

    
    const oldpassword = form.value.oldpassword;
    const newpassword = form.value.newpassword;
    const confirmpassword = form.value.confirmpassword;

    
    if(!oldpassword)
    {
      this.showinvalidoldpassword = true;
      this.ischangepasswordfailed = true;
    }
    if(!newpassword)
    {
      this.showinvalidnewpassword = true;
      this.ischangepasswordfailed = true;
    }
    if(!confirmpassword)
    {
      this.showinvalidconfirmpassword = true;
      this.ischangepasswordfailed = true;
    }
    if(this.ischangepasswordfailed)
    {
      return;
    }
    else
    {
      var getsessionpassword = window.sessionStorage.getItem('password');
      if(oldpassword === getsessionpassword)
      {
       if(newpassword === confirmpassword)
       {
        window.sessionStorage.setItem('password',newpassword)
        alert('Successfully Change Password!')
       }
       else
       {
         alert('New Password and Confirm Password do not match');
         return;
       }
      }
      else
      {
        alert('old Password and New Password do not match!')
        return;
      }
    }

  }

}

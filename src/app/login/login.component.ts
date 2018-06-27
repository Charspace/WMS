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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url : any;
  showinvalidusername : any = false;
  showinvalidpassword : any = false;
  isloginfail : any = false;

  constructor(private backendservice :BackendService, private router: Router,private route:ActivatedRoute) { 

    //testing tts
  }

  ngOnInit() {
  }

  loginUser(form: NgForm)
  {
     this.showinvalidusername = false;
     this.showinvalidpassword = false;
     this.isloginfail = false;
    const userid = form.value.username;
    const password = form.value.password;
    console.log("userid: " + userid);
    console.log("password: " + password);
    if(!userid)
    {
      this.showinvalidusername = true;
      this.isloginfail = true;
    }
    if(!password)
    {
      this.showinvalidpassword = true;
      this.isloginfail = true;
    }
    if(this.isloginfail)
    {
      return;
    }

    window.sessionStorage.setItem("userid",userid);
    window.sessionStorage.setItem("password",password);
    this.router.navigate(['framelayout']);

    /*
    this.backendservice.Checklogin(userid,password).subscribe(data => {
    console.log("status: " + data.Result);
    let userdata = data.Result;
    if(userdata.length > 0)
    {
      if(userdata ==='Fail')
      {
          window.alert('Username or Password is invalid. Please try again!');
      }
      else
      {
       // debugger;
        this.isPRbar = true;
        window.sessionStorage.setItem("userid",userid);
        window.sessionStorage.setItem("bgtowner",userdata[0]["BudgetOwner"]);
        window.sessionStorage.setItem("creditorno",userdata[0]["CreditorNo"]);
        window.sessionStorage.setItem("creditorname", userdata[0]["CreditorName"]);
        window.sessionStorage.setItem("department",userdata[0]["Department"]);
        window.sessionStorage.setItem("costcenter",userdata[0]["CostCenterCode"]);
        window.sessionStorage.setItem("userrole", userdata[0]["UserRole"]);
        window.sessionStorage.setItem("reportaccess", userdata[0]["ReportAccess"]);
        //this.router.navigate(['menupage', {userid: userid, queryParams: {some_data : 'test'}}]);
        this.router.navigate(['framelayout']);
      }
    }

    })
    */
  }

}

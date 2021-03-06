import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  EmployeeIdFilter: any;

  constructor(private service:SharedService) { }

  EmployeeList: any = [];
  DepartmentsList: any = [];
  EmployeeNameFilter: any;
  Department: any;
  EmployeeIDFilter: any;
  EmployeeListWithoutFilter: any = [];
  DepartmentIdFilter: any;
  DepartmentListWithoutFilter: any = [];
  DepartmentNameFilter: any;
 




  ModalTitle: string;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  ngOnInit(): void {
    this.refreshEmpList();
    this.refreshDepList();

  }


  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  editClickDep(item){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      debugger;
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }


  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    });
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentsList=data;
      this.DepartmentListWithoutFilter=data;
    });
  }

  AddClick(dep) {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    }
    this.ModalTitle = "Department";
    this.ActivateAddEditDepComp = true;

  }

 
  FilterFn() {
    debugger;
    // var EmployeetIdFilter = this.EmployeeIdFilter;
    // var EmployeeNameFilter = this.EmployeeNameFilter;
    // var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;


    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
      return el.EmployeeId.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      ) ||
       el.EmployeeName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
        ) ||
       el.Department.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
        )
    });

    // this.DepartmentsList = this.DepartmentListWithoutFilter.filter(function (el) {
       
    //   return el.DepartmentId.toString().toLowerCase().includes(
    //     DepartmentNameFilter.toString().trim().toLowerCase()
    //   ) ||
    //   el.DepartmentName.toString().toLowerCase().includes(
    //       DepartmentNameFilter.toString().trim().toLowerCase()
    //     )
    // });
  }

  sortResult(prop, asc) {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })

    this.DepartmentsList = this.DepartmentListWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }




  
}


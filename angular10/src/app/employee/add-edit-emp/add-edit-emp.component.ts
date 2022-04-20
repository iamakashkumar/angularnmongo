import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() emp: any;
  EmployeeId: string;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  EmailId: string;
  Password: string;

  DepartmentsList: any = [];

  ngOnInit(): void {
    this.refreshDepList();
    this.EmployeeId = this.emp.EmployeeId;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.DateOfJoining = this.emp.DateOfJoining;
    this.EmailId = this.emp.EmailId;
    this.Password = this.emp.Password;
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      EmailId: this.EmailId,
      Password: this.Password,
      
    };

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      EmailId: this.EmailId,
      Password: this.Password,
      //PhotoFileName:this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }


  // uploadPhoto(event){
  //   var file=event.target.files[0];
  //   const formData:FormData=new FormData();
  //   formData.append('uploadedFile',file,file.name);

  //   this.service.UploadPhoto(formData).subscribe((data:any)=>{
  //     this.PhotoFileName=data.toString();
  //     this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
  //   })
  // }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.DepartmentsList = data;

    });
  }


}


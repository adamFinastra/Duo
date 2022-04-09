import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss']
})
export class NewDataComponent implements OnInit {

  public myFile;
  public tag;
  public description;

  public records;

  public upload$;

  public dataStore$;
  public dataStore;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataStore$ = this.dataService.seeDataStore();
    this.dataStore$.subscribe(message => {
      console.log(message);
      this.dataStore = message.data_store;
    });
  }

  addData() {
    console.log(this.tag);
    console.log(this.description);

    this.upload$ = this.dataService.submitData(this.records, this.tag, this.description);
    this.upload$.subscribe(message => {
      console.log(message);
      this.router.navigate(['host-home']);
    });
  }

  changeListener($event): void {
    this.readFile($event.target);
  }

  readFile(inputValue: any) {
    let reader = new FileReader();  
    reader.readAsText(inputValue.files[0]);  

    reader.onload = () => {  
      let csvData = reader.result;  
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  

      let headersRow = this.getHeaderArray(csvRecordsArray);  

      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  

      console.log(this.records);
    }; 
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let currentRecord = (<string>csvRecordsArray[i]).split(',');  
      if (currentRecord.length == headerLength) {  
        csvArr.push(parseFloat(currentRecord[0].trim()));  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

}

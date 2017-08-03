import { KeyValuePair } from './../../models/keyvaluepair';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers:[
    VehicleService
  ]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  query:any = {};
  columns = [
    {title:'Id'},
    {title:'Make', key:'make', isSortable:true},
    {title:'Model', key:'model', isSortable:true},
    {title:'Contact Name', key:'contactName', isSortable:true}
  ];
  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.populateVehicles();
  }

  onFilterChange(){
    this.populateVehicles();
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query).subscribe(vehicles => this.vehicles = vehicles);
  }
  resetFilter(){
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName){
    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending;
    } else{
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;  
    }
    this.populateVehicles();
  }
}

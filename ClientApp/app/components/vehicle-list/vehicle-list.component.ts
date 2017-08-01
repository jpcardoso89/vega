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
  filter:any = {};
  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.populateVehicles();
  }

  onFilterChange(){
    this.populateVehicles();
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.filter).subscribe(vehicles => this.vehicles = vehicles);
  }
  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }

}

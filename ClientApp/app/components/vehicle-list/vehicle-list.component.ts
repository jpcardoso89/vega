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
    this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
  }

  onFilterChange(){
    let vehiclesFiltered = this.allVehicles;
      
    if(this.filter.makeId)
      vehiclesFiltered = vehiclesFiltered.filter(v => v.make.id == this.filter.makeId);

    if(this.filter.modelId){
      vehiclesFiltered = vehiclesFiltered.filter(v => v.model.id == this.filter.modelId);

    this.vehicles = vehiclesFiltered;
    }
  }

}

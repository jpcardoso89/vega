import * as _ from 'underscore';
import { Vehicle } from './../../models/vehicle';
import { SaveVehicle } from './../../models/savevehicle';
import { FetchDataComponent } from './../fetchdata/fetchdata.component';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit} from '@angular/core';
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers:[
    VehicleService
  ]
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: SaveVehicle = {
    id:0,
    makeId:0,
    modelId:0,
    isRegistered:null,
    features: [],
    contact:{
      name:'',
      phone:'',
      email:''
    }
  };
  features: any[];

  constructor(
    private router:Router, 
    private route: ActivatedRoute, 
    private vehicleService:VehicleService,
    private toastyService: ToastyService) { 

      route.params.subscribe(p =>{
        if(+p["id"])
          this.vehicle.id = +p["id"];
      });

    }

  ngOnInit() {

    let source = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if(this.vehicle.id)
      source.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(source).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if(this.vehicle.id){
        this.setVehicle(data[2]);
        this.populateModels();
      }
        
    }, err =>{
      if(err.status == 404)
        this.router.navigate(['/home']);
    });
    
  }

  onMakeChange(){
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels(){
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked)
      this.vehicle.features.push(featureId);
    else{
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  private setVehicle(v:Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features,'id');
  }

  submit(){
    if(this.vehicle.id){
      this.vehicleService.update(this.vehicle).subscribe(()=>{
        this.toastyService.success({
          title:'Sucess',
          msg: 'Vehicle updated with success!',
          theme:'bootstrap',
          showClose:true,
          timeout:5000
        });
      });
    } else {
      this.vehicleService.create(this.vehicle)
        .subscribe(()=>{
          this.toastyService.success({
            title:'Sucess',
            msg: 'Vehicle create with success!',
            theme:'bootstrap',
            showClose:true,
            timeout:5000
          });
        }); 
    }                       
  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/home"]);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistanceService } from 'src/app/shared/services/distance.service';
import { Planet } from '../shared/models/planet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  distanceFound=false;
  minDistance:number;
  minPathPlanets:any=[];
  sourcePlanet:string;
  destinantionPlanet:string;
  planets:any=[];
  planetForm: FormGroup;
  
  constructor(private distanceService:DistanceService, private frmB: FormBuilder,private router:Router) { }
  
  ngOnInit(): void {
    this.initPlanetForm();
    this.getPlanets();
  }

  initPlanetForm(){
    this.planetForm = this.frmB.group({
      cFromPlanet: ['A',Validators.required],
      cToPlanet: ['',Validators.required]
    }
    );
  }
  get fc() { return this.planetForm.controls; }

  onSubmit(){
    if(!this.planetForm.valid){
       this.distanceFound=false;
       return;
    }
    this.distanceService.calcMinimumDistance(this.planetForm.get('cFromPlanet').value,this.planetForm.get('cToPlanet').value).subscribe(    
      data => {
        this.distanceFound=true;
        this.minDistance=data;
        this.sourcePlanet=this.planetForm.get('cFromPlanet').value;
        this.destinantionPlanet=this.planetForm.get('cToPlanet').value;
      },
      error => {
        console.log(error);
      }
    );
    this.distanceService.findMinimumPath(this.planetForm.get('cFromPlanet').value,this.planetForm.get('cToPlanet').value).subscribe(    
      data => {
        this.distanceFound=true;
        this.minPathPlanets=data;
        this.sourcePlanet=this.planetForm.get('cFromPlanet').value;
        this.destinantionPlanet=this.planetForm.get('cToPlanet').value;
      },
      error => {
        console.log(error);
      }
    );
  }

  onReset(){
    this.planetForm.get('cToPlanet').setValue(null);
    this.distanceFound=false;
    this.initPlanetForm();
  }
  
  getPlanets(){
    this.distanceService.getPlanets().subscribe(
      data =>{
        this.planets = data
      },
      error=>{
        console.log(error);
      } );
  }
}

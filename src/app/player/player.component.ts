import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../shared/player.service';
import {NgForm} from '@angular/forms';
import {Player} from '../shared/player.model';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers:[PlayerService]
})
export class PlayerComponent implements OnInit {

  constructor(public PlayerService: PlayerService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshPlayerList();
  }

resetForm(form?:NgForm){
  if(form)
    form.reset();
  this.PlayerService.selectedPlayer={
    _id:"",
    name:"",
    joiningDate:"",
    birthDate:"",
    score:""
  }
}
onSubmit(form){
  if(form.value._id==""){

  this.PlayerService.postPlayer(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshPlayerList();
    alert('saved player');
  });
  
}
else{
  this.PlayerService.putPlayer(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshPlayerList();
    alert('updated player');
  });
}

}

refreshPlayerList(){
  this.PlayerService.getPlayerList().subscribe((res)=>{
    this.PlayerService.players=res as Player[];
  });
}
onEdit(ply:Player){
  this.PlayerService.selectedPlayer=ply; 
}

}

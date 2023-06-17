import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: any;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  updatePlayer(): void {
    this.playerService.updatePlayer(this.player._id, this.player)
      .subscribe(() => this.goBack());
  }

  deletePlayer(): void {
    this.playerService.deletePlayer(this.player._id)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

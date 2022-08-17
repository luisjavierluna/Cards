import { Component, OnInit } from '@angular/core';
import { CardsService } from './services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    this.cardsService.getAllCards()
    .subscribe(
      response => console.log(response)
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Card } from './models/Card';
import { CardsService } from './services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    this.cardsService.getAllCards()
    .subscribe(
      response => this.cards = response
    )
  }

  onSubmit(){
    if (this.card.id == '') {
      this.addCard();
    }else{
      this.updateCard(this.card);
    }
  }

  addCard(){
    this.cardsService.addCard(this.card)
    .subscribe(
      response => {
        this.getAllCards();
        this.card = {
          id: '',
          cardHolderName: '',
          cardNumber: '',
          expiryMonth: '',
          expiryYear: '',
          cvc: ''
        }
      }
    )
  }

  deleteCard(id: string){
    this.cardsService.deleteCard(id)
    .subscribe(
      response =>{
        this.getAllCards();
      }
    )
  }

  populateCard(card: Card){
    this.card = card;
  }

  updateCard(card: Card){
    this.cardsService.updateCard(card)
    .subscribe(
      response =>{
        this.getAllCards();
      }
    )
  }
}

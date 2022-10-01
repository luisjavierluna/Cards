import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private cardsService: CardsService, private formBuilder: FormBuilder) { }

  form: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.getAllCards();
    
    this.form = this.formBuilder.group({
      cardHolderName: ['', {validators: [Validators.required]}],
      cardNumber: ['', {validators: [Validators.required]}],
      expiryMonth: ['', {validators: [Validators.required]}],
      expiryYear: ['', {validators: [Validators.required]}],
      cvc: ['', {validators: [Validators.required]}],
    })
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
    this.card = {
      id: '',
      cardHolderName: this.form.value.cardHolderName,
      cardNumber: this.form.value.cardNumber,
      expiryMonth: this.form.value.expiryMonth,
      expiryYear: this.form.value.expiryYear,
      cvc: this.form.value.cvc,
    }
    
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
}

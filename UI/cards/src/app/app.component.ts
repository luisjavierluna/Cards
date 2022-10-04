import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private cardsService: CardsService, 
    private formBuilder: FormBuilder, 
    private cdRef: ChangeDetectorRef) { }

  form: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.getAllCards();

    this.form = this.formBuilder.group({
      cardHolderName: ['',
        [
          Validators.required
        ]
      ],
      cardNumber: ['',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]
      ],
      expiryMonth: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      expiryYear: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
        ]
      ],
      cvc: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ]
      ],
    })
  }

  getAllCards() {
    this.cardsService.getAllCards()
      .subscribe(
        response => this.cards = response
      )
  }

  onSubmit() {
    if (this.card.id == '') {
      this.addCard();
    } else {
      this.updateCard(this.card);
    }
  }

  addCard() {
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
        this.reloadCurrentPage()
      }
    )
  }

  deleteCard(id: string) {
    this.cardsService.deleteCard(id)
      .subscribe(
        response => {
          this.getAllCards();
        }
      )
  }

  populateCard(card: Card) {
    this.card = card;
    this.cdRef.detectChanges();
  }

  updateCard(card: Card) {
    this.cardsService.updateCard(card)
      .subscribe(
        response => {
          this.reloadCurrentPage()
        }
      )
  }

  // Comment the following methods when tests the same ones but in backend side
  getFieldNameError() {
    var cardHolderName = this.form.get('cardHolderName')

    if (cardHolderName?.hasError('required') && cardHolderName?.touched) {
      return '- The field Card Holder Name is required'
    }

    return '';
  }

  getFieldNumberError() {
    var cardNumber = this.form.get('cardNumber')

    if (cardNumber?.touched) {
      if (cardNumber?.hasError('required')) {
        return '- The field Card Number is required'
      }
      else if (cardNumber?.hasError('minlength') || cardNumber?.hasError('maxlength')) {
        return '- The field Card Number must have 16 characteres'
      }
    }

    return ''
  }

  getFieldMonthError() {
    var expiryMonth = this.form.get('expiryMonth')

    if (expiryMonth?.touched) {
      if (expiryMonth?.hasError('required')) {
        return '- The field Expiry Month is required'
      }
      else if (expiryMonth?.hasError('min') || expiryMonth?.hasError('max')) {
        return '- The value of the field Expiry Month must be between 1 and 12'
      }
      else if (expiryMonth?.hasError('minlength') || expiryMonth?.hasError('maxlength')) {
        return '- The field Expiry Month must be between 1 and 2 characteres'
      }
    }

    return ''
  }

  getFieldYearError() {
    var expiryYear = this.form.get('expiryYear')

    if (expiryYear?.touched) {
      if (expiryYear?.hasError('required')) {
        return '- The field Expiry Year is required'
      }
      else if (expiryYear?.hasError('minlength') || expiryYear?.hasError('maxlength')) {
        return '- The field Expiry Year must have 2 characteres'
      }
    }

    return ''
  }

  getFieldCVCError() {
    var cvc = this.form.get('cvc')

    if (cvc?.touched) {
      if (cvc?.hasError('required')) {
        return '- The field CVC is required'
      }
      else if (cvc?.hasError('minlength') || cvc?.hasError('maxlength')) {
        return '- The field CVC must have 3 characteres'
      }
    }

    return ''
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}

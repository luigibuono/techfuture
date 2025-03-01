<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  scrollToTop():void {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
}
=======
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  scrollToTop():void {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
}
>>>>>>> 58de0d18de0ed33f02ffc7b8635f7c580812dc70

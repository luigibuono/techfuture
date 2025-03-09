import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items = [
    { id: 1, imageUrl: 'path-to-image-1.jpg', title: 'Title 1', description: 'Description 1' },
    { id: 2, imageUrl: 'path-to-image-2.jpg', title: 'Title 2', description: 'Description 2' },
    // Add more items as needed
  ];
  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex = 0;
  interval: any;
  @ViewChild('cardContainer') cardContainer!: ElementRef; // Riferimento al container delle card
  @ViewChild('cardContainer2') cardContainer2!: ElementRef;
  @ViewChild('cardContainerFocus') cardContainerFocus!: ElementRef;
  @ViewChild('cardContainerPrimoPiano') cardContainerPrimoPiano!: ElementRef;

  cards = [
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 1', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 2', title: 'Titolo 2', description: 'Descrizione breve 2' },
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 1', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 2', title: 'Titolo 2', description: 'Descrizione breve 2' },
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 1', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 2', title: 'Titolo 2', description: 'Descrizione breve 2' },
    // Aggiungi altre card...

  ];

  cards2 = [
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 1', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 2', title: 'Titolo 2', description: 'Descrizione breve 2' },
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 1', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 4', title: 'Titolo 2', description: 'Descrizione breve 2' },
    { imageUrl: 'path-to-image1.jpg', alt: 'Image 5', title: 'Titolo 1', description: 'Descrizione breve 1' },
    { imageUrl: 'path-to-image2.jpg', alt: 'Image 6', title: 'Titolo 2', description: 'Descrizione breve 2' },
    // Aggiungi altre card...

  ];

  constructor(private newsService: NewsService) {}

  news: any[] = [];
  news2: any[] = [];

  firstBlockNews: any[] = [];  // I primi 6 articoli
  secondBlockNews: any[] = []; // I successivi 6 articoli
  filteredNews = this.news.filter(article => article.author === 'Redazione Storica');
  selectedAuthor: string = 'Redazione Storica';
  isMouseDown = false;
  startX = 0;
  scrollLeft = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.cardContainerFocus.nativeElement.contains(event.target)) {
      this.isMouseDown = true;
      this.startX = event.pageX - this.cardContainerFocus.nativeElement.offsetLeft;
      this.scrollLeft = this.cardContainerFocus.nativeElement.scrollLeft;
    } else if (this.cardContainerPrimoPiano.nativeElement.contains(event.target)) {
      this.isMouseDown = true;
      this.startX = event.pageX - this.cardContainerPrimoPiano.nativeElement.offsetLeft;
      this.scrollLeft = this.cardContainerPrimoPiano.nativeElement.scrollLeft;
    } else if (this.cardContainer2.nativeElement.contains(event.target)) {
      this.isMouseDown = true;
      this.startX = event.pageX - this.cardContainer2.nativeElement.offsetLeft;
      this.scrollLeft = this.cardContainer2.nativeElement.scrollLeft;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;

    let walk;
    if (this.cardContainerFocus.nativeElement.contains(event.target)) {
      const x = event.pageX - this.cardContainerFocus.nativeElement.offsetLeft;
      walk = (x - this.startX) * 2; // La velocità del trascinamento (puoi modificarla)
      this.cardContainerFocus.nativeElement.scrollLeft = this.scrollLeft - walk;
    } else if (this.cardContainerPrimoPiano.nativeElement.contains(event.target)) {
      const x = event.pageX - this.cardContainerPrimoPiano.nativeElement.offsetLeft;
      walk = (x - this.startX) * 2;
      this.cardContainerPrimoPiano.nativeElement.scrollLeft = this.scrollLeft - walk;
    }else if (this.cardContainer2.nativeElement.contains(event.target)) {
      const x = event.pageX - this.cardContainer2.nativeElement.offsetLeft;
      walk = (x - this.startX) * 2;
      this.cardContainer2.nativeElement.scrollLeft = this.scrollLeft - walk;
    }
  }

  articlesPerPage = 6; // Numero iniziale di articoli mostrati

  loadMore() {
    this.articlesPerPage += 6; // Aggiunge altri 6 articoli alla lista
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.isMouseDown = false;
  }

  ngOnInit() {
    this.getGNews();
    this.getNews();
    this.startInterval();
    this.applyDefaultFilter();
  }

  getGNews(): void {
    this.newsService.getGNews()
      .subscribe(data => {
        this.news2 = data.articles;
      });
  }

  getNews(): void {
    this.newsService.getNews()
      .subscribe(data => {
        this.news = data.articles;
        this.applyDefaultFilter();
      });
  }

  applyDefaultFilter() {
    // Applica il filtro dopo che i dati sono stati caricati
    this.filterByAuthor('Redazione Storica2');
  }

  filterByAuthor(author: string): void {
    // Filtra gli articoli in base all'autore
    this.filteredNews = this.news.filter(article => article.author === author);
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia slide ogni secondo
  }

  nextSlide() {
    const carousel = this.carousel.nativeElement;
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    slides[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % totalSlides;
    slides[this.currentIndex].classList.add('active');
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  scrollCards(direction: 'left' | 'right'): void {
    const container = this.cardContainer.nativeElement;
    const scrollStep = 200; // Regola la quantità di scorrimento

    if (direction === 'left') {
      container.scrollLeft -= scrollStep; // Scorri a sinistra
    } else {
      container.scrollLeft += scrollStep; // Scorri a destra
    }
  }

  scrollCards2(direction: 'left' | 'right'): void {
    const container2 = this.cardContainer2.nativeElement;
    const scrollStep2 = 200; // Regola la quantità di scorrimento

    if (direction === 'left') {
      container2.scrollLeft -= scrollStep2; // Scorri a sinistra
    } else {
      container2.scrollLeft += scrollStep2; // Scorri a destra
    }
  }




}

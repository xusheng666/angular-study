import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.actions';
import { async, Observable } from 'rxjs';
import { AppState } from '../app.state';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, StoreDevtoolsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  
  books$: Observable<Book[]>;


  constructor(private store: Store<AppState>){
    this.books$ = store.select('books');
    console.log("constructor books:"+this.books$)
  }

  addBook(id: string, title: string, author: string){
    console.log("add book with id="+id)
    this.store.dispatch(AddBook({id, title, author}));
  }

  removeBook(bookId: string){
    this.store.dispatch(RemoveBook({bookId}));
  }
}

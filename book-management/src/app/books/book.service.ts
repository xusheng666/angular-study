import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  addBook(book: Book): Observable<Book>{
    // const err = new Error('some error')
    // return throwError(()=> err)
    return of(book);
  }
}

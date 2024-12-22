import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as bookActions from './book.actions';
import { BookService } from './book.service';

@Injectable()
export class BookEffects {
    

    books$ = createEffect(() => (
        this.actions$.pipe(
            ofType(bookActions.AddBook),
            mergeMap((action) => 
                this.bookService.addBook(action).pipe(
                    map(book => bookActions.AddBookSuccess(book)),
                    catchError((error) => of(bookActions.AddBookFailure({error})))
                )
            )
        )
    )); 

    constructor(private actions$: Actions, private bookService: BookService) {}
}
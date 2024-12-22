import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexModule } from '@angular/flex-layout';
import { CartService } from '../../cart/cart.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, FlexModule, MatFormField, MatInput, MatSelect, MatOption],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string="";
  
  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
     this.productService.getProducts().subscribe(data =>{
        this.products = data;
        this.filteredProducts = data;
     })  
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product added to cart!","",{
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
  }

  sortProducts(sortValue: string){
    this.sortOrder = sortValue;

    if(this.sortOrder === "priceLowHigh"){
      this.filteredProducts.sort((a,b) => a.price - b.price)
    } else if(this.sortOrder === "priceHighLow"){
      this.filteredProducts.sort((a,b) => b.price - a.price)
    }
  }
}

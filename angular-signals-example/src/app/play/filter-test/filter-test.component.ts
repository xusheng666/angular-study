import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-filter-test',
  imports: [CommonModule],
  templateUrl: './filter-test.component.html',
  styleUrl: './filter-test.component.css'
})
export class FilterTestComponent {

  products = signal([
    {id:1, name: "Milk", price: 2.9},
    {id:1, name: "Bread", price: 6.35},
    {id:1, name: "Tomatoes", price: 3.94}
  ])

  filterName = signal("");

  filteredProducts = computed(() => {
    return this.products().filter(
      product => product.name.toLowerCase()
      .includes(this.filterName().toLowerCase())
    )
  });

  changeFilter(event: Event) {
    let newFilterName = (event.target as HTMLInputElement).value;
    this.filterName.set(newFilterName);
  }
}

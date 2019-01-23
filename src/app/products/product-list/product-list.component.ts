import { Product } from '../product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productSubs: Subscription;
  isAllowed = false;
  products: Product[] = [];
  userId: string;
  constructor(public productService: ProductsService) { }
  ngOnInit() {
    this.productService.getProducts();
    this.productSubs = this.productService.getProductUpdates()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
  ngOnDestroy() {
    this.productSubs.unsubscribe();
  }
}

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from './../product.model';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product;
  productId: string;
  errors: string[] = [];
  canBeDeleted = false;
  constructor(public productService: ProductsService, private route: ActivatedRoute, private router: Router) { }
  onDelete(productId: string) {
    this.productService.deleteProduct(productId);
    this.router.navigate(['/products']);

  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.productId = paramMap.get('id');
        this.productService.getProduct(this.productId)
          .subscribe((product: Product) => {
            this.product = product;
            if (this.product.quantity === 0) {
              this.canBeDeleted = true;
            }
          });
      }
    });
  }
}

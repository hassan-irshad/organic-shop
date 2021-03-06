import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../categories.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private categoryService: CategoryService, 
    private productService: ProductService) {
      this.categories$ = categoryService.getCategories();
   
      let id = this.route.snapshot.paramMap.get('id');
      if (id) this.productService.get(id).subscribe(p => this.product = p);

      
    }

   save (product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
    
  }

  ngOnInit() {
  }

}

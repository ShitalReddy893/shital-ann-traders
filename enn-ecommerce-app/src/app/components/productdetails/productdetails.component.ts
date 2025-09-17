import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})

export class ProductdetailsComponent implements OnInit {
  
  product?: Product;

  constructor(private route: ActivatedRoute, 
              private productService: ProductService){

              }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error('Failed to load product details:', err)
    });
  }
}


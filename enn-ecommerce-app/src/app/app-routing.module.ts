import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  }
  ,
  {
    path: 'seller-home',
    component: SellerHomeComponent,
  },
  { path: 'product/:id', 
    component: ProductdetailsComponent 
  },
  { path: 'cart', 
    component: CartComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

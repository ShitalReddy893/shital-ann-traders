import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },  // default route
  // { path: 'login', component: LoginComponent },


  // export const routes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  // },
  // {
  //   path: 'product',
  //   loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  // },
  // {
  //   path: 'order',
  //   loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  // },
  // { path: '', redirectTo: '/user/profile', pathMatch: 'full' } 

  // admincomponent.ts
  // { path: '',
  //     loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  //   }


  // {
  //       path: '',
  //       component: AppLayout,
  //       children: [
  //           { path: '', component: Dashboard },
  //           { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
  //           { path: 'documentation', component: Documentation },
  //           { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
  //       ]
  //   },
  //   { path: 'landing', component: Landing },
  //   { path: 'notfound', component: Notfound },
  //   { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  //   { path: '**', redirectTo: '/notfound' }


  //  { path: '', redirectTo: 'login', pathMatch: 'full' },  // default route
  // { path: 'login', component: LoginComponent },
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

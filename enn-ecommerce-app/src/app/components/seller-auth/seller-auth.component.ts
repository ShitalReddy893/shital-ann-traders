import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  // constructor(private sellerService: SellerService,
  //             private router: Router) { }
              
  ngOnInit(): void {

  }
  
  signUp(data: object): void {
    // console.warn(data);
    // this.sellerService.userSignUp(data).subscribe((result) => {
    //   if (!result) { 
    //     this.router.navigate(['seller-home'])
    //   }
        
    // });
  }

}

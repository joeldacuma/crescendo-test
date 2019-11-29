import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipeDetails: any;
  public recipeImage: any;
  constructor(public route: ActivatedRoute,
              public location: Location,
              public router: Router,
              public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.recipeDetails = this.location.getState();
    this.recipeImage = environment.api + this.recipeDetails.images.full;
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import { RecipeModalComponent } from '../../widgets/recipe/recipe.component';
import { SpecialComponent } from '../../widgets/special/special.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipeDetails: any;
  public ingredients: any;
  public recipeImage: any;
  public isEdit: boolean;

  constructor(public route: ActivatedRoute,
              public location: Location,
              public router: Router,
              public domSanitizer: DomSanitizer,
              public dialog: MatDialog,
              public apiService: ApiService) { }

  ngOnInit() {
    this.isEdit = true;
    this.loadRecipe();
    this.recipeImage = environment.api + this.recipeDetails.images.full;
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

  loadRecipe() {
    if (localStorage.getItem('recipe-details')) {
      this.recipeDetails = JSON.parse(localStorage.getItem('recipe-details'));
    } else {
      this.recipeDetails = this.location.getState();
      localStorage.setItem('recipe-details', JSON.stringify(this.recipeDetails));
    }

    this.getSpecialByIngredientId();
  }

  getSpecialByIngredientId() {
    const ingredients = [];

    this.recipeDetails.ingredients.map((element: any) => {

      this.apiService.getSpecialByIngredientId(element.uuid).subscribe((value: any) => {
        if (value.length > 0) {
          Object.assign(element, {special: value[0]});
        }

        ingredients.push(element);
      });
    });

    this.ingredients = ingredients;
  }

  openEditRecipe(event) {
    Object.assign(this.recipeDetails, { isEdit: true });
    const dialogRef = this.dialog.open(RecipeModalComponent, {
      width: '200em',
      height: '50em',
      data: this.recipeDetails
    });

    dialogRef.afterClosed().subscribe(() => {
      this.gotoHome();
    });
  }

  openSpecial(special) {
    const dialogRef = this.dialog.open(SpecialComponent, {
      width: '20em',
      height: '15em',
      data: special
    });
  }
}

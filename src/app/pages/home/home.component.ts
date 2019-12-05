import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeModalComponent } from '../../widgets/recipe/recipe.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public recipes: any;
  public isEdit: boolean;

  constructor(private dialog: MatDialog,
              private router: Router,
              private apiService: ApiService,
              private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isEdit = false;
    this.getAllRecipes();

    localStorage.removeItem('recipe-details');
  }

  getAllRecipes() {
    this.apiService.getAllRecipes().subscribe((lists: any) => {
      const newList = [];
      lists.forEach(element => {
        if (element.images) {
          Object.assign(element, {url: environment.api + element.images.medium});
        }
        newList.push(element);
      });
      this.recipes = newList;
    });
  }

  getImageUrl(url) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  openAddRecipe() {
      const dialogRef = this.dialog.open(RecipeModalComponent, {
        width: '200em',
        height: '50em',
        data: {
          isEdit: false
        }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getAllRecipes();
      });
  }

  gotoRecipeDetails(recipe) {
    this.router.navigateByUrl('/recipe', {state: recipe});
  }
}

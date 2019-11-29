import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeComponent } from '../../widgets/recipe/recipe.component';
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

  constructor(private dialog: MatDialog,
              private router: Router,
              private apiService: ApiService,
              private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.apiService.getAllRecipes().subscribe((lists: any) => {
      const newList = [];
      lists.forEach(element => {
         Object.assign(element, {url: environment.api + element.images.medium});
         newList.push(element);
      });
      this.recipes = newList;
    });
  }

  getImageUrl(url) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  openCreateTask(event) {
    if (event) {
      const dialogRef = this.dialog.open(RecipeComponent, {
        width: '200em',
        height: '50em',
        data: {}
      });
    }
  }

  openEditTask(event) {
    if (event) {
      const dialogRef = this.dialog.open(RecipeComponent, {
        width: '400px',
        data: {  }
      });
    }
  }

  gotoRecipeDetails(recipe) {
    this.router.navigateByUrl('/recipe', {state: recipe});
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { RecipeModel, IngredientModel, DirectionModel } from '../../models/recipe-form.model';
import { Recipe } from '../../models/recipe.model';
import * as uuidv4 from 'uuid/v4';
import * as moment from 'moment';
import { Dir } from '@angular/cdk/bidi';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipeForm: FormGroup;
  public ingredientForm: FormGroup;
  public directionForm: FormGroup;
  public ingredients = [];
  public directions = [];

  public isEdit: boolean;

  constructor(public dialogRef: MatDialogRef<RecipeComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public apiService: ApiService) {
                this.recipeForm = this.formBuilder.group(RecipeModel);
              }

  ngOnInit() {
    this.ingredients.push(this.formBuilder.group(IngredientModel));
    this.directions.push(this.formBuilder.group(DirectionModel));
  }

  close() {
    this.dialogRef.close();
  }


  submit() {
    const body = this.recipeForm.value;
    Object.assign(body, { postDate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toString() });

    Recipe[`uuid`] = uuidv4();
    Recipe[`title`] = body.recipeName;
    Recipe[`description`] = body.description;
    Recipe[`servings`] = body.servings;
    Recipe[`cookTime`] = body.cookTime;
    Recipe[ `postDate`] = body.postDate;

    this.apiService.addRecipe(Recipe).subscribe(value => {
      console.log(value);
    });
  }

  addIngredients() {
    this.ingredientForm = this.formBuilder.group(IngredientModel);
    this.ingredients.push(this.ingredientForm);
  }

  addDirections() {
    this.directionForm = this.formBuilder.group(this.formBuilder.group(DirectionModel));
    this.directions.push(this.directionForm);
  }

  update() {
    if (this.recipeForm.valid) {
      const body = this.recipeForm.value;
      const uid = this.data.value.uid;

      this.close();
    }
  }
}

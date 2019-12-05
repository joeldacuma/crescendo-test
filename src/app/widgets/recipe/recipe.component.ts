import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { RecipeModel, IngredientModel, DirectionModel } from '../../models/recipe-form.model';
import { Recipe } from '../../models/recipe.model';


import * as uuidv4 from 'uuid/v4';
import * as moment from 'moment';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeModalComponent implements OnInit {
  public recipeForm: FormGroup;
  public ingredientForm: FormGroup;
  public directionForm: FormGroup;
  public ingredients = [];
  public directions = [];

  public isEdit: boolean;

  constructor(public dialogRef: MatDialogRef<RecipeModalComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public apiService: ApiService) {
                this.recipeForm = this.formBuilder.group(RecipeModel);
              }

  ngOnInit() {
    this.isEdit = this.data.isEdit;

    if (this.isEdit) {
      this.recipeForm.patchValue({
        recipeName: this.data.title,
        description: this.data.description,
        servings: this.data.servings,
        cookTime: this.data.cookTime
      });

      const arrDirections = [];
      const arrIngredients = [];

      this.data.directions.map(element => {
        this.directionForm = this.formBuilder.group(DirectionModel);
        this.directionForm.setValue(element);
        arrDirections.push(this.directionForm);
      });

      this.data.ingredients.map (element => {
        this.ingredientForm = this.formBuilder.group(IngredientModel);
        this.ingredientForm.setValue({ name: element.name, measurement: element.measurement, amount: element.amount });
        arrIngredients.push(this.ingredientForm);
      });

      this.directions = arrDirections;
      this.ingredients = arrIngredients;

    } else {
      this.ingredients.push(this.formBuilder.group(IngredientModel));
      this.directions.push(this.formBuilder.group(DirectionModel));
    }
  }

  close() {
    this.dialogRef.close();
  }


  submit() {
    const body = this.recipeForm.value;
    Object.assign(body, { postDate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toString() });

    let directions = [];
    let ingredients = [];

    directions = this.directions.map(arr => {
      if (arr.value.optional) {
        arr.value.optional = true;
      } else {
        arr.value.optional = false;
      }
      return arr.value;
    });

    ingredients = this.ingredients.map(arr => arr.value);

    Recipe[`uuid`] = uuidv4();
    Recipe[`title`] = body.recipeName;
    Recipe[`description`] = body.description;
    Recipe[`servings`] = body.servings;
    Recipe[`cookTime`] = body.cookTime;
    Recipe[ `postDate`] = body.postDate;
    Recipe[`ingredients`] = ingredients;
    Recipe[`directions`] = directions;
    // Recipe[`images`] = '/img/queso_brat_scramble--m.jpg';

    this.apiService.addRecipe(Recipe).subscribe(value => {
       if (value) {
         this.close();
       }
     });
  }

  update() {
    const body = this.recipeForm.value;
    Object.assign(body, { editDate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toString() });

    let directions = [];
    let ingredients = [];

    directions = this.directions.map(arr => {
      if (arr.value.optional) {
        arr.value.optional = true;
      } else {
        arr.value.optional = false;
      }
      return arr.value;
    });

    ingredients = this.ingredients.map(arr => arr.value );

    Recipe[`title`] = body.recipeName;
    Recipe[`description`] = body.description;
    Recipe[`servings`] = body.servings;
    Recipe[`cookTime`] = body.cookTime;
    Recipe[ `editDate`] = body.editDate;
    Recipe[`ingredients`] = ingredients;
    Recipe[`directions`] = directions;

    this.apiService.updateRecipe(Recipe, this.data.uuid).subscribe(value => {
       if (value) {
         this.close();
       }
     });
  }

  addIngredients() {
    this.ingredientForm = this.formBuilder.group(IngredientModel);
    this.ingredients.push(this.ingredientForm);
  }

  addDirections() {
    this.directionForm = this.formBuilder.group(DirectionModel);
    this.directions.push(this.directionForm);
  }

}

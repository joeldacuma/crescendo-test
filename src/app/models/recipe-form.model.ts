import { Validators } from '@angular/forms';

export const RecipeModel = {
  recipeName: ['', Validators.required],
  description: ['', Validators.required],
  servings: ['', Validators.required],
  cookTime: ['', Validators.required],
};

export const IngredientModel = {
  name: ['', Validators.required],
  amount: ['', Validators.required],
  measurement: ['', Validators.required],
};

export const DirectionModel = {
  instructions: ['', Validators.required],
  optional: ['', Validators.required]
};

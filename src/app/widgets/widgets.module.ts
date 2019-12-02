import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeModalComponent } from './recipe/recipe.component';

import { MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatCheckboxModule,
         MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialComponent } from './special/special.component';

@NgModule({
  declarations: [
    RecipeModalComponent,
    SpecialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  entryComponents: [
    RecipeModalComponent,
    SpecialComponent
  ],
  exports: [
    RecipeModalComponent,
    SpecialComponent
  ]
})
export class WidgetsModule { }

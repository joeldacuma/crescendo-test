import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../global/global.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { HomeComponent } from './home/home.component';

import { MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatCheckboxModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatDialogModule,
         MatTooltipModule,
         MatGridListModule } from '@angular/material';
import { RecipeComponent } from './recipe/recipe.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    WidgetsModule,
    FlexLayoutModule,
    MatGridListModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    RecipeComponent
  ]
})
export class PagesModule { }

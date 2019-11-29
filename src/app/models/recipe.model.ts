export const Recipe = {
 uuid: Number,
 title: String,
 images: {
   full: String,
   medium: String,
   small: String
 },
 description: String,
 servings: Number,
 prepTime: Number,
 cookTime: Number,
 postDate: String,
 editDate: String,
 ingredients: [],
 directions: []
};

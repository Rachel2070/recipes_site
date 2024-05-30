export class Recipe{
    recipeId !: string
    recipeName !: string
    categoryId !: string
    recipeDurationM !: number
    recipeLevel !: number
    addRecipeTime !: Date
    recipeIngredients  !: string []
    recipePreparation !:string[]
    userId !:string
    recipeImage !:string
}
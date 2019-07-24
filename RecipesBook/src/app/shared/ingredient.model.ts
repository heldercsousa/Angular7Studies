export class Ingredient {
    /*public name: string;
    public amount: number;
    
    constructor(name: string, amount: number) {
        this.name=name;
        this.amount=amount;
    }
    below is A SHORTCUT TO ABOVE APPROACH
    BEHIND THE SCENES, below BUILDS THE SAME AS ABOVE
    */
   public id: number;
   public recipeId: number;
   
   constructor(public name: string, public amount:number) {} 
}
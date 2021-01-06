//Create variables here
var dog,happyDog;
var database;
var food,foodStock;
var foodS;
var lastFed;
function preload()
{
  //load images here
  dogImg= loadImage("images/Dog.png");
  happyDogImg= loadImage("images/happydog.png");
  

}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  foodObj= new Food();
  foodStock= database.ref("Food");
  foodStock.on("value",readStock);
  

  dog= createSprite(800,250,150,150);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime= database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed= data.val();
  //console.log(lastFed);
})

fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+ lastFed%12+"PM",350,30);
}else if(lastFed == 0){
  text("Last Feed: 12 AM",350,30);
}
else{
  text("Last Feed:"+lastFed+"AM",350,30);
}
  drawSprites();
  //add styles here
  
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


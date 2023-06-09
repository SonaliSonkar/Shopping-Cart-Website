let shop = document.getElementById("shop");

let shopItemsData = [{
    id: "ghsvkxnxa" ,
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing",
    img: "images/img-1.jpg"
},
{
    id: "vbncdfhnn" ,
    name: "Office Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing",
    img: "images/img-2.jpg"
},
{
    id: " cndsnkxsldxs" ,
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing",
    img: "images/img-3.jpg"
},
{
    id: "jsjxxsnxsx" ,
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing",
    img: "images/img-4.jpg"
},
];

let basket = JSON.parse(localStorage.getItem("data")) || [] ;

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
        let { id , name, pricee, desc, img} = x;
        let search = basket.find((x) => x.id === id) || [] 
    return `
    <div id=product-id-${id} class="item">
            <img width="220"src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-qunatity">
                    <h2> $ ${price} </h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <divnid=${id} class="qunatity">
                        ${search.item === undefined ? 0 :search.item}  
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

                    </div>
                </div>
            </div>
        </div>
    `;
  })
  .join(""));
};

generateShop();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if( search === undefined){
        basket.push({
            id:selectedItem.id,
            item: 1,
        });  
    } else {
        search.item += 1;
    }
 //   console.log(basket);
  update(selectedItem.id);
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if( search === undefined) return;
   else  if(search.item === 0) return;
    else {
        search.item -= 1 ;
    }

    localStorage.setItem("data" , JSON.stringify(basket));
    basket = basket.filter((x) => x.item !== 0);
    // console.log(basket);
    update(selectedItem.id); 
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
};

calculation();
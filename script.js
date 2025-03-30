import {increaseQuantityAndPrice,decreaseQuantityPrice,removeFromCart} from '/mony.js'


async function fetchData() {

   try{
    const response = await fetch('./data.php')
    if (!response.ok) {
        throw new Error('error')
    }

     const data = await response.json();
     let productItem = '';
    data.forEach((item)=>{

        productItem+=  
        ` <div class="cart-product"  >
            <div class="my-image-button">
                <img id="product-img-${item.id}" src="${item.image.desktop}" alt="">
                
                    <div class="button-add-to-cart1 js-button-add-to-cart1" data-product-name="${item.name}" id="first-${item.id}" data-product-id="${item.id}" data-product-price="${item.price}" data-product-thumb="${item.image.thumbnail}">
                        <img   src="/assets/images/icon-add-to-cart.svg" alt="">
                        <p>Add to Cart</p>
                    </div>
                    <div class="button-add-to-cart2" id="secund-${item.id}" data-product-id="${item.id}">
                        <img id="decrease${item.id}" src="/assets/images/icon-decrement-quantity.svg" alt="">
                        <p class="number-of-product" id="number-of-product-${item.id}">1</p>
                        <img class="increase" id="increase${item.id}" src="/assets/images/icon-increment-quantity.svg" alt="">
                    </div>
                
            </div>
            <p data-product-name="${item.name}" class="name-cake" >${item.name}</p>
            <p class="name-color-cake">${item.category}</p>
            <p class="price-cake">$${item.price.toFixed(2)}</p>
        </div>   
`

document.querySelector('.js-container').innerHTML =productItem
 
const containerBut = document.querySelectorAll('.button-add-to-cart1');
containerBut.forEach((button)=>{ 
      
    
    const productId = button.dataset.productId
    const productPrice = button.dataset.productPrice
    const productThumbnail = button.dataset.productThumb
    const productName = button.dataset.productName;
   
// updateOrderTotal()

      const button1 = document.getElementById(`first-${productId}`)
      const button2 = document.getElementById(`secund-${productId}`)
      const productImage = document.getElementById(`product-img-${productId}`)
    button.addEventListener('click',()=>{
          button1.style.display = 'none'
          button2.style.display = 'flex'
          productImage.style.border = '2px solid hsl(14, 86%, 42%)'
         document.querySelector('.js-cart-content').style.display = 'block'
        document.querySelector('.js-empty-cart').style.display='none'
        // get name of product
       

        // add the item  chosen by the customer to cart in the right 
        function addItemTocart(){
        let  arraycart= []

           const contentCart= `<div  id=cart-item-${productId}>
            <div class="name-product-price" >
            <div >
              <h4>${productName}</h4>
              <p><span class="quantity-product" id="quantity-product-${productId}">1x</span><span>@$${productPrice}</span><span class="price-total-product" id="price-total-product-${productId}">$${productPrice}</span></p>
            </div>
            <img class="remove-button" src="./assets/images/icon-remove-item.svg" alt="">
            </div>
            <hr>
            </div>
            `;
            arraycart.push(contentCart)
        arraycart.forEach((item)=>{
            document.querySelector('.container-product-price').innerHTML +=  item; 
            arraycart.push({
                productId :productId,
                quantity:0,
                price : parseFloat(productPrice),
                productPrice :parseFloat(productPrice)
            });

            document.getElementById(`increase${productId}`).addEventListener('click',()=>{
                increaseQuantityAndPrice(arraycart,productId)
                
                
        })
            document.getElementById(`decrease${productId}`).addEventListener('click',()=>{
                decreaseQuantityPrice(arraycart,productId)
            }) 
            
                    
        });
        }
        addItemTocart()

        // add the item  chosen by the customer to popup cart (confirmed)
        function addToPopupCart() {
            const arrayPopup=[]
                
            const itemPopup = `<div class="product-order">
                    <div class="product-selected">
                        <img src="${productThumbnail}" alt="">
                        <div class="order-name-with-price">
                            <h4>${productName}</h4>
                            <p><span class="quantity-color" id="quantity-popup-${productId}">1x</span><span id="popup-price">@$${productPrice}</span></p>
                        </div>
                    </div>
                    <h3 id="popup-product-total-${productId}">$5.50</h3>
                </div> <hr>`;

                arrayPopup.push(itemPopup)
                
            arrayPopup.forEach((element)=>{
                document.querySelector('.container-product-popup').innerHTML += element
            })
            
                
            document.querySelector(`#cart-item-${productId} .remove-button`).addEventListener('click',()=>{
                    removeFromCart(productId)
            })
        }


            addToPopupCart()

             
      }) 
        

})
    })

    }catch(error){
        console.error('error',error)
    };
   } 
    
   fetchData()

function openPopup() {
   document.getElementById('popup').style.display = "block";
   document.querySelector('.overlay').style.display ="block";
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}


document.getElementById('openpopup').addEventListener('click',()=>{
    openPopup()
})

document.getElementById('closepopup').addEventListener('click',()=>{
    closePopup() 
})

 
    export function increaseQuantityAndPrice(element,id){
        let itemInCart = element[1].quantity +=1;
        let proPrice = element[1].price
        let priceTotal = element[1].productPrice = (proPrice*itemInCart);
        document.getElementById(`number-of-product-${id}`).innerText = itemInCart
         document.getElementById(`quantity-product-${id}`).innerText = `${itemInCart}x`
         document.getElementById(`quantity-popup-${id}`).innerText = `${itemInCart}x`
         document.getElementById(`price-total-product-${id}`).innerText = `$${priceTotal.toFixed(2)}`;
         document.getElementById(`popup-product-total-${id}`).innerText = `$${priceTotal.toFixed(2)}`;
        updateOrderTotal() 
    }

    export function decreaseQuantityPrice(element,id){
        let itemInCart
        if (element[1].quantity>0){
             itemInCart = Math.max(element[1].quantity -=1,0);
             let proPrice = element[1].price
             let priceTotal = proPrice * itemInCart
             document.getElementById(`number-of-product-${id}`).innerText = itemInCart
             document.getElementById(`quantity-product-${id}`).innerText = `${itemInCart}x`
             document.getElementById(`quantity-popup-${id}`).innerText = `${itemInCart}x`
             document.getElementById(`price-total-product-${id}`).innerText = `$${priceTotal.toFixed(2)}`
             document.getElementById(`popup-product-total-${id}`).innerText = `$${priceTotal.toFixed(2)}`;
             updateOrderTotal()
        }else if (element[1].quantity==0) {
            removeAndChangesitt(id,element)
        }            
        }

        function removeAndChangesitt(productId,array){
            const button1 = document.getElementById(`first-${productId}`)
            button1.style.display = 'flex'
            const button2 = document.getElementById(`secund-${productId}`)
             button2.style.display = 'none';
             let cartItem= document.getElementById(`cart-item-${productId}`);
                if(cartItem){
            cartItem.remove();
            updateOrderTotal()}
            
        }

        
       
         updateOrderTotal()   

    export function updateOrderTotal() {
        let total = 0;
        document.querySelectorAll('.price-total-product').forEach((item)=>{
            total+=parseFloat(item.innerText.replace('$',''))
        })
        document.querySelector('.js-order-total').innerHTML = `$${total.toFixed(2)}`
         document.querySelector('.popup-total-price').innerHTML = `$${total.toFixed(2)}`
      }

    //   remove item from cart when clicking icone button remove 
      export function removeFromCart(productId) {
        let cartItem= document.getElementById(`cart-item-${productId}`);
        if(cartItem){
            cartItem.remove();
            updateOrderTotal()
            document.getElementById(`number-of-product-${productId}`).innerText =0 
             const button1 = document.getElementById(`first-${productId}`)
            button1.style.display = 'flex'
            const button2 = document.getElementById(`secund-${productId}`)
            button2.style.display = 'none';
        }
      }
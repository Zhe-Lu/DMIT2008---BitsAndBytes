import { ref,get } from 'firebase/database'
import { db } from './libs/firebase/firebaseConfig'
import { renderProduct } from './templates/product'

async function pageInit() {
    const productRef = ref(db, 'products/')
    const productSnapshot = await get(productRef)
    const productData = {...productSnapshot.val()}

    const products = Object.keys(productData).map(product => {
        return(productData[product])
    })

    products.forEach(product => {
        document.querySelector('.product-display').appendChild(renderProduct(product))
    });
}

window.addEventListener('load', function(e){
    pageInit()
})
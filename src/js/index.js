import { ref,get } from 'firebase/database'
import { db } from './libs/firebase/firebaseConfig'


async function pageInit() {

    const productRef = ref(db, 'products/')
    const productSnapshot = await get(productRef)
    const productData = {...productSnapshot.val()}

    const products = Object.keys(productData).map(product => {
        return(productData[product])
    })

    console.log(products);

}

pageInit()
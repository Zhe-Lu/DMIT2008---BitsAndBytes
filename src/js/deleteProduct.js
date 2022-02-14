import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, push, set, get}  from 'firebase/database'
import { db, storage } from './libs/firebase/firebaseConfig'

var productData;
var key;

async function pageInit(){
    // get Key from session storage
    key = await sessionStorage.getItem('key')

    // get product via key
    const productRef = databaseRef(db, 'products/'+ key)
    const productSnapshot = await get(productRef)
    productData = {...productSnapshot.val()}

    console.log(key)

    console.log(productData)

}

pageInit();
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, push, set, get}  from 'firebase/database'
import { db, storage } from './libs/firebase/firebaseConfig'

document.querySelector("#uploadImage").addEventListener("change", onImageSelected)
document.forms["editProductForm"].addEventListener("submit", saveChanges)

var productData;
var key;
pageInit();

async function pageInit(){
    // get Key from session storage
    key = await sessionStorage.getItem('key')

    // get product via key
    const productRef = databaseRef(db, 'products/'+ key)
    const productSnapshot = await get(productRef)
    productData = {...productSnapshot.val()}

    // load data in fields
    document.querySelector('#productTitle').value = productData.title;
    document.querySelector('#price').value = productData.price;
    document.querySelector('.image-display img').src = productData.image;
    document.querySelector('#sku').value = productData.sku;
    document.querySelector('#description').value = productData.description;
}

async function onImageSelected(e) {
    let file = e.target.files[0]
    document.querySelector(".image-display img").src = URL.createObjectURL(file);
    
    const imageRef = storageRef(storage, `products/${file.name}`);
    await uploadBytes(imageRef, file);
}

async function saveChanges(e) {
    e.preventDefault();

    let imageURL = productData.image;

    if (document.querySelector("#uploadImage").files[0] != undefined){
        const file = document.querySelector('#uploadImage').files[0];
        const imageRef = storageRef(storage, `products/${file.name}`);
        uploadBytes(imageRef, file);
        imageURL = await getDownloadURL(imageRef)
    }

    const dataRef = databaseRef( db, 'products/' + key)

    set(dataRef, {
        title: document.querySelector('#productTitle').value.trim(),
        price: document.querySelector('#price').value,
        image: imageURL,
        sku: document.querySelector('#sku').value.trim(),
        description: document.querySelector('#description').value.trim()
    })

    window.location = "index.html"
}
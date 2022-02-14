import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, push, set, get}  from 'firebase/database'
import { db, storage } from "./libs/firebase/firebaseConfig"

document.querySelector("#uploadImage").addEventListener("change", onImageSelected)
document.forms["newProductForm"].addEventListener("submit", addNewProduct)

function addNewProduct(e){
    e.preventDefault();
    uploadNewProduct();
}

async function uploadNewProduct(){
    const title= document.querySelector('#productTitle').value.trim();
    const price = document.querySelector('#price').value;
    const file = document.querySelector('#uploadImage').files[0];
    const sku = document.querySelector('#sku').value.trim();
    const desc = document.querySelector('#description').value.trim();

    const imageRef = storageRef(storage, `products/${file.name}`)
    const dataRef = databaseRef( db, 'products')
    uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef)

    const itemRef = push(dataRef)

    set(itemRef, {
        key: itemRef.key,
        sku: `${sku}`,
        image: imageURL,
        title: title,
        price: price,
        description: desc
    });

    document.querySelector('#productTitle').value = "";
    document.querySelector('#price').value = null;
    document.querySelector('#uploadImage').value = null;
    document.querySelector('#sku').value = "";
    document.querySelector('#description').value = "";
}



async function onImageSelected(e) {
    let file = e.target.files[0]
    document.querySelector(".image-display img").src = URL.createObjectURL(file);

    const imageRef = storageRef(storage, `products/${file.name}`);
    await uploadBytes(imageRef, file);
}

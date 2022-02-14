import { ref, get, set}  from 'firebase/database'
import { ref as databaseRef, push, set, get}  from 'firebase/database'
import { db, storage } from '../libs/firebase/firebaseConfig'




function renderProduct (data) {

    const template=`
    <li class="productCard" data-key="${data.key}">
        <figure>
            <img src="${data.image}" alt="placeholder">
            <h3>${data.title}</h3>
            <p>${data.price}</p>
            <p>${data.description}</p>
        </figure>
        <div class="buttonHolder">
            <button id="edit" data-key="${data.key}">Edit</button>
            <button id="delete" data-key="${data.key}">Delete</button>
        </div>
    </li>`

    const element = document.createRange().createContextualFragment(template).children[0]
    addProductControls(element)

    return element;
}

function addProductControls(data){
    data.querySelector('#edit').addEventListener('click', onEditProduct)
    data.querySelector('#delete').addEventListener('click', onDeleteProduct)
}


function onDeleteProduct(e){
    const key = e.target.dataset.key
    const ref = databaseRef(db, 'products/' + key)
    set(ref, null)
}

function onEditProduct(e){
    const key = e.target.dataset.key 
    sessionStorage.setItem('key', key)
    window.location = "editProduct.html"
}

export {renderProduct}
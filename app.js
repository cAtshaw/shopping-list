import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-21537-default-rtdb.europe-west1.firebasedatabase.app/"
}



const inputCart = document.getElementById("input")
const addToCart = document.getElementById("addbtn")
const shoppingList = document.getElementById("shopping-list")


const app = initializeApp(appSettings)
const database = getDatabase(app)
const addedToDo = ref(database, "todo")


addToCart.addEventListener("click", function () {
    let inputValue = inputCart.value

    clearShoppingList()

    push(addedToDo, inputValue)
})

onValue(addedToDo, function (snapshot) {


    if (snapshot.exists()) {
        let toDoArray = Object.entries(snapshot.val())
        clearShoppingListEl()

        for (let i = 0; i < toDoArray.length; i++) {
            let currentItem = toDoArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            listingMyShoppingList(toDoArray[i])

        }
    } else {
        shoppingList.innerHTML = "No items here yet..."
    }

})

function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}


function clearShoppingList() {
    inputCart.value = ""
}

function listingMyShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.addEventListener("dblclick", function () {

        let exactLocationOfItemsInDB = ref(database, `todo/${itemID}`)

        remove(exactLocationOfItemsInDB)

    })

    newEl.textContent = itemValue

    shoppingList.append(newEl)
}
const products_container = document.getElementById("container");
const cart_icon = document.querySelector(".cart_icon");
const dropdown = document.querySelector(".dropdown");
const overlay_element = document.querySelector(".overlay");
const quick_view_modal = document.querySelector(".quick_view_modal");
const close_icon = document.querySelector(".close_icon");
const cart_indecator = document.querySelector(".cart_indecator");

//Array of Products
  const products = [
    {
      id: 1,
      product_name: "Destroyer tank",
      product_price: "100.30",
      product_image: "assets/product-01.png",
      add_to_cart: false,
    },
    {
      id: 2,
      product_name: "Great Soldier",
      product_price: "11.55",
      product_image: "assets/product-02.jpg",
      add_to_cart: false,
    },
    {
      id: 3,
      product_name: "Funny Tiger",
      product_price: "1.55",
      product_image: "assets/product-03.jpg",
      add_to_cart: false,
    },
    {
      id: 4,
      product_name: "The Unknown Men",
      product_price: "35.5",
      product_image: "assets/product-04.jpg",
      add_to_cart: false,
    },
    {
      id: 5,
      product_name: "Man with an Axe",
      product_price: "2.00",
      product_image: "assets/product-05.png",
      add_to_cart: false,
    },
    {
      id: 6,
      product_name: "Wooden Car",
      product_price: "112.55",
      product_image: "assets/product-06.jpg",
      add_to_cart: false,
    },
    ]
  
  //Display the Products on the Page.
  function displayProducts() {
    let product_elements = products.map(function(item, i) {
      return `
        <div class="product_card">
          <img class="product_img" src=${item.product_image} alt="yy">
          <div class="product_details">
            <p>Name: ${item.product_name}</p>
            <p>Price: ${item.product_price}$</p>
            <div class="buttons">
              <button id="${item.id}" class="special_butn add_t_cart">Add To Cart</button>
                <button onclick="openAqVm(${i})" class="special_butn">Quick View</button>
            </div>
          </div>
        </div>
            `
    })
    products_container.innerHTML = product_elements.join("");
  }
  displayProducts()
  
  //Open and close the Dropdown when the user clicks on the cart icon.
  cart_icon.onclick = function() {
    dropdown.classList.toggle("show");
  }
  
  //Cart Functionality
  //Create an Array of Products that added to the Cart and Store it in localStorage.
  const arr_of_btns = document.querySelectorAll(".add_t_cart");
  let cart_products;
  if (localStorage.cart_products != null) {
    cart_products = JSON.parse(localStorage.getItem("cart_products"));
  } else {
  cart_products = []
  }

  arr_of_btns.forEach(function(ele, index){
    ele.onclick = function(event) {
    if (event.target.innerHTML == "Add To Cart") {
      if (!cart_products.includes(products[index])) {
        cart_products.push(products[index]);
        localStorage.setItem("cart_products", JSON.stringify(cart_products))
      }
      
      showCartProducts()

      event.target.innerHTML = "Remove From Cart";
      localStorage.setItem("in", event.target.innerHTML)
      } else {
        event.target.innerHTML = "Add To Cart";
        localStorage.setItem("in", event.target.innerHTML)
        let filtered_products = cart_products.filter(product => product.id != this.id)
        
      cart_products = filtered_products
      localStorage.cart_products = JSON.stringify(cart_products);
        showCartProducts()
      }
    }
  })
  
  //Get the Cart Products from LocalStorage and Show it in the Dropdown and Show the Cart indecator.
  function showCartProducts() {
    if (cart_products.length) {
   dropdown.innerHTML = `
          <table style="background-color: lightgray; width: 100%;" class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
           </thead> 
          </table>
          `
    for (let i = 0; i < cart_products.length; i++) {
      document.querySelector(".table").innerHTML += `
          <tbody style="background-color: gray;">
            <tr>
              <th scope="row">${i + 1}</th>
              <td><img style="width: 50px"src="${cart_products[i].product_image}" alt=""></td>
              <td>${cart_products[i].product_name}</td>
              <td>${cart_products[i].product_price}$</td>
            </tr>
          </tbody>
            `
    }
    cart_indecator.style.display = "inline";
    } else {
      dropdown.innerHTML = "Your Cart Is Empty";
      cart_indecator.style.display = "none";
    }
    cart_indecator.innerHTML = cart_products.length;
  }
 showCartProducts();
 
 //Save The Buttons Statue based on adding or removing from the cart.
   cart_products.forEach((e, i) => {
     arr_of_btns[e.id - 1].innerHTML = localStorage.in;
   })
 
  //Create a quick_view modal which opens when the user clicks on the quick_view button of any product.
  function openAqVm(i) {
    overlay_element.classList.add("overlay_show");
    quick_view_modal.style.display = "block";
    quick_view_modal.innerHTML = `
                <img onclick="closeAqVm(${i})" class="close_icon" src="assets/close.png" alt="close icon">
                <img class="productimg" src=${products[i].product_image} alt="product image">
                <div class="product_details">
                  <p>Name: ${products[i].product_name}</p>
                  <p>Price: ${products[i].product_price}$</p>
                  <button onclick="addCurrentPro(${i})" class="special_butn add_t_cart a" id="${i}">Add To Cart</button>
                </div>
        `
    document.querySelector(".a").innerHTML = arr_of_btns[i].innerHTML
  }

  //Close the quick_view modal when the user clicks on the close icon.
  function closeAqVm(i) {
    overlay_element.classList.remove("overlay_show");
    quick_view_modal.style.display = "none";
  }
  
  //Add Current Product to The Cart when The user Clicks on the add to cart button in the quick_view modal.
  function addCurrentPro(index) {
      let a = document.querySelector(".a");
      if (a.innerHTML == "Add To Cart") {
      if (!cart_products.includes(products[index])) {
        cart_products.push(products[index]);
        localStorage.setItem("cart_products", JSON.stringify(cart_products))
      }
      showCartProducts();
      localStorage.setItem("in", "Remove From Cart");
      arr_of_btns[index].innerHTML = localStorage.in;
      a.innerHTML = localStorage.in;
      } else {
        a.innerHTML = "Add To Cart"
        localStorage.setItem("in", a.innerHTML)
        arr_of_btns[index].innerHTML = localStorage.in;

      let filtered_products = cart_products.filter(product => product.id == a.id)
      
      cart_products = filtered_products
      localStorage.cart_products = JSON.stringify(cart_products);
            showCartProducts()
      }
  }
// SECTION SWITCH
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// CHARACTER COUNTER
const input = document.getElementById("textInput");
const count = document.getElementById("count");

input.addEventListener("input", () => {
    count.innerText = input.value.length + "/150 Characters";
});

// PRODUCTS
const products = [
    {name: "Wireless Headphones", price: "$129.99", category: "electronics"},
    {name: "Bluetooth Speaker", price: "$89.99", category: "electronics"},
    {name: "Cotton T-Shirt", price: "$24.99", category: "clothing"},
    {name: "Denim Jeans", price: "$59.99", category: "clothing"}
];

function displayProducts(list) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="product">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <p>[${p.category}]</p>
        </div>`;
    });
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        displayProducts(products.filter(p => p.category === category));
    }
}

displayProducts(products);

// DRAWING TOOL
let drawing = false;
const svg = document.getElementById("canvas");

svg.addEventListener("mousedown", () => drawing = true);
svg.addEventListener("mouseup", () => drawing = false);

svg.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const color = document.getElementById("colorPicker").value;

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", e.offsetX);
    circle.setAttribute("cy", e.offsetY);
    circle.setAttribute("r", 3);
    circle.setAttribute("fill", color);

    svg.appendChild(circle);
});

function clearCanvas() {
    svg.innerHTML = "";
}

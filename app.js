const products = [
  {
    id: "01",
    name: "Bluetooth Speaker",
    date: "22/07/2024",
    exchange: true,
    colorOptions: "Red, Blue",
    price: 4500,
    quantity: 3,
    amount: 13500,
    description:
      "Portable Bluetooth speaker with powerful sound and vibrant color options.",
  },
  {
    id: "02",
    name: "Wireless Earbuds",
    date: "22/07/2024",
    exchange: false,
    colorOptions: "White, Blue",
    price: 8000,
    quantity: 1,
    amount: 8000,
    description:
      "Comfortable wireless earbuds with high-quality sound and long battery life.",
  },
  {
    id: "03",
    name: "Smartwatch",
    date: "22/07/2024",
    exchange: true,
    colorOptions: "Black, White",
    price: 8500,
    quantity: 2,
    amount: 17000,
    description:
      "Smartwatch with fitness tracking, notifications, and multiple color bands.",
  },
  {
    id: "04",
    name: "Fitness Tracker",
    date: "23/07/2024",
    exchange: true,
    colorOptions: "Black, Blue",
    price: 3200,
    quantity: 5,
    amount: 16000,
    description:
      "Track your daily activities and sleep with this sleek fitness tracker.",
  },
  {
    id: "05",
    name: "Laptop Bag",
    date: "23/07/2024",
    exchange: false,
    colorOptions: "Red, Yellow",
    price: 4500,
    quantity: 3,
    amount: 13500,
    description:
      "Durable laptop bag with multiple compartments and stylish design.",
  },
  {
    id: "06",
    name: "Gaming Mouse",
    date: "24/07/2024",
    exchange: true,
    colorOptions: "Black White",
    price: 1500,
    quantity: 1,
    amount: 1500,
    description:
      "Ergonomic gaming mouse with customizable buttons and high precision.",
  },
  {
    id: "07",
    name: "Wireless Charger",
    date: "24/07/2024",
    exchange: true,
    colorOptions: "White, Black",
    price: 8500,
    quantity: 2,
    amount: 17000,
    description:
      "Fast wireless charger compatible with multiple devices and sleek design.",
  },
  {
    id: "08",
    name: "Portable Hard Drive",
    date: "24/07/2024",
    exchange: false,
    colorOptions: "Silver, Black",
    price: 6000,
    quantity: 4,
    amount: 24000,
    description:
      "High-capacity portable hard drive for secure and convenient data storage.",
  },
  {
    id: "09",
    name: "Smartphone Case",
    date: "25/07/2024",
    exchange: true,
    colorOptions: "Black, Red",
    price: 1200,
    quantity: 2,
    amount: 2400,
    description:
      "Protective smartphone case with a sleek design and vibrant color choices.",
  },
  {
    id: "10",
    name: "Bluetooth Headphones",
    date: "25/07/2024",
    exchange: true,
    colorOptions: "Blue, Black",
    price: 7000,
    quantity: 1,
    amount: 7000,
    description:
      "Over-ear Bluetooth headphones with noise cancellation and deep bass.",
  },
  {
    id: "11",
    name: "USB-C Hub",
    date: "25/07/2024",
    exchange: false,
    colorOptions: "Gray, Silver",
    price: 3500,
    quantity: 3,
    amount: 10500,
    description:
      "Versatile USB-C hub with multiple ports for easy connectivity.",
  },
  {
    id: "12",
    name: "LED Desk Lamp",
    date: "26/07/2024",
    exchange: true,
    colorOptions: "White, Black",
    price: 2500,
    quantity: 2,
    amount: 5000,
    description:
      "Adjustable LED desk lamp with dimming options and modern design.",
  },
  {
    id: "13",
    name: "Laptop Cooling Pad",
    date: "26/07/2024",
    exchange: false,
    colorOptions: "Black, Gray",
    price: 1800,
    quantity: 1,
    amount: 1800,
    description:
      "Slim and lightweight laptop cooling pad for enhanced airflow.",
  },
];
const rowsPerPage = 6;
let currentPage = 1;
let totalPages = Math.ceil(products.length / rowsPerPage);

const table = document.querySelector(".productsTable");
const addRecordBtn = document.querySelector("#addRecord");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const currentPageEle = document.querySelector("#currentPage");
const totalPagesEle = document.querySelector("#totalPages");
const addRecordContainer = document.querySelector(".addRecordContainer");
const form = document.querySelector("form");
const cancelFormBtn = document.querySelector("#cancelBtn");
const addBtn = document.querySelector("#addBtn");

const populateTable = (products) => {
  products.forEach(
    ({
      id,
      name,
      date,
      exchange,
      colorOptions,
      price,
      quantity,
      amount,
      description,
    }) => {
      const row = document.createElement("tr");

      // Create a cell and append it to the row
      const addCell = (content, isHTML = false) => {
        const cell = document.createElement("td");
        isHTML ? (cell.innerHTML = content) : (cell.textContent = content);
        row.appendChild(cell);
      };

      // ID
      addCell(id);

      // Product Name with Info Icon
      const nameCellContent = name
        ? `${name} <img src="./assets/description.svg" alt="Info" style="cursor: pointer;" onclick="alert('Description: ${description}')">`
        : name;
      addCell(nameCellContent, true);

      // Product Date
      addCell(date);

      // Exchange with Icon
      const exchangeIcon = exchange ? "correctIcon" : "wrongIcon";
      addCell(
        `<img src="./assets/${exchangeIcon}.svg" alt="${
          exchange ? "Correct" : "Wrong"
        }">`,
        true
      );

      // Color Options
      addCell(colorOptions);

      // Price, Quantity, Amount
      [price, quantity, amount].forEach((item) => addCell(item));

      // Action with Edit and Delete Icons
      const actionCellContent = `
        <button onclick="alert('Edit product ID: ${id}')"><img src="./assets/edit.svg" alt="Edit"></button>
        <div class="vertical-line"></div>
        <button onclick="alert('Delete product ID: ${id}')"><img src="./assets/delete.svg" alt="Delete"></button>
      `;
      addCell(actionCellContent, true);

      table.querySelector("tbody").appendChild(row);
    }
  );
};

const addProduct = (e) => {
  e.preventDefault();

  // values from the form
  const id = form.querySelector('input[placeholder="ID"]').value;
  const name = form.querySelector("select").value;
  const description = form.querySelector("textarea").value;
  const date = form.querySelector('input[type="date"]').value;
  const status = form.querySelector('input[name="status"]:checked').value;
  const colors = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const quantity = form.querySelector('input[placeholder="1"]').value;
  const price = form.querySelector('input[name="price"]').value;
  const amount = form.querySelector('input[name="amount"]').value;

  // new product object
  const newProduct = {
    id,
    name,
    description,
    date,
    exchange: status === "Available" ? true : false,
    colorOptions: colors.join(", "),
    quantity: parseInt(quantity, 10),
    price: parseFloat(price),
    amount: parseFloat(amount),
  };

  products.push(newProduct);

  form.reset();
  addRecordContainer.classList.remove("active");

  updateTable();
};

const updateTable = () => {
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedProducts = products.slice(start, end);

  populateTable(paginatedProducts);

  currentPageEle.textContent = currentPage;
  totalPagesEle.textContent = totalPages;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
};

nextBtn.onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
};

addRecordBtn.addEventListener("click", () => {
  addRecordContainer.classList.toggle("active");
});

cancelFormBtn.addEventListener("click", () => {
  addRecordContainer.classList.remove("active");
});

addBtn.addEventListener("click", addProduct);

updateTable(); // Initialize table with the first page

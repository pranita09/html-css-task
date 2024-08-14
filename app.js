let products = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
let isTableView = true;
const rowsPerPage = 8;
let currentPage = 1;
let totalPages = Math.ceil(products.length / rowsPerPage);
let productIdToDelete = null;
let isEditing = false;
let productIdToEdit = null;

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
const productNameToDelete = document.querySelector(".productName");
const deleteRecordContainer = document.querySelector(".deleteRecordContainer");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
const confirmDeleteBtn = document.querySelector("#deleteBtn");
const productsTable = document.querySelector(".productsTable");
const productsCards = document.querySelector(".productsCards");
const toggleBtns = document.querySelectorAll(".toggleBtns button");
const tableViewBtn = toggleBtns[0];
const cardsViewBtn = toggleBtns[1];
const userInfo = document.querySelector(".userInfo");
const dropdownMenu = document.querySelector("#dropdownMenu");

const toggleDropdown = () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
};

userInfo.addEventListener("click", (event) => {
  toggleDropdown();
  event.stopPropagation();
});

window.openEditDrawer = (productId) => {
  isEditing = true;
  productIdToEdit = productId;

  const productToEdit = products.find((product) => product.id === productId);

  if (productToEdit) {
    document.querySelector(".addRecordTitle").textContent = "Edit Record";
    addBtn.textContent = "Save";

    form.querySelector('input[placeholder="ID"]').value = productToEdit.id;
    form.querySelector("select").value = productToEdit.name;
    form.querySelector("textarea").value = productToEdit.description;

    const [day, month, year] = productToEdit.date.split("/");
    form.querySelector('input[type="date"]').value = `${year}-${month}-${day}`;

    form.querySelector(
      `input[name="status"][value="${
        productToEdit.exchange ? "Available" : "Not Available"
      }"]`
    ).checked = true;

    form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = productToEdit.colorOptions.includes(checkbox.value);
    });

    form.querySelector('input[placeholder="1"]').value = productToEdit.quantity;
    form.querySelector('input[name="price"]').value = productToEdit.price;
    form.querySelector('input[name="amount"]').value = productToEdit.amount;

    addRecordContainer.classList.add("active");
  }
};

window.openDeleteDrawer = (productId, productName) => {
  console.log(productId);
  productIdToDelete = productId;
  productNameToDelete.textContent = productName;
  deleteRecordContainer.classList.add("active");
};

window.closeDeleteDrawer = () => {
  productIdToDelete = null;
  deleteRecordContainer.classList.remove("active");
};

window.deleteProduct = () => {
  if (productIdToDelete !== null) {
    products = products.filter(
      (product) => product.id !== productIdToDelete.toString()
    );
    updateTable();
    closeDeleteDrawer();
  }
};

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

      const addCell = (content, isHTML = false) => {
        const cell = document.createElement("td");
        isHTML ? (cell.innerHTML = content) : (cell.textContent = content);
        row.appendChild(cell);
      };

      addCell(id < 10 ? "0" + id : id);

      const nameCellContent = name
        ? `
          ${name}
          <span class="tooltipContainer">
            <img
              src="./assets/description.svg"
              alt="Info"
              class="infoIcon"
              onclick="toggleTooltip(event, 'description-${id}')"
            >
            <div id="description-${id}" class="tooltip">
                <p class="descHeader">Product Description</p>
              <p>${description}</p>
              <div class="tooltipArrow"></div>
            </div>
          </span>
        `
        : name;
      addCell(nameCellContent, true);

      addCell(date);

      const exchangeIcon = exchange ? "correctIcon" : "wrongIcon";
      addCell(
        `<img src="./assets/${exchangeIcon}.svg" alt="${
          exchange ? "Correct" : "Wrong"
        }">`,
        true
      );

      addCell(colorOptions);

      [price, quantity, amount].forEach((item) => addCell(item));

      const actionCellContent = `
        <button onclick="openEditDrawer('${id}')"><img src="./assets/edit.svg" alt="Edit"></button>
        <div class="vertical-line"></div>
        <button onclick="openDeleteDrawer(${id}, '${name}')"><img src="./assets/delete.svg" alt="Delete"></button>
      `;
      addCell(actionCellContent, true);

      table.querySelector("tbody").appendChild(row);
    }
  );
};

const addProduct = (e) => {
  e.preventDefault();

  const id = form.querySelector('input[placeholder="ID"]').value;
  const name = form.querySelector("select").value;
  const description = form.querySelector("textarea").value;
  const date = form
    .querySelector('input[type="date"]')
    .value.split("-")
    .reverse()
    .join("/");
  const status = form.querySelector('input[name="status"]:checked').value;
  const colors = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const quantity = form.querySelector('input[placeholder="1"]').value;
  const price = form.querySelector('input[name="price"]').value;
  const amount = form.querySelector('input[name="amount"]').value;

  const productData = {
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

  if (isEditing) {
    const productIndex = products.findIndex(
      (product) => product.id === productIdToEdit.toString()
    );
    if (productIndex !== -1) {
      products[productIndex] = productData;
    }
    isEditing = false;
    productIdToEdit = null;
  } else {
    products.push(productData);
  }

  form.reset();
  addRecordContainer.classList.remove("active");

  document.querySelector(".addRecordTitle").textContent = "Add New Record";
  addBtn.textContent = "Add";

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

window.toggleTooltip = (event, tooltipId) => {
  event.stopPropagation();

  const tooltip = document.querySelector(`#${tooltipId}`);
  const isVisible = tooltip.style.visibility === "visible";

  document.querySelectorAll(".tooltip").forEach((el) => {
    el.style.visibility = "hidden";
    el.style.opacity = "0";
  });

  if (isVisible) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  } else {
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  }
};

const renderCards = (products) => {
  productsCards.innerHTML = "";
  products.forEach(
    ({
      name,
      id,
      description,
      price,
      quantity,
      amount,
      date,
      exchange,
      colorOptions,
    }) => {
      const card = document.createElement("div");
      card.classList.add("productCard");
      card.innerHTML = `
        <div class="cardHeader">
            <p>${name}<span class="tooltipContainer">
            <img
              src="./assets/description.svg"
              alt="Info"
              class="infoIcon"
              onclick="toggleTooltip(event, 'description-${id}')"
            >
            <div id="description-${id}" class="tooltip">
                <p class="descHeader">Product Description</p>
              <p>${description}</p>
              <div class="tooltipArrow"></div>
            </div>
          </span></p>
            <div>
                <button onclick="openEditDrawer('${id}')"><img src="./assets/edit.svg" alt="Edit"></button>
                <div class="verticalLine" style="height: 1.25rem; width: 1px; background-color: #a1a9b829";></div>
                <button onclick="openDeleteDrawer(${id}, '${name}')"><img src="./assets/delete.svg" alt="Delete"></button>
            </div>
        </div>
        <div class="infoRow">
            <div class="productData">
                <p class="dataTitle">ID</p>
                <p class="data">${id}</p>
            </div>
            <div class="productData">
                <p class="dataTitle">Product Date</p>
                <p class="data">${date}</p>
            </div>
        </div>
        <div class="infoRow">
            <div class="productData">
                <p class="dataTitle">Status</p>
                <p class="data">${
                  exchange
                    ? `<img src="./assets/correctIcon.svg" alt="correctIcon" />`
                    : `<img src="./assets/wrongIcon.svg" alt="wrongIcon" />`
                }</p>
            </div>
            <div class="productData">
                <p class="dataTitle">Color Options</p>
                <p class="data">${colorOptions}</p>
            </div>
        </div>
        <div class="infoRow">
            <div class="productData">
                <p class="dataTitle">Quantity</p>
                <p class="data">${quantity}</p>
            </div>
            <div class="productData">
                <p class="dataTitle">Price</p>
                <p class="data">${price}</p>
            </div>
        </div>
        <div class="infoRow">
            <div class="productData">
                <p class="dataTitle">Amount</p>
                <p class="data">${amount}</p>
            </div>
        </div>
      `;
      productsCards.appendChild(card);
    }
  );
};

const toggleView = (view) => {
  toggleBtns.forEach((btn) => btn.classList.remove("active"));

  if (view === "table") {
    tableViewBtn.classList.add("active");
    table.style.display = "table";
    productsCards.style.display = "none";
  } else {
    cardsViewBtn.classList.add("active");
    table.style.display = "none";
    productsCards.style.display = "flex";
    updateCards();
  }
};

const updateCards = () => {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedProducts = products.slice(start, end);
  renderCards(paginatedProducts);

  currentPageEle.textContent = currentPage;
  totalPagesEle.textContent = totalPages;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

tableViewBtn.addEventListener("click", () => toggleView("table"));
cardsViewBtn.addEventListener("click", () => toggleView("cards"));

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    if (table.style.display === "table") {
      updateTable();
    } else {
      updateCards();
    }
  }
};

nextBtn.onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    if (table.style.display === "table") {
      updateTable();
    } else {
      updateCards();
    }
  }
};

addRecordBtn.addEventListener("click", () => {
  addRecordContainer.classList.toggle("active");
});

cancelFormBtn.addEventListener("click", () => {
  document.querySelector(".addRecordTitle").textContent = "Add New Record";
  addBtn.textContent = "Add";
  addRecordContainer.classList.remove("active");
});

cancelDeleteBtn.addEventListener("click", closeDeleteDrawer);
confirmDeleteBtn.addEventListener("click", deleteProduct);

addBtn.addEventListener("click", addProduct);

// Hide the tooltip when clicking outside of it
document.addEventListener("click", (event) => {
  if (!event.target.closest(".tooltipContainer")) {
    document.querySelectorAll(".tooltip").forEach((tooltip) => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  }
});

// Hide dropdown menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    dropdownMenu.style.display === "block" &&
    !userInfo.contains(event.target)
  ) {
    dropdownMenu.style.display = "none";
  }
});

toggleView("table"); // Initialize table view as active
updateTable(); // Initialize table with the first page

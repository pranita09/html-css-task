let products = [
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
    colorOptions: "Black, White",
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
const options = document.querySelectorAll(".graphOptions p");
const revenueGraph = document.querySelector(".revenueGraph");
const lossGraph = document.querySelector(".lossGraph");
const backdropForDelete = document.querySelector(".backdropForDelete");
const backdropForForm = document.querySelector(".backdropForForm");
const idInput = document.querySelector("#idInput");
const descInput = document.querySelector("#descInput");
const dateInput = document.querySelector("#dateInput");
const qtyInput = document.querySelector("#qtyInput");
const priceInput = document.querySelector("#priceInput");
const amountInput = document.querySelector("#amountInput");
const increaseQty = document.querySelector("#increaseQty");
const decreaseQty = document.querySelector("#decreaseQty");

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

    idInput.value = productToEdit.id;
    form.querySelector("select").value = productToEdit.name;
    descInput.value = productToEdit.description;

    const [day, month, year] = productToEdit.date.split("/");
    dateInput.value = `${year}-${month}-${day}`;

    form.querySelector(
      `input[name="status"][value="${
        productToEdit.exchange ? "Available" : "Not Available"
      }"]`
    ).checked = true;

    form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = productToEdit.colorOptions.includes(checkbox.value);
    });

    qtyInput.value = productToEdit.quantity;
    priceInput.value = productToEdit.price;
    amountInput.value = productToEdit.amount;

    dateInput.removeAttribute("min");

    updateAmount();

    addRecordContainer.classList.add("active");
    backdropForForm.style.display = "block";
    form.scrollTop = 0;
  }
};

window.openDeleteDrawer = (productId, productName) => {
  backdropForDelete.style.display = "block";
  deleteRecordContainer.style.display = "block";
  productIdToDelete = productId;
  productNameToDelete.textContent = productName;
  document.body.style.overflow = "hidden";
};

window.closeDeleteDrawer = () => {
  productIdToDelete = null;
  deleteRecordContainer.style.display = "none";
  backdropForDelete.style.display = "none";
  document.body.style.overflow = "";
};

backdropForDelete.addEventListener("click", () => {
  closeDeleteDrawer();
});

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

      addCell(id);

      const nameCellContent = name
        ? `<p class="productNameForTable">
          <span>${name}</span>
          <span class="tooltipContainer">
            <img
              src="./assets/description.svg"
              alt="Info"
              class="infoIcon"
              onclick="toggleTooltip(event, "description-'${id}'")"
            >
            <div id="description-${id}" class="tooltip">
                <p class="descHeader">Product Description</p>
              <p>${description}</p>
              <div class="tooltipArrow"></div>
            </div>
          </span></p>
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
        <button onclick="openDeleteDrawer('${id}', '${name}')"><img src="./assets/delete.svg" alt="Delete"></button>
      `;
      addCell(actionCellContent, true);

      table.querySelector("tbody").appendChild(row);
    }
  );
};

const addProduct = (e) => {
  e.preventDefault();

  const id = idInput.value;
  const name = form.querySelector("select").value;
  const description = descInput.value;
  const date = dateInput.value.split("-").reverse().join("/");
  const status = form.querySelector('input[name="status"]:checked').value;
  const colors = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const quantity = qtyInput.value;
  const price = priceInput.value;
  const amount = amountInput.value;

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
  backdropForForm.style.display = "none";

  document.querySelector(".addRecordTitle").textContent = "Add New Record";
  addBtn.textContent = "Add";

  updateTable();
  document.body.style.overflow = "";
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
  const isVisible = tooltip.dataset.visible === "true";

  if (isVisible) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    tooltip.dataset.visible = "false";
  } else {
    document.querySelectorAll(".tooltip").forEach((el) => {
      el.style.visibility = "hidden";
      el.style.opacity = "0";
      el.dataset.visible = "false";
    });
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    tooltip.dataset.visible = "true";
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
              onclick="toggleTooltip(event, "description-'${id}'")"
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
                <button onclick="openDeleteDrawer('${id}', '${name}')"><img src="./assets/delete.svg" alt="Delete"></button>
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
    productsCards.style.display = "grid";
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

const updatePagination = () => {
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentPage === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
};

tableViewBtn.addEventListener("click", () => toggleView("table"));
cardsViewBtn.addEventListener("click", () => toggleView("cards"));

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
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
    updatePagination();
    if (table.style.display === "table") {
      updateTable();
    } else {
      updateCards();
    }
  }
};

const updateAmount = () => {
  const quantity = parseInt(qtyInput.value, 10);
  const price = parseFloat(priceInput.value);
  const amount = quantity * price;
  amountInput.value = amount;

  if (quantity <= 1) {
    decreaseQty.disabled = true;
    decreaseQty.style.cursor = "not-allowed";
  } else {
    decreaseQty.disabled = false;
    decreaseQty.style.cursor = "pointer";
  }
};

const defaultInputs = () => {
  idInput.value = `${products.length + 1}`;
  descInput.value = "This is dummy description. Add specific description.";
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  dateInput.setAttribute("min", today);
  qtyInput.value = 1;
  priceInput.value = 1000;
  amountInput.value = qtyInput.value * priceInput.value;
};

addRecordBtn.addEventListener("click", () => {
  addRecordContainer.classList.toggle("active");
  backdropForForm.style.display = "block";
  form.scrollTop = 0;
  defaultInputs();
  document.body.style.overflow = "hidden";
});

cancelFormBtn.addEventListener("click", () => {
  document.querySelector(".addRecordTitle").textContent = "Add New Record";
  addBtn.textContent = "Add";
  addRecordContainer.classList.remove("active");
  backdropForForm.style.display = "none";
  document.body.style.overflow = "";
});

backdropForForm.addEventListener("click", () => {
  addRecordContainer.classList.remove("active");
  backdropForForm.style.display = "none";
  document.body.style.overflow = "";
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
      tooltip.dataset.visible = "false";
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

priceInput.addEventListener("input", updateAmount);

// Initial calculation for when the form is loaded
updateAmount();
toggleView("table"); // Initialize table view as active
updateTable(); // Initialize table with the first page
updatePagination();

options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");

    if (option.textContent === "Revenue") {
      revenueGraph.style.display = "block";
      lossGraph.style.display = "none";
    } else if (option.textContent === "Losses") {
      revenueGraph.style.display = "none";
      lossGraph.style.display = "block";
    }
  });
});

const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const yValues = [0, 3, 6, 9, 12, 15];

new Chart("revenueChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        data: [6.5, 9.5, 6, 4.5, 6, 5.5, 9],
        borderColor: "#1b1e6d",
        backgroundColor: "#1B1E6D4D",
        fill: true,
      },
      {
        data: [15, 11, 12.5, 10, 13, 8.5, 15],
        borderColor: "#14cdc8",
        backgroundColor: "#14CDC84D",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          display: false,
        },
        min: Math.min(...yValues),
        max: Math.max(...yValues),
        ticks: {
          stepSize: 3,
          callback: function (value) {
            if (yValues.includes(value)) {
              return value + "M";
            }
            return "";
          },
        },
      },
    },
    legend: { display: false },
  },
});

new Chart("lossChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        data: [6.5, 9.5, 6, 4.5, 6, 5.5, 9],
        borderColor: "#FF6D6D",
        backgroundColor: "#FF6D6D4D",
        fill: true,
      },
      {
        data: [15, 11, 12.5, 10, 13, 8.5, 15],
        borderColor: "#F9D100",
        backgroundColor: "#F9D1004D",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          display: false,
        },
        min: Math.min(...yValues),
        max: Math.max(...yValues),
        ticks: {
          stepSize: 3,
          callback: function (value) {
            if (yValues.includes(value)) {
              return value + "M";
            }
            return "";
          },
        },
      },
    },
    legend: { display: false },
  },
});

const doughnutData = {
  labels: ["Product 2", "Product 3", "Product 4", "Product 1"],
  datasets: [
    {
      data: [15, 35, 25, 25],
      backgroundColor: ["#14cdc8", "#f9d100", "#ff6d6d", "#1b1e6d"],
      hoverBackgroundColor: ["#14cdc8", "#f9d100", "#ff6d6d", "#1b1e6d"],
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  //   maintainAspectRatio: false,
  cutout: "70%",
  legend: {
    display: false,
  },
};

new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: doughnutData,
  options: doughnutOptions,
});

increaseQty.addEventListener("click", () => {
  let quantity = parseInt(qtyInput.value, 10) || 1;
  qtyInput.value = quantity + 1;
  updateAmount();
});

decreaseQty.addEventListener("click", () => {
  let quantity = parseInt(qtyInput.value, 10) || 1;
  if (quantity > 1) {
    qtyInput.value = quantity - 1;
    updateAmount();
  }
});

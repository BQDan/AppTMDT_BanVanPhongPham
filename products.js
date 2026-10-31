const products = [
    {
        id: 1,
        name: "Giấy In A4 Double A 70gsm",
        category: "paper",
        price: "85.000 đ",
        image: "https://via.placeholder.com/200?text=Giay+A4",
        description: "Giấy in cao cấp Double A định lượng 70gsm, độ trắng sáng chuẩn, bề mặt láng mịn giúp in không bị kẹt giấy."
    },
    {
        id: 2,
        name: "Bút Bi Gel Deli 0.5mm Mực Xanh",
        category: "pen",
        price: "12.000 đ",
        image: "https://via.placeholder.com/200?text=But+Bi+Deli",
        description: "Bút bi gel mực xanh nét mượt 0.5mm, thiết kế đệm cao su êm ái chống mỏi tay khi viết lâu."
    },
    {
        id: 3,
        name: "Sổ Tay Lò Cố A5 200 Trang",
        category: "notebook",
        price: "35.000 đ",
        image: "https://via.placeholder.com/200?text=So+Tay+A5",
        description: "Sổ tay bìa cứng cao cấp chống gập gãy, giấy kẻ ngang chống lóa mắt, lò xo thép chắc chắn."
    },
    {
        id: 4,
        name: "File Hộp Vuông 15cm Deli W38118",
        category: "file",
        price: "88.200 đ",
        image: "https://via.placeholder.com/200?text=File+Luu+Tru",
        description: "File hộp nhựa khóa cài chắc chắn, sức chứa lớn chuyên dùng bảo quản tài liệu, chứng từ văn phòng."
    }
];

// Lấy các element từ HTML
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

let currentCategory = "all";
function removeAccents(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        .trim();
}

function renderProducts(items) {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    if (items.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');
    items.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
            <button class="btn-detail" onclick="openDetail(${product.id})">Xem Chi Tiết</button>
        `;
        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const rawInput = searchInput ? searchInput.value : "";
    const cleanInput = removeAccents(rawInput);

    const filtered = products.filter((product) => {
        const matchCategory = currentCategory === "all" || product.category === currentCategory;
        if (!matchCategory) return false;

        if (!cleanInput) return true;

        const nameNoAccent = removeAccents(product.name);
        const descNoAccent = removeAccents(product.description);

        return nameNoAccent.includes(cleanInput) || descNoAccent.includes(cleanInput);
    });

    renderProducts(filtered);
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            currentCategory = e.target.dataset.category || "all";
            filterProducts();
        });
    });
}

function openDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-img">
        <div class="modal-info">
            <h2>${product.name}</h2>
            <p class="price">${product.price}</p>
            <p class="desc">${product.description}</p>
            <button class="btn-detail" onclick="alert('Đã thêm sản phẩm vào giỏ hàng!')">Thêm Vào Giỏ Hàng</button>
        </div>
    `;
    modal.classList.remove("hidden");
}

if (closeModal) {
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
}
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });
}

renderProducts(products);
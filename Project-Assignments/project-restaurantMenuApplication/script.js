
const menu = [
    { id: 1, title: "Soup of the day", category: "starters", price: "$5", description: "Freshly made soup with seasonal ingredients",img: "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, title: "Bruschetta", category: "starters", price: "$7", description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and mozzarella",img: "https://www.allrecipes.com/thmb/kt9t899s87rKleitZiaUwWOoNJI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3605381-b506207e5f494e44a7cf5c1bbe488748.jpg" },
    { id: 3, title: "Chicken Parmesan", category: "mains", price: "$12", description: "Crispy chicken topped with tomato sauce and mozzarella, served with spaghetti",img: "https://media.gettyimages.com/id/1358831517/photo/crispy-chicken-parmesan.jpg?s=612x612&w=0&k=20&c=izCK6IforZt1WU1f467NXB-PPR0TAfEw0aoJ6d8imB0=" },
    { id: 4, title: "Steak Frites", category: "mains", price: "$18", description: "Grilled steak served with french fries and salad" , img: "https://media.gettyimages.com/id/463889403/photo/rib-eye-steak.jpg?s=612x612&w=0&k=20&c=igQuEqd2hEwHnwIcuMbiUnQRm5T9Mwk1ASFanAq6iOk="},
    { id: 5, title: "Chocolate Lava Cake", category: "desserts", price: "$8", description: "Warm chocolate cake with a gooey molten chocolate center, served with vanilla ice cream" , img: "https://media.istockphoto.com/id/544716244/photo/warm-chocolate-lava-cake-with-molten-center-and-red-currants.webp?b=1&s=170667a&w=0&k=20&c=6NPIcP8XUG4WwbJU-qfLOEP07aU79doAIsqZ8wic478="},
    { id: 6, title: "Apple Pie", category: "desserts", price: "$6", description: "Classic apple pie with a flaky crust, served with whipped cream", img: "https://plus.unsplash.com/premium_photo-1666353535417-c86616951727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGUlMjBwaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"},
    { id: 7, title: "Vegan Burger", category: "mains", price: "$10", description: "Plant-based burger served with fries", img: "https://plus.unsplash.com/premium_photo-1664648063589-76b97669bc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnYW4lMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 8, title: "Caesar Salad", category: "starters", price: "$6", description: "Fresh romaine lettuce with Caesar dressing, parmesan, and croutons", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Vhc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 9, title: "Spaghetti Carbonara", category: "mains", price: "$14", description: "Classic carbonara with pancetta, egg, hard cheese, and pepper", img: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwYWdoZXR0aSUyMGNhcmJvbmFyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 10, title: "Lemonade", category: "beverages", price: "$3", description: "Freshly squeezed lemonade", img: "https://images.unsplash.com/photo-1625200632177-c7f2aa36b768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 11, title: "Mojito", category: "beverages", price: "$5", description: "Classic mojito with mint, lime, sugar, rum, and soda water", img: "https://images.unsplash.com/photo-1581162611863-b32e483e53a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9qaXRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" }
];
const menuContainer = document.getElementById('menu-items');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelectorAll('.nav-link');

function displayMenuItems(items) {
    let displayMenu = items.map(item => `
        <div class="col-md-4 mb-4 menu-item" data-category="${item.category}">
            <div class="card">
                <img src="${item.img}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                    <p class="card-text"><strong>${item.price}</strong></p>
                </div>
            </div>
        </div>
    `);
    displayMenu = displayMenu.join('');
    menuContainer.innerHTML = displayMenu;
}

displayMenuItems(menu);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-filter');
        const menuCategory = menu.filter(menuItem => {
            if (category === 'all') {
                return true;
            } else {
                return menuItem.category === category;
            }
        });
        displayMenuItems(menuCategory);
    });
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMenu = menu.filter(menuItem => {
        return menuItem.title.toLowerCase().includes(searchTerm) || menuItem.description.toLowerCase().includes(searchTerm);
    });
    displayMenuItems(filteredMenu);
});

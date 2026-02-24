window.onload = function () {
    const jyotirlingas = [
        "Somnath",
        "Mallikarjuna",
        "Mahakaleshwar",
        "Omkareshwar",
        "Kedarnath",
        "Bhimashankar",
        "Kashi Vishwanath",
        "Trimbakeshwar",
        "Vaidyanath",
        "Nageshwar",
        "Rameshwaram",
        "Grishneshwar"
    ];

    const videoMap = {
        "Somnath": "videos/Somnath.webm",
        "Mallikarjuna": "videos/Mallikarjuna.webm",
        "Mahakaleshwar": "videos/Mahakaleshwar.webm",
        "Omkareshwar": "videos/Omkareshwar.webm",
        "Kedarnath": "videos/Kedarnath.webm",
        "Bhimashankar": "videos/Bhimashankar.webm",
        "Kashi Vishwanath": "videos/KashiVishwanath.webm",
        "Trimbakeshwar": "videos/Trimbakeshwar.webm",
        "Vaidyanath": "videos/Vaidyanath.webm",
        "Nageshwar": "videos/Nageshwar.webm",
        "Rameshwaram": "videos/Rameshwaram.webm",
        "Grishneshwar": "videos/Grishneshwar.webm"
    };

    const catalogData = {
        "Somnath": {
            image: "images/Somnath.jpg",
            description: "The first and most revered Jyotirlinga, standing majestically on the shores of the Arabian Sea in Gujarat.",
            price: "₹950 <span>₹1200</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Mallikarjuna": {
            image: "images/Mallikarjuna.jpg",
            description: "Nestled in the hills of Srisailam, Andhra Pradesh, symbolizing divine unity and eternal love.",
            price: "₹980 <span>₹1250</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Mahakaleshwar": {
            image: "images/Mahakaleshwar.jpg",
            description: "Located in Ujjain, Madhya Pradesh, a sacred Jyotirlinga where Lord Shiva is worshipped as the eternal timekeeper.",
            price: "₹960 <span>₹1200</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Omkareshwar": {
            image: "images/Omkareshwar.jpg",
            description: "Located on the sacred island shaped like the Om symbol in Madhya Pradesh.",
            price: "₹920 <span>₹1150</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Kedarnath": {
            image: "images/Kedarnath.jpg",
            description: "Perched in the Himalayas of Uttarakhand, drawing pilgrims to its serene altitude.",
            price: "₹1500 <span>₹1800</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Bhimashankar": {
            image: "images/Bhimashankar.jpg",
            description: "Nestled in the Sahyadri hills of Maharashtra, surrounded by lush forests.",
            price: "₹890 <span>₹1100</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Kashi Vishwanath": {
            image: "images/kashi.jpg",
            description: "One of the holiest Shiva shrines in the spiritual heart of Varanasi.",
            price: "₹970 <span>₹1200</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Trimbakeshwar": {
            image: "images/Trimbakeshwar.jpg",
            description: "Near Nashik in Maharashtra, symbolizing the unity of creation, preservation, and destruction.",
            price: "₹900 <span>₹1200</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Vaidyanath": {
            image: "images/Vaidyanath.jpg",
            description: "In Deoghar, Jharkhand, worshipped as the divine healer.",
            price: "₹990 <span>₹1250</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Nageshwar": {
            image: "images/Nageshwar.jpg",
            description: "Near Dwarka in Gujarat, symbolizing divine strength and serenity.",
            price: "₹910 <span>₹1100</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Rameshwaram": {
            image: "images/Rameshwaram.jpg",
            description: "On the serene island of Tamil Nadu, symbolizing devotion and redemption.",
            price: "₹1050 <span>₹1300</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        },
        "Grishneshwar": {
            image: "images/Grishneshwar.jpg",
            description: "Near Ellora Caves in Maharashtra, radiating divine grace.",
            price: "₹880 <span>₹1050</span>",
            stars: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        }
    };

    const searchBtn = document.getElementById("search-btn");
    const searchBar = document.getElementById("search-bar");
    const searchBarContainer = document.querySelector(".search-bar-container");
    const dropdown = document.getElementById("dropdown");
    const dropdownList = document.getElementById("dropdown-list");
    const catalogContainer = document.getElementById("catalog-container");
    const catalogImage = document.getElementById("catalog-image");
    const catalogTitle = document.getElementById("catalog-title");
    const catalogDescription = document.getElementById("catalog-description");
    const catalogStars = document.getElementById("catalog-stars");
    const catalogPrice = document.getElementById("catalog-price");
    const catalogQrBtn = document.getElementById("catalog-qr-btn");
    const videoPlayer = document.getElementById("videoPlayer");
    const qrReaderDiv = document.getElementById("qr-reader");
    const scanBtn = document.getElementById("scanBtn");
    const resetBtn = document.getElementById("resetBtn");
    const overlay = document.getElementById("introOverlay");
    const menuBar = document.getElementById("menu-bar");
    const navbar = document.querySelector(".navbar");
    const loginBtn = document.getElementById("login-btn");
    const loginFormContainer = document.querySelector(".login-form-container");
    const formClose = document.getElementById("form-close");
    const videoSlider = document.getElementById("video-slider");
    const vidBtns = document.querySelectorAll(".vid-btn");

    let scannerStarted = false;
    let html5QrCode;
    let selectedPlace = null;

    // Populate dropdown with Jyotirlingas
    jyotirlingas.forEach(jyotirlinga => {
        const li = document.createElement("li");
        li.textContent = jyotirlinga;
        li.addEventListener("click", () => {
            searchBar.value = jyotirlinga;
            dropdown.classList.remove("active");
            searchBarContainer.classList.remove("active");
            selectedPlace = jyotirlinga;
            displayCatalog(jyotirlinga);
        });
        dropdownList.appendChild(li);
    });

    // Display catalog for selected place
    function displayCatalog(place) {
        if (catalogData[place]) {
            catalogImage.src = catalogData[place].image;
            catalogTitle.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${place}`;
            catalogDescription.textContent = catalogData[place].description;
            catalogStars.innerHTML = catalogData[place].stars;
            catalogPrice.innerHTML = catalogData[place].price;
            catalogContainer.classList.add("active");
        } else {
            console.warn(`❌ No catalog data for: ${place}`);
            alert(`❌ No catalog data found for: ${place}`);
        }
    }

    // Play video based on key
    function playVideoForKey(key) {
        if (videoMap[key]) {
            videoPlayer.src = videoMap[key];
            videoPlayer.load();
            videoPlayer.style.display = "block";
            videoPlayer.muted = true;
            videoPlayer.controls = true;
            videoPlayer.play().then(() => {
                console.log(`✅ Playing video for ${key}`);
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen().catch(err => console.error("❌ Fullscreen failed:", err));
                }
                const greeting = new SpeechSynthesisUtterance(`Welcome to ${key}`);
                window.speechSynthesis.speak(greeting);
            }).catch(err => {
                console.error("❌ Video play failed:", err);
                alert("⚠️ Video couldn't play. Try again.");
            });
        } else {
            console.warn(`❌ No video found for: ${key}`);
            alert(`❌ No matching video found for: ${key}`);
        }
    }

    // Start QR scanner
    function startQrScanner() {
        if (!scannerStarted) {
            qrReaderDiv.style.display = "block";
            html5QrCode = new Html5Qrcode("qr-reader");

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    const key = decodedText.trim();
                    console.log("✅ QR scanned:", key);

                    html5QrCode.stop().then(() => {
                        scannerStarted = false;
                        scanBtn.innerText = "📷 Start Scan";
                        qrReaderDiv.style.display = "none";
                        overlay.style.display = "block";
                        setTimeout(() => {
                            overlay.style.display = "none";
                            playVideoForKey(key);
                        }, 2000);
                    }).catch(err => {
                        console.error("❌ Error stopping scanner:", err);
                        alert("⚠️ Error stopping scanner.");
                    });
                },
                (err) => {
                    console.warn("⚠️ Scan error:", err);
                }
            ).catch(err => {
                console.error("🚫 Camera error:", err);
                alert("⚠️ Unable to access camera. Please check permissions.");
            });

            scannerStarted = true;
            scanBtn.innerText = "🔄 Scanning...";
        }
    }

    // Search button functionality
    searchBtn.addEventListener("click", () => {
        searchBarContainer.classList.toggle("active");
        dropdown.classList.toggle("active");
        if (!searchBarContainer.classList.contains("active")) {
            searchBar.value = "";
            dropdown.classList.remove("active");
            catalogContainer.classList.remove("active");
        }
    });

    // Catalog QR button functionality
    catalogQrBtn.addEventListener("click", () => {
        if (selectedPlace) {
            startQrScanner();
        } else {
            alert("⚠️ Please select a place first.");
        }
    });

    // Hide dropdown and catalog when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchBarContainer.contains(e.target) && !dropdown.contains(e.target) && !searchBtn.contains(e.target) && !catalogContainer.contains(e.target)) {
            searchBarContainer.classList.remove("active");
            dropdown.classList.remove("active");
            catalogContainer.classList.remove("active");
            searchBar.value = "";
            selectedPlace = null;
        }
    });

    // QR Scanner functionality (Scan QR section)
    scanBtn.addEventListener("click", () => {
        startQrScanner();
    });

    // Reset button functionality
    resetBtn.addEventListener("click", () => {
        if (scannerStarted && html5QrCode) {
            html5QrCode.stop().then(() => {
                scannerStarted = false;
                scanBtn.innerText = "📷 Start Scan";
                qrReaderDiv.style.display = "none";
                videoPlayer.pause();
                videoPlayer.src = "";
                videoPlayer.style.display = "none";
                console.log("🛑 Scanner and video reset");
            }).catch(err => {
                console.error("⚠️ Error stopping scanner:", err);
                alert("⚠️ Error stopping scanner.");
            });
        }
    });

    // Menu toggle for mobile
    menuBar.addEventListener("click", () => {
        menuBar.classList.toggle("fa-times");
        navbar.classList.toggle("active");
    });

    // Login form toggle
    loginBtn.addEventListener("click", () => {
        loginFormContainer.classList.toggle("active");
    });

    formClose.addEventListener("click", () => {
        loginFormContainer.classList.remove("active");
    });

    // Video slider for home section
    vidBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".controls .active").classList.remove("active");
            btn.classList.add("active");
            videoSlider.src = btn.getAttribute("data-src");
            videoSlider.play();
        });
    });

    // Initialize Swiper for review and brand sliders
    new Swiper(".review-slider", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    new Swiper(".brand-slider", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            450: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            991: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
        },
    });
};
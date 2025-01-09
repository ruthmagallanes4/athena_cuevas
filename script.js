const grid = document.getElementById("grid");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const likeButton = document.getElementById("likeButton");

const startImage = 1;
const numImages = 39;
const imageFolder = null; // Images in root

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadImages(imageFolder, startImage, numImages, grid, modal, modalImage) {
    const loadedImages = new Set();
    let imageNumbers = [];
    for (let i = startImage; i < startImage + numImages; i++) {
        imageNumbers.push(i);
    }
    imageNumbers = shuffleArray(imageNumbers);

    for (const i of imageNumbers) {
        const baseFilename = i.toString();
        if (loadedImages.has(baseFilename)) continue;

        const card = document.createElement("div");
        card.className = "card";
        let loaded = false;
        const extensions = [".jpeg", ".jpg", ".jfif"];
        for (const ext of extensions) {
            const img = new Image();
            img.alt = `Image ${i}`;
            img.onload = function() {
                if (!loaded) {
                    card.appendChild(this);
                    grid.appendChild(card);
                    loadedImages.add(baseFilename);
                    loaded = true;
                    card.addEventListener("click", () => {
                        modalImage.src = this.src;
                        modal.style.display = "flex";
                    });
                }
            };
            img.onerror = function() {
                console.error("Error loading:", this.src);
            };
            img.src = imageFolder ? `${imageFolder}/${i}${ext}` : `${i}${ext}`;
            if (loaded) break;
        }
    }
}

function setupModalAndLike(modal, modalImage, likeButton) {
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    likeButton.addEventListener("click", () => {
        const animation = document.createElement("span");
        animation.classList.add("like-animation");
        animation.innerHTML = "❤️";
        likeButton.appendChild(animation);
        animation.addEventListener("animationend", () => {
            animation.remove();
        });
        likeButton.classList.toggle("liked");
    });
}

function setupComingSoon(){
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            document.body.classList.add('show-coming-soon');
        } else {
            document.body.classList.remove('show-coming-soon');
        }
    });
}

loadImages(imageFolder, startImage, numImages, grid, modal, modalImage);
setupModalAndLike(modal, modalImage, likeButton);
setupComingSoon();
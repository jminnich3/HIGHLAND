const state = {
    color: ['R', 'R']
};

const alleleDisplay = {
    'R': 'R',
    'W': 'W'
};

function shorthornColor(color) {
    const [allele1, allele2] = color;

    if (allele1 === 'R' && allele2 === 'R') {
        return {
            color: 'Red',
            description: 'Solid red coat - homozygous for red allele'
        };
    } else if (allele1 === 'W' && allele2 === 'W') {
        return {
            color: 'White',
            description: 'Solid white coat - homozygous for white allele'
        };
    } else {
        return {
            color: 'Roan',
            description: 'Red and white hairs intermixed throughout - heterozygous (R/W)'
        };
    }
}

let currentColor = null;

function updateResult(isInitialLoad = false) {
    const result = shorthornColor(state.color);
    const resultText = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');

    // Map color to image filename
    const imageMap = {
        'Red': '../Shorthorn_Img/red_short.svg',
        'White': '../Shorthorn_Img/white_short.svg',
        'Roan': '../Shorthorn_Img/roan_short.svg'
    };

    const imagePath = imageMap[result.color];

    // Check if color changed
    const colorChanged = result.color !== currentColor;
    if (!colorChanged && !isInitialLoad) {
        return;
    }

    currentColor = result.color;

    // Update result text
    resultText.textContent = result.color;

    if (isInitialLoad) {
        // Initial load - simple fade in
        const newImg = document.createElement('img');
        newImg.src = imagePath;
        newImg.alt = result.color;
        newImg.style.position = 'relative';
        resultImage.innerHTML = '';
        resultImage.appendChild(newImg);

        newImg.onload = () => {
            requestAnimationFrame(() => {
                newImg.classList.add('loaded');
                resultText.classList.add('visible');
            });
        };
    } else {
        // Cross-fade between colors
        resultText.classList.remove('visible');

        const oldImages = resultImage.querySelectorAll('img');
        oldImages.forEach(img => img.classList.add('old-image'));

        const newImg = document.createElement('img');
        newImg.src = imagePath;
        newImg.alt = result.color;
        newImg.style.position = 'absolute';
        newImg.style.top = '0';
        newImg.style.left = '0';
        newImg.style.width = '100%';
        newImg.style.height = 'auto';
        newImg.classList.add('new-image');
        resultImage.appendChild(newImg);

        newImg.onload = () => {
            requestAnimationFrame(() => {
                newImg.classList.add('loaded');
                resultText.classList.add('visible');

                setTimeout(() => {
                    oldImages.forEach(img => img.remove());
                    newImg.style.position = 'relative';
                    newImg.classList.remove('new-image');
                }, 400);
            });
        };
    }
}

function handleAlleleClick(event) {
    const button = event.target.closest('.allele-btn');
    if (!button) return;

    const gene = button.dataset.gene;
    const position = parseInt(button.dataset.position);
    const options = JSON.parse(button.dataset.options);

    // Get current value
    const currentValue = state[gene][position];
    const currentIndex = options.indexOf(currentValue);

    // Cycle to next option
    const nextIndex = (currentIndex + 1) % options.length;
    const nextValue = options[nextIndex];

    // Update state
    state[gene][position] = nextValue;

    // Update button display
    button.textContent = alleleDisplay[nextValue];

    // Calculate result
    updateResult();
}

// Add event listeners
document.querySelectorAll('.allele-btn').forEach(button => {
    button.addEventListener('click', handleAlleleClick);
});

// Initialize
updateResult();

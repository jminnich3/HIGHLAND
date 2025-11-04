const state = {
    mc1r: ['ED', 'ED']
};

const alleleDisplay = {
    'ED': 'E<sup>D</sup>',
    'e': 'e'
};

function whiteParkColor(mc1r) {
    const isRedPointed = mc1r[0] === 'e' && mc1r[1] === 'e';

    // All White Park cattle have white bodies with colored points
    if (isRedPointed) {
        return {
            color: 'White with Red Points',
            description: 'White body with red/mahogany points on ears, muzzle, eye rings, hooves, and tail switch'
        };
    } else {
        return {
            color: 'White with Black Points',
            description: 'White body with black points on ears, muzzle, eye rings, hooves, and tail switch (classic White Park)'
        };
    }
}

let currentColor = null;

function updateResult(isInitialLoad = false) {
    const result = whiteParkColor(state.mc1r);
    const resultText = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');

    // Map color to image filename
    const imageMap = {
        'White with Black Points': '../White_Park_Img/black_tips.svg',
        'White with Red Points': '../White_Park_Img/red_tips.svg'
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
                }, 400); // Faster transition
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
    button.innerHTML = alleleDisplay[nextValue];

    // Calculate result
    updateResult();
}

// Add event listeners
document.querySelectorAll('.allele-btn').forEach(button => {
    button.addEventListener('click', handleAlleleClick);
});

// Initialize with default values
updateResult(true);

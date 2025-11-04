const state = {
    mc1r: ['E', 'E'],
    kit: ['W', 'W']
};

const alleleDisplay = {
    'E': 'E',
    'e': 'e',
    'W': 'W',
    '+': '+'
};

function herefordColor(mc1r, kit) {
    // Determine base color
    const isRed = mc1r[0] === 'e' && mc1r[1] === 'e';

    // Determine white pattern
    const hasWhiteFace = kit[0] === 'W' || kit[1] === 'W';

    if (isRed && hasWhiteFace) {
        return {
            color: 'Red with White Face',
            description: 'Traditional Hereford: deep red body with white face, crest, underline, switch, and lower legs'
        };
    } else if (isRed && !hasWhiteFace) {
        return {
            color: 'Red with White Underline',
            description: 'Red coat with white limited to the face and narrow underline, less extensive white on legs and tail'
        };
    } else if (!isRed && hasWhiteFace) {
        return {
            color: 'Black with White Face',
            description: 'Black Hereford: solid black body with white face, crest, and underline similar to traditional pattern'
        };
    } else {
        return {
            color: 'Black with White Underline',
            description: 'Mostly black coat with narrow white face blaze and minimal white on underline'
        };
    }
}

let currentColor = null;

function updateResult(isInitialLoad = false) {
    const result = herefordColor(state.mc1r, state.kit);
    const resultText = document.getElementById('result');
    const resultDescription = document.getElementById('resultDescription');

    // Check if color changed
    const colorChanged = result.color !== currentColor;
    if (!colorChanged && !isInitialLoad) {
        return;
    }

    currentColor = result.color;

    // Update result text and description
    resultText.textContent = result.color;
    resultDescription.textContent = result.description;

    if (isInitialLoad) {
        // Initial load - simple fade in
        requestAnimationFrame(() => {
            resultText.classList.add('visible');
            resultDescription.classList.add('visible');
        });
    } else {
        // Fade out and in
        resultText.classList.remove('visible');
        resultDescription.classList.remove('visible');

        setTimeout(() => {
            requestAnimationFrame(() => {
                resultText.classList.add('visible');
                resultDescription.classList.add('visible');
            });
        }, 100);
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
updateResult(true);

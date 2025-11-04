const state = {
    mc1r: ['e', 'e'],
    pmel: ['d', 'd'],
    asip: ['A', 'A'],
    udder: ['w', 'w'],
    frosted: ['f', 'f']
};

const alleleDisplay = {
    'ED': 'E<sup>D</sup>',
    'E+': 'E<sup>+</sup>',
    'e': 'e',
    'd': 'd',
    'D': 'D',
    'A': 'A',
    'A+': 'A<sup>+</sup>',
    'Abr': 'A<sup>br</sup>',
    'w': 'w',
    'W': 'W',
    'f': 'f',
    'F': 'F'
};

function highlandColor(mc1r, pmel, asip) {
    const has_ED = mc1r.includes('ED');
    const has_Eplus = mc1r.includes('E+');
    const is_ee = mc1r[0] === 'e' && mc1r[1] === 'e';
    const has_e = mc1r.includes('e');

    const DCount = pmel.filter(a => a === 'D').length;

    const has_Abr = asip.includes('Abr');

    // Check for brindle patterns (only with E+)
    if (has_Abr && DCount === 0 && has_Eplus) {
        return 'Red-Brindle'; // E+ with brindle (red brindle only)
    }

    if (has_ED) { // Black family (no brindle)
        if (DCount === 0) return 'Black';
        if (DCount === 1) {
            // Dun with light/dark variants
            if (has_e && !has_Eplus) return 'Dun-Light'; // ED/e
            return 'Dun-Dark'; // ED/ED or ED/E+
        }
        return 'Silver'; // 2
    }

    // Red family (no brindle)
    if (DCount === 0) {
        if (is_ee) return 'Red-Light'; // e/e gets light red
        return 'Red-Dark'; // E+/e or E+/E+ gets dark red
    }
    if (DCount === 1) {
        // Yellow with light/dark variants
        if (is_ee) return 'Yellow-Light'; // e/e with one dilution
        return 'Yellow-Dark'; // E+/e or E+/E+ with one dilution
    }
    return 'White'; // D/D
}

let currentColor = null;
let currentUdder = null;
let currentFrosted = null;
let currentBusDubh = null;

function hasWhiteUdder(udder) {
    // White udder appears when heterozygous (w/W or W/w)
    return (udder[0] !== udder[1]);
}

function getFrostedCount(frosted) {
    // Count the number of F alleles (0, 1, or 2)
    return frosted.filter(a => a === 'F').length;
}

function hasBusDubh(mc1r, asip) {
    // Bùs dubh only appears on red-based cattle (not ED) with A+ allele
    const has_ED = mc1r.includes('ED');
    const has_Aplus = asip.includes('A+');
    return !has_ED && has_Aplus;
}

function updateResult(isInitialLoad = false) {
    const color = highlandColor(state.mc1r, state.pmel, state.asip);
    const showUdder = hasWhiteUdder(state.udder);
    const frostedCount = getFrostedCount(state.frosted);
    const showBusDubh = hasBusDubh(state.mc1r, state.asip);
    const resultText = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');

    // Don't show frosting on Silver or White cattle
    const canHaveFrosting = color !== 'Silver' && color !== 'White';

    // Display color names with light variants distinguished
    let displayColor = color;
    if (color === 'Red-Light') {
        displayColor = 'Light Red';
    } else if (color === 'Red-Dark') {
        displayColor = 'Red';
    } else if (color === 'Yellow-Light') {
        displayColor = 'Light Yellow';
    } else if (color === 'Yellow-Dark') {
        displayColor = 'Yellow';
    } else if (color === 'Dun-Light') {
        displayColor = 'Light Dun';
    } else if (color === 'Dun-Dark') {
        displayColor = 'Dun';
    } else if (color === 'Red-Brindle') {
        displayColor = 'Red Brindle';
    }

    // Map color names to image filenames
    const imageMap = {
        'Black': 'images/HighlandsFinal/black.svg',
        'Dun-Light': 'images/HighlandsFinal/light_dun_7.svg',
        'Dun-Dark': 'images/HighlandsFinal/dark_dun_3.svg',
        'Silver': 'images/HighlandsFinal/silver.svg',
        'Red-Light': 'images/HighlandsFinal/light_red_1.svg',
        'Red-Dark': 'images/HighlandsFinal/dark_red.svg',
        'Yellow-Light': 'images/HighlandsFinal/light_yellow_10.svg',
        'Yellow-Dark': 'images/HighlandsFinal/dark_yellow_10.svg',
        'White': 'images/HighlandsFinal/white_2.svg',
        'Red-Brindle': 'images/HighlandsFinal/red_brindle_2.svg'
    };

    const imagePath = imageMap[color];
    if (imagePath) {
        // Check what changed
        const colorChanged = color !== currentColor;
        const udderChanged = showUdder !== currentUdder;
        const frostedChanged = frostedCount !== currentFrosted;
        const busDubhChanged = showBusDubh !== currentBusDubh;

        // If nothing changed, return
        if (!colorChanged && !udderChanged && !frostedChanged && !busDubhChanged && !isInitialLoad) {
            return;
        }

        // If only overlays changed (not base color), just update overlays without refreshing base image
        if (!colorChanged && (udderChanged || frostedChanged || busDubhChanged) && !isInitialLoad) {
            // Get old overlay images
            const oldUdder = resultImage.querySelector('img[alt="White Udder"]');
            const oldHighlights = resultImage.querySelector('img[alt="White Highlights"]');
            const oldBusDubh = resultImage.querySelector('img[alt="Bùs Dubh"]');

            // Only fade out overlays that actually changed
            if (udderChanged && oldUdder) oldUdder.classList.remove('loaded');
            if (frostedChanged && oldHighlights) oldHighlights.classList.remove('loaded');
            if (busDubhChanged && oldBusDubh) oldBusDubh.classList.remove('loaded');

            // Wait for fade out, then update only changed overlays
            setTimeout(() => {
                // Handle udder changes
                if (udderChanged) {
                    if (oldUdder) oldUdder.remove();
                    if (showUdder) {
                        const udderImg = document.createElement('img');
                        udderImg.src = 'images/HighlandsFinal/white_udder_4.svg';
                        udderImg.alt = 'White Udder';
                        udderImg.style.position = 'absolute';
                        udderImg.style.top = '0';
                        udderImg.style.left = '0';
                        udderImg.style.width = '100%';
                        udderImg.style.height = 'auto';
                        resultImage.appendChild(udderImg);

                        udderImg.onload = () => {
                            requestAnimationFrame(() => {
                                udderImg.classList.add('loaded');
                            });
                        };
                    }
                }

                // Handle frosted changes
                if (frostedChanged) {
                    if (oldHighlights) oldHighlights.remove();

                    // Only show highlights if homozygous (F/F)
                    if (frostedCount === 2 && canHaveFrosting) {
                        const highlightsImg = document.createElement('img');
                        highlightsImg.src = 'images/HighlandsFinal/frosting5.svg';
                        highlightsImg.alt = 'White Highlights';
                        highlightsImg.style.position = 'absolute';
                        highlightsImg.style.top = '0';
                        highlightsImg.style.left = '0';
                        highlightsImg.style.width = '100%';
                        highlightsImg.style.height = 'auto';
                        resultImage.appendChild(highlightsImg);

                        highlightsImg.onload = () => {
                            requestAnimationFrame(() => {
                                highlightsImg.classList.add('loaded');
                            });
                        };
                    }
                }

                // Handle bùs dubh changes
                if (busDubhChanged) {
                    if (oldBusDubh) oldBusDubh.remove();
                    if (showBusDubh) {
                        const busDubhImg = document.createElement('img');
                        busDubhImg.src = 'images/HighlandsFinal/bus_dubh_4.svg';
                        busDubhImg.alt = 'Bùs Dubh';
                        busDubhImg.style.position = 'absolute';
                        busDubhImg.style.top = '30px';
                        busDubhImg.style.left = '0';
                        busDubhImg.style.width = '100%';
                        busDubhImg.style.height = '100%';
                        resultImage.appendChild(busDubhImg);

                        busDubhImg.onload = () => {
                            requestAnimationFrame(() => {
                                busDubhImg.classList.add('loaded');
                            });
                        };
                    }
                }
            }, 400); // Wait for fade out transition

            currentUdder = showUdder;
            currentFrosted = frostedCount;
            currentBusDubh = showBusDubh;
            return;
        }

        currentColor = color;
        currentUdder = showUdder;
        currentFrosted = frostedCount;
        currentBusDubh = showBusDubh;

        // On initial load, skip fade out
        if (isInitialLoad) {
            const newImg = document.createElement('img');
            newImg.src = imagePath;
            newImg.alt = `${color} Highland Cattle`;
            newImg.style.position = 'relative';
            resultImage.innerHTML = '';
            resultImage.appendChild(newImg);

            // Add udder overlay if heterozygous
            if (showUdder) {
                const udderImg = document.createElement('img');
                udderImg.src = 'images/HighlandsFinal/white_udder_4.svg';
                udderImg.alt = 'White Udder';
                udderImg.style.position = 'absolute';
                udderImg.style.top = '0';
                udderImg.style.left = '0';
                udderImg.style.width = '100%';
                udderImg.style.height = 'auto';
                resultImage.appendChild(udderImg);
            }

            // Add frosted highlights only if homozygous (F/F)
            if (frostedCount === 2 && canHaveFrosting) {
                const highlightsImg = document.createElement('img');
                highlightsImg.src = 'images/HighlandsFinal/white_highlights_6.svg';
                highlightsImg.alt = 'White Highlights';
                highlightsImg.style.position = 'absolute';
                highlightsImg.style.top = '0';
                highlightsImg.style.left = '0';
                highlightsImg.style.width = '100%';
                highlightsImg.style.height = 'auto';
                resultImage.appendChild(highlightsImg);
            }

            // Add bùs dubh overlay if A+ is present on red cattle
            if (showBusDubh) {
                const busDubhImg = document.createElement('img');
                busDubhImg.src = 'images/HighlandsFinal/bus_dubh_4.svg';
                busDubhImg.alt = 'Bùs Dubh';
                busDubhImg.style.position = 'absolute';
                busDubhImg.style.top = '30px';
                busDubhImg.style.left = '0';
                busDubhImg.style.width = '100%';
                busDubhImg.style.height = '100%';
                resultImage.appendChild(busDubhImg);
            }

            // Trigger fade in after image is loaded
            newImg.onload = () => {
                requestAnimationFrame(() => {
                    newImg.classList.add('loaded');
                    if (showUdder) {
                        const udderImg = resultImage.querySelector('img[alt="White Udder"]');
                        if (udderImg) udderImg.classList.add('loaded');
                    }
                    if (frostedCount >= 1 && canHaveFrosting) {
                        const frostedImg = resultImage.querySelector('img[alt="Frosted Highlights"]');
                        if (frostedImg) frostedImg.classList.add('loaded');
                    }
                    if (frostedCount === 2 && canHaveFrosting) {
                        const highlightsImg = resultImage.querySelector('img[alt="White Highlights"]');
                        if (highlightsImg) highlightsImg.classList.add('loaded');
                    }
                    if (showBusDubh) {
                        const busDubhImg = resultImage.querySelector('img[alt="Bùs Dubh"]');
                        if (busDubhImg) busDubhImg.classList.add('loaded');
                    }
                    resultText.textContent = displayColor;
                    resultText.classList.add('visible');
                });
            };
        } else {
            // Cross-fade: create new images on top, fade them in, then remove old ones
            resultText.classList.remove('visible');

            // Mark all current images as old
            const oldImages = resultImage.querySelectorAll('img');
            oldImages.forEach(img => img.classList.add('old-image'));

            // Create new base image
            const newImg = document.createElement('img');
            newImg.src = imagePath;
            newImg.alt = `${color} Highland Cattle`;
            newImg.style.position = 'absolute';
            newImg.style.top = '0';
            newImg.style.left = '0';
            newImg.style.width = '100%';
            newImg.style.height = 'auto';
            newImg.classList.add('new-image');
            resultImage.appendChild(newImg);

            // Add udder overlay if heterozygous
            if (showUdder) {
                const udderImg = document.createElement('img');
                udderImg.src = 'images/HighlandsFinal/white_udder_4.svg';
                udderImg.alt = 'White Udder';
                udderImg.style.position = 'absolute';
                udderImg.style.top = '0';
                udderImg.style.left = '0';
                udderImg.style.width = '100%';
                udderImg.style.height = 'auto';
                udderImg.classList.add('new-image');
                resultImage.appendChild(udderImg);
            }

            // Add frosted highlights only if homozygous (F/F)
            if (frostedCount === 2 && canHaveFrosting) {
                const highlightsImg = document.createElement('img');
                highlightsImg.src = 'images/HighlandsFinal/frosting5.svg';
                highlightsImg.alt = 'White Highlights';
                highlightsImg.style.position = 'absolute';
                highlightsImg.style.top = '0';
                highlightsImg.style.left = '0';
                highlightsImg.style.width = '100%';
                highlightsImg.style.height = 'auto';
                highlightsImg.classList.add('new-image');
                resultImage.appendChild(highlightsImg);
            }

            // Add bùs dubh overlay if A+ is present on red cattle
            if (showBusDubh) {
                const busDubhImg = document.createElement('img');
                busDubhImg.src = 'images/HighlandsFinal/bus_dubh_4.svg';
                busDubhImg.alt = 'Bùs Dubh';
                busDubhImg.style.position = 'absolute';
                busDubhImg.style.top = '30px';
                busDubhImg.style.left = '0';
                busDubhImg.style.width = '100%';
                busDubhImg.style.height = '100%';
                busDubhImg.classList.add('new-image');
                resultImage.appendChild(busDubhImg);
            }

            // Trigger cross-fade after new image is loaded
            newImg.onload = () => {
                requestAnimationFrame(() => {
                    // Fade in new images
                    const newImages = resultImage.querySelectorAll('.new-image');
                    newImages.forEach(img => img.classList.add('loaded'));

                    // Update text
                    resultText.textContent = displayColor;
                    resultText.classList.add('visible');

                    // After fade completes, remove old images and fix positioning
                    setTimeout(() => {
                        // Remove all old images
                        const oldImagesToRemove = resultImage.querySelectorAll('.old-image');
                        oldImagesToRemove.forEach(img => img.remove());

                        // Update the main image positioning to relative
                        const mainImg = resultImage.querySelector('img[alt*="Highland Cattle"]');
                        if (mainImg) {
                            mainImg.style.position = 'relative';
                        }

                        // Remove the new-image class markers
                        newImages.forEach(img => img.classList.remove('new-image'));
                    }, 400); // Wait for fade transition to complete
                });
            };
        }
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

// Initialize with default values and fade in on load
updateResult(true);

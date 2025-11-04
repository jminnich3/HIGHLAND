const colors = [
    { name: 'Red', image: 'images/HighlandsFinal/light_red_1.svg' },
    { name: 'Black', image: 'images/HighlandsFinal/black.svg' },
    { name: 'Yellow', image: 'images/HighlandsFinal/light_yellow_10.svg' },
    { name: 'Dun', image: 'images/HighlandsFinal/dark_dun_3.svg' },
    { name: 'White', image: 'images/HighlandsFinal/white_2.svg' },
    { name: 'Silver', image: 'images/HighlandsFinal/silver.svg' },
    { name: 'Brindle', image: 'images/HighlandsFinal/red_brindle_2.svg' }
];

function hasWhiteUdder(udder) {
    // White udder appears when heterozygous (w/W or W/w)
    return (udder[0] !== udder[1]);
}

// Genotype possibilities for each color (udder not included here, handled separately)
const colorGenotypes = {
    'Black': [
        { mc1r: ['ED', 'ED'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] }
    ],
    'Dun': [
        { mc1r: ['ED', 'ED'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['N', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['N', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['N', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['N', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] }
    ],
    'Silver': [
        { mc1r: ['ED', 'ED'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['Dh', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'ED'], pmel: ['Dh', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['Dh', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'E+'], pmel: ['Dh', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['Dh', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['ED', 'e'], pmel: ['Dh', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] }
    ],
    'Red': [
        { mc1r: ['e', 'e'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'E+'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'e'], pmel: ['N', 'N'], asip: ['A', 'A'], udder: ['w', 'w'] }
    ],
    'Yellow': [
        { mc1r: ['e', 'e'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['N', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['N', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'E+'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'e'], pmel: ['N', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] }
    ],
    'White': [
        { mc1r: ['e', 'e'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['Dh', 'Dh'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['e', 'e'], pmel: ['Dh', 'Dh'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'E+'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'e'], pmel: ['Dh', 'Dh'], asip: ['A', 'A'], udder: ['w', 'w'] }
    ],
    'Brindle': [
        { mc1r: ['E+', 'E+'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'E+'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'e'], pmel: ['N', 'N'], asip: ['A', 'Abr'], udder: ['w', 'w'] },
        { mc1r: ['E+', 'e'], pmel: ['N', 'N'], asip: ['Abr', 'Abr'], udder: ['w', 'w'] }
    ]
};

let selectedParent1 = null;
let selectedParent2 = null;
let parent1UseTesting = false;
let parent2UseTesting = false;
let parent1Zygosity = 'heterozygous';
let parent2Zygosity = 'heterozygous';

function highlandColor(mc1r, pmel, asip) {
    const has_ED = mc1r.includes('ED');
    const has_Eplus = mc1r.includes('E+');
    const dhCount = pmel.filter(a => a === 'Dh').length;
    const has_Abr = asip.includes('Abr');

    if (has_ED) {
        if (dhCount === 0) return 'Black';
        if (dhCount === 1) return 'Dun';
        return 'Silver';
    }

    if (dhCount === 0 && has_Eplus && has_Abr) {
        return 'Brindle';
    }

    if (dhCount === 0) return 'Red';
    if (dhCount === 1) return 'Yellow';
    return 'White';
}

function createColorSelector(parentId) {
    const selector = document.getElementById(`${parentId}Selector`);
    colors.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.innerHTML = `
            <img src="${color.image}" alt="${color.name} Highland Cattle">
            <span>${color.name}</span>
        `;
        option.addEventListener('click', () => selectParent(parentId, color.name, option));
        selector.appendChild(option);
    });
}


function selectParent(parentId, colorName, element) {
    // Remove previous selection
    const selector = document.getElementById(`${parentId}Selector`);
    selector.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));

    // Add new selection
    element.classList.add('selected');

    if (parentId === 'parent1') {
        selectedParent1 = colorName;
    } else {
        selectedParent2 = colorName;
    }

    // Show/hide zygosity selector for Black, Dun, or Silver
    const zygositySelector = document.getElementById(`${parentId}Zygosity`);
    if (['Black', 'Dun', 'Silver'].includes(colorName)) {
        zygositySelector.classList.add('visible');
    } else {
        zygositySelector.classList.remove('visible');
    }

    calculateOffspring();
}


function calculateOffspring() {
    const resultsContainer = document.getElementById('resultsContainer');

    let p1, p2;

    // Sire
    if (parent1UseTesting) {
        p1 = {
            mc1r: [
                document.getElementById('p1_mc1r1').value,
                document.getElementById('p1_mc1r2').value
            ],
            pmel: [
                document.getElementById('p1_pmel1').value,
                document.getElementById('p1_pmel2').value
            ],
            asip: [
                document.getElementById('p1_asip1').value,
                document.getElementById('p1_asip2').value
            ],
            udder: ['w', 'w']
        };
    } else {
        if (!selectedParent1) {
            resultsContainer.innerHTML = '<div class="results-card"><div class="no-results">Select both parents to see breeding results</div></div>';
            return;
        }
        const parent1Genotypes = colorGenotypes[selectedParent1];

        // For Black, Dun, Silver - use zygosity to pick genotype
        if (['Black', 'Dun', 'Silver'].includes(selectedParent1)) {
            parent1Zygosity = document.getElementById('parent1ZygosityDropdown').value;
            if (parent1Zygosity === 'homozygous') {
                // Use ED/ED genotype (first one in array)
                p1 = parent1Genotypes[0];
            } else {
                // Use ED/e genotype (heterozygous)
                p1 = parent1Genotypes[6];
            }
        } else {
            p1 = parent1Genotypes[0];
        }
    }

    // Dam
    if (parent2UseTesting) {
        p2 = {
            mc1r: [
                document.getElementById('p2_mc1r1').value,
                document.getElementById('p2_mc1r2').value
            ],
            pmel: [
                document.getElementById('p2_pmel1').value,
                document.getElementById('p2_pmel2').value
            ],
            asip: [
                document.getElementById('p2_asip1').value,
                document.getElementById('p2_asip2').value
            ],
            udder: ['w', 'w']
        };
    } else {
        if (!selectedParent2) {
            resultsContainer.innerHTML = '<div class="results-card"><div class="no-results">Select both parents to see breeding results</div></div>';
            return;
        }
        const parent2Genotypes = colorGenotypes[selectedParent2];

        // For Black, Dun, Silver - use zygosity to pick genotype
        if (['Black', 'Dun', 'Silver'].includes(selectedParent2)) {
            parent2Zygosity = document.getElementById('parent2ZygosityDropdown').value;
            if (parent2Zygosity === 'homozygous') {
                // Use ED/ED genotype (first one in array)
                p2 = parent2Genotypes[0];
            } else {
                // Use ED/e genotype (heterozygous)
                p2 = parent2Genotypes[6];
            }
        } else {
            p2 = parent2Genotypes[0];
        }
    }

    // Calculate all possible offspring
    const offspringCounts = {};
    const colorUdderCounts = {};

    // Cross MC1R
    const mc1rOptions = [];
    for (let a1 of p1.mc1r) {
        for (let a2 of p2.mc1r) {
            mc1rOptions.push([a1, a2]);
        }
    }

    // Cross PMEL
    const pmelOptions = [];
    for (let a1 of p1.pmel) {
        for (let a2 of p2.pmel) {
            pmelOptions.push([a1, a2]);
        }
    }

    // Cross ASIP
    const asipOptions = [];
    for (let a1 of p1.asip) {
        for (let a2 of p2.asip) {
            asipOptions.push([a1, a2]);
        }
    }

    // Cross Udder
    const udderOptions = [];
    for (let a1 of p1.udder) {
        for (let a2 of p2.udder) {
            udderOptions.push([a1, a2]);
        }
    }

    // Combine all possibilities
    for (let mc1r of mc1rOptions) {
        for (let pmel of pmelOptions) {
            for (let asip of asipOptions) {
                for (let udder of udderOptions) {
                    const color = highlandColor(mc1r, pmel, asip);
                    const showUdder = hasWhiteUdder(udder);
                    const key = `${color}_${showUdder}`;
                    colorUdderCounts[key] = (colorUdderCounts[key] || 0) + 1;
                    offspringCounts[color] = (offspringCounts[color] || 0) + 1;
                }
            }
        }
    }

    // Calculate total and percentages
    const total = Object.values(offspringCounts).reduce((a, b) => a + b, 0);
    const results = Object.entries(offspringCounts).map(([color, count]) => {
        const exactPercentage = (count / total) * 100;
        const roundedPercentage = Math.round(exactPercentage);

        // If it's a whole number, show as integer
        if (exactPercentage === roundedPercentage) {
            return { color, percentage: `${roundedPercentage}%` };
        }

        // Check for common fractions to show specific decimal places
        if (count * 16 === total) return { color, percentage: '6.25%' };
        if (count * 8 === total) return { color, percentage: '12.5%' };
        if (count * 32 === total) return { color, percentage: '3.125%' };

        // Otherwise show two decimal places, but remove .00
        const formatted = exactPercentage.toFixed(2);
        const cleaned = formatted.replace(/\.00$/, '');
        return { color, percentage: `${cleaned}%` };
    });

    // Sort by percentage descending
    results.sort((a, b) => b.percentage - a.percentage);

    // Display results in a single card
    resultsContainer.innerHTML = '<div class="results-card"><div class="results-grid"></div></div>';
    const grid = resultsContainer.querySelector('.results-grid');

    results.forEach(result => {
        const colorData = colors.find(c => c.name === result.color);

        // Check udder probability for this color
        const withUdderKey = `${result.color}_true`;
        const withoutUdderKey = `${result.color}_false`;
        const withUdderCount = colorUdderCounts[withUdderKey] || 0;
        const withoutUdderCount = colorUdderCounts[withoutUdderKey] || 0;

        // If white udder appears in any offspring of this color, show it
        if (withUdderCount > 0) {
            const item = document.createElement('div');
            item.className = 'result-item';

            const imgContainer = document.createElement('div');
            imgContainer.style.position = 'relative';
            imgContainer.style.width = '100%';

            const baseImg = document.createElement('img');
            baseImg.src = colorData.image;
            baseImg.alt = `${result.color} Highland Cattle`;
            baseImg.style.width = '100%';
            baseImg.style.display = 'block';

            const udderImg = document.createElement('img');
            udderImg.src = 'images/HighlandsFinal/white_udder_4.svg';
            udderImg.alt = 'White Udder';
            udderImg.style.position = 'absolute';
            udderImg.style.top = '0';
            udderImg.style.left = '0';
            udderImg.style.width = '100%';
            udderImg.style.height = '100%';

            imgContainer.appendChild(baseImg);
            imgContainer.appendChild(udderImg);

            const colorNameDiv = document.createElement('div');
            colorNameDiv.className = 'color-name';
            colorNameDiv.textContent = `${result.color} (w/ udder)`;

            const probDiv = document.createElement('div');
            probDiv.className = 'probability';
            const udderPercentage = (withUdderCount / total * 100).toFixed(2).replace(/\.00$/, '');
            probDiv.textContent = `${udderPercentage}%`;

            item.appendChild(imgContainer);
            item.appendChild(colorNameDiv);
            item.appendChild(probDiv);
            grid.appendChild(item);
        }

        // Show without udder if it appears
        if (withoutUdderCount > 0) {
            const item = document.createElement('div');
            item.className = 'result-item';
            const percentage = (withoutUdderCount / total * 100).toFixed(2).replace(/\.00$/, '');
            item.innerHTML = `
                <img src="${colorData.image}" alt="${result.color} Highland Cattle">
                <div class="color-name">${result.color}</div>
                <div class="probability">${percentage}%</div>
            `;
            grid.appendChild(item);
        }
    });
}

// Toggle for parent 1
function toggleParent1Testing() {
    parent1UseTesting = document.getElementById('parent1TestingToggle').checked;
    const parent1ColorSelector = document.getElementById('parent1Selector');
    const parent1GenotypeSelector = document.getElementById('parent1Genotype');

    parent1ColorSelector.classList.toggle('hidden', parent1UseTesting);
    parent1GenotypeSelector.classList.toggle('active', parent1UseTesting);

    calculateOffspring();
}

// Toggle for parent 2
function toggleParent2Testing() {
    parent2UseTesting = document.getElementById('parent2TestingToggle').checked;
    const parent2ColorSelector = document.getElementById('parent2Selector');
    const parent2GenotypeSelector = document.getElementById('parent2Genotype');

    parent2ColorSelector.classList.toggle('hidden', parent2UseTesting);
    parent2GenotypeSelector.classList.toggle('active', parent2UseTesting);

    calculateOffspring();
}

// Initialize
createColorSelector('parent1');
createColorSelector('parent2');

// Add checkbox listeners
document.getElementById('parent1TestingToggle').addEventListener('change', toggleParent1Testing);
document.getElementById('parent2TestingToggle').addEventListener('change', toggleParent2Testing);

// Add listeners to zygosity dropdowns
document.getElementById('parent1ZygosityDropdown').addEventListener('change', calculateOffspring);
document.getElementById('parent2ZygosityDropdown').addEventListener('change', calculateOffspring);

// Add listeners to genotype dropdowns
document.querySelectorAll('.genotype-selector select').forEach(dropdown => {
    dropdown.addEventListener('change', calculateOffspring);
});

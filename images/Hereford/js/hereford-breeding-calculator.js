const colors = [
    { name: 'Red with White Face', label: 'Red with\nWhite Face', image: '' },
    { name: 'Red with White Underline', label: 'Red with\nWhite Underline', image: '' },
    { name: 'Black with White Face', label: 'Black with\nWhite Face', image: '' },
    { name: 'Black with White Underline', label: 'Black with\nWhite Underline', image: '' }
];

// Genotype possibilities for each phenotype
const colorGenotypes = {
    'Red with White Face': [
        { mc1r: ['e', 'e'], kit: ['W', 'W'] },
        { mc1r: ['e', 'e'], kit: ['W', '+'] }
    ],
    'Red with White Underline': [
        { mc1r: ['e', 'e'], kit: ['+', '+'] }
    ],
    'Black with White Face': [
        { mc1r: ['E', 'E'], kit: ['W', 'W'] },
        { mc1r: ['E', 'E'], kit: ['W', '+'] },
        { mc1r: ['E', 'e'], kit: ['W', 'W'] },
        { mc1r: ['E', 'e'], kit: ['W', '+'] }
    ],
    'Black with White Underline': [
        { mc1r: ['E', 'E'], kit: ['+', '+'] },
        { mc1r: ['E', 'e'], kit: ['+', '+'] }
    ]
};

let selectedParent1 = null;
let selectedParent2 = null;

function herefordColor(mc1r, kit) {
    // Determine base color
    const isRed = mc1r[0] === 'e' && mc1r[1] === 'e';

    // Determine white pattern
    const hasWhiteFace = kit[0] === 'W' || kit[1] === 'W';

    if (isRed && hasWhiteFace) {
        return 'Red with White Face';
    } else if (isRed && !hasWhiteFace) {
        return 'Red with White Underline';
    } else if (!isRed && hasWhiteFace) {
        return 'Black with White Face';
    } else {
        return 'Black with White Underline';
    }
}

function renderColorSelectors() {
    const parent1Selector = document.getElementById('parent1Selector');
    const parent2Selector = document.getElementById('parent2Selector');

    parent1Selector.innerHTML = '';
    parent2Selector.innerHTML = '';

    colors.forEach(color => {
        // Parent 1
        const btn1 = document.createElement('div');
        btn1.className = 'color-btn';
        if (selectedParent1 === color.name) btn1.classList.add('selected');
        btn1.innerHTML = `<div class="color-btn-label">${color.label}</div>`;
        btn1.addEventListener('click', () => selectColor(1, color.name));
        parent1Selector.appendChild(btn1);

        // Parent 2
        const btn2 = document.createElement('div');
        btn2.className = 'color-btn';
        if (selectedParent2 === color.name) btn2.classList.add('selected');
        btn2.innerHTML = `<div class="color-btn-label">${color.label}</div>`;
        btn2.addEventListener('click', () => selectColor(2, color.name));
        parent2Selector.appendChild(btn2);
    });
}

function selectColor(parentNum, colorName) {
    if (parentNum === 1) {
        selectedParent1 = colorName;
    } else {
        selectedParent2 = colorName;
    }
    renderColorSelectors();
    calculateOffspring();
}

function getParentGenotypes(parentNum) {
    const selectedColor = parentNum === 1 ? selectedParent1 : selectedParent2;

    if (!selectedColor) return [];

    return colorGenotypes[selectedColor];
}

function calculateOffspring() {
    if (!selectedParent1 || !selectedParent2) {
        document.getElementById('offspringResults').innerHTML = '<p>Please select both parents</p>';
        return;
    }

    const parent1Genotypes = getParentGenotypes(1);
    const parent2Genotypes = getParentGenotypes(2);

    const allOffspring = [];

    // Generate all possible offspring
    parent1Genotypes.forEach(p1g => {
        parent2Genotypes.forEach(p2g => {
            // Punnett square for MC1R
            for (let p1mc1r of p1g.mc1r) {
                for (let p2mc1r of p2g.mc1r) {
                    // Punnett square for KIT
                    for (let p1kit of p1g.kit) {
                        for (let p2kit of p2g.kit) {
                            const offspring = {
                                mc1r: [p1mc1r, p2mc1r].sort(),
                                kit: [p1kit, p2kit].sort()
                            };
                            allOffspring.push(offspring);
                        }
                    }
                }
            }
        });
    });

    // Count outcomes by genotype
    const genotypeCounts = {};
    allOffspring.forEach(offspring => {
        const key = `${offspring.mc1r.join('/')}|${offspring.kit.join('/')}`;
        genotypeCounts[key] = (genotypeCounts[key] || 0) + 1;
    });

    // Group by phenotype
    const phenotypes = {};
    Object.entries(genotypeCounts).forEach(([genotype, count]) => {
        const [mc1rStr, kitStr] = genotype.split('|');
        const mc1r = mc1rStr.split('/');
        const kit = kitStr.split('/');
        const phenotype = herefordColor(mc1r, kit);

        if (!phenotypes[phenotype]) {
            phenotypes[phenotype] = {
                probability: 0,
                genotypes: []
            };
        }
        phenotypes[phenotype].probability += count;
        phenotypes[phenotype].genotypes.push({
            genotype: genotype,
            count: count
        });
    });

    // Render results
    const resultsContainer = document.getElementById('offspringResults');
    resultsContainer.innerHTML = '';

    Object.entries(phenotypes).forEach(([phenotype, data]) => {
        const card = document.createElement('div');
        card.className = 'offspring-card';

        const probability = (data.probability / allOffspring.length * 100).toFixed(1);

        const genotypesHTML = data.genotypes.map(g => {
            const prob = (g.count / allOffspring.length * 100).toFixed(1);
            const [mc1r, kit] = g.genotype.split('|');
            return `${mc1r} ${kit}: ${prob}%`;
        }).join('<br>');

        card.innerHTML = `
            <div class="offspring-phenotype">${phenotype}</div>
            <div class="offspring-probability">${probability}%</div>
            <div class="offspring-genotypes">${genotypesHTML}</div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Initialize
renderColorSelectors();

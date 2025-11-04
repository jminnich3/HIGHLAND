const colors = [
    { name: 'Red', label: 'Red', image: '../Shorthorn_Img/red_short.svg' },
    { name: 'White', label: 'White', image: '../Shorthorn_Img/white_short.svg' },
    { name: 'Roan', label: 'Roan', image: '../Shorthorn_Img/roan_short.svg' }
];

// Genotype possibilities for each phenotype
const colorGenotypes = {
    'Red': [{ color: ['R', 'R'] }],
    'White': [{ color: ['W', 'W'] }],
    'Roan': [{ color: ['R', 'W'] }]
};

let selectedParent1 = null;
let selectedParent2 = null;

function shorthornColor(color) {
    const sorted = [...color].sort();
    if (sorted[0] === 'R' && sorted[1] === 'R') return 'Red';
    if (sorted[0] === 'W' && sorted[1] === 'W') return 'White';
    return 'Roan';
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
        btn1.innerHTML = `
            <img src="${color.image}" alt="${color.name}">
            <div class="color-btn-label">${color.label}</div>
        `;
        btn1.addEventListener('click', () => selectColor(1, color.name));
        parent1Selector.appendChild(btn1);

        // Parent 2
        const btn2 = document.createElement('div');
        btn2.className = 'color-btn';
        if (selectedParent2 === color.name) btn2.classList.add('selected');
        btn2.innerHTML = `
            <img src="${color.image}" alt="${color.name}">
            <div class="color-btn-label">${color.label}</div>
        `;
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
            // Punnett square
            for (let p1Allele of p1g.color) {
                for (let p2Allele of p2g.color) {
                    const offspring = {
                        color: [p1Allele, p2Allele].sort()
                    };
                    allOffspring.push(offspring);
                }
            }
        });
    });

    // Count outcomes by genotype
    const genotypeCounts = {};
    allOffspring.forEach(offspring => {
        const key = offspring.color.join('/');
        genotypeCounts[key] = (genotypeCounts[key] || 0) + 1;
    });

    // Group by phenotype
    const phenotypes = {};
    Object.entries(genotypeCounts).forEach(([genotype, count]) => {
        const alleles = genotype.split('/');
        const phenotype = shorthornColor(alleles);

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
            return `${g.genotype}: ${prob}%`;
        }).join('<br>');

        // Get image for this phenotype
        const colorData = colors.find(c => c.name === phenotype);
        const imageHTML = colorData ? `<img src="${colorData.image}" alt="${phenotype}">` : '';

        card.innerHTML = `
            ${imageHTML}
            <div class="offspring-phenotype">${phenotype}</div>
            <div class="offspring-probability">${probability}%</div>
            <div class="offspring-genotypes">${genotypesHTML}</div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Initialize
renderColorSelectors();

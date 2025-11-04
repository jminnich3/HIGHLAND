const colors = [
    { name: 'Black Points', image: '../White_Park_Img/black_tips.svg' },
    { name: 'Red Points', image: '../White_Park_Img/red_tips.svg' }
];

// Genotype possibilities for each phenotype
const colorGenotypes = {
    'Black Points': [
        { mc1r: ['ED', 'ED'] },
        { mc1r: ['ED', 'e'] }
    ],
    'Red Points': [
        { mc1r: ['e', 'e'] }
    ]
};

let selectedParent1 = null;
let selectedParent2 = null;
let parent1UseTesting = false;
let parent2UseTesting = false;
let parent1Zygosity = 'heterozygous';
let parent2Zygosity = 'heterozygous';

function whiteParkColor(mc1r) {
    const isRedPointed = mc1r[0] === 'e' && mc1r[1] === 'e';
    return isRedPointed ? 'Red Points' : 'Black Points';
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
            <div class="color-btn-label">${color.name}</div>
        `;
        btn1.addEventListener('click', () => selectColor(1, color.name));
        parent1Selector.appendChild(btn1);

        // Parent 2
        const btn2 = document.createElement('div');
        btn2.className = 'color-btn';
        if (selectedParent2 === color.name) btn2.classList.add('selected');
        btn2.innerHTML = `
            <img src="${color.image}" alt="${color.name}">
            <div class="color-btn-label">${color.name}</div>
        `;
        btn2.addEventListener('click', () => selectColor(2, color.name));
        parent2Selector.appendChild(btn2);
    });
}

function selectColor(parentNum, colorName) {
    if (parentNum === 1) {
        selectedParent1 = colorName;
        updateParent1Display();
    } else {
        selectedParent2 = colorName;
        updateParent2Display();
    }
    renderColorSelectors();
    calculateOffspring();
}

function updateParent1Display() {
    const colorSelector = document.getElementById('parent1Selector');
    const zygositySelector = document.getElementById('parent1Zygosity');
    const genotypeSelector = document.getElementById('parent1Genotype');

    if (parent1UseTesting) {
        colorSelector.classList.add('hidden');
        zygositySelector.classList.remove('visible');
        genotypeSelector.classList.add('active');
    } else {
        colorSelector.classList.remove('hidden');
        genotypeSelector.classList.remove('active');

        // Show zygosity selector only for Black Points
        if (selectedParent1 === 'Black Points') {
            zygositySelector.classList.add('visible');
        } else {
            zygositySelector.classList.remove('visible');
        }
    }
}

function updateParent2Display() {
    const colorSelector = document.getElementById('parent2Selector');
    const zygositySelector = document.getElementById('parent2Zygosity');
    const genotypeSelector = document.getElementById('parent2Genotype');

    if (parent2UseTesting) {
        colorSelector.classList.add('hidden');
        zygositySelector.classList.remove('visible');
        genotypeSelector.classList.add('active');
    } else {
        colorSelector.classList.remove('hidden');
        genotypeSelector.classList.remove('active');

        // Show zygosity selector only for Black Points
        if (selectedParent2 === 'Black Points') {
            zygositySelector.classList.add('visible');
        } else {
            zygositySelector.classList.remove('visible');
        }
    }
}

function getParentGenotypes(parentNum) {
    const useTesting = parentNum === 1 ? parent1UseTesting : parent2UseTesting;
    const selectedColor = parentNum === 1 ? selectedParent1 : selectedParent2;
    const zygosity = parentNum === 1 ? parent1Zygosity : parent2Zygosity;

    if (!selectedColor) return [];

    if (useTesting) {
        // Get genotype from dropdowns
        const mc1r1 = document.getElementById(`p${parentNum}_mc1r1`).value;
        const mc1r2 = document.getElementById(`p${parentNum}_mc1r2`).value;
        return [{ mc1r: [mc1r1, mc1r2] }];
    } else {
        // Get all possible genotypes for the selected color
        let genotypes = colorGenotypes[selectedColor];

        // Filter based on zygosity for Black Points
        if (selectedColor === 'Black Points') {
            if (zygosity === 'homozygous') {
                genotypes = genotypes.filter(g => g.mc1r[0] === 'ED' && g.mc1r[1] === 'ED');
            } else {
                genotypes = genotypes.filter(g => g.mc1r.includes('e'));
            }
        }

        return genotypes;
    }
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
            // Create Punnett square for MC1R
            for (let p1Allele of p1g.mc1r) {
                for (let p2Allele of p2g.mc1r) {
                    const offspring = {
                        mc1r: [p1Allele, p2Allele].sort((a, b) => {
                            if (a === 'ED' && b === 'e') return -1;
                            if (a === 'e' && b === 'ED') return 1;
                            return 0;
                        })
                    };
                    allOffspring.push(offspring);
                }
            }
        });
    });

    // Count outcomes by genotype
    const genotypeCounts = {};
    allOffspring.forEach(offspring => {
        const key = offspring.mc1r.join('/');
        genotypeCounts[key] = (genotypeCounts[key] || 0) + 1;
    });

    // Group by phenotype
    const phenotypes = {};
    Object.entries(genotypeCounts).forEach(([genotype, count]) => {
        const [a1, a2] = genotype.split('/');
        const phenotype = whiteParkColor([a1, a2]);
        const imageMap = {
            'Black Points': '../White_Park_Img/black_tips.svg',
            'Red Points': '../White_Park_Img/red_tips.svg'
        };

        if (!phenotypes[phenotype]) {
            phenotypes[phenotype] = {
                probability: 0,
                genotypes: [],
                image: imageMap[phenotype]
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
            const [a1, a2] = g.genotype.split('/');
            const displayGenotype = `${a1 === 'ED' ? 'E<sup>D</sup>' : 'e'}/${a2 === 'ED' ? 'E<sup>D</sup>' : 'e'}`;
            return `${displayGenotype}: ${prob}%`;
        }).join('<br>');

        card.innerHTML = `
            <img src="${data.image}" alt="${phenotype}" class="offspring-image">
            <div class="offspring-phenotype">White with ${phenotype}</div>
            <div class="offspring-probability">${probability}%</div>
            <div class="offspring-genotypes">${genotypesHTML}</div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Event listeners
document.getElementById('parent1TestingToggle').addEventListener('change', (e) => {
    parent1UseTesting = e.target.checked;
    updateParent1Display();
    calculateOffspring();
});

document.getElementById('parent2TestingToggle').addEventListener('change', (e) => {
    parent2UseTesting = e.target.checked;
    updateParent2Display();
    calculateOffspring();
});

document.getElementById('parent1ZygosityDropdown').addEventListener('change', (e) => {
    parent1Zygosity = e.target.value;
    calculateOffspring();
});

document.getElementById('parent2ZygosityDropdown').addEventListener('change', (e) => {
    parent2Zygosity = e.target.value;
    calculateOffspring();
});

// Add listeners to all allele dropdowns
['p1_mc1r1', 'p1_mc1r2', 'p2_mc1r1', 'p2_mc1r2'].forEach(id => {
    document.getElementById(id).addEventListener('change', calculateOffspring);
});

// Initialize
renderColorSelectors();
updateParent1Display();
updateParent2Display();

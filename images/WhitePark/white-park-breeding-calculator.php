<?php
require_once '../../includes/config.php';
require_once '../../includes/header.php';
?>
<style>
    :root {
        --brand-color1: #052e68;
        --brand-color2: #0a5fd7;
        --brand-color3: #009be1;
        --brand-color4: #37c3f5;
        --gray-0: #f8fafb;
        --gray-1: #f2f4f6;
        --gray-2: #ebedef;
        --gray-3: #e0e4e5;
        --gray-4: #d1d6d8;
        --gray-6: #979b9d;
        --gray-12: #121210;
        --border-radius: 8px;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: system-ui, sans-serif;
        background: var(--gray-0);
        color: var(--gray-12);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px 16px;
    }

    .calculator {
        max-width: 1200px;
        width: 100%;
        background: white;
        border-radius: calc(var(--border-radius) * 2);
        padding: 32px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .nav {
        margin-bottom: 24px;
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .nav a {
        padding: 8px 16px;
        background: var(--gray-1);
        border-radius: var(--border-radius);
        text-decoration: none;
        color: black;
        font-weight: 500;
    }

    .nav a:hover {
        background: var(--gray-2);
    }

    .nav a.active {
        background: var(--brand-color2);
        color: white;
    }

    h1 {
        margin: 0 0 8px;
        color: black;
        font-size: 32px;
    }

    .subtitle {
        margin: 0 0 32px;
        color: black;
        font-size: 16px;
    }

    .testing-toggle {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .testing-toggle input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    .testing-toggle label {
        font-size: 14px;
        font-weight: 500;
        color: black;
        cursor: pointer;
    }

    .breed-tabs {
        display: flex;
        gap: 8px;
        justify-content: center;
        margin-bottom: 32px;
        border-bottom: 2px solid var(--gray-3);
        padding-bottom: 0;
    }

    .breed-tab {
        padding: 12px 24px;
        background: transparent;
        border: none;
        border-bottom: 3px solid transparent;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        color: var(--gray-6);
        transition: all 0.15s ease-in-out;
        margin-bottom: -2px;
    }

    .breed-tab:hover {
        color: var(--brand-color2);
    }

    .breed-tab.active {
        color: var(--brand-color2);
        border-bottom-color: var(--brand-color2);
    }

    .parent-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-bottom: 32px;
    }

    @media (max-width: 900px) {
        .parent-section {
            grid-template-columns: 1fr;
        }
    }

    .parent-card {
        padding: 24px;
        background: var(--gray-0);
        border-radius: var(--border-radius);
    }

    .parent-card h2 {
        margin: 0 0 8px;
        font-size: 20px;
        color: black;
    }

    .color-selector {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .genotype-selector {
        display: none;
    }

    .genotype-selector.active {
        display: block;
    }

    .color-selector.hidden {
        display: none;
    }

    .zygosity-selector {
        margin-top: 16px;
        display: none;
    }

    .zygosity-selector.visible {
        display: block;
    }

    .zygosity-selector label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: black;
    }

    .zygosity-dropdown {
        width: 100%;
        padding: 10px;
        border: 2px solid var(--gray-4);
        border-radius: var(--border-radius);
        background: white;
        color: black;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
    }

    .zygosity-dropdown:hover {
        border-color: var(--brand-color3);
    }

    .zygosity-dropdown:focus {
        outline: none;
        border-color: var(--brand-color2);
    }

    .gene-group {
        margin-bottom: 24px;
    }

    .gene-group:last-child {
        margin-bottom: 0;
    }

    .gene-group h4 {
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: black;
    }

    .allele-selectors {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .allele-dropdown {
        flex: 1;
        padding: 10px;
        border: 2px solid var(--gray-4);
        border-radius: var(--border-radius);
        background: white;
        color: black;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
    }

    .allele-dropdown:hover {
        border-color: var(--brand-color3);
    }

    .allele-dropdown:focus {
        outline: none;
        border-color: var(--brand-color2);
    }

    .separator {
        font-size: 18px;
        font-weight: 700;
        color: var(--gray-6);
    }

    .color-btn {
        padding: 16px;
        background: white;
        border: 2px solid var(--gray-4);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .color-btn:hover {
        border-color: var(--brand-color3);
        background: var(--gray-0);
    }

    .color-btn.selected {
        border-color: var(--brand-color2);
        border-width: 3px;
        background: white;
    }

    .color-btn img {
        width: 100%;
        height: auto;
        max-width: 150px;
    }

    .color-btn-label {
        font-size: 16px;
        font-weight: 600;
        color: black;
    }

    .results-section {
        padding: 32px;
        background: var(--gray-0);
        border-radius: var(--border-radius);
        min-height: 300px;
    }

    .results-section h2 {
        margin: 0 0 24px;
        font-size: 24px;
        color: black;
    }

    .offspring-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
    }

    .offspring-card {
        padding: 20px;
        background: white;
        border-radius: var(--border-radius);
        border: 2px solid var(--gray-3);
    }

    .offspring-phenotype {
        font-size: 18px;
        font-weight: 600;
        color: black;
        margin-bottom: 8px;
    }

    .offspring-probability {
        font-size: 32px;
        font-weight: 700;
        color: var(--brand-color2);
        margin-bottom: 8px;
    }

    .offspring-genotypes {
        font-size: 13px;
        color: var(--gray-6);
        font-family: 'Courier New', monospace;
        line-height: 1.6;
    }

    .offspring-image {
        width: 100%;
        max-width: 150px;
        margin: 12px auto;
        display: block;
    }

    .info-section {
        margin-top: 48px;
        padding-top: 32px;
        border-top: 1px solid var(--gray-2);
        text-align: left;
    }

    .info-section h2 {
        font-size: 20px;
        margin-bottom: 16px;
        color: black;
    }

    .info-section p {
        margin: 0 0 12px;
        color: black;
        line-height: 1.6;
    }

    @media (max-width: 540px) {
        .calculator {
            padding: 24px 16px;
        }

        h1 {
            font-size: 24px;
        }
    }
</style>
<?php require_once '../../includes/calculator-styles.php'; ?>
</head>
<body>
    <div class="calculator">
        <div class="nav">
            <a href="../../index.php">Color Calculator</a>
            <a href="../../breeding-calculator.php" class="active">Breeding Calculator</a>
        </div>

        <h1>White Park Cattle Breeding Calculator</h1>
        <p class="subtitle">Select the phenotype of each parent to see offspring probabilities</p>

        <div class="breed-tabs">
            <a href="../../breeding-calculator.php" class="breed-tab">Highland Cattle</a>
            <a href="white-park-breeding-calculator.php" class="breed-tab active">White Park Cattle</a>
            <a href="../Shorthorn/shorthorn-breeding-calculator.php" class="breed-tab">Shorthorn Cattle</a>
            <a href="../Hereford/hereford-breeding-calculator.php" class="breed-tab">Hereford Cattle</a>
        </div>

        <div class="parent-section">
            <div class="parent-card">
                <h2>Sire</h2>
                <div class="testing-toggle">
                    <input type="checkbox" id="parent1TestingToggle">
                    <label for="parent1TestingToggle">Have genetic testing results?</label>
                </div>
                <div class="color-selector" id="parent1Selector"></div>
                <div class="zygosity-selector" id="parent1Zygosity">
                    <label for="parent1ZygosityDropdown">E<sup>D</sup> Zygosity:</label>
                    <select class="zygosity-dropdown" id="parent1ZygosityDropdown">
                        <option value="heterozygous">Heterozygous (E<sup>D</sup>/e)</option>
                        <option value="homozygous">Homozygous (E<sup>D</sup>/E<sup>D</sup>)</option>
                    </select>
                </div>
                <div class="genotype-selector" id="parent1Genotype">
                    <div class="gene-group">
                        <h4>MC1R (Extension)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p1_mc1r1">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p1_mc1r2">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="parent-card">
                <h2>Dam</h2>
                <div class="testing-toggle">
                    <input type="checkbox" id="parent2TestingToggle">
                    <label for="parent2TestingToggle">Have genetic testing results?</label>
                </div>
                <div class="color-selector" id="parent2Selector"></div>
                <div class="zygosity-selector" id="parent2Zygosity">
                    <label for="parent2ZygosityDropdown">E<sup>D</sup> Zygosity:</label>
                    <select class="zygosity-dropdown" id="parent2ZygosityDropdown">
                        <option value="heterozygous">Heterozygous (E<sup>D</sup>/e)</option>
                        <option value="homozygous">Homozygous (E<sup>D</sup>/E<sup>D</sup>)</option>
                    </select>
                </div>
                <div class="genotype-selector" id="parent2Genotype">
                    <div class="gene-group">
                        <h4>MC1R (Extension)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p2_mc1r1">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p2_mc1r2">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="results-section">
            <h2>Offspring Probabilities</h2>
            <div class="offspring-grid" id="offspringResults"></div>
        </div>

        <div class="info-section">
            <h2>About White Park Cattle Breeding</h2>
            <p>White Park cattle have a simple genetics system for point color, controlled by the MC1R (Extension) gene. All White Park cattle have the characteristic white body with colored points.</p>
            <p>The point color is determined by whether the animal has the dominant E<sup>D</sup> (black points) or recessive e (red points) allele. Black-pointed cattle are more common, while red-pointed cattle are a rarer variant.</p>
            <p>This calculator shows the probabilities of offspring phenotypes based on the phenotypes or genotypes of both parents.</p>
        </div>
    </div>

    <?php require_once '../../includes/footer.php'; ?>
    <script src="js/white-park-breeding-calculator.js"></script>
</body>
</html>

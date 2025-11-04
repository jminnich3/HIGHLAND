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
        margin: 0 0 24px;
        color: black;
        font-size: 16px;
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
        margin: 0 0 16px;
        font-size: 20px;
        color: black;
    }

    .color-selector {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
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
        gap: 8px;
    }

    .color-btn img {
        width: 100%;
        height: auto;
        max-height: 120px;
        object-fit: contain;
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

    .color-btn-label {
        font-size: 14px;
        font-weight: 600;
        color: black;
        text-align: center;
        line-height: 1.3;
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
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }

    .offspring-card {
        padding: 20px;
        background: white;
        border-radius: var(--border-radius);
        border: 2px solid var(--gray-3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .offspring-card img {
        width: 100%;
        height: auto;
        max-height: 120px;
        object-fit: contain;
    }

    .offspring-phenotype {
        font-size: 16px;
        font-weight: 600;
        color: black;
        margin-bottom: 0;
        text-align: center;
        line-height: 1.3;
    }

    .offspring-probability {
        font-size: 32px;
        font-weight: 700;
        color: var(--brand-color2);
        margin-bottom: 0;
    }

    .offspring-genotypes {
        font-size: 13px;
        color: var(--gray-6);
        font-family: 'Courier New', monospace;
        line-height: 1.6;
        text-align: center;
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

    .info-section ul {
        margin: 8px 0;
        padding-left: 20px;
    }

    .info-section li {
        margin-bottom: 6px;
        color: black;
        line-height: 1.5;
    }

    @media (max-width: 540px) {
        .calculator {
            padding: 24px 16px;
        }

        h1 {
            font-size: 24px;
        }

        .color-selector {
            grid-template-columns: 1fr;
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

        <h1>Hereford Cattle Breeding Calculator</h1>
        <p class="subtitle">Select the phenotype of each parent to see offspring probabilities</p>

        <div class="breed-tabs">
            <a href="../../breeding-calculator.php" class="breed-tab">Highland Cattle</a>
            <a href="../WhitePark/white-park-breeding-calculator.php" class="breed-tab">White Park Cattle</a>
            <a href="../Shorthorn/shorthorn-breeding-calculator.php" class="breed-tab">Shorthorn Cattle</a>
            <a href="hereford-breeding-calculator.php" class="breed-tab active">Hereford Cattle</a>
        </div>

        <div class="parent-section">
            <div class="parent-card">
                <h2>Sire</h2>
                <div class="color-selector" id="parent1Selector"></div>
            </div>

            <div class="parent-card">
                <h2>Dam</h2>
                <div class="color-selector" id="parent2Selector"></div>
            </div>
        </div>

        <div class="results-section">
            <h2>Offspring Probabilities</h2>
            <div class="offspring-grid" id="offspringResults"></div>
        </div>

        <div class="info-section">
            <h2>About Hereford Cattle Breeding</h2>
            <p>Hereford cattle have two main genes controlling their appearance: MC1R (base color) and KIT (white spotting pattern).</p>
            <p><strong>MC1R Gene:</strong> E (black) is dominant over e (red). Black Herefords (E/_) result from Angus crosses. Traditional red Herefords are homozygous e/e.</p>
            <p><strong>KIT Gene:</strong> W (white face pattern) is dominant over + (minimal white). The white face is the breed's most distinctive feature.</p>
            <p><strong>Common Breeding Outcomes:</strong></p>
            <ul>
                <li>Red with White Face × Red with White Face = mostly traditional Herefords with some minimal white expression</li>
                <li>Black with White Face × Red with White Face = mix of black and red offspring, all with white faces</li>
                <li>When breeding heterozygous animals (E/e), expect approximately 75% black and 25% red offspring</li>
            </ul>
        </div>
    </div>

    <?php require_once '../../includes/footer.php'; ?>
    <script src="js/hereford-breeding-calculator.js"></script>
</body>
</html>

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

    .calculator-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 32px;
        align-items: start;
    }

    @media (max-width: 900px) {
        .calculator-grid {
            grid-template-columns: 1fr;
        }
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

    .gene-group-container {
        padding: 24px;
        background: var(--gray-0);
        border-radius: var(--border-radius);
        min-height: 400px;
        display: flex;
        flex-direction: column;
    }

    .gene-group {
        margin-bottom: 32px;
    }

    .gene-group:last-child {
        margin-bottom: 0;
    }

    .gene-summary-box {
        margin-top: 24px;
        padding: 16px;
        background: white;
        border-radius: var(--border-radius);
        border: 2px solid var(--gray-3);
    }

    .gene-summary-box h4 {
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: black;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .gene-summary-box .genotype {
        font-size: 18px;
        font-weight: 700;
        color: black;
        font-family: 'Courier New', monospace;
    }

    .gene-group h3 {
        margin: 0 0 12px;
        font-size: 15px;
        color: black;
        position: relative;
        display: inline-block;
        cursor: help;
    }

    .gene-group h3:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 0;
        bottom: 100%;
        margin-bottom: 7px;
        padding: 12px;
        background: white;
        color: black;
        border-radius: var(--border-radius);
        font-size: 13px;
        font-weight: 400;
        line-height: 1.5;
        white-space: pre-wrap;
        max-width: 400px;
        width: max-content;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        border: 1px solid var(--gray-3);
    }

    .allele-selector {
        display: flex;
        justify-content: flex-start;
        gap: 16px;
        flex-wrap: wrap;
    }

    .allele-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        border: 2px solid var(--gray-4);
        border-radius: 8px;
        padding: 12px 20px;
        background: white;
        color: black;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
    }

    .allele-btn:hover {
        border-color: var(--brand-color3);
        background: var(--gray-0);
    }

    .allele-btn.selected {
        border-color: var(--brand-color2);
        border-width: 3px;
        background: white;
        color: black;
    }

    .allele-btn:active {
        scale: 0.95;
    }

    .result-section {
        padding: 32px;
        background: var(--gray-0);
        border-radius: var(--border-radius);
        min-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 32px;
    }

    .result-color {
        font-size: 28px;
        font-weight: 600;
        color: black;
        margin: 0 0 16px 0;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    .result-color.visible {
        opacity: 1;
    }

    .result-description {
        font-size: 16px;
        color: var(--gray-6);
        max-width: 400px;
        text-align: center;
        margin-top: 16px;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    .result-description.visible {
        opacity: 1;
    }

    .result-image {
        max-width: 400px;
        width: 100%;
        min-height: 300px;
        margin-top: 16px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .result-image img {
        width: 100%;
        height: auto;
        display: block;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    .result-image img.loaded {
        opacity: 1;
    }

    .genes-section {
        text-align: left;
    }

    .gene-summary {
        margin-top: 48px;
        padding-top: 32px;
        border-top: 1px solid var(--gray-2);
        text-align: left;
    }

    .gene-summary h2 {
        font-size: 20px;
        margin-bottom: 24px;
        color: black;
    }

    .gene-info {
        margin-bottom: 24px;
    }

    .gene-info h4 {
        font-size: 16px;
        color: black;
        margin: 0 0 8px;
    }

    .gene-info p {
        margin: 0 0 12px;
        color: black;
        line-height: 1.6;
    }

    .allele-list {
        margin: 8px 0;
        padding-left: 20px;
    }

    .allele-list li {
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
    }
</style>
<?php require_once '../../includes/calculator-styles.php'; ?>
</head>
<body>
    <div class="calculator">
        <div class="nav">
            <a href="../../index.php" class="active">Color Calculator</a>
            <a href="../../breeding-calculator.php">Breeding Calculator</a>
        </div>

        <h1>Shorthorn Cattle Color Calculator</h1>
        <p class="subtitle">Select alleles to determine coat color</p>

        <div class="breed-tabs">
            <a href="../../index.php" class="breed-tab">Highland Cattle</a>
            <a href="../WhitePark/white-park-calculator.php" class="breed-tab">White Park Cattle</a>
            <a href="shorthorn-calculator.php" class="breed-tab active">Shorthorn Cattle</a>
            <a href="../Hereford/hereford-calculator.php" class="breed-tab">Hereford Cattle</a>
        </div>

        <div class="calculator-grid">
            <div class="genes-section">
                <div class="gene-group-container">
                    <div class="gene-group">
                        <h3 data-tooltip="Red and White are codominant alleles. R/R = Red, W/W = White, R/W = Roan">Color Gene</h3>
                        <div class="allele-selector">
                            <button class="allele-btn" data-gene="color" data-position="0" data-options='["R","W"]'>R</button>
                            <button class="allele-btn" data-gene="color" data-position="1" data-options='["R","W"]'>R</button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="result-section">
                <div class="result-color" id="result"></div>
                <div class="result-image" id="resultImage"></div>
            </div>
        </div>

        <div class="gene-summary">
            <h2>Gene Information</h2>

            <div class="gene-info">
                <h4>Shorthorn Color Gene</h4>
                <p>Shorthorn cattle have a simple codominant color genetics system with two alleles: Red (R) and White (W). Neither allele is completely dominant over the other, resulting in a classic example of codominance.</p>
                <ul class="allele-list">
                    <li><strong>R (Red):</strong> Produces red pigmentation in hair.</li>
                    <li><strong>W (White):</strong> Produces white (unpigmented) hair.</li>
                </ul>
            </div>

            <div class="gene-info">
                <h4>Color Outcomes</h4>
                <ul class="allele-list">
                    <li><strong>R/R (Homozygous Red):</strong> Solid red coat. This animal can only pass the R allele to offspring.</li>
                    <li><strong>W/W (Homozygous White):</strong> Solid white coat. This animal can only pass the W allele to offspring.</li>
                    <li><strong>R/W (Heterozygous Roan):</strong> Roan coat with red and white hairs intermixed throughout. This animal can pass either R or W to offspring, resulting in varied color outcomes when bred.</li>
                </ul>
            </div>

            <div class="gene-info">
                <h4>About Shorthorn Cattle</h4>
                <p>Shorthorn cattle are one of the most popular beef breeds worldwide, known for their docile temperament, good mothering ability, and excellent meat quality. The breed originated in northeastern England and comes in three distinct colors: red, white, and roan.</p>
                <p>The roan color pattern is particularly prized in Shorthorns and is a defining characteristic of the breed. Unlike the roan pattern in some other breeds (which involves a separate roan gene), Shorthorn roan is the result of codominance between the red and white color alleles.</p>
            </div>
        </div>
    </div>

    <?php require_once '../../includes/footer.php'; ?>
    <script src="js/shorthorn-calculator.js"></script>
</body>
</html>

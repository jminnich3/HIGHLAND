<?php
require_once 'includes/config.php';
require_once 'includes/header.php';
?>
    <style>
        .testing-toggle {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .testing-toggle input[type="checkbox"] {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }

        .testing-toggle label {
            font-size: 14px;
            font-weight: 500;
            color: black;
            cursor: pointer;
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
            grid-template-columns: repeat(2, 1fr);
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
            color: black;
            font-weight: 600;
        }

        .allele-selectors {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .allele-dropdown {
            flex: 1;
            padding: 6px 8px;
            border: 2px solid var(--gray-4);
            border-radius: var(--border-radius);
            background: white;
            color: black;
            font-size: 12px;
            font-weight: 700;
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
            font-size: 16px;
            font-weight: 700;
            color: black;
        }

        .color-option {
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

        .color-option img {
            width: 100%;
            height: auto;
            max-height: 120px;
            object-fit: contain;
        }

        .color-option span {
            font-weight: 600;
            color: black;
        }

        .color-option:hover {
            border-color: var(--brand-color3);
        }

        .color-option.selected {
            border-color: var(--brand-color2);
            border-width: 3px;
        }

        .results-section {
            padding: 24px;
            background: var(--gray-0);
            border-radius: var(--border-radius);
        }

        .results-section h2 {
            margin: 0 0 24px;
            font-size: 24px;
            color: black;
        }

        .results-card {
            padding: 24px;
            background: white;
            border-radius: var(--border-radius);
            border: 2px solid var(--gray-3);
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
        }

        .result-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .result-item img {
            width: 100%;
            height: auto;
            max-height: 100px;
            object-fit: contain;
        }

        .result-item .color-name {
            font-weight: 600;
            color: black;
            font-size: 13px;
            text-align: center;
        }

        .result-item .probability {
            font-size: 20px;
            font-weight: 700;
            color: var(--brand-color2);
        }

        .no-results {
            text-align: center;
            color: var(--gray-6);
            padding: 48px;
            font-size: 16px;
        }

        @media (max-width: 540px) {
            .color-selector {
                grid-template-columns: 1fr;
            }
        }
    </style>
<?php require_once 'includes/calculator-styles.php'; ?>
</head>
<body>
    <div class="calculator">
        <?php require_once 'includes/nav.php'; ?>

        <h1>Highland Cattle Breeding Calculator</h1>
        <p class="subtitle">Select the color of each parent to see offspring probabilities</p>

        <?php require_once 'includes/breed-tabs.php'; ?>

        <div class="parent-section">
            <div class="parent-card">
                <h2>Sire</h2>
                <div class="testing-toggle">
                    <input type="checkbox" id="parent1TestingToggle">
                    <label for="parent1TestingToggle">Have genetic testing results?</label>
                </div>
                <div class="color-selector" id="parent1Selector"></div>
                <div class="zygosity-selector" id="parent1Zygosity">
                    <label for="parent1ZygosityDropdown">ED Zygosity:</label>
                    <select class="zygosity-dropdown" id="parent1ZygosityDropdown">
                        <option value="heterozygous">Heterozygous (ED/e or ED/E+)</option>
                        <option value="homozygous">Homozygous (ED/ED)</option>
                    </select>
                </div>
                <div class="genotype-selector" id="parent1Genotype">
                    <div class="gene-group">
                        <h4>Base (MC1R)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p1_mc1r1">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="E+">E<sup>+</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p1_mc1r2">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="E+">E<sup>+</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                        </div>
                    </div>
                    <div class="gene-group">
                        <h4>Dilution (PMEL)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p1_pmel1">
                                <option value="N" selected>N</option>
                                <option value="Dh">D<sup>h</sup></option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p1_pmel2">
                                <option value="N" selected>N</option>
                                <option value="Dh">D<sup>h</sup></option>
                            </select>
                        </div>
                    </div>
                    <div class="gene-group">
                        <h4>Agouti (ASIP)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p1_asip1">
                                <option value="A" selected>A</option>
                                <option value="A+">A<sup>+</sup></option>
                                <option value="Abr">A<sup>br</sup></option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p1_asip2">
                                <option value="A" selected>A</option>
                                <option value="A+">A<sup>+</sup></option>
                                <option value="Abr">A<sup>br</sup></option>
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
                    <label for="parent2ZygosityDropdown">ED Zygosity:</label>
                    <select class="zygosity-dropdown" id="parent2ZygosityDropdown">
                        <option value="heterozygous">Heterozygous (ED/e or ED/E+)</option>
                        <option value="homozygous">Homozygous (ED/ED)</option>
                    </select>
                </div>
                <div class="genotype-selector" id="parent2Genotype">
                    <div class="gene-group">
                        <h4>Base (MC1R)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p2_mc1r1">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="E+">E<sup>+</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p2_mc1r2">
                                <option value="ED">E<sup>D</sup></option>
                                <option value="E+">E<sup>+</sup></option>
                                <option value="e" selected>e</option>
                            </select>
                        </div>
                    </div>
                    <div class="gene-group">
                        <h4>Dilution (PMEL)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p2_pmel1">
                                <option value="N" selected>N</option>
                                <option value="Dh">D<sup>h</sup></option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p2_pmel2">
                                <option value="N" selected>N</option>
                                <option value="Dh">D<sup>h</sup></option>
                            </select>
                        </div>
                    </div>
                    <div class="gene-group">
                        <h4>Agouti (ASIP)</h4>
                        <div class="allele-selectors">
                            <select class="allele-dropdown" id="p2_asip1">
                                <option value="A" selected>A</option>
                                <option value="A+">A<sup>+</sup></option>
                                <option value="Abr">A<sup>br</sup></option>
                            </select>
                            <span class="separator">/</span>
                            <select class="allele-dropdown" id="p2_asip2">
                                <option value="A" selected>A</option>
                                <option value="A+">A<sup>+</sup></option>
                                <option value="Abr">A<sup>br</sup></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="results-section">
            <h2>Offspring Probabilities</h2>
            <div id="resultsContainer">
                <div class="results-card"><div class="no-results">Select both parent colors to see breeding results</div></div>
            </div>
        </div>
    </div>

    <?php require_once 'includes/footer.php'; ?>

    <script src="js/breeding-calculator.js"></script>
</body>
</html>

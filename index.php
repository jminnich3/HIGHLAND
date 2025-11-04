<?php
require_once 'includes/config.php';
require_once 'includes/header.php';
require_once 'includes/calculator-styles.php';
?>
</head>
<body>
    <div class="calculator">
        <?php require_once 'includes/nav.php'; ?>

        <h1>Cattle Color Calculator</h1>
        <p class="subtitle">Select two alleles for each gene to determine coat color</p>

        <?php require_once 'includes/breed-tabs.php'; ?>

        <div class="calculator-grid">
            <div class="genes-section">
                <div class="gene-group-container">
                    <div class="gene-group">
                        <h3 data-tooltip="The base gene, known as Extension (MC1R), controls black and red pigment production.">Base</h3>
                        <div class="allele-selector">
                            <button class="allele-btn" data-gene="mc1r" data-position="0" data-options='["e","E+","ED"]'>e</button>
                            <button class="allele-btn" data-gene="mc1r" data-position="1" data-options='["e","E+","ED"]'>e</button>
                        </div>
                    </div>

                    <div class="gene-group">
                        <h3 data-tooltip="The Dilution gene (PMEL) lightens the base coat color.">Dilution</h3>
                        <div class="allele-selector">
                            <button class="allele-btn" data-gene="pmel" data-position="0" data-options='["d","D"]'>d</button>
                            <button class="allele-btn" data-gene="pmel" data-position="1" data-options='["d","D"]'>d</button>
                        </div>
                    </div>

                    <div class="gene-group">
                        <h3 data-tooltip="The Agouti gene controls pigment distribution.">Agouti</h3>
                        <div class="allele-selector">
                            <button class="allele-btn" data-gene="asip" data-position="0" data-options='["A","A+","Abr"]'>A</button>
                            <button class="allele-btn" data-gene="asip" data-position="1" data-options='["A","A+","Abr"]'>A</button>
                        </div>
                    </div>

                    <div class="gene-group">
                        <h3>Modifiers</h3>
                        <div class="modifiers-row">
                            <div class="modifier-item">
                                <label class="modifier-label" data-tooltip="White udder allele appears when heterozygous (one copy).">White Udder</label>
                                <div class="allele-selector">
                                    <button class="allele-btn" data-gene="udder" data-position="0" data-options='["w","W"]'>w</button>
                                    <button class="allele-btn" data-gene="udder" data-position="1" data-options='["w","W"]'>w</button>
                                </div>
                            </div>
                            <div class="modifier-item">
                                <label class="modifier-label" data-tooltip="Frosted gene adds white highlights to the coat.">Frosted</label>
                                <div class="allele-selector">
                                    <button class="allele-btn" data-gene="frosted" data-position="0" data-options='["f","F"]'>f</button>
                                    <button class="allele-btn" data-gene="frosted" data-position="1" data-options='["f","F"]'>f</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="result-section">
                <div class="result-color" id="result"></div>
                <div class="result-image" id="resultImage"></div>
            </div>
        </div>

        <div class="color-types">
            <h2>7 Registered Highland Cattle Colors</h2>
            <div class="color-grid">
                <div class="color-item">
                    <img src="images/HighlandsFinal/black.svg" alt="Black Highland Cattle">
                    <span>Black</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/dark_dun_3.svg" alt="Dun Highland Cattle">
                    <span>Dun</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/silver.svg" alt="Silver Highland Cattle">
                    <span>Silver</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/light_red_1.svg" alt="Red Highland Cattle">
                    <span>Red</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/light_yellow_10.svg" alt="Yellow Highland Cattle">
                    <span>Yellow</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/White_2.svg" alt="White Highland Cattle">
                    <span>White</span>
                </div>
                <div class="color-item">
                    <img src="images/HighlandsFinal/red_brindle_2.svg" alt="Brindle Highland Cattle">
                    <span>Brindle</span>
                </div>
            </div>
        </div>

        <div class="gene-summary">
            <h2>Understanding Highland Cattle Genetics</h2>
            <p class="gene-intro">Three main genes work together to determine coat color in Highland cattle. Each gene has multiple alleles that interact to create the seven recognized colors.</p>

            <div class="gene-cards">
                <div class="gene-card">
                    <div class="gene-card-header">
                        <h3>Base Gene (MC1R)</h3>
                        <span class="gene-badge">Extension</span>
                    </div>
                    <p class="gene-description">Controls whether an animal produces black or red pigment. This is the primary determinant of base coat color.</p>

                    <div class="allele-table">
                        <div class="allele-row">
                            <div class="allele-name">E<sup>D</sup></div>
                            <div class="allele-details">
                                <strong>Dominant Black</strong>
                                <p>Forces black pigment production. Even one copy results in black-based colors (Black, Dun, Silver). Dominant over E<sup>+</sup> and e.</p>
                            </div>
                        </div>
                        <div class="allele-row">
                            <div class="allele-name">E<sup>+</sup></div>
                            <div class="allele-details">
                                <strong>Wild-type Extension</strong>
                                <p>Allows normal pigment expression. Works with other genes to create red-based colors and brindle patterns. The "normal" allele.</p>
                            </div>
                        </div>
                        <div class="allele-row">
                            <div class="allele-name">e</div>
                            <div class="allele-details">
                                <strong>Recessive Red</strong>
                                <p>Prevents black pigment entirely, creating red-based colors (Red, Yellow, White). Requires two copies (e/e) to express.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gene-card">
                    <div class="gene-card-header">
                        <h3>Dilution Gene (PMEL)</h3>
                        <span class="gene-badge">Premelanosome</span>
                    </div>
                    <p class="gene-description">Dilutes or lightens the base coat color. Acts in a dose-dependent manner—more D alleles mean more dilution.</p>

                    <div class="allele-table">
                        <div class="allele-row">
                            <div class="allele-name">d</div>
                            <div class="allele-details">
                                <strong>Non-dilute</strong>
                                <p>No dilution effect. Colors appear at full intensity (Black, Red, Brindle).</p>
                            </div>
                        </div>
                        <div class="allele-row">
                            <div class="allele-name">D</div>
                            <div class="allele-details">
                                <strong>Highland Dilution</strong>
                                <p><strong>One copy (d/D):</strong> Medium dilution → Black becomes Dun, Red becomes Yellow<br>
                                <strong>Two copies (D/D):</strong> Strong dilution → Black becomes Silver, Red becomes White</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gene-card">
                    <div class="gene-card-header">
                        <h3>Agouti Gene (ASIP)</h3>
                        <span class="gene-badge">Pattern</span>
                    </div>
                    <p class="gene-description">Modifies pigment distribution to create patterns like brindle striping and bùs dubh (dark points).</p>

                    <div class="allele-table">
                        <div class="allele-row">
                            <div class="allele-name">A</div>
                            <div class="allele-details">
                                <strong>Non-agouti</strong>
                                <p>Produces solid, uniform color without patterning or dark points.</p>
                            </div>
                        </div>
                        <div class="allele-row">
                            <div class="allele-name">A<sup>+</sup></div>
                            <div class="allele-details">
                                <strong>Wild-type Agouti</strong>
                                <p>Creates bùs dubh—black pigmentation on muzzle, ear tips, and points. Only visible on red-based cattle. Masked on black cattle with E<sup>D</sup>.</p>
                            </div>
                        </div>
                        <div class="allele-row">
                            <div class="allele-name">A<sup>br</sup></div>
                            <div class="allele-details">
                                <strong>Brindle</strong>
                                <p>Creates vertical striping by restricting black pigment to bands. Only visible with E<sup>+</sup> (not with E<sup>D</sup> or e/e). Creates the Brindle color.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <?php require_once 'includes/footer.php'; ?>

    <script src="js/highland-calculator.js"></script>

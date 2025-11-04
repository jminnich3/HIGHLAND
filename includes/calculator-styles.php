<style>
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

        .gene-group-container {
            padding: 24px;
            background: var(--gray-0);
            border-radius: var(--border-radius);
            height: 600px;
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
            width: fit-content;
        }

        .gene-group h3 {
            margin: 0 0 12px;
            font-size: 15px;
            color: black;
        }

        .gene-description {
            margin: 0 0 16px;
            font-size: 14px;
            color: black;
        }

        .allele-selector {
            display: flex;
            justify-content: flex-start;
            gap: 16px;
            flex-wrap: wrap;
        }

        .modifiers-row {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }

        .modifier-item {
            flex: 1;
            min-width: 200px;
        }

        .modifier-label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--gray-12);
            margin-bottom: 8px;
        }

        .allele-buttons {
            display: flex;
            gap: 6px;
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
            background-image: url('backgrounds/Background1.png');
            background-size: cover;
            background-position: center;
            border-radius: var(--border-radius);
            height: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: sticky;
            top: 32px;
        }

        .result-label {
            font-size: 14px;
            font-weight: 500;
            color: black;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
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

        .color-types {
            margin-top: 48px;
            padding-top: 32px;
            border-top: 1px solid var(--gray-2);
        }

        .color-types h2 {
            font-size: 20px;
            margin-bottom: 16px;
            color: black;
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 12px;
            text-align: left;
        }

        @media (max-width: 1100px) {
            .color-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 900px) {
            .color-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 600px) {
            .color-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .color-item {
            padding: 12px 16px;
            background: var(--gray-1);
            border-radius: var(--border-radius);
            font-size: 15px;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .color-item img {
            width: 100%;
            height: auto;
            display: block;
        }

        .gene-group h3 {
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

        .gene-group h3:hover::before {
            content: '';
            position: absolute;
            left: 20px;
            bottom: 100%;
            margin-bottom: 0px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
            z-index: 1001;
            filter: drop-shadow(0 1px 0 var(--gray-3));
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
            .result-color {
                font-size: 28px;
            }
        }
    </style>

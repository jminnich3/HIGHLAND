<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo getPageTitle(); ?></title>
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
            --brown-0: #faf4eb;
            --brown-5: #b78f6d;
            --brown-8: #825b3a;
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

        .nav {
            margin-bottom: 24px;
            display: flex;
            gap: 16px;
            justify-content: center;
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

        @media (max-width: 540px) {
            .calculator {
                padding: 24px 16px;
            }

            h1 {
                font-size: 24px;
            }
        }
    </style>

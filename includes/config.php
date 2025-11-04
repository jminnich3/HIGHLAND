<?php
// Configuration file for Highland Cattle Calculator

// Base URL configuration
define('BASE_URL', '/');

// Page titles
$page_titles = [
    'highland-calculator' => 'Highland Cattle Color Calculator',
    'breeding-calculator' => 'Highland Cattle Breeding Calculator',
    'breeding-calculator-dropdown' => 'Highland Cattle Breeding Calculator - Dropdown'
];

// Get current page
function getCurrentPage() {
    $page = basename($_SERVER['PHP_SELF'], '.php');
    return $page;
}

// Get page title
function getPageTitle() {
    global $page_titles;
    $page = getCurrentPage();
    return isset($page_titles[$page]) ? $page_titles[$page] : 'Highland Cattle Calculator';
}
?>

<?php
$current_page = getCurrentPage();
?>
<div class="nav">
    <a href="index.php" class="<?php echo ($current_page === 'index' || $current_page === 'highland-calculator') ? 'active' : ''; ?>">Color Calculator</a>
    <a href="breeding-calculator.php" class="<?php echo (strpos($current_page, 'breeding-calculator') !== false) ? 'active' : ''; ?>">Breeding Calculator</a>
</div>

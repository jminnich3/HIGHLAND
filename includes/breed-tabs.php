<?php
$current_page = getCurrentPage();
$is_highland = ($current_page === 'index' || strpos($current_page, 'highland-calculator') !== false || strpos($current_page, 'breeding-calculator') !== false);
?>
<div class="breed-tabs">
    <a href="<?php echo (strpos($current_page, 'breeding') !== false) ? 'breeding-calculator.php' : 'index.php'; ?>" class="breed-tab <?php echo $is_highland ? 'active' : ''; ?>">Highland Cattle</a>
    <a href="images/WhitePark/white-park-<?php echo (strpos($current_page, 'breeding') !== false) ? 'breeding-' : ''; ?>calculator.html" class="breed-tab">White Park Cattle</a>
    <a href="images/Shorthorn/shorthorn-<?php echo (strpos($current_page, 'breeding') !== false) ? 'breeding-' : ''; ?>calculator.html" class="breed-tab">Shorthorn Cattle</a>
    <?php if (strpos($current_page, 'breeding') === false): ?>
    <a href="images/Hereford/hereford-calculator.html" class="breed-tab">Hereford Cattle</a>
    <?php endif; ?>
</div>

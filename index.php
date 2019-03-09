<?php 
defined('ROOT_PATH') or define('ROOT_PATH', __DIR__);

require_once ROOT_PATH . '/include/template.php';

$templates = json_encode(Template::getTemplates());
$filters = file_get_contents(ROOT_PATH . '/data/filter.json');
$items = file_get_contents(ROOT_PATH . '/data/data.json');
$format = file_get_contents(ROOT_PATH . '/data/format.json');
$sorting = file_get_contents(ROOT_PATH . '/data/sorting.json');
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Filter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="dist/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="dist/css/main.css" />
    <script src="dist/js/main.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var config = {
                templates: <?php echo $templates ?>,
                filters: <?php echo $filters ?>,
                items: <?php echo $items ?>,
                format: <?php echo $format ?>,
                sorting: {
                    options: <?php echo $sorting ?>,
                    by: 'position',
                    direction: 'asc'
                }
            };

            initApp(config);
        });
    </script>

</head>
<body>
</body>
</html>
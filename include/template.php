<?php 

class Template {

    static function getTemplates() {
        $path = ROOT_PATH . '/src/templates/';
        $files = array_filter(scandir($path), function($file) {
            $info = pathinfo($file);
            if ($info['extension'] === 'php') {
                return true;
            }
        });

        $templates = array();
        foreach ($files as $file) {
            $info = pathinfo($file);
            $templates[$info['filename']] = self::renderTemplate($path . $file);
        }

        return $templates;
    }

    static function renderTemplate($path) {
        ob_start();
        include $path;
        $content = ob_get_clean();
        return trim($content);
    }
}
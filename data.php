<?php 
defined('ROOT_PATH') or define('ROOT_PATH', __DIR__);

require_once ROOT_PATH . '/vendor/autoload.php';
require_once ROOT_PATH . '/include/helper.php';

class DemoData {

    function run() {
        $this->generateData();
        $this->generateFilter();
        $this->generateFormat();
        $this->generateSorting();
    }

    function generateSorting() {
        $sorting = array(
            'position' => 'Position',
            'name' => 'Name',
            'rating' => 'Rating',
            'price' => 'Price',
            'date' => 'Date'
        );

        $sortingFile = ROOT_PATH . '/data/sorting.json';
        file_put_contents($sortingFile, json_encode($sorting, JSON_PRETTY_PRINT));
    }

    function generateFilter() {
        $filters = array();
        $filters[] = DataHelper::getFilter('name', 'text');
        $filters[] = DataHelper::getFilter('detail', 'text');
        $filters[] = DataHelper::getFilter('rating', 'slider');
        $filters[] = DataHelper::getFilter('price', 'slider');
        $filters[] = DataHelper::getFilter('date', 'date');
        $filters[] = DataHelper::getFilter('manufactory', 'radio');
        $filters[] = DataHelper::getFilter('cpu', 'checkbox');
        $filters[] = DataHelper::getFilter('ram', 'select');
        $filters[] = DataHelper::getFilter('hdd', 'multiselect');
        
        $filterFile = ROOT_PATH . '/data/filter.json';
        file_put_contents($filterFile, json_encode($filters, JSON_PRETTY_PRINT));
    }

    function generateData() {
        $items = array();
        for ($i=0; $i < 100; $i++) {
            $faker = Faker\Factory::create();
            $item = new stdClass;
            $item->id = 'i'.$i;
            $item->name = $faker->company;
            $item->detail = $faker->text;
            $item->rating = $faker->randomFloat(1, 0, 5);
            $item->price = $faker->numberBetween(500, 10000);
            $item->date = DataHelper::getRandomDate();
            $item->manufactory = DataHelper::getRandomData('manufactory', -1);
            $item->cpu = DataHelper::getRandomData('cpu', -1);
            $item->ram = DataHelper::getRandomData('ram', -1);
            $item->hdd = DataHelper::getRandomData('hdd', -1);

            $items[] = $item;
        }

        $dataFile = ROOT_PATH . '/data/data.json';
        file_put_contents($dataFile, json_encode($items, JSON_PRETTY_PRINT));
    }

    function generateFormat() {
        $format = array();
        $format['price'] = array(
            'locale' => 'de-DE',
            'options' => array(
                'style' => 'currency',
                'currency' => 'EUR'
            ),
            'prefix' => '',
            'suffix' => ''
        );
        $format['rating'] = array(
            'locale' => 'en-GB',
            'options' => array(),
            'prefix' => '⭐',
            'suffix' => ''
        );

        $dataFile = ROOT_PATH . '/data/format.json';
        file_put_contents($dataFile, json_encode($format, JSON_PRETTY_PRINT));
    }
}

$demo = new DemoData;
$demo->run();


<?php 
use Cocur\Slugify\Slugify;

class DataHelper {

    static function getSampleData($name) {
        $file = ROOT_PATH . '/sample/' . $name . '.json';
        if (!file_exists($file)) {
            return false;
        }

        $json = file_get_contents($file);
        return json_decode($json);
    }

    static function getRandomData($name, $num = 1) {
        $rawData = self::getSampleData($name);

        $faker = Faker\Factory::create();
        $slugify = new Slugify();
        $total = count($rawData);
        
        $data = array();
        foreach ($rawData as $v) {
            $key = $slugify->slugify($v);
            $data[$key] = $v;
        }
    
        $keys = array_keys($data);
    
        if ($num === -1) {
            $num = $faker->numberBetween(1, round($total / 2));
        }
    
        $final = array();
        $value = array();
        $text = array();
        for ($i=0; $i < $num; $i++) {
            $index = $faker->unique()->numberBetween(0, count($keys) - 1);
            $val = $keys[$index];
            $value[] = $val;
            $text[] = $data[$val];
        }
    
        $final['value'] = $value;
        $final['displayValue'] = $text;
        
        return $final;
    }

    static function getRandomDate() {
        $faker = Faker\Factory::create();
        $date = $faker->dateTimeThisYear();
        return $date->format('Y-m-d H:i:s');
    }

    static function getFilter($name, $type = 'text') {
        $filter = array();
        $filter['name'] = $name;
        $filter['displayName'] = ucfirst($name);
        $filter['type'] = $type;

        $keyValueType = array(
            'checkbox',
            'radio',
            'select',
            'multiselect'
        );
        if (in_array($type, $keyValueType)) {
            $filter['data'] = self::getKeyValueFilter($name, $type);
        }

        if ($type === 'slider') {
            $filter['data'] = self::getSliderFilter($name);
        }

        return $filter;
    }

    static function getSliderFilter($name) {
        $rawData = self::getSampleData($name);
        return $rawData;
    }

    static function getKeyValueFilter($name, $type) {
        $rawData = self::getSampleData($name);
        $data = array();
        if ($type === 'radio' || $type === 'select') {
            $data[] = array(
                'value' => '',
                'displayValue' => 'Select All'
            );
        }
        if ($rawData) {
            $slugify = new Slugify();
            foreach ($rawData as $v) {
                $data[] = array(
                    'value' => $slugify->slugify($v),
                    'displayValue' => $v
                );
            }
        }

        return $data;
    }
}
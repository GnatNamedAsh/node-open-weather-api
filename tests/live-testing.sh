#!/bin/bash

# check if httpie is installed, if not, we use curl instead
if ! command -v http &> /dev/null; then
    echo "httpie could not be found, using curl instead"
    HTTP_CMD="curl -X GET"
else
    HTTP_CMD="http GET"
fi

# array of latitude and longitudes to test
# (lat, lon)
LAT_LON_PAIRS=(
    "40.7128,-74.0060"
    "37.7749,-122.4194"
    "45.5236,-122.6733"
    "42.8975,-106.47306"
)

# Run through them by hitting the web server
for pair in "${LAT_LON_PAIRS[@]}"; do
    url="http://localhost:3000/weather?lat=${pair%%,*}&lon=${pair##*,}"
    echo "Hitting $url"
    $HTTP_CMD "$url"
done


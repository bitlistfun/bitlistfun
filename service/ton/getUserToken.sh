#!/bin/bash

curl -X 'POST' \
  'http://127.0.0.1:3001/getUserToken' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "0QAoq24qRRGL7JGfEp3WTKiJiLrBS9VpnW1vh8EcisuQIB6t",
  "uid": "a938c3336a7ca425",
  "signature": "D1KiicyUpPvnDoJ3JDgrNQ"
}'

echo ""
echo ""

curl -X 'POST' \
  'http://127.0.0.1:3001/getUserToken' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "7iCzEsN1xrV9gZoWMvUaWKhAhy1Cqm9iAeVAmJVThCqV",
  "uid": "c9fe7bf0",
  "signature": "52VJa6DBU92aMLkm5hVwJDNqQsjzKR3AZvqsX2EdAbtZVfMkzdLcS3oAdGbWP1c29wxYuPZkUNoNm6Eg9Mc7yGXX"
}'


echo ""
echo ""

curl -X 'POST' \
  'http://127.0.0.1:3001/getUserToken' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "7iCzEsN1xrV9gZoWMvUaWKhAhy1Cqm9iAeVAmJVThCqV",
  "uid2": "c9fe7bf0",
  "signature": "52VJa6DBU92aMLkm5hVwJDNqQsjzKR3AZvqsX2EdAbtZVfMkzdLcS3oAdGbWP1c29wxYuPZkUNoNm6Eg9Mc7yGXX"
}'



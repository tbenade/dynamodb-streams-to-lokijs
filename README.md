# questions-service

## Possible merits of proposed design

- Great developer experience near zero dependencies with lightening performance.
- Dummy data can easily be rendered via LokiJS with no need for a DB connection
- If you did want to connect to real data only requirement is a internet connection
- Super lightweight solution can be deployed in a docker container with near infinite scale
- solution so small throw away is cost effective.
- JSON through and through.

## Some perf metrics
Concurrency Level:      20
Time taken for tests:   9.968 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      275570000 bytes
HTML transferred:       273650000 bytes
Requests per second:    1003.23 [#/sec] (mean)
Time per request:       19.936 [ms] (mean)
Time per request:       0.997 [ms] (mean, across all concurrent requests)
Transfer rate:          26998.07 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     2   20   3.1     20      44
Waiting:        2   20   3.1     20      44
Total:          2   20   3.1     20      44

Percentage of the requests served within a certain time (ms)
  50%     20
  66%     20
  75%     20
  80%     20
  90%     20
  95%     24
  98%     33
  99%     37
 100%     44 (longest request)
 
## Inspiration
http://jsonapi.org/
https://medium.com/@tech_fort/an-introduction-to-lokijs-the-idiomatic-way-d24a4c546f7
https://www.mapbox.com/blog/scaling-the-mapbox-infrastructure-with-dynamodb-streams/
http://www.allthingsdistributed.com/2015/07/dynamodb-streams.html

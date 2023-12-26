# 우리나라는 몇 위?

크롤링을 통해 2020 도쿄 올림픽 순위를 알아보는 과제입니다.

## 백엔드 실행 방법

1. mongodb compass로 local 포트 27017을 실행한 뒤, medal.country라는 database를 만듭니다.
   
2. `crawling.py`를 실행해 db에 데이터를 저장합니다.

   ```bash
   python crawling.py
   
3. `makeapi.py`를 실행해 5000번 포트에 프론트엔드에 데이터를 보내줄 api를 생성합니다

   ```bash
   python makeapi.py

## 프론트엔드 실행 방법

1. 필요한 패키지를 설치 후 3000번 포트를 가동합니다.

   ```bash
   npm start

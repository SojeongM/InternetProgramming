from bs4 import BeautifulSoup
import requests
from selenium.webdriver.common.by import By
from selenium import webdriver
from pymongo import MongoClient



# 홈페이지 주소 가져오기
url = "https://gsic.sports.or.kr/com/cop/game/game_info.do?partCode=1"

driver = webdriver.Chrome()

driver.get(url)
soup = BeautifulSoup(driver.page_source,'html.parser')
# result = driver.find_element(By.TAG_NAME, "p")
# print(result)

data =soup.select('tr')

crawled_data_xpath = driver.find_element(By.XPATH, '//*[@id="content"]/div[7]/div/table/tbody')
crawled_data = crawled_data_xpath.text

lines = crawled_data.split('\n')
medal_data = []

#
for line in lines:
    data = line.split()
    if len(data) > 0:
        # 나라 이름 부분을 제외한 나머지 데이터에 대해 처리
        country_name = ''
        medal_data_row = [data[0]]  # 첫 번째 열 (순위) 추가
        for i, element in enumerate(data[1:]):
            # 숫자가 아니면 나라 이름에 더함
            if not element.isdigit():
                country_name += ' ' + element
            else:
                medal_data_row.append(country_name.strip())  # 나라 이름 추가
                medal_data_row.extend(data[i+1:])  # 나머지 데이터 추가
                medal_data.append(medal_data_row)  # 행 추가
                break  # 숫자를 만나면 반복 종료


# MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['medal']  # 여기에 데이터베이스 이름을 입력하세요
collection = db['country']


for data in medal_data:
    # MongoDB에 저장할 데이터 구조를 만듭니다.
    document = {
        'Ranking': int(data[0]),
        'Country': data[1],
        'Gold': int(data[2]),
        'Silver': int(data[3]),
        'Bronze': int(data[4]),
        'Total': int(data[5])
    }

    print(data)
    collection.insert_one(document)

client.close()


driver.quit()
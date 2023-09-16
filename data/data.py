from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

import csv
csv_file = 'history.csv'
csv_copy_file = 'history_copy.csv'
store_names = []

with open(csv_file, 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        store_name = row[2]
        store_names.append(store_name)

csv_file1 = 'food.csv'
csv_file2 = 'cafe.csv'
csv_file3 = 'transport.csv'
csv_file4 = 'study.csv'
csv_file5 = 'culture.csv'

# 학습 데이터: 가게 이름과 해당 카테고리 리스트
train_data = [
    ("맛있는 스시집", "음식"),
    ("모카 커피숍", "카페"),
    ("미술 갤러리 워크스페이스", "문화"),
    ("수학 학원 성공가도", "학습"),
    ("서울 버스 터미널","교통"),
    ("택시","교통"),
    ("버스","교통"),
    ("지하철","교통"),
    ("기차","교통"),
    ("더치페이", "기타"),
    ("송금", "기타"),
]
with open(csv_file1, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        store_name = row['상호명']
        if store_name:
            train_data.append((store_name, "음식"))

with open(csv_file2, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        store_name = row['상호명']
        if store_name:
            train_data.append((store_name, "카페"))

with open(csv_file3, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        store_name = row["Transportation"]
        if store_name:
            train_data.append((store_name, "교통"))

with open(csv_file4, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        store_name = row["상호명"]
        if store_name:
            train_data.append((store_name, "학습"))

with open(csv_file4, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        store_name = row["상호명"]
        if store_name:
            train_data.append((store_name, "학습"))

with open(csv_file5, 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        store_name = row[1]
        if store_name:  # 빈 값이 아닌 경우
            train_data.append((store_name, "문화"))
print(len(train_data))


train_names = [name for name, category in train_data]
train_categories = [category for name, category in train_data]

# 모델 생성 및 학습
model = make_pipeline(TfidfVectorizer(), MultinomialNB())
model.fit(train_names, train_categories)

# 예측 수행: 새로운 가게 이름으로 카테고리 예측
def predict_category(s, model=model, threshold=0.3):
    pred_prob = model.predict_proba([s])
    max_prob = max(pred_prob[0])
    if max_prob < threshold:
        return "기타"
    else:
        pred = model.predict([s])
        return pred[0]

results = []

with open(csv_file, 'r') as file:
    reader = csv.reader(file)
    headers = next(reader)  # 헤더 행 읽기
    headers.insert(3, 'Predicted_Category')  # 새로운 열 이름을 원하는 위치에 추가
    results.append(headers)  # 결과 리스트에 헤더 행 추가

    for row in reader:
        store_name = row[2]
        predicted_category = predict_category(store_name, threshold=0.28)
        print(f"가게 이름: {store_name}, 예측된 카테고리: {predicted_category}")
        row.insert(3, predicted_category)  # 예측된 위치에 추가
        results.append(row)

# 새로운 CSV 파일에 결과 저장
with open(csv_copy_file, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(results)


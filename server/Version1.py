from flask import Flask,jsonify
from flask_cors import CORS, cross_origin
from flask import request
import base64
import os
import cv2 as cv
import face_recognition as fr 
import shutil
import csv
from unidecode import unidecode
import numpy as np
import base64
import json


# Khởi tạo Flask Server Backend
app = Flask(__name__)

# Apply Flask CORS
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def convert_base64_to_image(image_base64):
    try:
        image_base64 = np.fromstring(base64.b64decode(image_base64), dtype=np.uint8)
        image_base64 = cv.imdecode(image_base64, cv.IMREAD_ANYCOLOR)
    except:
        return None
    return image_base64
    
def load_target_image():
    load_image = "server/check_image.jpg"
    target_image = fr.load_image_file(load_image)
    target_encoding = fr.face_encodings(target_image)
    return target_image,target_encoding

def encode_faces(folder):
    list_people_encoding = []
    for filename in os.listdir(folder):
        known_image = fr.load_image_file(f'{folder}{filename}')
        known_encoding = fr.face_encodings(known_image)[0]
        list_people_encoding.append((known_encoding,filename))
    return list_people_encoding

@app.route('/change_no_check', methods=['POST'])
@cross_origin(origin='*')
def change_no_check():
    data = request.json
    IdNoExtract = data["IdNoExtract"]
    with open('server/people_data.csv', mode='r', encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        rows = list(reader)
    no_change =  int(rows[IdNoExtract][5]) - 1 
    rows[IdNoExtract][5] = str(no_change)
    with open('server/people_data.csv', mode='w', newline='',encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)
    value = {
            "lock": 6,
            "content":"changed"
            }
    return json.dumps(value)
    
    
@app.route('/compare_face', methods=['POST'])
@cross_origin(origin='*')
def compare_face():
    # Lưu ảnh
    data = request.json
    image_base64 = data['image_base64']
    imgData = base64.b64decode(str(image_base64))
    
    filenameImage = 'server/check_image.jpg'
    with open(filenameImage, 'wb') as f:
        f.write(imgData)
        
    image_num = fr.load_image_file(filenameImage)
    face_location = fr.face_locations(image_num)
    if len(face_location) == 0:
        value = {
            "lock": 0,
            "content": "No person, try again!"
        }
        return jsonify(value)
        
    elif len(face_location) > 1:
        value = {
            "lock": 1,
            "content": "At the same time, only one person can check!"
        }
        return jsonify(value)
        
    else:
        target_image, target_encoding = load_target_image()
        count_person_zero = 0
        is_target_face_list = []
        
        for person in encode_faces("server/people_checked/"):
            encoded_faces = person[0]
            filename = person[1]
            is_target_face = fr.compare_faces(encoded_faces, target_encoding, tolerance = 0.5)
            if is_target_face == [True]:
                is_target_face_list.append(True)
                id_no_extract = int(filename[0])
                with open("server/people_data.csv",newline="",encoding='utf-8') as csvfile:
                    reader = csv.reader(csvfile)
                    row_id_no_extract = None
                    for i, row in enumerate(reader):
                        if i == (id_no_extract):
                            row_id_no_extract = row
                            break
                    if row_id_no_extract is not None:
                        fullname_exist = str(row_id_no_extract[1])
                        row_id_no_extract[5] = int(int(row_id_no_extract[5]) + 1)
                        checkin_info_number = row_id_no_extract[5]
                        with open('server/people_data.csv', mode='r', encoding="utf-8") as csvfile:
                            reader = csv.reader(csvfile)
                            rows = list(reader)
                        rows[id_no_extract][5] = checkin_info_number
                        
                        with open('server/people_data.csv', mode='w', newline='',encoding="utf-8") as csvfile:
                            writer = csv.writer(csvfile)
                            writer.writerows(rows)
                        # Create Dictionary
                        with open('server/people_data.csv',  'r', encoding='utf-8') as f:
                            num_rows_id = len(f.readlines())
                        value = {
                            "lock": 2,
                            "fullname": fullname_exist,
                            "checkin_info_number": checkin_info_number,
                            "id_no_extract":id_no_extract,
                            "number_id": num_rows_id,
                        }
                        return json.dumps(value)
            
        if count_person_zero == len(is_target_face_list):
            with open('server/people_data.csv',  'r', encoding='utf-8') as f:
                num_rows_id = len(f.readlines())
                
            value = {
                "lock": 3,
                "number_id": num_rows_id
            }
            
            return jsonify(value)

@app.route('/save_new_people', methods=['POST'])
@cross_origin(origin='*')
def save_new_people():
    data = request.json
    number_id_save = data['number_id']
    name_save = data['name_']
    birthday_save = data['birthday']
    phone_save = data['phone']
    major_save = data['major']  
    
    if not all([number_id_save, name_save, birthday_save, phone_save, major_save]):
        return jsonify(error="Missing required fields")
    else:
        #Save information
        with open('server/people_data.csv', mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(list([number_id_save, name_save, birthday_save, phone_save, major_save,int(1)]))
        
        if not os.path.exists("server/people_checked"):
            os.makedirs("server/people_checked")
        
        # Copy image
        file_path = "server/check_image.jpg"
        file_path_dst = "server/people_checked/check_image_copy.jpg"
        shutil.copy(file_path, file_path_dst)
        
        #handle name image -> save
        name_handle = unidecode(name_save).replace(" ", "").lower()
        current_name = "server/people_checked/check_image_copy.jpg"
        new_name = "server/people_checked/" + str(number_id_save) + "_" + name_handle + ".jpg"
        os.rename(current_name, new_name)
    
        content = "Saved"
        value = {
            "lock": 5,
            "content": content
        }
        return jsonify(value)
    
@app.route('/signup_advise', methods=['POST'])
@cross_origin(origin='*')
def signup_advise():
    data = request.json
    name = data['name_']
    phone = data['phone']
    email = data['email']
    birthday = data['birthday']
    province = data['province']
    school = data['school']
    major = data['major'] 
    with open('server/signup_advise.csv',  'r', encoding='utf-8') as f:
        id = len(f.readlines())
    with open('server/signup_advise.csv', mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(list([str(int(id)+ 1), str(name), str(phone), str(email), str(birthday),str(province),str(school),str(major)]))
    content = "Saved"
    value = {
        "lock": 7,
        "content": content
    }
    return jsonify(value)

# Start Backend
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)























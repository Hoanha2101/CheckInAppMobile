# from ultralytics import YOLO
# import cv2

# model = YOLO("server/yolov8n-face.pt")

# img = cv2.imread("server/people_checked/A.jpg")
# # img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
# results = model(img, classes = 0, conf = 0.5)

# for result in results[0]:
#     boxes = result.boxes.cpu().numpy() 
#     for i in range(len(boxes)):
#         box = boxes[i]
#         if box.cls[0] == 0:
#             x_min, y_min, x_max, y_max = map(int,(box.xyxy[0][0], box.xyxy[0][1], box.xyxy[0][2], box.xyxy[0][3]))
#             cv2.rectangle(img, (x_min - 10 ,y_min - 20), (x_max + 10,y_max + 10), (0, 255, 255), thickness=2)

# cv2.imshow("ggg",img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()


from ultralytics import YOLO
import cv2
import os
import  numpy as np
import tensorflow as tf
import pickle
from keras_facenet import FaceNet

# model = YOLO("server/yolov8n-face.pt")
# model_Ex = FaceNet().model
# folder = os.listdir("server/people_checked")


# def img_to_encoding(image_path, model_Ex):
#     img = tf.keras.preprocessing.image.load_img(image_path, target_size=(400,400))
#     img = np.around(np.array(img) / 255.0, decimals=12)
#     x_train = np.expand_dims(img, axis=0)
#     embedding = model_Ex.predict_on_batch(x_train)
#     return embedding / np.linalg.norm(embedding, ord=2)

# database = {}

# for file_no in range(len(folder)):
#     path = os.path.join("server/people_checked",folder[file_no])
#     img = cv2.imread(path)
#     results = model(img, classes = 0)

#     for result in results[0]:
#         boxes = result.boxes.cpu().numpy() 
#         for i in range(len(boxes)):
#             box = boxes[i]
#             if box.cls[0] == 0:
#                 x_min, y_min, x_max, y_max = map(int,(box.xyxy[0][0], box.xyxy[0][1], box.xyxy[0][2], box.xyxy[0][3]))
#                 # cv2.rectangle(img, (x_min - 10 ,y_min - 20), (x_max + 10,y_max + 10), (0, 255, 255), thickness=2)
#                 CUT_IMG = img[y_min-50:y_max + 30,x_min-50:x_max +50]
#                 name = "server/CUT/" + str(folder[file_no])
#                 cv2.imwrite(name,CUT_IMG)
                
#                 database[folder[file_no][:-4]] = img_to_encoding(name, model_Ex)


# # Lưu database vào tệp data.pickle
# with open('server/data.pickle', 'wb') as handle:
#     pickle.dump(database, handle, protocol=pickle.HIGHEST_PROTOCOL)

# Đọc database từ tệp data.pickle
with open('server/data.pickle', 'rb') as handle:
    loaded_database = pickle.load(handle)
print(list(loaded_database.keys()))
      




import requests, os, io, json, base64
from pathlib import Path
import pymongo 
from PIL import Image
from bson import Binary
import matplotlib.pyplot as plt
from bson.objectid import ObjectId


client = pymongo.MongoClient(
"mongodb+srv://user:fqg78pXPCpt8dtk@cluster0.xzh33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.test

# Database Name 
db = client["images"] 
  
# Collection Name 
collection = db["urlsave"] 
# print(collection)


# filename='/home/dmytro/Projects/eleks_practice/label/keras-multi-label/dataset/categories/pink_skirt/000003.jpg'
# img = Image.open(filename)
# imgByteArr = io.BytesIO()
# img.save(imgByteArr, format='PNG')
# imgByteArr = imgByteArr.getvalue()




# with open(filename, "rb") as imageFile:
#     image_in_str = base64.b64encode(imageFile.read())
#     emp_rec1 = { 
#         "name":"skirt", 
#         "percent":88,
#         "imageName":os.path.basename(filename),
#         "img":image_in_str
#         }
#     rec_id1 = collection.insert_one(emp_rec1).inserted_id # save this in DB

# obj_id_to_find = ObjectId("6035a25d3d76e8699e29821a")
# x = collection.find({"_id": obj_id_to_find}) 

# for data in x:
#     # imageName = data['imageName']
#     getTags = data['tags']
#     print(getTags)
#     with open(imageName, "wb") as f:
#         f.write(base64.decodestring(getImage))




allDataFromImages = dict()
images_with_bags = dict()
images_with_hats = dict()
images_with_coats = dict()
images_with_dresses = dict()
images_with_pants = dict()
images_with_shoes = dict()
images_with_shorts = dict()
images_with_skirts = dict()
images_with_sweater = dict()
images_with_tshirts = dict()



# jsonFolder = 'json_data/'

headers = {
    "Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb",
    "DbName": "images",
    "CollName": "filters",
}


dirName = '/home/dmytro/Projects/eleks_practice/label/keras-multi-label/dataset/dataset_for_site/hats/'

pathlist = Path(dirName).glob('**/*.*')


for file in pathlist:
    filename = os.fsdecode(file)
    if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"): 

        url = 'http://0.0.0.0:5000/predict'
        files = {'image': open(filename, 'rb')}
        r = requests.post(url, files=files, headers=headers)
        data = r.json()
        print(data)
        
        allDataFromImages[filename] = data


        img = Image.open(filename)
        imgByteArr = io.BytesIO()
        img.save(imgByteArr, format='PNG')
        imgByteArr = imgByteArr.getvalue()

        with open(filename, "rb") as imageFile:
            image_in_str = base64.b64encode(imageFile.read()).decode('ascii')
            # print(image_in_str)
            emp_rec1 = { 
                "item": 'hats',
                "tags":data['tags'],
                "imageName":os.path.basename(filename),
                "img":image_in_str
                }
            rec_id1 = collection.insert_one(emp_rec1).inserted_id

        # if 'bags' in data:
        #     images_with_bags[filename] = data
            
        # if 'hat' in data:
        #     images_with_hats[filename] = data
        # if 'coat' in data:
        #     images_with_coats[filename] = data
        # if 'dress' in data:
        #     images_with_dresses[filename] = data
        # if 'pants' in data:
        #     images_with_pants[filename] = data
        # if 'shoes' in data:
        #     images_with_shoes[filename] = data
        # if 'shorts' in data:
        #     images_with_shorts[filename] = data
        # if 'skirt' in data:
        #     images_with_skirts[filename] = data
        # if 'sweater' in data:
        #     images_with_sweater[filename] = data
        # if 't-short' in data:
        #     images_with_tshirts[filename] = data
            
    else:
        print('Wrong file!!!')




# with open(jsonFolder+'images_with_bags.txt', 'w') as outfile:
#     json.dump(images_with_bags, outfile)
# with open(jsonFolder+'images_with_hats.txt', 'w') as outfile:
#     json.dump(images_with_hats, outfile)
# with open(jsonFolder+'images_with_coats.txt', 'w') as outfile:
#     json.dump(images_with_coats, outfile)
# with open(jsonFolder+'images_with_dresses.txt', 'w') as outfile:
#     json.dump(images_with_dresses, outfile)
# with open(jsonFolder+'images_with_pants.txt', 'w') as outfile:
#     json.dump(images_with_pants, outfile)
# with open(jsonFolder+'images_with_shorts.txt', 'w') as outfile:
#     json.dump(images_with_shorts, outfile)
# with open(jsonFolder+'images_with_skirts.txt', 'w') as outfile:
#     json.dump(images_with_skirts, outfile)
# with open(jsonFolder+'images_with_sweater.txt', 'w') as outfile:
#     json.dump(images_with_sweater, outfile)
# with open(jsonFolder+'images_with_tshorts.txt', 'w') as outfile:
#     json.dump(images_with_tshirts, outfile)

import requests, os, io, json, base64, pymongo, random
from pathlib import Path
from PIL import Image
from bson import Binary
import matplotlib.pyplot as plt


client = pymongo.MongoClient(
"mongodb+srv://user:fqg78pXPCpt8dtk@cluster0.xzh33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# db = client.test
# Database Name 
db = client["images"] 
  # Collection Name 
collection = db["filters"] 


# filename='/home/dmytro/Projects/eleks_practice/label/keras-multi-label/dataset/dataset_for_site/t-shirts/194.jpg'
# headers = {
#     "Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb",
# }
# inputTags = dict()
# filename = os.fsdecode(filename)
# url = 'https://flask-models-n6vwx54efa-uc.a.run.app/predict'
# files = {'image': open(filename, 'rb')}
# r = requests.post(url, files=files, headers=headers)
# inputTags = r.json()
# print('/predict', inputTags)











headers = {
    "Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb",
    "DbName": "images",
    "CollName": "filters",
    "InputImageID": "603e08779872d44c1c719a41",
    "SecondBody": ''
}

body = {
    'item': 'shoes',
    'tags': ['shoes', 'black', 'sporty', 'man', 'woman', 'casual']
}

# url_rec = 'https://flask-models-n6vwx54efa-uc.a.run.app/recommend'
url_rec = 'http://0.0.0.0:5000/recommend'
rec = requests.post(url_rec, json = body, headers=headers)
print(rec.json())















# getData = rec

# print("{", end ="")
# for k,v in getData.items():
#     print(str(k) + ": " + str(v))
# print("}")


# print(inputTags)

#coats  >=  33
#pants  >=  50
#skirts  >=  50
#t-shirts  >=  70
#sweaters  >=  50

def get_all_tags():
    itemTags = {}

    analyzedImage = 'shoes'
    
    look1 = {'shoes': 50, 'dresses': 50, 'coats': 50, 'pants': 50, 'shorts': 70, 'sweaters': 50, 't-shirts': 70, 'bags': 30 }

    neededItems={}

    # for clothElement, similarity in look1.items():
    #     neededItems[clothElement] = []
    #     x = collection.find({'name': clothElement})
    #     for data in x:
    #         # print(data)
    #         itemID = data['_id']
    #         filterName = data['name']
    #         imageName = data['imageName']
    #         getImage = data['img']
    #         getTags = data['tags']
    #         for v in getData:
    #             res = format((len(set(v) & set(getTags)) / float(len(set(v) | set(getTags))) * 100), ".0f")
    #             # print("Similarity is = " + str(res) + ' | ' + str(getTags))
    #             if(int(res) >= similarity):
    #                 neededItems[clothElement].append(itemID)
    #                 itemTags[itemID] = getTags
    #                 os.makedirs(filterName, exist_ok=True)
    #                 with open(filterName + '/' + imageName, "wb") as f:
    #                     f.write(base64.decodestring(getImage))
    
    # create_looks_from_single_item(neededItems, analyzedImage)

# def create_looks_from_single_item(neededItems, analyzedImage):
#     shoes = {'look1': ["pants", "t-shirts"], 'look2': ["pants", "sweaters"], 'look3': ["shorts", "t-shirts"]}
#     dresses = {'look1': ["shoes", "bags"], 'look2': ["shoes", "bags"], 'look3': ["shoes", "coats"]}
#     coats = {'look1': ["shoes", "pants", "sweaters"], 'look2': ["shoes", "pants", "t-shirts"], 'look3': ["shoes", "pants", "sweaters"]}
#     pants = {'look1': ["shoes", "t-shirts"], 'look2': ["shoes", "sweaters"], 'look3': ["shoes", "sweaters", "coats"]}
#     shorts = {'look1': ["shoes", "t-shirts"], 'look2': ["shoes", "t-shirts"], 'look3': ["shoes", "t-shirts"]}
#     sweaters = {'look1': ["shoes", "pants"], 'look2': ["shoes", "pants"], 'look3': ["shoes", "pants", "coats"]}
#     t_shirts = {'look1': ["shoes", "pants"], 'look2': ["shoes", "pants"], 'look3': ["shoes", "shorts"]}
#     look = {}
    

#     if(analyzedImage=="shoes"):
#         generate_random_look(shoes, neededItems, look)
#     if(analyzedImage=="dresses"):
#         generate_random_look(dresses, neededItems, look)
#     if(analyzedImage=="coats"):
#         generate_random_look(coats, neededItems, look)
#     if(analyzedImage=="pants"):
#         generate_random_look(pants, neededItems, look)
#     if(analyzedImage=="shorts"):
#         generate_random_look(shorts, neededItems, look)
#     if(analyzedImage=="t_shirts"):
#         generate_random_look(t_shirts, neededItems, look)
#     if(analyzedImage=="sweaters"):
#         generate_random_look(sweaters, neededItems, look)
    # if(analyzedImage=="skirts"):
    #     generate_random_look(shoes, neededItems, look)

#     for k,v in look.items():
#         print(str(k) + ": " + str(v))


# def generate_random_look(item, neededItems, look):
#     for k,v in item.items():
#         look[k] = []
#         look[k].append('loadedImageID')
#         for s in v:
#             if(neededItems[s]==[]):
#                 look[k].append("Items doesn't fit!")
#             else:
#                 rand_choice = random.choice(neededItems[s])
#                 look[k].append(rand_choice)
                
#                 x = collection.find({'_id': rand_choice})
#                 for data in x:
#                     filterName = data['name']
#                     imageName = data['imageName']
#                     getImage = data['img']
                    
#                     os.makedirs(k, exist_ok=True)
#                     with open(k + '/' + imageName, "wb") as f:
#                         f.write(base64.decodestring(getImage))


if __name__ == "__main__":
	get_all_tags()
    # create_looks()
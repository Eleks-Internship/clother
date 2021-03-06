# USAGE
# Start the server:
# 	python flask_deploy.py
# Submit a request via cURL:
# 	curl -X POST -F image=@dog.jpg 'http://0.0.0.0:5000/predict'

# import the necessary packages
from keras.preprocessing.image import img_to_array, load_img
from keras.models import load_model
from bson.objectid import ObjectId
from PIL import Image
import numpy as np
import pickle, cv2, os, io, flask, pymongo, random	


app = flask.Flask(__name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['IMAGE_UPLOADS'] = os.path.join(APP_ROOT, 'uploads')
model_cat = None
model_sty = None
model_rec = None


@app.route("/predict", methods=["POST"])
def predict():
	# ensure an image was properly uploaded to our endpoint
	res={}
	result_5={}
	res["feedback"] = []
	if flask.request.method == "POST":
		if (flask.request.headers.get("Authorization") == "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb"):
			if flask.request.files.get("image"):
				
				result_5['item'] = []
				result_5['tags'] = []
				res["predictions"] = []
				# read the image in PIL format	
				image = flask.request.files["image"]
				filename = image.filename
				file_path = os.path.join(app.config["IMAGE_UPLOADS"], filename)
				image_pil = Image.open(image)
				image_pil.save(file_path)
				image = load_img(file_path, target_size=(96,96))
				image = cv2.imread(file_path)
				image = cv2.resize(image, (96, 96))
				image = image.astype("float") / 255.0
				image = img_to_array(image)
				image = np.expand_dims(image, axis=0)

				# classify the input image then find the indexes of the two class
				# labels with the *largest* probability
				print("[INFO] classifying image...")
				proba_cat = model_cat.predict(image)[0]
				idxs_cat = np.argsort(proba_cat)[::-1][:2]  # return 2 results from categories model
				proba_sty = model_sty.predict(image)[0]
				idxs_sty = np.argsort(proba_sty)[::-1][:4]  # return 4 results from styles model
				proba_rec = model_rec.predict(image)[0]
				idxs_rec = np.argsort(proba_rec)[::-1][:1]  # return 2 results from categories model


				# loop over the indexes of the high confidence class labels
				for (i, j) in enumerate(idxs_rec):
					# build the label and draw the label on the image
					# result_5.append("{}: {:.2f}%".format(mlb_cat.classes_[j], proba_cat[j] * 100))
					if(mlb_rec.classes_[j] == 't-shirts'):
						result_5['item'] = 't_shirts'
					else:
						result_5['item'] = mlb_rec.classes_[j]


				# loop over the indexes of the high confidence class labels
				for (i, j) in enumerate(idxs_cat):
					# build the label and draw the label on the image
					# result_5.append("{}: {:.2f}%".format(mlb_cat.classes_[j], proba_cat[j] * 100))
					result_5['tags'].append(mlb_cat.classes_[j])
					# r = {"label": "{}".format(mlb_cat.classes_[j]), "probability": "{:.2f}".format(proba_cat[j] * 100)}
					# res["predictions"].append(r)
				# loop over the indexes of the high confidence class labels
				for (i, j) in enumerate(idxs_sty):
					# build the label and draw the label on the image
					# result_5.append("{}: {:.2f}%".format(mlb_sty.classes_[j], proba_sty[j] * 100))
					result_5['tags'].append(mlb_sty.classes_[j])
					# r = {"label": "{}".format(mlb_sty.classes_[j]), "probability": "{:.2f}".format(proba_sty[j] * 100)}
					# res["predictions"].append(r)
			else:
				res['feedback'].append("Flask doesn't get image")
		else:
			res['feedback'].append("Authorization token is wrong")
	else: 
		res['feedback'].append("Request isn`t POST")

	# return the data dictionary as a JSON response
	print(result_5)
	return flask.jsonify(result_5)
	# return flask.jsonify(res)


@app.route("/recommend", methods=["POST"])
def recommend():
	# ensure an image was properly uploaded to our endpoint
	res={}
	res["feedback"] = []
	if flask.request.method == "POST":
		if (flask.request.headers.get("Authorization") == "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb"):
			itemTags = []
			recommended_items = {}
			item = ''
			look = {}

			databaseName = flask.request.headers.get("DbName")
			collectionName = flask.request.headers.get("CollName")
			InputImageID = flask.request.headers.get("InputImageID")

			print('JSON body', flask.request.get_json())
			if(flask.request.get_json()):
				FromBody=flask.request.get_json()
				print(FromBody)
				item = FromBody['item']
				itemTags = FromBody['tags']

			# Connect to DataBase
			client = pymongo.MongoClient("mongodb+srv://user:fqg78pXPCpt8dtk@cluster0.xzh33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
			# Database Name 
			db = client[databaseName] 
			# Collection Name 
			collection = db[collectionName]

			obj_id_to_find = ObjectId(InputImageID)
			x = collection.find({"_id": obj_id_to_find}) 

			for data in x:
				item = data['item']
				itemTags = data['tags']
			
			if(databaseName == 'images' and InputImageID == 'filters'):
				look1 = {'shoes': 10, 'dresses': 10, 'hats': 10, 'coats': 10, 'pants': 10, 'shorts': 10, 'sweaters': 10, 't_shirts': 10, 'bags': 10 }
			else:
				look1 = {'shoes': 0, 'dresses': 0, 'hats': 0, 'coats': 0, 'pants': 0, 'shorts': 0, 'sweaters': 0, 't_shirts': 0, 'bags': 0 }

			neededItems={}

			for clothElement, similarity in look1.items():
				neededItems[clothElement] = []
				x = collection.find({'item': clothElement})
				for data in x:
					itemID = data['_id']
					getTags = data['tags']
					res = format((len(set(itemTags) & set(getTags)) / float(len(set(itemTags) | set(getTags))) * 100), ".0f")
					# print("Similarity is = " + str(res) + ' | ' + str(itemTags) + ' | ' + str(getTags))
					if(int(res) >= similarity):
						neededItems[clothElement].append(itemID)
			
			create_looks_from_single_item(neededItems, look, item, collection, InputImageID)
		else:
			res['feedback'].append("Authorization token is wrong")
		
	else: 
		res['feedback'].append("Request isn`t POST")

	# return the data dictionary as a JSON response
	print(look)
	return flask.jsonify(look)
	
def create_looks_from_single_item(neededItems, look, item, collection, InputImageID):
	shoes = {'look1': ["pants", "t_shirts"], 'look2': ["pants", "sweaters"], 'look3': ["shorts", "t_shirts", "hats"]}
	dresses = {'look1': ["shoes", "bags"], 'look2': ["shoes", "bags"], 'look3': ["shoes", "coats"]}
	coats = {'look1': ["shoes", "pants", "sweaters"], 'look2': ["shoes", "pants", "t_shirts"], 'look3': ["shoes", "pants", "sweaters"]}
	pants = {'look1': ["shoes", "t_shirts"], 'look2': ["shoes", "sweaters"], 'look3': ["shoes", "sweaters", "coats"]}
	shorts = {'look1': ["shoes", "t_shirts"], 'look2': ["shoes", "t_shirts"], 'look3': ["shoes", "t_shirts"]}
	sweaters = {'look1': ["shoes", "pants"], 'look2': ["shoes", "pants"], 'look3': ["shoes", "pants", "coats"]}
	t_shirts = {'look1': ["shoes", "pants"], 'look2': ["shoes", "pants"], 'look3': ["shoes", "shorts"]}

	if(item=="shoes"):
		generate_random_look(shoes, neededItems, look, collection, InputImageID)
	if(item=="dresses"):
		generate_random_look(dresses, neededItems, look, collection, InputImageID)
	if(item=="coats"):
		generate_random_look(coats, neededItems, look, collection, InputImageID)
	if(item=="pants"):
		generate_random_look(pants, neededItems, look, collection, InputImageID)
	if(item=="shorts"):
		generate_random_look(shorts, neededItems, look, collection, InputImageID)
	if(item=="t_shirts"):
		generate_random_look(t_shirts, neededItems, look, collection, InputImageID)
	if(item=="sweaters"):
		generate_random_look(sweaters, neededItems, look, collection, InputImageID)

	# if(item=="skirts"):
	#     generate_random_look(shoes, neededItems, look, collection, InputImageID)
	return(look)
	
	
def generate_random_look(item, neededItems, look, collection, InputImageID):
	for k,v in item.items():
		look[k] = []
		look[k].append(InputImageID)
		for s in v:
			if(neededItems[s]==[]):
				look[k].append("Items doesn't fit!")
			else:
				rand_choice = random.choice(neededItems[s])
				look[k].append(str(rand_choice))


@app.route("/")
def start():
	return "Hello, server works properly! \n Have a nice day)"


def load_models():
	global model_cat
	model_cat = load_model(APP_ROOT+"/models/categories_40_epochs.model")
	global mlb_cat
	mlb_cat = pickle.loads(open(APP_ROOT+"/models/categories_40_epochs.pickle", "rb").read())
	global model_sty
	model_sty = load_model(APP_ROOT+"/models/styles_40_epochs.model")
	global mlb_sty
	mlb_sty = pickle.loads(open(APP_ROOT+"/models/styles_40_epochs.pickle", "rb").read())
	global model_rec
	model_rec = load_model(APP_ROOT+"/models/cloth_recognition.model")
	global mlb_rec
	mlb_rec = pickle.loads(open(APP_ROOT+"/models/cloth_recognition.pickle", "rb").read())
	print("Models loaded successfully!")


if __name__ == "__main__":
	print(("* Loading Keras model and Flask starting server..."
		"please wait until server has fully started"))
	load_models()
	app.run(host='0.0.0.0', threaded=False, debug=False)


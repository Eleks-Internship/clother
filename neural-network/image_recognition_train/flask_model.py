# USAGE
# Start the server:
# 	python app.py
# Submit a request via cURL:
# 	curl -X POST -F image=@dog.jpg 'http://localhost:5000/predict'

# import the necessary packages
from keras.preprocessing.image import img_to_array, load_img
from keras.applications import ResNet50, imagenet_utils
from keras.models import load_model
from PIL import Image
import numpy as np
import argparse
import imutils
import pickle
import cv2
import os
import io
import flask

app = flask.Flask(__name__)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['IMAGE_UPLOADS'] = os.path.join(APP_ROOT, 'uploads')
model_cat = None
model_sty = None


def load_models():
	global model_cat
	model_cat = load_model(APP_ROOT+"/categories_40_epochs.model")
	global mlb_cat
	mlb_cat = pickle.loads(open(APP_ROOT+"/categories_40_epochs.pickle", "rb").read())
	global model_sty
	model_sty = load_model(APP_ROOT+"/styles_40_epochs.model")
	global mlb_sty
	mlb_sty = pickle.loads(open(APP_ROOT+"/styles_40_epochs.pickle", "rb").read())
	print("Models loaded successfully!")



@app.route("/predict", methods=["POST"])
def predict():
	# initialize the data dictionary that will be returned from the view
	result_all=[]
	result_5=[]

	# ensure an image was properly uploaded to our endpoint
	if flask.request.method == "POST":
		if flask.request.files.get("image"):
			
			# read the image in PIL format	
			image = flask.request.files["image"]
			filename = image.filename
			file_path = os.path.join(app.config["IMAGE_UPLOADS"], filename)
			image_pil = Image.open(image)
			image_pil.save(file_path)
			# print("filename", filename)
			# image = image.read()
			# image = Image.open(io.BytesIO(image))

			image = load_img(file_path, target_size=(96,96))

			image = cv2.imread(file_path)
			image = cv2.resize(image, (96, 96))
			image = image.astype("float") / 255.0
			image = img_to_array(image)
			image = np.expand_dims(image, axis=0)
			# print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", image)

			# classify the input image then find the indexes of the two class
			# labels with the *largest* probability
			print("[INFO] classifying image...")
			proba_cat = model_cat.predict(image)[0]
			idxs_cat = np.argsort(proba_cat)[::-1][:2]
			proba_sty = model_sty.predict(image)[0]
			idxs_sty = np.argsort(proba_sty)[::-1][:5]


			# show the probabilities for each of the individual labels
			for (label_cat, p) in zip(mlb_cat.classes_, proba_cat):
				result_all.append("{}: {:.2f}%".format(label_cat, p * 100))

			# show the probabilities for each of the individual labels
			for (label_sty, p) in zip(mlb_sty.classes_, proba_sty):
				result_all.append("{}: {:.2f}%".format(label_sty, p * 100))

			# loop over the indexes of the high confidence class labels
			for (i, j) in enumerate(idxs_cat):
				# build the label and draw the label on the image
				result_5.append("{}: {:.2f}%".format(mlb_cat.classes_[j], proba_cat[j] * 100))
			
			# loop over the indexes of the high confidence class labels
			for (i, j) in enumerate(idxs_sty):
				# build the label and draw the label on the image
				result_5.append("{}: {:.2f}%".format(mlb_sty.classes_[j], proba_sty[j] * 100))



			# # classify the input image and then initialize the list
			# # of predictions to return to the client
			# with graph.as_default():
			# 	preds = model.predict(image)
			# 	results = imagenet_utils.decode_predictions(preds)
			# 	data["predictions"] = []

			# 	# loop over the results and add them to the list of
			# 	# returned predictions
			# 	for (imagenetID, label, prob) in results[0]:
			# 		r = {"label": label, "probability": float(prob)}
			# 		data["predictions"].append(r)

				# indicate that the request was a success

	# return the data dictionary as a JSON response
	return flask.jsonify(result_5)


@app.route("/")
def start():
	return "Hello World!"


if __name__ == "__main__":
	print(("* Loading Keras model and Flask starting server..."
		"please wait until server has fully started"))
	load_models()
	app.run(host='0.0.0.0', threaded=False, debug=False)


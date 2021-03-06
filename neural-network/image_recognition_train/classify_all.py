# USAGE
# python classify.py --model fashion.model --labelbin mlb.pickle --image examples/example_01.jpg

# import the necessary packages
# pip install scikit-learn==0.21.3
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import numpy as np
import argparse
import imutils
import pickle
import cv2
import os
import io

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
#ap.add_argument("-m", "--model", required=True,
#	help="path to trained model model")
#ap.add_argument("-l", "--labelbin", required=True,
#	help="path to label binarizer")
ap.add_argument("-i", "--image", required=True,
	help="path to input image")
args = vars(ap.parse_args())

# load the image
print(type(args["image"]))
image = cv2.imread(args["image"])
output = imutils.resize(image, width=400)
 
# pre-process the image for classification
image = cv2.resize(image, (96, 96))
image = image.astype("float") / 255.0
image = img_to_array(image)
image = np.expand_dims(image, axis=0)

print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", image)


# image = image.resize(96, 96)
# image = img_to_array(image)
# image = np.expand_dims(image, axis=0)
# image = imagenet_utils.preprocess_input(image)


# load the trained convolutional neural network and the multi-label
# binarizer
print("[INFO] loading networks...")
model_cat = load_model("categories_40_epochs.model")
mlb_cat = pickle.loads(open("categories_40_epochs.pickle", "rb").read())
model_sty = load_model("styles_40_epochs.model")
mlb_sty = pickle.loads(open("styles_40_epochs.pickle", "rb").read())

# classify the input image then find the indexes of the two class
# labels with the *largest* probability
print("[INFO] classifying image...")
proba_cat = model_cat.predict(image)[0]
idxs_cat = np.argsort(proba_cat)[::-1][:2]
proba_sty = model_sty.predict(image)[0]
idxs_sty = np.argsort(proba_sty)[::-1][:5]

results=[]
res=[]

# loop over the indexes of the high confidence class labels
for (i, j) in enumerate(idxs_cat):
	# build the label and draw the label on the image
	label_cat = "{}: {:.2f}%".format(mlb_cat.classes_[j], proba_cat[j] * 100)
	cv2.putText(output, label_cat, (10, (i * 30) + 25), 
		cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
	res.append("{}: {:.2f}%".format(mlb_cat.classes_[j], proba_cat[j] * 100))

# show the probabilities for each of the individual labels
for (label_cat, p) in zip(mlb_cat.classes_, proba_cat):
	results.append("{}: {:.2f}%".format(label_cat, p * 100))




# loop over the indexes of the high confidence class labels
for (i, j) in enumerate(idxs_sty):
	# build the label and draw the label on the image
	label_sty = "{}: {:.2f}%".format(mlb_sty.classes_[j], proba_sty[j] * 100)
	cv2.putText(output, label_sty, (10, (i * 30) + 100), 
		cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
	res.append("{}: {:.2f}%".format(mlb_sty.classes_[j], proba_sty[j] * 100))


# show the probabilities for each of the individual labels
for (label_sty, p) in zip(mlb_sty.classes_, proba_sty):
	results.append("{}: {:.2f}%".format(label_sty, p * 100))
#print(results)
print(res)

# show the output image
#cv2.imshow("Output", output)
#cv2.waitKey(0)

# Use an official Python runtime as a parent image
FROM python:3.6.12

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
RUN apt-get update ##[edited]
RUN apt-get install ffmpeg libsm6 libxext6 apt-utils  -y
# Set the working directory to /app
# WORKDIR /flask_model
# Copy the current directory contents into the container at /app
COPY ./flask_model/ /flask_model

# Make port 5000 available to the world outside this container
EXPOSE 5000
# Run app.py when the container launches
CMD ["python", "flask_model/flask_deploy.py"]

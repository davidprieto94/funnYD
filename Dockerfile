FROM python:2.7.11
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN apt-get update && apt-get install -y libgeos-dev
RUN ln -s -T /usr/include/freetype2/ /usr/include/freetype
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /code/
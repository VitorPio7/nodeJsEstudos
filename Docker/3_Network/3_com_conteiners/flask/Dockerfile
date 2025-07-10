FROM python:3

RUN apt-get update -y && \
  apt-get install -y python3 python3-pip

WORKDIR /app

##Conexao com o mysql
RUN  pip install Flask requests flask_mysqldb

COPY . .

EXPOSE 5000

CMD ["python", "./app.py"]
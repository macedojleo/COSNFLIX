from typing import List, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import mysql.connector
import collections

app = Flask(__name__)
CORS(app, support_credentials=True)

def list_movies() -> List[Dict]:
    config = {
        'user': 'admin',
        'password': 'admin',
        'host': 'db_movies',
        'port': '3306',
        'database': 'MOVIES_DB'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM movies')
    rows = cursor.fetchall()
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['id'] = row[0]
        d['name'] = row[1]
        d['image'] = row[2]
        d['link'] = row[3]
        objects_list.append(d)

    cursor.close()
    connection.close()

    return objects_list

def selectID(id) -> List[Dict]:
    config = {
        'user': 'admin',
        'password': 'admin',
        'host': 'db_movies',
        'port': '3306',
        'database': 'MOVIES_DB'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM movies WHERE id=' + id)
    rows = cursor.fetchall()
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['id'] = row[0]
        d['name'] = row[1]
        d['image'] = row[2]
        d['link'] = row[3]
        objects_list.append(d)

    cursor.close()
    connection.close()

    return objects_list


@app.route('/movie')
def index() -> str:
    return jsonify(list_movies())

@app.route('/', methods=['POST'])
def create_task():
    if not request.json:
        return jsonify({'error': "Content-type error"})
    
    movie = request.json['movie']

    return jsonify(selectID(movie))


if __name__ == '__main__':
    app.run(host='0.0.0.0')

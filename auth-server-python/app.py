from typing import List, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import mysql.connector
import collections

app = Flask(__name__)
CORS(app, support_credentials=True)

def list_login(email, password) -> List[Dict]:
    config = {
        'user': 'admin',
        'password': 'admin',
        'host': 'db_auth',
        'port': '3306',
        'database': 'auth'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email='" + email + "' AND password='" + password + "'")
    rows = cursor.fetchall()
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['id'] = row[0]
        d['firstname'] = row[1]
        d['lastname'] = row[2]
        d['email'] = row[3]
        d['password'] = row[4]
        objects_list.append(d)

    cursor.close()
    connection.close()

    if len(objects_list):
        result = {'success': 'ok'}

    return result

# @app.route('/', methods=['GET'])
# def index() -> str:
#     return jsonify(list_login())

# @app.route('/login', methods=['POST'])
# @cross_origin(supports_credentials=True)
# def addOne():
#     email = request.json.get('email')
#     password = request.json.get('password')

#     return jsonify(list_login(email, password))

@app.route('/login', methods=['POST'])
def create_task():
    if not request.json:
        return jsonify({'error': "Content-type error"})
    
    email = request.json['email']
    password = request.json.get('password', "")

    return jsonify(list_login(''.join(email), ''.join(password)))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

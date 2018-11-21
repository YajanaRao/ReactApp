
from flask import Flask,jsonify,request
import string
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from elasticsearch import Elasticsearch

app = Flask(__name__)
CORS(app)


# elasticsearch database object for users 
class User():
    def __init__(self):
        self.es = Elasticsearch()

    def create(self,name,email,password,actype):
        print(name,email,password)
        if name and email and password:
            user = {
                'name':name,
                'email':email,
                'password': generate_password_hash(password),
                'type': actype,
                'acdefault': False
            }

            res = self.es.index(index="users", doc_type="user", body=user)
            print(res['result'])
        else:
            print("failed")

    def query(self,email):
        res = self.es.search(index="users", filter_path=['hits.hits._*'], body={
            "query":{
                "match_phrase": {
                    "email": email
                }
            }
        })
        if res:
            return(res['hits']['hits'])   

    def query_all(self): 
        res = self.es.search(index="users", filter_path=['hits.hits._*'], body={
            "query": {"match_all": {}}
        })
        return(res['hits']['hits'])

    def check_password(self,email,password):
        output = self.query(email)
        for result in output:
            res = result['_source']
            if email == res['email'] and check_password_hash(res['password'], password):
                return True
        return False

    def update_password(self,email,password):
        output = self.query(email)
        self.es.update(index='users', doc_type='user', id=output[0]['_id'],
                       body={"doc": {"password": generate_password_hash(password), "acdefault":False}})
        return True        

    def update_permission(self,email,atype):
        output = self.query(email)
        self.es.update(index='users',doc_type='user',id=output[0]['_id'],
            body={
                "doc":{
                    "type": atype
                }
            }
        )
        return True

    def delete(self,email):
        output = self.query(email)
        for result in output:
            res = self.es.delete(
                index="users", doc_type="user", id=result['_id'])
            print(res)
    

# basic login
@app.route("/api/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        result = {}
        error = None
        default = False
        type = "user"
        form = request.json
        print(form)
        user = User()
        
        if not user.check_password(form['email'],form['password']):
            error = "User not found"
        else:
            result = user.query(form['email'])
            result = result[0]
            print(result)
            default = result['_source']['acdefault']
            type = result['_source']['type']

        if error is None:
            result['status'] = "success"
            result['message'] = "login sucessfull"
            result['default'] = default
            result['type'] = type
        else:
            result['status'] = "error"
            result['message'] = error

        print(result)
        return jsonify(result)

# updating password
@app.route("/api/update", methods=['GET', 'POST'])
def update():
    if request.method == 'POST':
        result = {}
        error = None
        form = request.json
        print(form)
        user = User()

        if user.update_password("admin@gmail.com", "admin"):
            result['status'] = True
        else:
            result['status'] = False

        print(result)
        return jsonify(result)

# updating password and permission
@app.route("/api/users/acupdate", methods=['GET', 'POST'])
def update_account():
    if request.method == 'POST':
        result = {}
        error = None
        form = request.json
        print(form)
        user = User()

        if form['permission']:
            if user.update_permission(form['email'], form['permission']):
                result['update'] = True
        elif form['password']:
            if user.update_password(form['email'], form['password']):
                result['password'] = True
        else:
            result['status'] = "failed"

        print(result)
        return jsonify(result)

# list all users present
@app.route("/api/users/all")
def all():
    user = User()
    output = user.query_all()
    data = []
    for res in output:
        result = {}
        if("_source" in res):
            result['name'] = res['_source']['name']
            result['email'] = res['_source']['email']
            result['type'] = res['_source']['type']
            print(result)
            data.append(result)
        else:
            data = data
        
    return jsonify(data)

# create account
@app.route("/api/users/create",methods=['POST'])
def create():
    if request.method == 'POST':
        form = request.json
        print("form",form)
        user = User()
        output = user.query(form['email'])
        print("query output",output)
        if output:
            data = "user present"
        else:
            user.create(form['name'], form['email'],
                        form['password'],"user")
            data = "user not present"
        print(data)
        return jsonify(data)
    else:
        return jsonify("need to give in post")

# delete users
@app.route('/api/users/delete')
def delte():
    if request.method == 'GET':
        email = request.args.get('email')
        if email:
            user = User()
            user.delete(email)
            return jsonify("success")
        else:
            return jsonify("failed")
    

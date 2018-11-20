
from flask import Flask,jsonify,request
import string
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from elasticsearch import Elasticsearch

app = Flask(__name__)
CORS(app)



class User():
    def __init__(self):
        self.es = Elasticsearch()

    def create(self,name,email,password,actype):
        user = {
            'name':name,
            'email':email,
            'password': generate_password_hash(password),
            'type': actype
        }

        res = self.es.index(index="users", doc_type="user", body=user)
        print(res['result'])

    def query(self,email):
        res = self.es.search(index="users", filter_path=['hits.hits._*'], body={
            "query":{
                "match_phrase": {
                    "email": email
                }
            }
        })
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

    def update(self,email,password):
        output = self.query(email)
        self.es.update(index='users', doc_type='user', id=output[0]['_id'],
                       body={"doc": {"password": generate_password_hash(password), "acdefault":False}})
        return True        

    def delete(self,email):
        output = self.query(email)
        for result in output:
            res = self.es.delete(
                index="users", doc_type="user", id=result['_id'])
            print(res)
    

@app.route("/api/register",methods=['GET','POST'])
def register():
    if request.method == 'POST':
        # auth = Authentication()
        result = {}
        form = request.json
        print(form)

        # return str(form)

        if output is not None:
            print(output['hits']['hits'])
            result['status'] = 'error'
            result['message'] = 'User {} is already registered.'.format(form['name'])
        else:
            user = User(username=form['name'],email=form['email'],password=form['password'],country=form['country'])
            User.create(user)
            result['status'] = 'success'
            result['message'] = 'Account created successfully'
            return jsonify(result)

        return jsonify(result)


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


@app.route("/api/update", methods=['GET', 'POST'])
def update():
    if request.method == 'POST':
        result = {}
        error = None
        form = request.json
        print(form)
        user = User()

        
        if user.update("admin@gmail.com", "admin"):
            result['status'] = True
        else:
            result['status'] = False

        print(result)
        return jsonify(result)

@app.route("/api/users/all")
def all():
    user = User()
    output = user.query_all()
    for res in output:
        result = {}
        if("_source" in res):
            result['name'] = res['_source']['name']
            result['email'] = res['_source']['email']
            result['type'] = res['_source']['type']
            print(result)
            data = result
        else:
            data = data
        
       

    return jsonify(data)


@app.route("/api/users/create")
def create():
    if request.method == 'POST':
        result = {}
        error = None
        form = request.json
        print(form)
        user = User()
        output = user.query(form['email'])
        print(output)
        for res in output:
            result = {}
            if("_source" in res):
                result['name'] = res['_source']['name']
                result['email'] = res['_source']['email']
                result['type'] = res['_source']['type']
                print(result)
                data = result
            else:
                data = data

        return jsonify(data)
# user()
# user = User()
# user.create(name='admin',email='admin@gmail.com',password='admin',actype='admin')
# user.check_password("admin@gmail.com","admin")
# user.update("admin@gmail.com", "admin")
# user.delete('yajananrao@gmail.com')
# print(user.query_all())

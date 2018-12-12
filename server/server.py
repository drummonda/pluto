# server.py
import json
from flask import Flask, render_template, Response, request, jsonify, request
from flask_restful import Resource, Api
from marshmallow import Schema, fields, ValidationError
from db import select_query

database_url = 'postgresql://localhost:5432/flask_todo'
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
api = Api(app)


# base route
@app.route("/")
def index():
    return render_template("index.html")

# hello route
@app.route("/hello")
def hello():
    return "Hello, world!"

# get todos rout
@app.route("/api/todos")
def getTodos():
  return_str = ""
  results = select_query("select * from todo")
  for result in results:
    (id, name, completed) = result
    return_str += (str(id) + " " + name + " " + str(completed) + " ")
  return return_str

if __name__ == "__main__":
    app.run()

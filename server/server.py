# server.py
import json
from flask import Flask, render_template, Response, request, jsonify, request, make_response
from flask_restful import Resource, Api
from marshmallow import Schema, fields, ValidationError
from db import select_query, insert_query, delete_query

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
@app.route("/api/todos", methods=["GET"])
def getTodos():
  results = select_query("select * from todo")
  print("results", results)
  return make_response(results), 200

@app.route("/api/todos", methods=["POST"])
def postTodos():
  data = request.data
  data_dict = json.loads(data)
  new_todo = data_dict["name"]
  print("new todo", new_todo)
  insert_query(new_todo)
  results = select_query("select * from todo")
  print("results", results)
  return make_response(results), 201

if __name__ == "__main__":
    app.run()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
from sqlalchemy.sql import text
import json

db_url = 'postgres://localhost:5432/flask_todo'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
db = SQLAlchemy(app)
engine = create_engine(db_url)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    completed = db.Column(db.Boolean, default=False)


def select_query():
    with engine.connect() as con:
        query = "select * from todo"
        res = con.execute(query)
        return json.dumps([dict(r) for r in res])

def select_one_query(todo_id):
    with engine.connect() as con:
        query = "select * from todo where id = " + str(todo_id)
        res = con.execute(query)
        return json.dumps(dict(r) for r in res)

def insert_query(name):
    with engine.connect() as con:
        query = ("insert into todo (id, name, completed) " +
                    "values (" +
                        "(case when (select max(id) from todo) is not null " +
                        "       then (select max(id) from todo) + 1 " +
                         "else 1 end)," +
                        "'" + name + "'" + ", false)")
        con.execute(query)

def delete_query(todo_id):
    with engine.connect() as con:
        query = "delete from todo where id = " + str(todo_id)
        con.execute(query)

def update_query(todo_id, completed):
    with engine.connect() as con:
        query = "update todo set completed = " + completed + "where id = " + str(todo_id)
        con.execute(query)

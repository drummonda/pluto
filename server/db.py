from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
from sqlalchemy.sql import text
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost:5432/flask_todo'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    completed = db.Column(db.Boolean, default=False)


def select_query(query):
    engine = create_engine('postgres://localhost:5432/flask_todo')
    with engine.connect() as con:
        res = con.execute(query)
        return json.dumps([dict(r) for r in res])

def insert_query(data, query):
    engine = create_engine('postgres://localhost:5432/flask_todo')
    with engine.connect() as con:
        for row in data:
            con.execute(query)

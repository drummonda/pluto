# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# base route
@app.route("/")
def index():
  return render_template("index.html")

# hello route
@app.route("/hello")
def hello():
  return "Hello, world!"

if __name__ == "__main__":
  app.run()

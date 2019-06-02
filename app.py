from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from datetime import datetime
from sqlalchemy import DateTime, func
from flask_cors import CORS
import os

#init app
app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.join(basedir, "db.sqlite")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Initialize DB
db = SQLAlchemy(app)

#Initialize Marshmallow
ma = Marshmallow(app)


#Product Class

class ToDo(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	task = db.Column(db.String(100), unique=True)
	description = db.Column(db.String(200))
	completed = db.Column(db.Boolean)
	created = db.Column(db.DateTime, default=func.now())
	tcomplete = db.Column(db.DateTime)

	def __init__(self,task,description="deafult"):
		self.task = task
		self.description = description
		self.completed = False
		

#Product Schema

class TaskSchema(ma.Schema):
	class Meta:
		fields = ("id","task","description","completed","created","tcomplete")


#Initialize Schema
task_schema = TaskSchema(strict=True)
tasks_schema = TaskSchema(many=True, strict=True)


#Create a Task
@app.route('/todo', methods=["POST"])
def add_task():
	task = request.json["task"]
	description = "default"

	new_task = ToDo(task,description)
	db.session.add(new_task)
	db.session.commit()

	return task_schema.jsonify(new_task)

#Get all Tasks
@app.route('/todo', methods=["GET"])
def get_all_tasks():
	all_tasks = ToDo.query.all()
	results = tasks_schema.dump(all_tasks)

	return jsonify(results.data)

#Get single product
'''
@app.route('/product/<id>', methods=["GET"])
def get_product(id):
	product = Product.query.get(id)
	return product_schema.jsonify(product)
'''

#Update a task
@app.route('/todo/<id>', methods=["PUT"])
def update_task(id):
	task = ToDo.query.get(id)

	if task.completed == True:
		task.completed = False
		task.tcomplete = None
	else:
		task.completed = True
		task.tcomplete = func.now()

	db.session.commit()

	return task_schema.jsonify(task)


#Delete a product
@app.route('/todo/<id>', methods=["DELETE"])
def delete_task(id):
	task = ToDo.query.get(id)
	db.session.delete(task)
	db.session.commit()
	return task_schema.jsonify(task)


#run server

if __name__ == '__main__':
	app.run(debug=True)

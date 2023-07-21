from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  
db = SQLAlchemy(app)

class ToDoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.DateTime, nullable=True)
    is_completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'deadline': self.deadline.strftime('%Y-%m-%d %H:%M') if self.deadline else None,
            'is_completed': self.is_completed
        }

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

@app.route('/api/')
def index():
    all_items = ToDoItem.query.all()
    return jsonify([item.to_dict() for item in all_items])


@app.route('/api/create', methods=['POST'])
def create():
    try:
        data = request.get_json()
        deadline_datetime = datetime.strptime(data['deadline'], '%Y-%m-%d %H:%M')
        item = ToDoItem(title = data['title'], description = data['description'], deadline = deadline_datetime, is_completed = False)

        db.session.add(item)
        db.session.commit()

        return jsonify(success=True, message='Item is added')
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@app.route('/api/<int:id>', methods=['PUT', 'DELETE'])
def update(id):
    try:
        if request.method == 'PUT':
            item = ToDoItem.query.get(id)
            data = request.get_json()
            deadline_datetime = datetime.strptime(data['deadline'], '%Y-%m-%d %H:%M')

            item.title = data['title']
            item.description = data['description']
            item.deadline = deadline_datetime
            item.is_completed = data['is_completed']

            db.session.commit()

            return jsonify(success=True, message='Item is updated')
        else:
            item = ToDoItem.query.get(id)
            db.session.delete(item)
            db.session.commit()

            return jsonify(success=True, message='Item is deleted')
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500
    
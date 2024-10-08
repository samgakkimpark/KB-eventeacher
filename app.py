import json
import os
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='')

customers = {}
dictionary = {}
events = []
recommended_events = {}


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data/customer', methods=['POST']) 
def customers_data():
    global customers
    return customers

@app.route('/api/data/event', methods=['POST'])
def dictionary_data():
    global dictionary, events
    event_id = request.get_json()
    for event in events:
        if event["event_id"] == str(event_id):
            return {
                "event": event,
                "dictionary": dictionary
            }
    return {"error": "Event not found"}

@app.route('/api/data/recommendation', methods=['POST']) 
def recommended_events_data():
    global recommended_events
    customer_id = request.get_json()
    return recommended_events[str(customer_id)]

@app.route('/api/data/events', methods=['POST'])
def events_data():
    global events
    return jsonify(events)


def load_datas():
    global customers, dictionary, events, recommended_events

    script_dir = os.path.dirname(__file__)

    file_path = os.path.join(script_dir, 'data/json', 'customer_data.json')
    with open(file_path, 'r') as file:
        customers = json.load(file)

    file_path = os.path.join(script_dir, 'data/json', 'financial_dictionary.json')
    with open(file_path, 'r') as file:
        dictionary = json.load(file)

    file_path = os.path.join(script_dir, 'data/json', 'all_events_data.json')
    with open(file_path, 'r') as file:
        events = json.load(file)

    file_path = os.path.join(script_dir, 'data/json', 'recommended_events_data.json')
    with open(file_path, 'r') as file:
        recommended_events = json.load(file)


if __name__ == '__main__':
    load_datas()
    app.run(debug=True)
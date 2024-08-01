from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='')

data = [
    {
        "txt": "안녕하세요! 저희는 김하진, 김하영, 박정은입니다."
    },
    {
        "김하진": "98년생 쿼카",
        "김하영": "00년생 아기부",
        "박정은": "00년생 보라돌이"
    }
]

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    received_data = request.get_json()
    print(received_data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

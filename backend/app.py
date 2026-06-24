from flask import Flask,request, jsonify

app = Flask(__name__)     
@app.route('/api', methods=['GET','POST'])
def api():
    if request.method == 'GET':
        return jsonify({
            "message": "Backend is running"
        })
    else:
        data = request.form.to_dict()
        # Process the data as needed
    response = {
        'message': 'Data received successfully',
        'received_data': data
    }
    return jsonify(response)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
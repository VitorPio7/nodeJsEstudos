from flask import Flask, jsonify
import requests
 
app = Flask(__name__)
 
@app.route("/", methods=["GET"])
def index():
    try:
        # Fetch data from the external API
        response = requests.get('https://randomuser.me/api')
        response.raise_for_status()  # Raise an error for HTTP errors
        data = response.json()  # Parse the JSON response
        return jsonify(data)  # Return as Flask JSON response
    except requests.RequestException as e:
        # Handle errors gracefully
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500
 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
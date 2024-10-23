from flask import Flask, request, jsonify 
import requests 
import deepl 

app = Flask(__name__)

auth_key = '106b3c2d-faad-4c7d-9f6f-03ccdad63984:fx'
translator = deepl.Translator(auth_key)

@app.route("/api/languages")
def sup_lang():
    url = "https://api-free.deepl.com/v2/languages"
    headers = {
        "Authorization": f"DeepL-Auth-Key {auth_key}"
    }

    response = requests.get(url, headers = headers)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error" : "Unable to fetch languages"}), 500
    

@app.route("/api/upload")
def upload_file():
    if 'file' not in request.files or 'targetLanguage' not in request.form:
        return jsonify({"error" : "No file or language provided"}), 400
    
    file = request.files['file']
    target_language = request.form['targetLanguage']

    translated_file = deepl.translate_document(file, target_language)

    if translated_file:
        return deepl.send_file(translated_file, as_attachment = True, download_name = 'translated_document.pdf')





result = translator.translate_text("Hello, world!", target_lang="FR")
# print(result.text)  # "Bonjour, le monde !"

@app.route("/members")
def members():
    return{"members": ["Member1","Member2",result.text]}

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify # type: ignore
import requests # type: ignore
import deepl # type: ignore

#app = Flask(__name__)

auth_key = '106b3c2d-faad-4c7d-9f6f-03ccdad63984:fx'
translator = deepl.Translator(auth_key)

result = translator.translate_text("Hello, world!", target_lang="FR")
print(result.text)  # "Bonjour, le monde !"
# @app.route("/members")
# def members():
#     return{"members": ["Member1","Member2","Member3"]}

# if __name__ == "__main__":
#     app.run(debug=True)
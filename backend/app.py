from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from bson import Timestamp

import pymongo

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

# Conexión a MongoDB Atlas
uri = "mongodb+srv://figueroa:agosto07@ejemplo.ppbsen6.mongodb.net/huertoutc?retryWrites=true&w=majority"
client = pymongo.MongoClient(uri)
db = client.huertoutc
coleccion_plantas = db.plantas
coleccion_usuarios = db.users


@app.route("/api/plantas", methods=["GET"])
def obtener_plantas():
    try:
        # Agregar mensaje de impresión para verificar que se está obteniendo la lista de plantas
        print("Obteniendo la lista de plantas...")

        # Obtiene todas las plantas de la colección
        plantas = list(coleccion_plantas.find({}, {"_id": 0}))  # Excluye el campo _id

        # Agregar mensaje de impresión para verificar que se obtuvo la lista de plantas correctamente
        print("Lista de plantas obtenida")

        return jsonify(plantas)
    except Exception as e:
        # En caso de error, imprimirlo en la consola
        print("Error al obtener la lista de plantas:", str(e))
        return jsonify({"error": "Ocurrió un error al obtener las plantas"}), 500


@app.route("/api/usuarios", methods=["GET"])
def obtener_usuarios():
    try:
        print("Obteniendo la lista de USUARIOS...")

        # Obtener todos los usuarios de la colección de usuarios
        usuarios = list(coleccion_usuarios.find({}, {"_id": 0}))  # Excluye el campo _id
        # Convertir los campos Timestamp a datetime.datetime
        for usuario in usuarios:
            for key, value in usuario.items():
                if isinstance(value, Timestamp):
                    usuario[key] = datetime.fromtimestamp(value.time)
        print("USUARIO OBTENIDO")

        return jsonify(usuarios)

    except Exception as e:
        print("Error al obtener los usuarios:", str(e))
        return jsonify({"error": "Ocurrió un error al obtener los usuarios"}), 500


if __name__ == "__main__":
    app.run()

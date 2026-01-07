from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime
import os

app = Flask(__name__)

# Configuración de MongoDB
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://localhost:27017/confirmacion_db")
mongo = PyMongo(app)

# Configuración para producción
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/confirmar', methods=['POST'])
def confirmar_asistencia():
    try:
        data = request.get_json()
        nombre = data.get('nombre', '').strip()
        asistira = data.get('asistira', True)

        if not nombre:
            return jsonify({'success': False, 'message': 'El nombre es requerido'}), 400

        # Guardar en MongoDB
        confirmacion = {
            'nombre': nombre,
            'asistira': asistira,
            'fecha_confirmacion': datetime.now()
        }

        mongo.db.confirmaciones.insert_one(confirmacion)

        if asistira:
            mensaje = '¡Gracias por confirmar tu asistencia! Te esperamos.'
        else:
            mensaje = 'Gracias por informarnos. ¡Esperamos verte en otra ocasión!'

        return jsonify({
            'success': True,
            'message': mensaje
        })
    except Exception as e:
        return jsonify({'success': False, 'message': 'Error al procesar la solicitud'}), 500

@app.route('/confirmaciones')
def ver_confirmaciones():
    """Ruta para ver todas las confirmaciones (solo para administración)"""
    try:
        confirmaciones = list(mongo.db.confirmaciones.find({}, {'_id': 0}).sort('fecha_confirmacion', -1))
        for conf in confirmaciones:
            conf['fecha_confirmacion'] = conf['fecha_confirmacion'].strftime('%d/%m/%Y %H:%M')
        return jsonify(confirmaciones)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/confirmaciones')
def admin_confirmaciones():
    """Página de administración para ver confirmaciones"""
    return render_template('confirmaciones.html')

if __name__ == '__main__':
    # Solo para desarrollo local
    # En producción, Gunicorn maneja el puerto y host automáticamente
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") != "production"
    app.run(debug=debug, host='0.0.0.0', port=port)

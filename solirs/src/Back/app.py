from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///solidariedade.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

db = SQLAlchemy(app)

# Modelo de Usuário
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Usuario {self.username}>'

# Substituição para before_first_request
with app.app_context():
    db.create_all()

# Rotas da API

@app.route('/api/cadastro', methods=['POST'])
def cadastrar_usuario():
    data = request.json
    
    # Verificar se usuário já existe
    usuario_existente = Usuario.query.filter(
        (Usuario.email == data['email']) | 
        (Usuario.username == data['username'])
    ).first()
    
    if usuario_existente:
        return jsonify({
            'success': False,
            'message': 'E-mail ou nome de usuário já cadastrado.'
        }), 400
    
    # Verificar se as senhas conferem
    if data['password'] != data['confirmPassword']:
        return jsonify({
            'success': False,
            'message': 'As senhas não conferem.'
        }), 400
    
    # Criar novo usuário
    novo_usuario = Usuario(
        nome=data['nome'],
        email=data['email'],
        username=data['username'],
        password_hash=generate_password_hash(data['password']),
        telefone=data['telefone'],
        cidade=data['cidade']
    )
    
    try:
        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Usuário cadastrado com sucesso!'
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Erro ao cadastrar usuário: {str(e)}'
        }), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    usuario = Usuario.query.filter_by(username=username).first()
    
    if not usuario or not check_password_hash(usuario.password_hash, password):
        return jsonify({
            'success': False,
            'message': 'Usuário ou senha incorretos.'
        }), 401
    
    # Criar sessão para o usuário
    session.permanent = True
    session['user_id'] = usuario.id
    session['username'] = usuario.username
    
    return jsonify({
        'success': True,
        'message': 'Login realizado com sucesso!',
        'user': {
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'username': usuario.username,
            'cidade': usuario.cidade
        }
    }), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({
        'success': True,
        'message': 'Logout realizado com sucesso!'
    }), 200

@app.route('/api/usuario', methods=['GET'])
def get_usuario():
    if 'user_id' not in session:
        return jsonify({
            'success': False,
            'message': 'Usuário não autenticado.'
        }), 401
    
    usuario = Usuario.query.get(session['user_id'])
    
    if not usuario:
        return jsonify({
            'success': False,
            'message': 'Usuário não encontrado.'
        }), 404
    
    return jsonify({
        'success': True,
        'user': {
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'username': usuario.username,
            'telefone': usuario.telefone,
            'cidade': usuario.cidade
        }
    }), 200

# Verificar autenticação
@app.route('/api/auth/check', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'username': session.get('username')
        }), 200
    return jsonify({
        'authenticated': False
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, HelpRequest, Topic

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem (para desenvolvimento)

# Configuração do banco de dados SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Cria o banco de dados (se não existir)
with app.app_context():
    db.create_all()

# Rota para cadastro de usuários
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.json
    new_user = User(
        nome=data['nome'],
        email=data['email'],
        username=data['username'],
        password=data['password'],  # Em um projeto real, use hashing para senhas!
        telefone=data['telefone'],
        cidade=data['cidade']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# Rota para login de usuários
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({"message": "Login bem-sucedido!", "user": {"id": user.id, "username": user.username}}), 200
    else:
        return jsonify({"message": "Usuário ou senha inválidos!"}), 401

# Rota para solicitação de ajuda
@app.route('/solicitacao', methods=['POST'])
def solicitacao_ajuda():
    data = request.json
    new_request = HelpRequest(
        name=data['name'],
        location=data['location'],
        message=data['message']
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({"message": "Solicitação de ajuda enviada com sucesso!"}), 201

# Rota para listar tópicos do fórum
@app.route('/forum', methods=['GET'])
def listar_topicos():
    topics = Topic.query.all()
    return jsonify([{"id": t.id, "title": t.title, "content": t.content} for t in topics]), 200

# Rota para criar um novo tópico no fórum
@app.route('/forum', methods=['POST'])
def criar_topico():
    data = request.json
    new_topic = Topic(
        title=data['title'],
        content=data['content']
    )
    db.session.add(new_topic)
    db.session.commit()
    return jsonify({"message": "Tópico criado com sucesso!"}), 201

# Rota para listar notícias (exemplo com dados estáticos)
@app.route('/noticias', methods=['GET'])
def listar_noticias():
    noticias = [
        {"title": "Enchentes no RS", "content": "As enchentes no RS estão causando grandes estragos."},
        {"title": "Ajuda humanitária", "content": "Veja como ajudar as vítimas das enchentes."},
    ]
    return jsonify(noticias), 200

# Rota padrão
@app.route('/')
def home():
    return "Backend do Projeto Solidariedade RS"

if __name__ == '__main__':
    app.run(debug=True)
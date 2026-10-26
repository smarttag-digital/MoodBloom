
from flask import Flask, render_template, request, jsonify
from datetime import datetime
from database import conectar, criar_tabela

app = Flask(__name__)

# Humores permitidos no MoodBloom
HUMORES_VALIDOS = {
    "Feliz",
    "Triste",
    "Irritado",
    "Assustado",
    "Ótimo",
    "Bem",
    "Normal",
    "Mal",
    "Péssimo",
}

# Cria a tabela caso ela ainda não exista
criar_tabela()


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/api/registros", methods=["GET"])
def listar_registros():
    """Consulta os registros salvos no SQLite."""
    with conectar() as conexao:
        registros = conexao.execute(
            """
            SELECT id, humor, anotacao, data
            FROM registros
            ORDER BY data ASC, id ASC
            """
        ).fetchall()

    return jsonify([dict(registro) for registro in registros])


@app.route("/api/registros", methods=["POST"])
def salvar_registro():
    """Valida e salva um novo registro no SQLite."""
    dados = request.get_json(silent=True)

    if not isinstance(dados, dict):
        return jsonify({"erro": "Envie os dados do registro."}), 400

    humor = dados.get("humor")
    anotacao = dados.get("anotacao", "")
    data = dados.get("data")

    if not isinstance(humor, str) or humor not in HUMORES_VALIDOS:
        return jsonify({"erro": "Selecione um humor válido."}), 400

    if not isinstance(anotacao, str):
        return jsonify({"erro": "A anotação precisa ser um texto."}), 400

    if len(anotacao) > 5000:
        return jsonify({"erro": "A anotação deve ter até 5000 caracteres."}), 400
    
    if not isinstance(data, str) or not data.strip():
        return jsonify({"erro": "A data do registro é obrigatória."}), 400

    try:
        data_validada = datetime.fromisoformat(data.replace("Z", "+00:00"))
    except ValueError:
        return jsonify({"erro": "Envie uma data válida."}), 400

    if data_validada.tzinfo is None:
        return jsonify({"erro": "A data precisa incluir o fuso horário."}), 400

    with conectar() as conexao:
        cursor = conexao.execute(
            """
            INSERT INTO registros (humor, anotacao, data)
            VALUES (?, ?, ?)
            """,
            (humor, anotacao.strip(), data),
        )

        registro = conexao.execute(
            """
            SELECT id, humor, anotacao, data
            FROM registros
            WHERE id = ?
            """,
            (cursor.lastrowid,),
        ).fetchone()

    return jsonify(dict(registro)), 201


if __name__ == "__main__":
    app.run(debug=True)

-- Exclui as tabelas caso já existam
DROP TABLE IF EXISTS ia;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    celular VARCHAR(20) UNIQUE,
    status_usuario BOOLEAN DEFAULT TRUE
);

-- Criação da tabela de IA
CREATE TABLE ia (
    id_ia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    pergunta TEXT,
    resposta TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
	status_ia BOOLEAN DEFAULT TRUE
);

-- Inserção de 10 usuários
INSERT INTO usuario (nome, email, celular) VALUES
('Ana Souza', 'ana.souza@email.com', '11999990001'),
('Bruno Lima', 'bruno.lima@email.com', '11999990002'),
('Carla Mendes', 'carla.mendes@email.com', '11999990003'),
('Daniel Costa', 'daniel.costa@email.com', '11999990004'),
('Eduarda Freitas', 'eduarda.freitas@email.com', '11999990005'),
('Felipe Rocha', 'felipe.rocha@email.com', '11999990006'),
('Gabriela Tavares', 'gabriela.tavares@email.com', '11999990007'),
('Henrique Nunes', 'henrique.nunes@email.com', '11999990008'),
('Isabela Martins', 'isabela.martins@email.com', '11999990009'),
('João Pedro', 'joao.pedro@email.com', '11999990010');

-- Inserção de 10 perguntas e respostas relacionadas a cada usuário
INSERT INTO ia (id_usuario, pergunta, resposta) VALUES
(1, 'Qual é a capital do Brasil?', 'A capital do Brasil é Brasília.'),
(2, 'Como faço uma conexão com banco de dados?', 'Você pode usar a biblioteca psycopg2 para PostgreSQL em Python.'),
(3, 'Qual a fórmula da água?', 'A fórmula da água é H2O.'),
(4, 'Quem descobriu o Brasil?', 'Pedro Álvares Cabral é considerado o descobridor do Brasil.'),
(5, 'O que é inteligência artificial?', 'É o campo da ciência que estuda como criar máquinas inteligentes.'),
(6, 'Qual é a função do coração?', 'Bombear sangue para todo o corpo.'),
(7, 'Como fazer arroz?', 'Refogue alho e cebola, adicione arroz, água e sal, e cozinhe.'),
(8, 'Quantos planetas existem no sistema solar?', 'Oito planetas.'),
(9, 'Qual é o maior animal do mundo?', 'A baleia-azul é o maior animal do mundo.'),
(10, 'Como criar uma tabela no PostgreSQL?', 'Use o comando CREATE TABLE seguido da estrutura desejada.');
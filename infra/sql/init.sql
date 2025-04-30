-- Exclui as tabelas caso já existam
DROP TABLE IF EXISTS chat_ia;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS exigencias_culturas;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    uuid_usuario UUID UNIQUE,
    nome VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    celular VARCHAR(20) UNIQUE,
    status_usuario BOOLEAN DEFAULT TRUE,
    senha VARCHAR(100) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_uuid_usuario()
RETURNS TRIGGER AS $$
BEGIN
    NEW.uuid_usuario := gen_random_uuid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gerar_uuid_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
EXECUTE FUNCTION gerar_uuid_usuario();

-- Criação da tabela de IA
CREATE TABLE chat_ia (
    idchat_ia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    pergunta TEXT,
    resposta TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
	status_ia BOOLEAN DEFAULT TRUE
);

CREATE TABLE exigencias_culturas (
    id SERIAL PRIMARY KEY,
    planta VARCHAR(50),
    tipo_solo VARCHAR(20),
    ph_ideal_min FLOAT,
    ph_ideal_max FLOAT,
    nutrientes_principais TEXT[],
    retencao_agua VARCHAR(20),
    clima_preferido VARCHAR(50),
    temperatura_ideal_min FLOAT,
    temperatura_ideal_max FLOAT,
    radiacao_solar VARCHAR(10),
    umidade_necessaria VARCHAR(20)
);

-- Inserção de 10 usuários
INSERT INTO usuario (nome, email, celular, senha) VALUES
('ADMINISTRADOR', 'ADMIN@EMAIL.COM', '', 'f865b53623b121fd34ee5426c792e5c33af8c227'), -- admin123
('ANA SOUZA', 'ANA.SOUZA@EMAIL.COM', '11999990001', '394387e678c98876622089985293c83ff53d16e4'), -- souza321
('BRUNO LIMA', 'BRUNO.LIMA@EMAIL.COM', '11999990002', 'a628b0cd076c6622371b6444bcc93b30edf83a60'), -- lima123
('CARLA MENDES', 'CARLA.MENDES@EMAIL.COM', '11999990003', '3df5f2c348ccd888f3fc5d86bf4421796bd80840'), -- carlam
('DANIEL COSTA', 'DANIEL.COSTA@EMAIL.COM', '11999990004', '449c0267df036359fd66d593557c7e5f1082975a'), -- costadani
('EDUARDA FREITAS', 'EDUARDA.FREITAS@EMAIL.COM', '11999990005', '4b7af5bd2d1026517f203f379e660fe2337a3e33'), -- 1199     
('FELIPE ROCHA', 'FELIPE.ROCHA@EMAIL.COM', '11999990006', '0f0c6e0f663098620af7afa64c840f1b8ee4c9dd'), -- rocha3
('GABRIELA TAVARES', 'GABRIELA.TAVARES@EMAIL.COM', '11999990007', '70377faa6e98d4fe40f47b22aef6b7ab334ddcf8'), -- gabitavares
('HENRIQUE NUNES', 'HENRIQUE.NUNES@EMAIL.COM', '11999990008', 'cf224a69cdd1cdddc87f384c68210797f0b9754a'), -- nunes08
('ISABELA MARTINS', 'ISABELA.MARTINS@EMAIL.COM', '11999990009', '3733dab2172b4a735c4296400e26c481e2907d2b'), -- isabela.m
('JOÃO PEDRO', 'JOAO.PEDRO@EMAIL.COM', '11999990010', '82c05dc5bf9455cb9088015527ed4ff9f5ba2c50'); -- jp99

-- Inserção de 10 perguntas e respostas relacionadas a cada usuário
INSERT INTO chat_ia (id_usuario, pergunta, resposta) VALUES
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

INSERT INTO exigencias_culturas 
(planta, tipo_solo, ph_ideal_min, ph_ideal_max, nutrientes_principais, retencao_agua, clima_preferido, temperatura_ideal_min, temperatura_ideal_max, radiacao_solar, umidade_necessaria) 
VALUES
('TOMATE', 'FRANCO', 6.0, 6.8, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'MÉDIA', 'TROPICAL, TEMPERADO', 18, 30, 'ALTA', 'MÉDIA'),
('ALFACE', 'ARENOSO', 6.0, 7.0, ARRAY['N', 'CA', 'S'], 'ALTA', 'TEMPERADO, TROPICAL', 10, 24, 'MÉDIA', 'ALTA'),
('CENOURA', 'ARENOSO', 6.0, 6.8, ARRAY['P', 'K', 'CA'], 'MÉDIA', 'TEMPERADO', 15, 25, 'MÉDIA', 'MÉDIA'),
('COUVE', 'FRANCO', 6.0, 7.5, ARRAY['N', 'CA', 'MG', 'S'], 'MÉDIA', 'SUBTROPICAL, TEMPERADO', 15, 25, 'MÉDIA', 'MÉDIA'),
('FEIJÃO', 'ARGILOSO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA'], 'ALTA', 'TROPICAL, SUBTROPICAL', 20, 30, 'ALTA', 'MÉDIA'),
('MILHO', 'FRANCO', 5.8, 7.0, ARRAY['N', 'P', 'K', 'MG'], 'ALTA', 'TROPICAL, SUBTROPICAL', 18, 32, 'ALTA', 'MÉDIA-ALTA'),
('BATATA', 'ARENOSO', 5.5, 6.0, ARRAY['K', 'P', 'CA'], 'MÉDIA', 'TEMPERADO', 10, 20, 'MÉDIA', 'MÉDIA'),
('ABÓBORA', 'FRANCO', 6.0, 6.8, ARRAY['N', 'P', 'K', 'CA'], 'ALTA', 'TROPICAL, SUBTROPICAL', 20, 32, 'ALTA', 'MÉDIA'),
('PEPINO', 'FRANCO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'ALTA', 'SUBTROPICAL, TROPICAL', 20, 30, 'ALTA', 'ALTA'),
('ESPINAFRE', 'FRANCO', 6.0, 7.5, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'ALTA', 'TEMPERADO', 10, 22, 'MÉDIA', 'ALTA'),
('ALHO', 'FRANCO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA', 'S'], 'MÉDIA', 'TEMPERADO, SUBTROPICAL', 12, 25, 'MÉDIA', 'MÉDIA'),
('BRÓCOLIS', 'FRANCO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA', 'S'], 'MÉDIA', 'TEMPERADO, SUBTROPICAL', 10, 22, 'MÉDIA', 'MÉDIA-ALTA'),
('MANGA', 'ARGILOSO', 5.5, 7.0, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'MÉDIA', 'TROPICAL, ÁRIDO', 24, 35, 'ALTA', 'BAIXA'),
('LARANJA', 'ARGILOSO', 5.5, 6.5, ARRAY['N', 'P', 'K', 'CA', 'MG', 'S'], 'MÉDIA', 'TROPICAL, SUBTROPICAL', 20, 30, 'ALTA', 'MÉDIA'),
('MORANGO', 'FRANCO', 5.5, 6.5, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'MÉDIA', 'TEMPERADO, SUBTROPICAL', 10, 20, 'MÉDIA', 'ALTA'),
('MAÇÃ', 'ARGILOSO', 5.5, 6.5, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'MÉDIA', 'TEMPERADO', 5, 20, 'MÉDIA', 'MÉDIA'),
('UVA', 'FRANCO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA', 'MG', 'S'], 'MÉDIA', 'MEDITERRÂNEO, SUBTROPICAL', 15, 30, 'ALTA', 'MÉDIA'),
('ABOBRINHA', 'FRANCO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'ALTA', 'TROPICAL, SUBTROPICAL', 18, 30, 'ALTA', 'MÉDIA-ALTA'),
('RABANETE', 'ARENOSO', 6.0, 7.0, ARRAY['N', 'P', 'K', 'CA'], 'ALTA', 'TEMPERADO, SUBTROPICAL', 10, 22, 'MÉDIA', 'MÉDIA'),
('CEBOLA', 'FRANCO', 6.0, 7.5, ARRAY['N', 'P', 'K', 'CA', 'MG'], 'MÉDIA', 'TEMPERADO, SUBTROPICAL', 12, 25, 'MÉDIA', 'BAIXA-MÉDIA'),
('BATATA-DOCE', 'ARENOSO', 5.5, 6.5, ARRAY['K', 'P', 'CA'], 'MÉDIA', 'TROPICAL, SUBTROPICAL', 20, 30, 'ALTA', 'MÉDIA');

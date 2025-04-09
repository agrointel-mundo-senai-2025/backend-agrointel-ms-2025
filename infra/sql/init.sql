CREATE Table ia (
    PRIMARY KEY id_ia SERIAL,
    FOREIGN KEY id_usuario INT NOT NULL,
    pergunta TEXT,
    resposta TEXT,
    FOREIGN KEY id_usuario REFERENCES usuarios(id_usuario)
    
);

CREATE Table usuario (
    id_usuario INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    celular VARCHAR(20), UNIQUE NOT NULL
    status_usuario BOOLEAN DEFAULT TRUE

);


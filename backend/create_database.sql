-- Conecta Bairro - Database Creation Script
-- Script DDL para criar as tabelas do banco de dados

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS conecta_bairro;
USE conecta_bairro;

-- Tabela de Usuários
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'client',
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    address_state VARCHAR(2),
    address_city VARCHAR(100),
    address_district VARCHAR(100),
    address_street VARCHAR(200),
    address_number VARCHAR(20),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Categorias
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Profissionais
CREATE TABLE professionals (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(150),
    description LONGTEXT,
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(120),
    instagram VARCHAR(100),
    website VARCHAR(200),
    registration_number VARCHAR(50),
    state VARCHAR(2),
    city VARCHAR(100),
    district VARCHAR(100),
    rating FLOAT NOT NULL DEFAULT 0.0,
    reviews_count INT NOT NULL DEFAULT 0,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_professionals_user_id FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_user_id (user_id),
    INDEX idx_state (state),
    INDEX idx_city (city),
    INDEX idx_featured (featured),
    INDEX idx_available (available),
    INDEX idx_rating (rating),
    FULLTEXT INDEX ft_name_title_description (name, title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Relacionamento Profissional-Categorias
CREATE TABLE professional_categories (
    professional_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (professional_id, category_id),
    CONSTRAINT fk_prof_cat_professional FOREIGN KEY (professional_id) 
        REFERENCES professionals(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_prof_cat_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Reviews/Avaliações
CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    professional_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_avatar_url VARCHAR(500),
    rating INT NOT NULL,
    comment LONGTEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_professional FOREIGN KEY (professional_id) 
        REFERENCES professionals(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_professional_id (professional_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    UNIQUE KEY unique_review_per_user (professional_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar índices adicionais para performance
CREATE INDEX idx_professionals_created_at ON professionals(created_at);
CREATE INDEX idx_professionals_reviews_count ON professionals(reviews_count);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Dados iniciais: Categorias padrão do sistema
INSERT INTO categories (id, name, slug, icon, is_active) VALUES
('cat-001', 'Reparos Residenciais', 'reparos-residenciais', 'home_repair_service', TRUE),
('cat-002', 'Limpeza', 'limpeza', 'cleaning_services', TRUE),
('cat-003', 'Encanamento', 'encanamento', 'plumbing', TRUE),
('cat-004', 'Eletricidade', 'eletricidade', 'electrical_services', TRUE),
('cat-005', 'Jardinagem', 'jardinagem', 'grass', TRUE),
('cat-006', 'Pintura', 'pintura', 'format_paint', TRUE),
('cat-007', 'Marcenaria', 'marcenaria', 'carpenter', TRUE),
('cat-008', 'Aulas Particulares', 'aulas-particulares', 'school', TRUE),
('cat-009', 'Consultoria', 'consultoria', 'business_center', TRUE),
('cat-010', 'Design e Criação', 'design-criacao', 'palette', TRUE);

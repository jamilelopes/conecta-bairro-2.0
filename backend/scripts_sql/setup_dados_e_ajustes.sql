ALTER TABLE professionals ADD COLUMN street VARCHAR(200);
ALTER TABLE professionals ADD COLUMN number VARCHAR(20);

DESCRIBE professionals;

-- ============================================================
-- SEED: Profissionais de teste para o Conecta Bairro
-- Popula: users -> professionals -> professional_categories
-- Pode rodar tudo de uma vez, numa aba SQL File nova do Workbench
-- ============================================================

-- 1) USUÁRIOS (um por profissional, role = 'professional')
INSERT INTO users (id, email, name, role, avatar_url, phone, address_state, address_city, address_district, address_street, address_number) VALUES
('u1a2b3c4-0001-4000-8000-000000000001', 'ricardo.oliveira@conectabairro.com', 'Ricardo Oliveira', 'professional', 'https://randomuser.me/api/portraits/men/32.jpg', '(11) 99123-4567', 'SP', 'São Paulo', 'Jardins', 'Rua Oscar Freire', '1234'),
('u1a2b3c4-0002-4000-8000-000000000002', 'helena.mendes@conectabairro.com', 'Helena Mendes', 'professional', 'https://randomuser.me/api/portraits/women/44.jpg', '(41) 98877-2233', 'PR', 'Curitiba', 'Batel', 'Rua Comendador Araújo', '567'),
('u1a2b3c4-0003-4000-8000-000000000003', 'marcos.santos@conectabairro.com', 'Marcos Santos', 'professional', 'https://randomuser.me/api/portraits/men/51.jpg', '(31) 97766-1122', 'MG', 'Belo Horizonte', 'Savassi', 'Rua Pium-í', '210'),
('u1a2b3c4-0004-4000-8000-000000000004', 'andre.costa@conectabairro.com', 'André Costa', 'professional', 'https://randomuser.me/api/portraits/men/22.jpg', '(21) 96655-3344', 'RJ', 'Rio de Janeiro', 'Tijuca', 'Rua Conde de Bonfim', '890'),
('u1a2b3c4-0005-4000-8000-000000000005', 'juliana.paes@conectabairro.com', 'Juliana Paes', 'professional', 'https://randomuser.me/api/portraits/women/68.jpg', '(51) 95544-6677', 'RS', 'Porto Alegre', 'Moinhos de Vento', 'Rua Padre Chagas', '145'),
('u1a2b3c4-0006-4000-8000-000000000006', 'carlos.eduardo@conectabairro.com', 'Carlos Eduardo', 'professional', 'https://randomuser.me/api/portraits/men/77.jpg', '(61) 94433-7788', 'DF', 'Brasília', 'Asa Sul', 'SQS 308', '102');

-- 2) PROFISSIONAIS (ligados a cada usuário acima via user_id)
INSERT INTO professionals (id, user_id, slug, name, title, description, avatar_url, phone, email, instagram, website, registration_number, state, city, district, rating, reviews_count, verified, available, featured) VALUES
('p1a2b3c4-0001-4000-8000-000000000001', 'u1a2b3c4-0001-4000-8000-000000000001', 'ricardo-oliveira', 'Ricardo Oliveira', 'Especialista em Reformas & Design de Interiores', 'Profissional especializado em transformar espaços residenciais e comerciais com foco em funcionalidade e estética contemporânea. Mais de 10 anos de experiência no mercado.', 'https://randomuser.me/api/portraits/men/32.jpg', '(11) 99123-4567', 'ricardo.oliveira@conectabairro.com', '@ricardo_design', 'https://ricardo-portfolio.com', 'CAU-A123456-7', 'SP', 'São Paulo', 'Jardins', 4.9, 124, TRUE, TRUE, TRUE),
('p1a2b3c4-0002-4000-8000-000000000002', 'u1a2b3c4-0002-4000-8000-000000000002', 'helena-mendes', 'Helena Mendes', 'Arquitetura de Interiores', 'Arquiteta focada em projetos residenciais que unem conforto e identidade visual. Atendimento personalizado do briefing à entrega final.', 'https://randomuser.me/api/portraits/women/44.jpg', '(41) 98877-2233', 'helena.mendes@conectabairro.com', '@helena.arq', 'https://helenamendes.arq.br', 'CAU-B223344-1', 'PR', 'Curitiba', 'Batel', 5.0, 87, TRUE, TRUE, FALSE),
('p1a2b3c4-0003-4000-8000-000000000003', 'u1a2b3c4-0003-4000-8000-000000000003', 'marcos-santos', 'Marcos Santos', 'Instalações Elétricas', 'Eletricista com registro profissional ativo, atendendo residências e comércios com foco em segurança e conformidade com as normas técnicas.', 'https://randomuser.me/api/portraits/men/51.jpg', '(31) 97766-1122', 'marcos.santos@conectabairro.com', '@marcos_eletrica', NULL, 'CREA-MG-334455', 'MG', 'Belo Horizonte', 'Savassi', 4.8, 156, TRUE, TRUE, TRUE),
('p1a2b3c4-0004-4000-8000-000000000004', 'u1a2b3c4-0004-4000-8000-000000000004', 'andre-costa', 'André Costa', 'Pintura Comercial e Residencial', 'Pintor profissional com equipe própria, especializado em texturas, grafiato e acabamentos finos para ambientes internos e externos.', 'https://randomuser.me/api/portraits/men/22.jpg', '(21) 96655-3344', 'andre.costa@conectabairro.com', '@andrecosta.pintura', NULL, NULL, 'RJ', 'Rio de Janeiro', 'Tijuca', 4.7, 63, FALSE, TRUE, FALSE),
('p1a2b3c4-0005-4000-8000-000000000005', 'u1a2b3c4-0005-4000-8000-000000000005', 'juliana-paes', 'Juliana Paes', 'Paisagismo & Botânica', 'Paisagista dedicada a projetos de jardins residenciais e áreas verdes corporativas, com foco em espécies nativas e baixa manutenção.', 'https://randomuser.me/api/portraits/women/68.jpg', '(51) 95544-6677', 'juliana.paes@conectabairro.com', '@juliana.paisagismo', 'https://julianapaes.com', NULL, 'RS', 'Porto Alegre', 'Moinhos de Vento', 4.9, 41, TRUE, TRUE, FALSE),
('p1a2b3c4-0006-4000-8000-000000000006', 'u1a2b3c4-0006-4000-8000-000000000006', 'carlos-eduardo', 'Carlos Eduardo', 'Limpeza Profissional', 'Serviços de limpeza residencial e pós-obra, com equipe treinada e produtos de qualidade. Orçamento sem compromisso.', 'https://randomuser.me/api/portraits/men/77.jpg', '(61) 94433-7788', 'carlos.eduardo@conectabairro.com', NULL, NULL, NULL, 'DF', 'Brasília', 'Asa Sul', 4.6, 98, FALSE, TRUE, FALSE);

-- 3) VÍNCULO COM CATEGORIAS (professional_categories)
INSERT INTO professional_categories (professional_id, category_id) VALUES
('p1a2b3c4-0001-4000-8000-000000000001', 'cat-001'), -- Ricardo: Reparos Residenciais
('p1a2b3c4-0002-4000-8000-000000000002', 'cat-010'), -- Helena: Design e Criação
('p1a2b3c4-0003-4000-8000-000000000003', 'cat-004'), -- Marcos: Eletricidade
('p1a2b3c4-0004-4000-8000-000000000004', 'cat-006'), -- André: Pintura
('p1a2b3c4-0005-4000-8000-000000000005', 'cat-005'), -- Juliana: Jardinagem
('p1a2b3c4-0006-4000-8000-000000000006', 'cat-002'); -- Carlos: Limpeza

-- Fim do script. Confira o resultado com:
-- SELECT p.name, p.title, p.city, c.name AS categoria FROM professionals p
-- JOIN professional_categories pc ON pc.professional_id = p.id
-- JOIN categories c ON c.id = pc.category_id;

-- ============================================================
-- UPDATE: Troca as fotos de teste por versões de melhor resolução
-- (Unsplash, 400x400, foco no rosto)
-- ============================================================

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0002-4000-8000-000000000002'; -- Helena Mendes

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0001-4000-8000-000000000001'; -- Ricardo Oliveira

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0005-4000-8000-000000000005'; -- Juliana Paes

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0003-4000-8000-000000000003'; -- Marcos Santos

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0004-4000-8000-000000000004'; -- André Costa

UPDATE professionals SET avatar_url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces'
WHERE id = 'p1a2b3c4-0006-4000-8000-000000000006'; -- Carlos Eduardo

-- Confira o resultado:
-- SELECT name, avatar_url FROM professionals;

SET SQL_SAFE_UPDATES = 0;

UPDATE professionals p
JOIN users u ON u.id = p.user_id
SET p.avatar_url = u.avatar_url
WHERE p.avatar_url IS NULL AND u.avatar_url IS NOT NULL;

UPDATE users
SET avatar_url = REPLACE(avatar_url, '=s96-c', '=s400-c')
WHERE avatar_url LIKE '%=s96-c%';

UPDATE professionals
SET avatar_url = REPLACE(avatar_url, '=s96-c', '=s400-c')
WHERE avatar_url LIKE '%=s96-c%';
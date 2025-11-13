<!-- e55b8874-34a7-4317-97aa-7d13c5b86c92 fc1d7db2-5489-4c38-a372-ea92ffae07f4 -->
# 📚 Plano de Estudos Completo - Django + Next.js Profissional

## 🎯 Estrutura do Curso

Este curso está dividido em **8 módulos principais**, cada um com teoria, prática e projetos. Estimativa total: **12-16 semanas** (estudando 15-20h/semana).

---

## 📋 MÓDULO 1: Fundamentos Python e Django (Semanas 1-2)

### Objetivos:

- Dominar Python intermediário/avançado
- Entender conceitos de Django
- Criar primeira API REST

### 1.1 Python Essencial (3-4 dias)

**Conceitos a Dominar:**

- Classes e objetos (OOP)
- Decorators
- Context managers
- Generators
- List comprehensions
- Type hints
- Virtual environments (venv)

**Recursos:**

- **Livro:** "Python Tricks" - Dan Bader
- **Vídeo:** Python Crash Course (freeCodeCamp YouTube)
- **Prática:** Exercícios em HackerRank ou LeetCode (nível fácil/médio)

**Projeto Prático:**
Criar um sistema simples de gerenciamento de tarefas com classes, decorators e type hints.

### 1.2 Django Básico (4-5 dias)

**Conceitos:**

- Estrutura de projeto Django
- Models (ORM)
- Views e Templates
- URLs e Routing
- Admin interface
- Migrations

**Recursos:**

- **Documentação Oficial:** https://docs.djangoproject.com/
- **Tutorial:** Django Girls Tutorial (https://tutorial.djangogirls.org/)
- **Curso:** Django for Everybody (Coursera - gratuito)
- **Vídeo:** "Django Tutorial" - Corey Schafer (YouTube)

**Projeto Prático:**
Criar um blog simples com posts, categorias e comentários.

**Checklist:**

- [ ] Criar projeto Django
- [ ] Criar app e modelos
- [ ] Configurar admin
- [ ] Criar views e templates
- [ ] Entender migrations

### 1.3 Django REST Framework (3-4 dias)

**Conceitos:**

- Serializers
- ViewSets e Views
- Routers
- Permissions e Authentication
- Pagination
- Filtering

**Recursos:**

- **Documentação:** https://www.django-rest-framework.org/
- **Tutorial:** DRF Tutorial oficial
- **Vídeo:** "Django REST Framework" - Very Academy (YouTube)

**Projeto Prático:**
Converter o blog em API REST com endpoints CRUD completos.

**Checklist:**

- [ ] Criar serializers
- [ ] Implementar ViewSets
- [ ] Configurar routers
- [ ] Adicionar paginação
- [ ] Implementar filtros

---

## 📋 MÓDULO 2: Banco de Dados e ORM Avançado (Semanas 3-4)

### Objetivos:

- Dominar PostgreSQL
- Otimizar queries Django
- Entender relacionamentos complexos

### 2.1 PostgreSQL Fundamentos (2-3 dias)

**Conceitos:**

- SQL básico/intermediário
- Joins (INNER, LEFT, RIGHT)
- Indexes
- Constraints
- Transactions
- Views e Functions

**Recursos:**

- **Tutorial:** PostgreSQL Tutorial (https://www.postgresqltutorial.com/)
- **Prática:** SQLBolt (https://sqlbolt.com/)
- **Livro:** "PostgreSQL: Up and Running" (capítulos essenciais)

**Projeto Prático:**
Criar queries complexas com múltiplos joins e subqueries.

### 2.2 Django ORM Avançado (4-5 dias)

**Conceitos:**

- select_related e prefetch_related
- Query optimization
- Annotations e Aggregations
- Raw SQL quando necessário
- Database indexes
- Query debugging

**Recursos:**

- **Documentação:** Django ORM QuerySet API
- **Artigo:** "Django ORM Optimization" - Real Python
- **Ferramenta:** django-debug-toolbar

**Projeto Prático:**
Otimizar queries do blog para reduzir N+1 queries.

**Checklist:**

- [ ] Entender select_related vs prefetch_related
- [ ] Usar annotations
- [ ] Criar indexes apropriados
- [ ] Debugar queries lentas
- [ ] Medir performance

### 2.3 Migrations Avançadas (1-2 dias)

**Conceitos:**

- Migrations customizadas
- Data migrations
- Rollback strategies
- Migrations em produção

**Recursos:**

- **Documentação:** Django Migrations
- **Artigo:** "Django Migrations Best Practices"

**Projeto Prático:**
Criar migration para popular dados iniciais e migrar dados existentes.

---

## 📋 MÓDULO 3: API Design e Boas Práticas (Semanas 5-6)

### Objetivos:

- Criar APIs RESTful profissionais
- Implementar autenticação
- Documentar APIs

### 3.1 REST API Design (2-3 dias)

**Conceitos:**

- Princípios REST
- HTTP methods e status codes
- Versionamento de API
- HATEOAS (opcional)
- Error handling padronizado

**Recursos:**

- **Livro:** "RESTful Web APIs" - Leonard Richardson
- **Artigo:** REST API Tutorial (https://restfulapi.net/)
- **Vídeo:** "REST API Design" - Web Dev Simplified (YouTube)

**Projeto Prático:**
Refatorar API do blog seguindo princípios REST.

### 3.2 Autenticação e Autorização (3-4 dias)

**Conceitos:**

- JWT (JSON Web Tokens)
- Session authentication
- OAuth2 (opcional)
- Permissions customizadas
- Rate limiting

**Recursos:**

- **Biblioteca:** djangorestframework-simplejwt
- **Tutorial:** "Django REST Framework Authentication"
- **Artigo:** "JWT vs Session Authentication"

**Projeto Prático:**
Implementar autenticação JWT na API com refresh tokens.

**Checklist:**

- [ ] Implementar JWT
- [ ] Criar sistema de permissões
- [ ] Adicionar rate limiting
- [ ] Proteger endpoints sensíveis

### 3.3 Documentação de API (1-2 dias)

**Conceitos:**

- OpenAPI/Swagger
- drf-spectacular
- Exemplos e schemas
- Testes de API

**Recursos:**

- **Biblioteca:** drf-spectacular
- **Documentação:** OpenAPI Specification

**Projeto Prático:**
Documentar toda a API com Swagger UI.

---

## 📋 MÓDULO 4: React e Next.js Fundamentos (Semanas 7-8)

### Objetivos:

- Dominar React moderno
- Entender Next.js App Router
- Criar componentes profissionais

### 4.1 React Moderno (5-6 dias)

**Conceitos:**

- Hooks (useState, useEffect, useContext, useMemo, useCallback)
- Component composition
- Props e State
- Event handling
- Conditional rendering
- Lists e Keys
- Forms em React

**Recursos:**

- **Documentação:** https://react.dev/
- **Curso:** "React - The Complete Guide" - Maximilian Schwarzmüller (Udemy)
- **Tutorial:** React Offi
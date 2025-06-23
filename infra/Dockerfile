# Dockerfile para ambiente de desenvolvimento do DevPortfolio Interactive
# Imagem base Node.js LTS
FROM node:22-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY ../DevPortfolio/package*.json ./

# Instala as dependências
RUN npm install 

# Copia o restante do código
COPY ../DevPortfolio/ .

# Expõe a porta padrão do React
EXPOSE 3000

# Comando padrão para iniciar o app
CMD ["npm", "start"]

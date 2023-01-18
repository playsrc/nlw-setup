![](./.github/banner1.png)

## Sobre

**habits** é um aplicativo web projetado para ajudar você a rastrear seus hábitos e melhorar sua qualidade de vida. Com ele, você pode criar uma lista de hábitos que deseja incorporar em sua rotina diária e marcá-los a medida que os pratica.

O aplicativo apresenta um quadro diário que mostra a frequência dos hábitos praticados, permitindo que você veja sua progresso ao longo do tempo e se motive a seguir em frente.

## Aulas

- [x] 16/01/2023 **Iniciando o projeto de ponta a ponta** • Foi ensinado de forma rápida a base dos 3 apps que serão desenvolvidos. Logo no início foi apresentado a configuração do servidor com a biblioteca fastify, em seguida a criação com projeto React com Vite e o uso do Tailwind e por último, a criação e configuração do app mobile com Expo e React Native.

- [x] 17/01/2023 **Avançando o back-end e front-end** • Foi ensinada a criação de rotas no backend e também a validação de dados com zod e integração ao banco de dados com prisma. No Frontend foi criado novos componentes e ensinado técnicas para lidar com datas e resolver dificuldades específicas do projeto. Por último no app mobile, a utilização do Nativewind para estilização como a do Tailwind na web, também foram adicionados componentes novos e reaproveitado algumas funções da web para lidar com datas.

- [ ] 18/01/2023 **Finalizando o layout web e mobile** •

- [ ] 19/01/2023 **Conectando a API** •

- [ ] 20/01/2023 **O próximo nível** •

## Instalação

> **Note**
> Esse projeto está configurado como um monorepo e as dependências são gerenciadas pelo PNPM.

### Configuração inicial

Clone o repositório e instale as dependências.

```bash
git clone https://github.com/mateusabelli/nlw-setup

cd nlw-setup

pnpm install
```

### Variáveis ambiente

Crie um arquivo .env em `/apps/server/.env` e cole o seguinte código:

```bash
DATABASE_URL="file:./dev.db"
```

### Banco de dados

Com o arquivo .env criado na raiz do `server` rode os seguinte comandos:

```bash
# Gere seu dev.db
pnpm --filter server exec prisma migrate dev

# Insira os dados iniciais
pnpm --filter server exec prisma db seed
```

> **Note**
> O comando `prisma generate` possuí uma falha APENAS na etapa da geração da imagem ERD.svg mas funciona normalmente na geração do PrismaClient.

### Como utilizar os comandos no monorepo

```bash
pnpm --filter [APP] [COMANDO]

# Exemplo
pnpm --filter web dev
pnpm --filter mobile start
pnpm --filter server dev
```

Como instalar dependências e executar pacotes

```bash
pnpm --filter [APP] install [PACOTE]
pnpm --filter [APP] exec [PACOTE] [COMANDO]

# Exemplo de instalação
pnpm --filter web install dayjs

# Exemplo de execução de pacote
pnpm --filter server exec prisma studio
```

## Contribuição

Contribuições são sempre bem-vindas! Se você tem alguma ideia para melhorar o projeto, por favor, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença **MIT**. Por favor, leia o arquivo LICENSE.md para mais informações.

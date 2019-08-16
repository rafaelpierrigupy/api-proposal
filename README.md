# api-proposal

## Executando o projeto

Primeiro, garanta que as dependências foram instaladas com `npm install`:

```bash
npm run start
npm run start-candidates
npm run start-jobs
npm run start-applications
```

O primeiro comando liga a API inteira, os demais ligam pedaços da API pertinentes aos Contextos Delimitados[1] de candidates, jobs, e applications, respectivamente.

## Endpoints

Todos os endpoints de escrita precisam que o cabeçalho HTTP `Content-Type: application/json` seja passado.

```
GET /candidates
GET /candidates/:candidateId
POST /candidates
BODY: {
  “name”: “...”,
  “age”: “...”,
  “skillLevel”: “...”
}
PATCH /candidates/:candidateId
BODY: {
  “skillLevel”: “...”
}

GET /jobs
GET /jobs/:jobId
POST /jobs
BODY: {
  “name”: “...”,
  “status”: [“draft”|“published”|“closed”],
}

GET /jobs/:jobId/applications
POST /jobs/:jobId/applications
BODY: {
  “candidateId”: “...”
}
```

## Arquitetura

Este projeto simula uma implementação de uma API Rest transicionando de um padrão arquitetônico monolítico para microserviços. Seu objetivo é apresentar uma série de padrões de projeto para alcançar o baixo acoplamento entre componentes e permitir a substituição da invocação de métodos por requisições HTTP. Note que o intensivo uso de padrões de projeto e camadas de indireção só se justifica pelo caráter didático desta implementação. Em um contexto real, a quantidade de regras de negócio e endpoints é muito pequena para justificar a complexidade do código que está aqui.

Sob o aspecto funcional, o objetivo da API é permitir que Candidatos se apliquem à Vagas. Para tanto, a API é dividida três contextos delimitados: `candidates`, responsável por gerenciar as informações dos Candidatos, `jobs`, responsável por gerenciar o cadastro de Vagas e `applications`, responsável por rastrear a Aplicação de um Candidato a uma Vaga.

O componente `candidates` deve ser capaz de cadastrar e apresentar os Candidatos da API. Neste experimento, podemos determinar a aptidão de um Candidato a uma vaga por seu Nível de Habilidade. Habilidade é medida por um valor numérico e é o único valor necessário para representar habilidade, seja ela qual for. Um Candidato deve ter um Nome, Idade e um Nível de Habilidade. Por questões legais, não se pode cadastrar um Candidato menor de 13 anos de Idade.

O componente `jobs` apresenta e cadastra as Vagas disponíveis na API. Uma Vaga tem um Nome, e um Status. Os status possíveis são, `draft`, para uma Vaga ainda não publicada, `published`, para vagas publicadas e `closed`, para Vagas que já foram encerradas.

O componente `applications` monitora os Candidatos que se aplicaram à Vagas. Um Candidato não pode se aplicar à uma Vaga que não tenha sido publicada. Quando se busca as Aplicações de uma Vaga, as pessoas recrutadoras precisam ver as Candidatos com maior Nível de Habilidade primeiro. Como essas buscas feitas pelas recrutadoras são muito frequentes, não se pode consultar o componente `candidates` toda vez que é necessário saber o Nível de Habilidade de um Candidato. No entanto, caso o Nível de Habilidade de um Candidato mude, o componente `applications` precisa ser notificado e suas Aplicações precisam ser atualizadas.

Algumas premissas arquiteturais foram adotadas durante o desenvolvimento: todas as chamadas são síncronas, as implementações que fazem acesso aos dados usam a memória para armazenar informações e alterando-se as variáveis de ambiente, deve ser possível ligar a API inteira em um só processo ou utilizando um processo para cada componente.

## Estrutura de diretórios

Os tópicos abaixo exemplificam a estrutura de diretórios do projeto:

### Componente

Existem três diretórios desse tipo, sendo eles os seguintes: `candidate`, `job` e `application`. Cada diretório é responsável por agrupar o código pertinente a um Contexto Delimitado.


#### Application

Este diretório agrupa as classes de serviço, nomeadas com o sufixo `Manager`. Essas fachadas[2] agrupam as operações oferecidas pela aplicação e abstraem a relação entre o Modelo de Domínio[3] e os mecanismos de persistência.


#### Domain

As classes que residem neste diretório descrevem o Modelo de Domínio. O modelo de domínio descreve o funcionamento de um negócio e as regras pertinentes ele. Aqui, por exemplo, se decide que não é possível se aplicar em uma vaga que não esteja publicada.


#### Interfaces

Aqui estão as implementações de protocolo. A responsabilidade das classes é interpretar mensagens HTTP ou de fila produtor/consumidor e invocar um `Manager` da camada de aplicação.


#### Infrastructure

Neste diretório ficam os detalhes de implementação dos serviços de Domínio, como as Sondas de Domínio[4], responsáveis por notificar eventos de domínio, e Repositórios[5], responsável pela persistência dos dados da aplicação. 

## Como utilizar este projeto?

A maioria dos arquivos deste projeto tem comentários explicando os padrões utilizados e a motivação por de trás deles. Além disso você também pode encontrar referências para se aprofundar nos padrões apresentados aqui.

## Desafios

 - Esta implementação não tem nenhum teste. Você consegue pensar em uma boa estratégia para garantir a qualidade em futuras mudanças?
 - A decisão quanto à estratégia de persistência foi deferida até o último momento responsável e agora você precisa implementá-la. Faça a mudança e reflita: ela foi fácil? Porquê?
 - Quando o nível de habilidade de um candidato muda, as aplicações mudam, ainda que a vaga tenha sido fechada. Que solução você daria para este problema? Implemente.
 
## Referências

[1] https://martinfowler.com/bliki/BoundedContext.html
[2] https://pt.wikipedia.org/wiki/Fa%C3%A7ade
[3] http://wiki.c2.com/?DomainModel
[4] https://martinfowler.com/articles/domain-oriented-observability.html
[5] https://deviq.com/repository-pattern/

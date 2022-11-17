## TST01 Login bem sucedido

** Caso de uso em que se baseia: ** [CDU003]

** Cenário: ** Fluxo principal

** Preparação: **

a) Os seguintes clientes deverão estar cadastrados no sistema:

| Nome  | Login     | Senha  |
| ----- | --------- | ------ |
| João  | 123456789 | 123456 |
| Maria | 987654321 | 123456 |

** Passos: **

1. O usuário informa o login e a senha
2. O sistema valida o login e a senha
3. O sistema exibe a tela inicial do sistema

** Resultado esperado: ** O sistema exibe a tela inicial do sistema

** Resultado obtido: ** O sistema exibe a tela inicial do sistema

** Data da última execução do teste: ** 16/11/2022

### Métricas do teste

** Número de execuções: ** 2

** Cobertura de testes executados: ** 100%

** Número de sucedidos: ** 2

** Combertura de testes bem-sucedidos: ** 100%

## TST02 Falha no login

** Caso de uso em que se baseia: ** [CDU003]

** Cenário: ** Fluxo alternativo

** Preparação: **

a) O usuário não deve estar cadastrado no sistema

** Passos: **

1. O usuário informa o login e a senha

** Resultado esperado: ** O sistema exibe uma mensagem de erro

** Resultado obtido: ** O sistema exibe uma mensagem de erro

** Data da última execução do teste: ** 16/11/2022

### Métricas do teste

** Número de execuções: ** 2

** Cobertura de testes executados: ** 100%

** Número de sucedidos: ** 2

** Combertura de testes bem-sucedidos: ** 100%

## TST03 Deslogar do sistema

** Caso de uso em que se baseia: ** [CDU008]

** Cenário: ** Fluxo principal

** Preparação: **

a) O usuário deverá estar logado no sistema

** Passos: **

1. O usuário clica no botão de deslogar

** Resultado esperado: ** O sistema exibe a tela de login

** Resultado obtido: ** O sistema exibe a tela de login

** Data da última execução do teste: ** 16/11/2022

### Métricas do teste

** Número de execuções: ** 2

** Cobertura de testes executados: ** 100%

** Número de sucedidos: ** 2

** Combertura de testes bem-sucedidos: ** 100%

## TST04 Cadastrar campeonato

** Caso de uso em que se baseia: ** [CDU004]

** Cenário: ** Fluxo principal

** Preparação: **

a) O usuário deverá estar logado no sistema

** Passos: **

1. O usuário informa os dados do campeonato

2. O usuário clica no botão de cadastrar

** Resultado esperado: ** O sistema exibe o campeonato cadastrado

** Resultado obtido: ** O sistema exibe o campeonato cadastrado

** Data da última execução do teste: ** 16/11/2022

### Métricas do teste

** Número de execuções: ** 2

** Cobertura de testes executados: ** 100%

** Número de sucedidos: ** 2

** Combertura de testes bem-sucedidos: ** 100%

## TST05 Cadastrar campeonato com dados em branco

** Caso de uso em que se baseia: ** [CDU004]

** Cenário: ** Fluxo alternativo

** Preparação: **

a) O usuário deverá estar logado no sistema

** Passos: **

1. O usuário informa os dados do campeonato

2. O usuário clica no botão de cadastrar

** Resultado esperado: ** O sistema exibe uma mensagem de erro

** Resultado obtido: ** O sistema exibe uma mensagem de erro

** Data da última execução do teste: ** 16/11/2022

### Métricas do teste

** Número de execuções: ** 2

** Cobertura de testes executados: ** 100%

** Número de sucedidos: ** 2

** Combertura de testes bem-sucedidos: ** 100%

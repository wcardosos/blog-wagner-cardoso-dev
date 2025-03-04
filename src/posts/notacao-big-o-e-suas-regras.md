---
title: Notação Big O e suas regras
date: 2023-11-29
summary: O básico da notação Big O
---

# Introdução

A notação Big O é usada na ciência da computação para descrever o desempenho ou complexidade de um algoritmo. Ela mede como um algoritmo responde às mudanças no tamanho da entrada e é frequentemente usada para comparar diferentes algoritmos e escolher o mais eficiente para uma tarefa específica. Essa notação também nos permite **medir o quanto um código é escalável**.

O desempenho de um algoritmo não é medido por meio do tempo, mas na quantidade de operações que o computador precisa executar para processar esse algoritmo.

## Alguns tipos de notação

| Notação    | Definição        | Identificação                                                         | Avaliação |
| ---------- | ---------------- | --------------------------------------------------------------------- | --------- |
| O(1)       | Constante        | Não possui loops                                                      | Excelente |
| O(log n)   | Logarítmica      | Algoritmos de busca em inputs ordenados (não vale para hash’s)        | Excelente |
| O(n)       | Linear           | Loops for/while                                                       | Razoável  |
| O(n log n) | Logaritmo linear | Operações de ordenação                                                | Ruim      |
| O(n^2)     | Quadrática       | Todo elemento de uma coleção precisa ser comparado com outro elemento | Horrível  |
| O(2^n)     | Exponencial      | Algoritmos recursivos que resolvem um problema de tamanho n           | Horrível  |
| O(n!)      | Fatorial         | Um loop é adicionado para todo elemento da coleção                    | Horrível  |
| O(a+b)     | -                | Coleções separadas                                                    | -         |
| O(a\*b)    | -                | Coleções separadas aninhadas                                          | -         |

Essas notações são avaliadas de acordo com o número de operações a medida que a quantidade de elementos aumenta. As notações _O(log n)_, _O(n log n)_, _O(2^n)_ e _O(n!)_ são notações que são mais utilizadas em problemas focados em otimizar o código. Contudo, **O(n!)** é uma notação que dificilmente vamos nos deparar.

# Regras do Big O

As regras Big O simplificam a análise e comparação de algoritmos. Elas fornecem métodos padrão para determinar a complexidade de um algoritmo com base em sua estrutura e comportamento.

## Regra 1 - Pior caso

Sempre é levado em consideração o pior caso possível do algoritmo.

## Regra 2 - Remover constantes

Se baseia em remover tudo que é constante e deixar apenas as notações que são conhecidas (ver na tabela). As constantes devem ser removidas pois a medida que o **input** cresce essas constantes vão ficando insignificantes em relação ao número de operações.

## Regra 3 - Termos diferentes para entrada

Quando o **input** possui mais de um dado (ex.: função com mais e um parâmetro). Cada entrada deve ser calculada separadamente. Com isso, o resultado ficará algo como **O(a + b)**

## Regra 4 - Descartar termos não dominantes

Significa se preocupar sempre com o com o termo mais importante. Essa importância é medida de acordo com a **pior complexidade**. Ex.: O(n + n²) = O(n²), pois quando o **input** for muito grande, O(n) será bem menor do que O(n²).

# Conclusão

A notação Big O é uma ferramenta crucial na análise de algoritmos, proporcionando uma maneira sistemática de entender e comparar a eficiência desses algoritmos. Ao medir a escalabilidade de um código, ela oferece insights valiosos sobre como um algoritmo se comporta diante de variações no tamanho da entrada.

As regras do Big O fornecem diretrizes valiosas que simplificam a análise e permitem que os desenvolvedores foquem nos aspectos fundamentais que afetam a eficiência de um algoritmo. Ao seguir essas regras, os programadores podem otimizar seus códigos de maneira mais eficaz, garantindo um bom desempenho mesmo diante de conjuntos de dados significativos.
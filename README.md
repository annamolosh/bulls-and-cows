# Bulls and Cows

Браузерная реализация классической логической игры «Быки и коровы», разработанная на TypeScript.

## Об игре

Цель игры — угадать загаданное компьютером число, состоящее из уникальных цифр.

После каждой попытки игрок получает подсказку:

- **Быки** — цифры, которые угаданы правильно и находятся на правильных позициях.
- **Коровы** — цифры, которые присутствуют в загаданном числе, но находятся на других позициях.

Задача игрока — угадать секретное число за минимальное количество попыток.

## Возможности

- Настройка длины секретного числа от 2 до 6 символов.
- Четыре системы счисления:
    - Двоичная (base 2).
    - Восьмеричная (base 8).
    - Десятичная (base 10).
    - Шестнадцатеричная (base 16).
- Генерация секретного числа с уникальными цифрами.
- Проверка и валидация пользовательского ввода.
- История попыток с результатами «быки» и «коровы».
- Счётчик попыток и игровой таймер.
- Возможность начать новую игру без перезагрузки страницы.

## Используемые технологии

- TypeScript
- HTML
- CSS
- Vitest — тестирование
- ESLint — проверка качества кода
- Prettier — форматирование кода
- Husky — Git hooks
- lint-staged — проверка изменённых файлов перед коммитом

## Установка и запуск

### Требования

- Node.js
- npm

### Установка

Клонировать репозиторий:

```bash
git clone https://github.com/annamolosh/bulls-and-cows.git
```

Перейти в папку проекта:

```bash
cd bulls-and-cows
```

Установить зависимости:

```bash
npm install
```

### Запуск приложения

```bash
npm run dev
```

Открыть в браузере адрес, указанный в терминале (по умолчанию `http://127.0.0.1:8080`).

### Запуск тестов

```bash
npm test
```

### Проверка кода

```bash
npm run lint
```

### Форматирование кода

```bash
npm run format
```

## Структура проекта

```text
bulls-and-cows/
├── src/
│   ├── core/       # Игровая логика и чистые функции
│   ├── ui/         # Пользовательский интерфейс
│   ├── services/   # Вспомогательные сервисы
│   └── index.ts    # Точка входа приложения
├── tests/          # Модульные тесты
├── index.html
├── BIG_O.md        # Анализ сложности алгоритмов
├── package.json
└── tsconfig.json
```

## Архитектура

В проекте игровая логика отделена от пользовательского интерфейса.

Основные функции реализованы в функциональном стиле: без классов и прямых манипуляций с DOM. Для проверки игровой логики используются модульные тесты Vitest.

Анализ временной и пространственной сложности алгоритмов представлен в файле [BIG_O.md](BIG_O.md).

## Репозиторий

[GitHub — Bulls and Cows](https://github.com/annamolosh/bulls-and-cows)

A browser-based implementation of the classic **Bulls and Cows** number-guessing game, built with TypeScript.

## About the Game

The player tries to guess a secret number containing unique digits.

After each guess, the game provides feedback:

- **Bulls** — correct digits in the correct positions.
- **Cows** — correct digits in the wrong positions.

The goal is to guess the secret number in as few attempts as possible.

## Features

- Configurable secret number length (2–6 digits).
- Four number systems:
    - Binary (base 2)
    - Octal (base 8)
    - Decimal (base 10)
    - Hexadecimal (base 16)
- Unique digits in the secret number.
- Input validation.
- Guess history with bulls and cows.
- Game timer and attempt counter.
- New Game functionality without reloading the page.

## Technologies

- TypeScript
- HTML
- CSS
- Vitest
- ESLint
- Prettier
- Husky
- lint-staged

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/annamolosh/bulls-and-cows.git
```

Navigate to the project directory:

```bash
cd bulls-and-cows
```

Install dependencies:

```bash
npm install
```

### Run the Application

Start the local development server:

```bash
npm run dev
```

Open the URL displayed in the terminal (by default, `http://127.0.0.1:8080`).

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## Project Structure

```text
bulls-and-cows/
├── src/
│   ├── core/       # Game logic and pure functions
│   ├── ui/         # User interface
│   ├── services/   # Supporting services
│   └── index.ts    # Application entry point
├── tests/          # Unit tests
├── index.html
├── BIG_O.md        # Algorithm complexity analysis
├── package.json
└── tsconfig.json
```

## Architecture

The project separates the game logic from the user interface.

Core game functions are implemented as pure functions without classes or direct DOM manipulation. Unit tests are written with Vitest.

See [BIG_O.md](BIG_O.md) for algorithm complexity analysis.

## Repository

[GitHub Repository](https://github.com/annamolosh/bulls-and-cows)

- [Архитектура проекта](DESIGN.md)
- [Анализ сложности алгоритмов](BIG_O.md)

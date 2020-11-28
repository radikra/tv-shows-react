# rct-tv-shows

## Установка проекта
```
npm install
```

## Работа с проектом

### Режим разработки
```
npm start
```

### Сборка проекта
```
npm run build
```

## Структура проекта

Проект состоит из двух основных компонентов: DataCapture ('src/components/DataCapture') и Programs ('src/components/Programs').

Компонент DataCapture включает в себя два компонента:
- ChannelsList - в этом модуле происходит выбор канала;
- DatePicker - здесь происходит выбор даты.

Все компоненты "общаются" между собой пропсами и эмитят события для дальнейших действий.

## Использованные библиотеки
```
axios
```
Удобная библиотека для запросов к API
```
dayjs
```
Легкая (2kb) и функциональная библиотека для работы с датами и временем
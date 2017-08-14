const fishText = [
  'Ощущение мира решительно подчеркивает дедуктивный метод, хотя в официозе',
  'принято обратное. Созерцание непредвзято подрывает естественный бабувизм,',
  'отрицая очевидное. Априори, созерцание амбивалентно. Принцип восприятия,',
  'по определению, раскладывает на элементы сложный бабувизм, ломая рамки',
  'привычных представлений. Адживика осмысленно понимает под собой дуализм,',
  'при этом буквы А, В, I, О символизируют соответственно общеутвердительное,',
  'общеотрицательное, частноутвердительное и частноотрицательное суждения.',
  'Мир дискредитирует закон исключённого третьего, однако Зигварт считал',
  'критерием истинности необходимость и общезначимость, для которых нет',
  'никакой опоры в объективном мире.',
].join(' ');

const headingText = [
  'Заголовок, может быть очень длинным: две/три/четыре строки и более строк.',
  'У заголовка должен быть выставлен не только правильный отступ, но и',
  'межстрочный интервал.',
].join(' ');

module.exports = {
  block: 'page',
  title: 'Текстовая',
  // styles: [{elem: 'css', url: '../_merged/_merged.css'}],
  // scripts: [{elem: 'js', url: '../_merged/_merged.async.js', async: true},
  //     {elem: 'js', url: '../_merged/_merged.js'}, {elem: 'js', url: '../_merged/_merged.i18n.ru.js'}],
  scripts: [{ elem: 'js', url: 'text.bemjson.bundle.js' }],
  content: [
    {
      tag: 'h1',
      content: 'Заголовок h1 — основной заголовок страницы. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      cls: 'h1',
      content: 'Заголовок "как h1" — (блок с классом). ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'h2',
      content: 'Заголовок h2. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      cls: 'h2',
      content: 'Заголовок "как h2" — (блок с классом).' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'h3',
      content: 'Заголовок h3. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'h4',
      content: 'Заголовок h4. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'h5',
      content: 'Заголовок h5. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'h6',
      content: 'Заголовок h6. ' + headingText,
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'ul',
      content: [
        {
          tag: 'li',
          content: 'Прямоточные: Серия BM5, BM6X',
        },
        {
          tag: 'li',
          content: 'Дисковые: Серия BM7',
        },
        {
          tag: 'li',
          content: 'Инжекционные: Dosaodor-D',
        },
        {
          tag: 'li',
          content: 'Абсорбционные: Серия OL',
        },
        {
          tag: 'li',
          content: {
            tag: 'ul',
            content: [
              {
                tag: 'li',
                content: 'Прямоточные: Серия BM5, BM6X',
              },
              {
                tag: 'li',
                content: 'Дисковые: Серия BM7',
              },
              {
                tag: 'li',
                content: 'Инжекционные: Dosaodor-D',
              },
              {
                tag: 'li',
                content: 'Абсорбционные: Серия OL',
              },
            ],
          },
        },
        {
          tag: 'li',
          content: 'Прямоточные: Серия BM5, BM6X',
        },
        {
          tag: 'li',
          content: 'Дисковые: Серия BM7',
        },
      ],
    },
    {
      tag: 'p',
      content: fishText,
    },
    {
      tag: 'ol',
      content: [
        {
          tag: 'li',
          content: 'Прямоточные: Серия BM5, BM6X',
        },
        {
          tag: 'li',
          content: 'Дисковые: Серия BM7',
        },
        {
          tag: 'li',
          content: 'Инжекционные: Dosaodor-D',
        },
        {
          tag: 'li',
          content: 'Абсорбционные: Серия OL',
        },
        {
          tag: 'li',
          content: {
            tag: 'ol',
            content: [
              {
                tag: 'li',
                content: 'Прямоточные: Серия BM5, BM6X',
              },
              {
                tag: 'li',
                content: 'Дисковые: Серия BM7',
              },
              {
                tag: 'li',
                content: 'Инжекционные: Dosaodor-D',
              },
              {
                tag: 'li',
                content: 'Абсорбционные: Серия OL',
              },
            ],
          },
        },
        {
          tag: 'li',
          content: 'Прямоточные: Серия BM5, BM6X',
        },
        {
          tag: 'li',
          content: 'Дисковые: Серия BM7',
        },
      ],
    },
    {
      tag: 'p',
      content: [
        fishText,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ].join(' '),
    },
    {
      tag: 'table',
      content: [
        {
          tag: 'tr',
          content: [
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
          ],
        },
        {
          tag: 'tr',
          content: [
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
          ],
        },
        {
          tag: 'tr',
          content: [
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
            {
              tag: 'td',
              content: 'Ячейка',
            },
          ],
        },
      ],
    },
  ],
};
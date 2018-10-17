const fs = require('fs-extra');
const path = require('path');
const sortBy = require('lodash').sortBy;

const moment = require('moment');

const allPost = fs.readdirSync(path.resolve(`src/posts`));

const postData = allPost.map(post => {
  const article = fs.readFileSync(path.resolve(`src/posts/${post}`), 'utf-8');

  const titleHandler = /title(:|：).+\r\n/gi.exec(article);
  const tagsHandler = /tags(:|：).+\r\n/gi.exec(article);
  const categoriesHandler = /categories(:|：).+\r\n/gi.exec(article);
  const dateHandler = /date(:|：).+\r\n/gi.exec(article);
  const contentHandler = article.split(/-{3}\r\n/gi);

  let title = titleHandler.length ? titleHandler[0].replace(/(title(:|：)\s*|\r\n)/gi, '') : '';
  let tags = tagsHandler.length ? tagsHandler[0].replace(/(tags(:|：)\s*|\r\n)/gi, '').split(/,\s?/gi) : [];
  let categories = categoriesHandler.length ? categoriesHandler[0].replace(/(categories(:|：)\s*|\r\n)/gi, '').split(/,\s?/gi) : [];;
  let date = dateHandler.length ? dateHandler[0].replace(/(date(:|：)\s*|\r\n)/gi, '') : '';

  let content = contentHandler.length ? contentHandler[contentHandler.length - 1].replace('\n', '') :'';


  console.log(moment(date).year(),moment(date).month()+1,moment(date).date());

  return {
    title,
    tags,
    categories,
    date,
    url: `/article/${title}`,
    content,
  };
});


fs.writeFileSync(
  path.join(path.resolve('public/'), 'data.json'),
  JSON.stringify(postData),
  'utf-8'
);


//fs.ensureDirSync(path.resolve('public/static'))

//fs.copySync(path.resolve('static'), path.resolve('public/static'))
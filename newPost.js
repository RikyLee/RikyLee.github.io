const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const moment = require('moment');

const question = [{
  type: 'input',
  name: 'title',
  message: '请输入新建文章的名称:',
  validate: value => {
    if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
      return '名称中不得包含特殊符号（.*?\\/），请重新输入↑↑';
    }
    if (value) return true;

    return '名称不能为空...';
  }
}, {
  type: 'input',
  name: 'create_time',
  message: '创建时间:',
  default: () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
}, {
  type: 'input',
  name: 'tags',
  message: '标签，多个请用逗号分隔:',
  default: () => {
    return '其他';
  },
  validate: value => {
    if (value) return true;
    return '标签不能为空...';
  }
}, {
  type: 'input',
  name: 'categories',
  message: '分类，多个请用逗号分隔:',
  default: () => {
    return '其他';
  },
  validate: value => {
    if (value) return true;
    return '分类不能为空...';
  }
}]

inquirer.prompt(question).then(answers => {
  const {
    title,
    tags,
    categories,
    create_time
  } = answers;

  const postDirName = 'src/posts';

  if (!fs.existsSync(path.resolve(postDirName))) {
    fs.mkdirSync(path.resolve(postDirName));
  }

  if (fs.existsSync(path.resolve(`${postDirName}/${title}.md`))) {
    console.log('文章已存在，请直接编辑！');
  } else {
    let content = `---\r\ntitle: ${title}\r\ntags: ${tags}\r\ncategories: ${categories}\r\ndate: ${create_time}\r\n---\r\n ## 这里是文章内容`;

    console.log(`${postDirName}/${title}.md`);
    fs.writeFileSync(
      path.resolve(`${postDirName}/${title}.md`),
      content,
      'utf-8'
    );
  }


}).catch(err => {
  console.log(err);
})
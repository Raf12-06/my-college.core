import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import hbs from 'handlebars';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @Render('index')
  getHello() {

    hbs.registerHelper('setUpp', str => str.toUpperCase());
    hbs.registerHelper('getList', (list, opt) => {
      const listAsHtml = list.map(v => "<li>" + opt.fn(v) + "</li>");
      return "<ul>\n" + listAsHtml.join("\n") + "\n</ul>";
    });

    hbs.registerHelper('getLink', (text, url) => {
      text = hbs.escapeExpression(text);
      url = hbs.escapeExpression(url);
      return new hbs.SafeString("<a href='" + url + "'>" + text + "</a>");
    });

    hbs.registerHelper('bold', function(text) {
      const text1 = "<b>" + hbs.escapeExpression(text) + "</b>";
      return new hbs.SafeString(text1);
    });

    hbs.registerHelper("link", function(text, options) {
      const attributes = [];
      Object.keys(options.hash).forEach(key => {
        const escapedKey = hbs.escapeExpression(key);
        const escapedValue = hbs.escapeExpression(options.hash[key]);
        attributes.push(escapedKey + '="' + escapedValue + '"');
      })
      const escapedText = hbs.escapeExpression(text);
      const escapedOutput ="<a " + attributes.join(" ") + ">" + escapedText + "</a>";
      return new hbs.SafeString(escapedOutput);
    });

    hbs.registerHelper('sum', one => {
      return one + one;
    });

    return {
      person: {
        name: 'Rafail',
        age: 27
      },
      person_list: [
        {
          name: 'Tim',
          age: 25
        },
        {
          name: 'Tag',
          age: 26
        },
        {
          name: 'Nail',
          age: 24,
          car: 'Nissan'
        }
      ],
      special_str: 'hello&`there',
      phrase: 'hello',
      specialChars: "& <ggrgr> > < \" ' ` =",
      nav: [{ url: "foo", test: true, title: "bar" }, { url: "bar" }],
    };
  }
}

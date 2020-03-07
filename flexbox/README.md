### Flexbox

---

#### DOC1: [Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
#### DOC2: [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```css
.container {
  display: flex;

  flex-direction: column;

  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: stretch;

  justify-content: flex-start;
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;

  flex-wrap: wrap;
}

.box {
  flex: 1;
  order: 1;
  /* width */
  flex-basis: 10%;
}
```

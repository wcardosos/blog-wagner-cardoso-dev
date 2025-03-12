const { JSDOM } = require("jsdom");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addFilter('formatDate', (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
  })

  eleventyConfig.addTransform("wrapTables", function(content, outputPath) {
    if (outputPath?.endsWith(".html")) {
      const dom = new JSDOM(content);
      const document = dom.window.document;

      document.querySelectorAll("table").forEach(table => {
        const wrapper = document.createElement("div");
        wrapper.className = "table-container";
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });

      return dom.serialize();
    }
    return content;
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  }
}
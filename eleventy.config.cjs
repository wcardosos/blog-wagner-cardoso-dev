module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/styles/global.css');
  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  }
}
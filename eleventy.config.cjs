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

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  }
}
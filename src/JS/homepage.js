const get_tea_article = () => {
  axios({
    method: 'get',
    url: '/tea-culture/get-all-article'
  }).then((res) => {
    console.log(res.data)
    return res.data;
  })
}

export {
  get_tea_article
}